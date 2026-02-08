import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import ContactMessage from "@/lib/models/ContactMessage";

export async function POST(req) {
    try {
        const { firstName, lastName, email, phone, subject, message } = await req.json();

        // Validation
        if (!firstName || !lastName || !email || !message) {
            return NextResponse.json(
                { error: "Please fill in all required fields" },
                { status: 400 }
            );
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: "Please provide a valid email address" },
                { status: 400 }
            );
        }

        await connectDB();

        // Create new contact message
        const contactMessage = await ContactMessage.create({
            firstName,
            lastName,
            email,
            phone: phone || null,
            subject: subject || 'General Inquiry',
            message,
            status: 'new', // new, read, replied
            createdAt: new Date()
        });

        // Optional: Send notification email to admin
        // await sendEmailNotification(contactMessage);

        return NextResponse.json(
            { 
                success: true,
                message: "Message sent successfully! We'll get back to you soon.",
                messageId: contactMessage._id
            },
            { status: 201 }
        );
    } catch (error) {
        console.error("Contact form error:", error);
        return NextResponse.json(
            { error: "Internal server error. Please try again later." },
            { status: 500 }
        );
    }
}

// GET endpoint to retrieve messages (admin only)
export async function GET(req) {
    try {
        // Add authentication check here
        // const token = req.cookies.get("token")?.value;
        // if (!token || !isAdmin) return unauthorized response

        await connectDB();

        const messages = await ContactMessage.find()
            .sort({ createdAt: -1 })
            .lean();

        return NextResponse.json(
            { success: true, messages },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error fetching messages:", error);
        return NextResponse.json(
            { error: "Failed to fetch messages" },
            { status: 500 }
        );
    }
}
