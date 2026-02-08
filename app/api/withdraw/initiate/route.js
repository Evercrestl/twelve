// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import { connectDB } from "@/lib/config/db";
// import Transaction from "@/lib/models/Transaction";
// import { NextResponse } from "next/server";

// export async function POST(request) {
//   try {
//     // Verify authentication
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;
    
//     if (!token) {
//       return NextResponse.json(
//         { error: "Unauthorized" },
//         { status: 401 }
//       );
//     }

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch {
//       return NextResponse.json(
//         { error: "Invalid token" },
//         { status: 401 }
//       );
//     }

//     const { amount, bankId } = await request.json();

//     // Validate inputs
//     if (!amount || !bankId) {
//       return NextResponse.json(
//         { error: "Missing required fields" },
//         { status: 400 }
//       );
//     }

//     await connectDB();

//     // Check if withdrawal already exists
//     const existingWithdrawal = await Transaction.findOne({
//       userId: decoded.id,
//       type: "withdrawal",
//     });

//     if (existingWithdrawal) {
//       return NextResponse.json(
//         { error: "Withdrawal already initiated" },
//         { status: 400 }
//       );
//     }

//     // Create new withdrawal transaction with "processing" status
//     const withdrawal = await Transaction.create({
//       userId: decoded.id,
//       type: "withdrawal",
//       amount: amount, // This should be negative (e.g., -(loan + deposit))
//       status: "processing",
//       description: "Loan Disbursement to Bank",
//       bankId: bankId,
//       createdAt: new Date(),
//     });

//     return NextResponse.json({
//       success: true,
//       transaction: {
//         _id: withdrawal._id.toString(),
//         status: withdrawal.status,
//         amount: withdrawal.amount,
//       }
//     });

//   } catch (error) {
//     console.error("Withdrawal initiation error:", error);
//     return NextResponse.json(
//       { error: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";
import { connectDB } from "@/lib/config/db";
import Transaction from "@/lib/models/Transaction";

export async function POST(request) {
  try {
    const { userId, amount, withdrawalId } = await request.json();

    if (!userId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    let withdrawal;

    if (withdrawalId) {
      // Update existing withdrawal transaction
      withdrawal = await Transaction.findByIdAndUpdate(
        withdrawalId,
        {
          status: "processing",
          amount: amount,
        },
        { new: true }
      );
    } else {
      // Create new withdrawal transaction
      withdrawal = await Transaction.create({
        userId: userId,
        description: "Loan Disbursement to Bank",
        amount: amount,
        status: "processing",
        type: "withdrawal",
      });
    }

    return NextResponse.json({
      success: true,
      transaction: withdrawal,
    });
  } catch (error) {
    console.error("Withdrawal error:", error);
    return NextResponse.json(
      { error: "Failed to process withdrawal" },
      { status: 500 }
    );
  }
}


