import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import ContactMessage from "@/lib/models/ContactMessage";

// PATCH - Update message status
export async function PATCH(req, { params }) {
    try {
        const { id } = params;
        const { status, adminNotes } = await req.json();

        // Add authentication check here
        // Verify user is admin

        await connectDB();

        const updateData = { status };
        if (adminNotes !== undefined) {
            updateData.adminNotes = adminNotes;
        }
        if (status === 'replied') {
            updateData.repliedAt = new Date();
        }

        const message = await ContactMessage.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        if (!message) {
            return NextResponse.json(
                { error: "Message not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating message:", error);
        return NextResponse.json(
            { error: "Failed to update message" },
            { status: 500 }
        );
    }
}

// DELETE - Delete message
export async function DELETE(req, { params }) {
    try {
        const { id } = params;

        // Add authentication check here
        // Verify user is admin

        await connectDB();

        const message = await ContactMessage.findByIdAndDelete(id);

        if (!message) {
            return NextResponse.json(
                { error: "Message not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Message deleted successfully" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error deleting message:", error);
        return NextResponse.json(
            { error: "Failed to delete message" },
            { status: 500 }
        );
    }
}

// GET - Get single message
export async function GET(req, { params }) {
    try {
        const { id } = params;

        // Add authentication check here

        await connectDB();

        const message = await ContactMessage.findById(id).lean();

        if (!message) {
            return NextResponse.json(
                { error: "Message not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, message },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching message:", error);
        return NextResponse.json(
            { error: "Failed to fetch message" },
            { status: 500 }
        );
    }
}
