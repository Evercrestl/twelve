import { NextResponse } from 'next/server';
import { uploadToCloudinary } from '@/lib/uploadToCloudinary';

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');

    if (!file) {
      return NextResponse.json(
        { error: 'No file provided' },
        { status: 400 }
      );
    }

    // Validate file type
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPG, PNG, and PDF are allowed' },
        { status: 400 }
      );
    }

    // Validate file size (10MB max)
    const maxSize = 10 * 1024 * 1024; // 10MB in bytes
    if (file.size > maxSize) {
      return NextResponse.json(
        { error: 'File size exceeds 10MB limit' },
        { status: 400 }
      );
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Convert to base64 for Cloudinary upload
    const base64File = `data:${file.type};base64,${buffer.toString('base64')}`;

    // Upload to Cloudinary
    const uploadResult = await uploadToCloudinary(base64File, 'id-documents');

    return NextResponse.json({
      success: true,
      data: {
        url: uploadResult.url,
        publicId: uploadResult.publicId,
        filename: file.name,
        format: uploadResult.format,
        bytes: uploadResult.bytes
      }
    });

  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload file' },
      { status: 500 }
    );
  }
}