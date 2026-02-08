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

        const preferences = await req.json();

        await connectDB();
        const user = await User.findById(decoded.id);

        if (!user) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Update user preferences
        user.preferences = preferences;
        await user.save();

        return NextResponse.json(
            { 
                message: "Preferences updated successfully",
                preferences: user.preferences
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Error updating preferences:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
