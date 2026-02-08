import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import Bank from "@/lib/models/Bank";

export async function PUT(req) {
    try {
        // Verify authentication
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

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

        // Get request body
        const body = await req.json();
        const { name, phoneNumber, address, bank } = body;

        await connectDB();

        // Update user information
        const updateData = {};
        if (name) updateData.name = name;
        if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
        if (address !== undefined) updateData.address = address;

        const updatedUser = await User.findByIdAndUpdate(
            decoded.id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return NextResponse.json(
                { error: "User not found" },
                { status: 404 }
            );
        }

        // Update or create bank information if provided
        if (bank && (bank.bank || bank.accountName || bank.accountNumber)) {
            const bankUpdate = {
                userId: decoded.id,
                bank: bank.bank || "",
                accountName: bank.accountName || "",
                accountNumber: bank.accountNumber || "",
            };

            await Bank.findOneAndUpdate(
                { userId: decoded.id },
                { $set: bankUpdate },
                { upsert: true, new: true }
            );
        }

        return NextResponse.json({
            success: true,
            message: "Profile updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("UPDATE PROFILE ERROR:", error);
        return NextResponse.json(
            { error: "Server error" },
            { status: 500 }
        );
    }
}
