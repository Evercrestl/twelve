import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import Transaction from "@/lib/models/Transaction";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function POST(request) {
  try {
    // Verify user is authenticated
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

    const { userId, amount, withdrawalId } = await request.json();

    // Verify the userId matches the authenticated user
    if (userId !== decoded.id) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      );
    }

    if (!amount) {
      return NextResponse.json(
        { error: "Missing amount" },
        { status: 400 }
      );
    }

    await connectDB();

    let withdrawal;

    if (withdrawalId) {
      // Update existing withdrawal transaction
      withdrawal = await Transaction.findOneAndUpdate(
        { _id: withdrawalId, userId: decoded.id },
        {
          status: "processing",
          amount: amount,
        },
        { new: true }
      );
    } else {
      // Create new withdrawal transaction
      withdrawal = await Transaction.create({
        userId: decoded.id,
        description: "Loan Disbursement to Bank",
        amount: amount,
        status: "processing",
        type: "withdrawal",
      });
    }

    if (!withdrawal) {
      return NextResponse.json(
        { error: "Failed to create/update withdrawal" },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      transaction: {
        _id: withdrawal._id.toString(),
        status: withdrawal.status,
        amount: withdrawal.amount,
      },
    });
  } catch (error) {
    console.error("Withdrawal API error:", error);
    return NextResponse.json(
      { error: "Failed to process withdrawal", details: error.message },
      { status: 500 }
    );
  }
}
