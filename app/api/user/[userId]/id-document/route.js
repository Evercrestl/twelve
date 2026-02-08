import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/config/db';
import User from '@/lib/models/User';
import { updateInCloudinary, deleteFromCloudinary } from '@/lib/uploadToCloudinary';

// Update ID document
export async function PUT(request, { params }) {
    try {
        await connectDB();
        const { userId } = params;
        const formData = await request.formData();
        const file = formData.get('file');

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Convert file to base64
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64File = `data:${file.type};base64,${buffer.toString('base64')}`;

        // Update in Cloudinary
        const oldPublicId = user.idDocument?.publicId;
        const uploadResult = await updateInCloudinary(oldPublicId, base64File);

        // Update user document
        user.idDocument = {
            filename: file.name,
            url: uploadResult.url,
            publicId: uploadResult.publicId,
            format: uploadResult.format,
            bytes: uploadResult.bytes,
            uploadedAt: new Date()
        };

        await user.save();

        return NextResponse.json({
            success: true,
            idDocument: user.idDocument
        });

    } catch (error) {
        console.error('Update ID document error:', error);
        return NextResponse.json({ error: 'Failed to update ID document' }, { status: 500 });
    }
}

// Delete ID document
export async function DELETE(request, { params }) {
    try {
        await connectDB();
        const { userId } = params;

        const user = await User.findById(userId);
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Delete from Cloudinary
        if (user.idDocument?.publicId) {
            await deleteFromCloudinary(user.idDocument.publicId);
        }

        // Remove from user document
        user.idDocument = undefined;
        await user.save();

        return NextResponse.json({
            success: true,
            message: 'ID document deleted successfully'
        });

    } catch (error) {
        console.error('Delete ID document error:', error);
        return NextResponse.json({ error: 'Failed to delete ID document' }, { status: 500 });
    }
}
