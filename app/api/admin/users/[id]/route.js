import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";

export async function PUT(req, { params }) {
    try {
        // Verify admin authentication
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        await connectDB();
        
        // Check if user is admin
        const admin = await User.findById(decoded.id);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Get request body
        const body = await req.json();
        const { name, email, phoneNumber, address, loanAmount, loanBalance, repaymentMonths } = body;

        // Update user
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (email !== undefined) updateData.email = email;
        if (phoneNumber !== undefined) updateData.phoneNumber = phoneNumber;
        if (address !== undefined) updateData.address = address;
        if (loanAmount !== undefined) updateData.loanAmount = Number(loanAmount);
        if (loanBalance !== undefined) updateData.loanBalance = Number(loanBalance);
        if (repaymentMonths !== undefined) updateData.repaymentMonths = Number(repaymentMonths);

        const updatedUser = await User.findByIdAndUpdate(
            params.id,
            { $set: updateData },
            { new: true, runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "User updated successfully",
            user: updatedUser,
        });
    } catch (error) {
        console.error("UPDATE USER ERROR:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}

export async function DELETE(req, { params }) {
    try {
        // Verify admin authentication
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch {
            return NextResponse.json({ error: "Invalid token" }, { status: 401 });
        }

        await connectDB();
        
        // Check if user is admin
        const admin = await User.findById(decoded.id);
        if (!admin || admin.role !== "admin") {
            return NextResponse.json({ error: "Forbidden" }, { status: 403 });
        }

        // Prevent admin from deleting themselves
        if (decoded.id === params.id) {
            return NextResponse.json({ error: "Cannot delete your own account" }, { status: 400 });
        }

        // Delete user
        const deletedUser = await User.findByIdAndDelete(params.id);

        if (!deletedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        console.error("DELETE USER ERROR:", error);
        return NextResponse.json({ error: "Server error" }, { status: 500 });
    }
}
