import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";

export async function POST(req) {
    try {
        const { token, password } = await req.json();

        if (!token || !password) {
            return NextResponse.json(
                { error: "Token and password are required" },
                { status: 400 }
            );
        }

        if (password.length < 6) {
            return NextResponse.json(
                { error: "Password must be at least 6 characters" },
                { status: 400 }
            );
        }

        // Hash the token to match the stored hash
        const resetTokenHash = crypto
            .createHash("sha256")
            .update(token)
            .digest("hex");

        await connectDB();

        // Find user with valid reset token
        const user = await User.findOne({
            resetPasswordToken: resetTokenHash,
            resetPasswordExpiry: { $gt: Date.now() }, // Token not expired
        });

        if (!user) {
            return NextResponse.json(
                { error: "Invalid or expired reset token" },
                { status: 400 }
            );
        }

        // Hash new password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Update user password and clear reset token
        user.password = hashedPassword;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();

        return NextResponse.json(
            { message: "Password reset successful" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Reset password error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
