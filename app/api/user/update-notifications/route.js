import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";

export async function PUT(req) {
    try {
        const token = req.cookies.get("token")?.value;
        
        if (!token) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 }
            );
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return NextResponse.json(
                { error: "Invalid token" },
                { status: 401 }
            );
        }

        const notifications = await req.json();

        await connectDB();
        const user = await User.findById(decoded.id);

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Update notification preferences
        user.notifications = notifications;
        await user.save();

        return NextResponse.json(
            { 
                message: "Notification preferences updated successfully",
                notifications: user.notifications
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating notifications:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
