import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const body = await req.json();
        const { email, password } = body || {};

        if (!email || !password) {
            return NextResponse.json(
                { error: "Email and password are required" },
                { status: 400 }
            );
        }

        await connectDB();

        // Find user and verify it's an admin
        const user = await User.findOne({ email });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid admin credentials" },
                { status: 401 }
            );
        }

        // Check if user is admin
        if (user.role !== "admin") {
            return NextResponse.json(
                { error: "Access denied. Admin privileges required." },
                { status: 403 }
            );
        }

        // Verify password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return NextResponse.json(
                { error: "Invalid admin credentials" },
                { status: 401 }
            );
        }

        // Create JWT token
        const token = jwt.sign(
            { id: user._id, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "7d" }
        );

        // Set cookie
        const res = NextResponse.json({
            success: true,
            message: "Admin login successful",
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });

        res.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 60 * 60 * 24 * 7, // 7 days
        });

        return res;
    } catch (error) {
        console.error("ADMIN LOGIN ERROR:", error);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}
