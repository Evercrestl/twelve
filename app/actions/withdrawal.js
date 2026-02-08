// "use server";

// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import { connectDB } from "@/lib/config/db";
// import Transaction from "@/lib/models/Transaction";

// export async function createWithdrawal(amount) {
//   try {
//     // Verify authentication
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;
    
//     if (!token) {
//       return { success: false, error: "Unauthorized" };
//     }

//     let decoded;
//     try {
//       decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch {
//       return { success: false, error: "Invalid token" };
//     }

//     await connectDB();

//     // Check if withdrawal already exists
//     const existingWithdrawal = await Transaction.findOne({
//       userId: decoded.id,
//       type: "withdrawal",
//     });

//     if (existingWithdrawal) {
//       return {
//         success: true,
//         transaction: {
//           _id: existingWithdrawal._id.toString(),
//           status: existingWithdrawal.status,
//           amount: existingWithdrawal.amount,
//         }
//       };
//     }

//     // Create new withdrawal transaction
//     const withdrawal = await Transaction.create({
//       userId: decoded.id,
//       type: "withdrawal",
//       amount: Number(amount),
//       status: "processing",
//       description: "Loan Disbursement to Bank",
//       createdAt: new Date(),
//     });

//     return {
//       success: true,
//       transaction: {
//         _id: withdrawal._id.toString(),
//         status: withdrawal.status,
//         amount: withdrawal.amount,
//       }
//     };

//   } catch (error) {
//     console.error("Withdrawal creation error:", error);
//     return { success: false, error: error.message };
//   }
// }


"use server";

import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/config/db";
import Transaction from "@/lib/models/Transaction";
import { revalidatePath } from "next/cache";

export async function createWithdrawal(amount) {
  try {
    console.log("=== CREATE WITHDRAWAL START ===");
    console.log("Amount:", amount);
    
    // Verify authentication
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) {
      console.log("ERROR: No token found");
      return { success: false, error: "Unauthorized" };
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log("User ID:", decoded.id);
    } catch (error) {
      console.log("ERROR: Token verification failed", error);
      return { success: false, error: "Invalid token" };
    }

    await connectDB();
    console.log("Database connected");

    // Check if withdrawal already exists
    const existingWithdrawal = await Transaction.findOne({
      userId: decoded.id,
      type: "withdrawal",
    });

    if (existingWithdrawal) {
      console.log("Existing withdrawal found:", {
        id: existingWithdrawal._id,
        status: existingWithdrawal.status,
        amount: existingWithdrawal.amount
      });
      
      // Revalidate to show the existing withdrawal
      revalidatePath('/dashboard');
      
      return {
        success: true,
        transaction: {
          _id: existingWithdrawal._id.toString(),
          status: existingWithdrawal.status,
          amount: existingWithdrawal.amount,
        }
      };
    }

    // Create new withdrawal transaction
    console.log("Creating new withdrawal transaction...");
    const withdrawal = await Transaction.create({
      userId: decoded.id,
      type: "withdrawal",
      amount: Number(amount),
      status: "processing",
      description: "Loan Disbursement to Bank",
      createdAt: new Date(),
    });

    console.log("Withdrawal created successfully:", {
      id: withdrawal._id,
      status: withdrawal.status,
      amount: withdrawal.amount
    });

    // Force Next.js to refresh the dashboard page data
    revalidatePath('/dashboard');

    return {
      success: true,
      transaction: {
        _id: withdrawal._id.toString(),
        status: withdrawal.status,
        amount: withdrawal.amount,
      }
    };

  } catch (error) {
    console.error("=== WITHDRAWAL ERROR ===");
    console.error("Error details:", error);
    return { success: false, error: error.message };
  }
}
