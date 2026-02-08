import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import crypto from "crypto";

// Note: You'll need to implement email sending functionality
// This is a placeholder that shows the structure

export async function POST(req) {
    try {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json(
                { error: "Email is required" },
                { status: 400 }
            );
        }

        await connectDB();
        const user = await User.findOne({ email: email.toLowerCase() });

        // Security: Don't reveal if user exists
        // Always return success to prevent email enumeration
        if (!user) {
            return NextResponse.json(
                { message: "If an account exists, a reset link has been sent" },
                { status: 200 }
            );
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString("hex");
        const resetTokenHash = crypto
            .createHash("sha256")
            .update(resetToken)
            .digest("hex");

        // Set token expiry (1 hour)
        const resetTokenExpiry = new Date(Date.now() + 60 * 60 * 1000);

        // Save to user
        user.resetPasswordToken = resetTokenHash;
        user.resetPasswordExpiry = resetTokenExpiry;
        await user.save();

        // Create reset URL
        const resetUrl = `${process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"}/reset-password?token=${resetToken}`;

        // TODO: Send email with resetUrl
        // Example using nodemailer or your preferred email service:
        /*
        await sendEmail({
            to: user.email,
            subject: "Password Reset Request",
            html: `
                <h1>Reset Your Password</h1>
                <p>Click the link below to reset your password:</p>
                <a href="${resetUrl}">${resetUrl}</a>
                <p>This link will expire in 1 hour.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `
        });
        */

        console.log("Password reset link:", resetUrl); // For development

        return NextResponse.json(
            { message: "If an account exists, a reset link has been sent" },
            { status: 200 }
        );
    } catch (error) {
        console.error("Forgot password error:", error);
        return NextResponse.json(
            { error: "Internal server error" },
            { status: 500 }
        );
    }
}
