// "use server";

// import { connectDB } from "@/lib/config/db";
// import Transaction from "@/lib/models/Transaction";
// import User from "@/lib/models/User";
// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import { revalidatePath } from "next/cache";

// export async function processSecurityDeposit(amount) {
//   try {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;

//     if (!token) throw new Error("Unauthorized");

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     await connectDB();

//     // 1. Create the Transaction record
//     const finalAmount = Math.round(amount * 100) / 100;
//     await Transaction.create({
//       userId: decoded.id,
//       description: "Security Deposit Payment (7%)",
//       amount: +finalAmount,
//       status: "pending", // MUST BE LOWERCASE 'pending'
//       type: "deposit",
//     });

//     // 2. Update User's loan status to reflect deposit paid
//     await User.findByIdAndUpdate(decoded.id, {
//       $set: { "loanStatus.depositPaid": true }
//     });

//     revalidatePath("/dashboard");
//     return { success: true, message: "Payment recorded successfully" };
//   } catch (error) {
//     console.error("Payment Error:", error);
//     return { success: false, message: "Failed to process payment" };
//   }
// }

// // Add this to your @/app/actions/payment.js
// // export async function approveTransaction(transactionId) {
// //   try {
// //     await connectDB();

// //     // Find transaction and update status
// //     const updatedTransaction = await Transaction.findByIdAndUpdate(
// //       transactionId,
// //       { status: "completed" },
// //       { new: true }
// //     );

// //     // If it was a deposit, we can also update the user's loan status here
// //     if (updatedTransaction.type === "deposit") {
// //       await User.findByIdAndUpdate(updatedTransaction.userId, {
// //         $set: { "loanStatus.depositPaid": true }
// //       });
// //     }

// //     revalidatePath("/admin");
// //     revalidatePath("/dashboard");
// //     return { success: true };
// //   } catch (error) {
// //     return { success: false, message: error.message };
// //   }
// // }

// // @/app/actions/payment.js
// // export async function approveTransaction(transactionId) {
// //     try {
// //         await connectDB();

// //         // We use $set to ensure the field is created if it didn't exist
// //         const updatedTransaction = await Transaction.findByIdAndUpdate(
// //             transactionId,
// //             { $set: { status: "completed" } }, 
// //             { new: true }
// //         );

// //         if (updatedTransaction.type === "deposit") {
// //             await User.findByIdAndUpdate(updatedTransaction.userId, {
// //                 $set: { "loanStatus.depositPaid": true }
// //             });
// //         }

// //         revalidatePath("/admin");
// //         revalidatePath("/dashboard");
// //         return { success: true };
// //     } catch (error) {
// //         return { success: false, message: error.message };
// //     }
// // }

// // export async function approveTransaction(transactionId) {
// //   try {
// //     await connectDB();

// //     // 1. Find & complete the transaction
// //     const tx = await Transaction.findByIdAndUpdate(
// //       transactionId,
// //       { $set: { status: "completed" } },
// //       { new: true }
// //     );

// //     if (!tx) throw new Error("Transaction not found");

// //     // 2. If it's a security deposit → add to loan balance
// //     if (tx.type === "deposit") {
// //       await User.findByIdAndUpdate(tx.userId, {
// //         $inc: { loanBalance: tx.amount },          // 🔥 ADD deposit to loan
// //         $set: { "loanStatus.depositPaid": true }
// //       });
// //     }

// //     revalidatePath("/admin");
// //     revalidatePath("/dashboard");

// //     return { success: true };
// //   } catch (error) {
// //     console.error(error);
// //     return { success: false, message: error.message };
// //   }
// // }

// // export async function approveTransaction(transactionId) {
// //   try {
// //     await connectDB();

// //     // 1. Approve the deposit
// //     const deposit = await Transaction.findByIdAndUpdate(
// //       transactionId,
// //       { $set: { status: "approved" } },
// //       { new: true }
// //     );

// //     if (!deposit) throw new Error("Transaction not found");

// //     // 2. Add deposit to loan balance
// //     if (deposit.type === "deposit") {
// //       await User.findByIdAndUpdate(deposit.userId, {
// //         $inc: { loanBalance: deposit.amount },
// //         $set: { "loanStatus.depositPaid": true }
// //       });

// //       // 3. Create withdrawal request
// //       await Transaction.create({
// //         userId: deposit.userId,
// //         amount: deposit.amount,
// //         description: "Loan Disbursement",
// //         type: "withdrawal",
// //         status: "awaiting_bank"
// //       });
// //     }

// //     revalidatePath("/admin");
// //     revalidatePath("/dashboard");

// //     return { success: true };
// //   } catch (error) {
// //     return { success: false, message: error.message };
// //   }
// // }

// // export async function approveTransaction(transactionId) {
// //   await connectDB();

// //   const deposit = await Transaction.findByIdAndUpdate(
// //     transactionId,
// //     { $set: { status: "approved" } },
// //     { new: true }
// //   );

// //   if (!deposit) throw new Error("Not found");

// //   // Add deposit to loan
// //   await User.findByIdAndUpdate(deposit.userId, {
// //     $inc: { loanBalance: deposit.amount },
// //     $set: { "loanStatus.depositPaid": true }
// //   });

// //   // Create withdrawal
// //   await Transaction.create({
// //     userId: deposit.userId,
// //     amount: totalLoan + securityDeposit,
// //     type: "withdrawal",
// //     description: "Loan Disbursement",
// //     status: "awaiting_bank"
// //   });

// //   revalidatePath("/dashboard");
// //   revalidatePath("/admin");
// // }

// export async function approveTransaction(transactionId) {
//   try {
//     await connectDB();

//     // 1️⃣ Approve the deposit transaction
//     const depositTx = await Transaction.findByIdAndUpdate(
//       transactionId,
//       { $set: { status: "completed" } },
//       { new: true }
//     );

//     if (!depositTx) throw new Error("Transaction not found");

//     if (depositTx.type !== "deposit") {
//       throw new Error("Only deposits can be approved");
//     }

//     // 2️⃣ Fetch user (we need loan amount)
//     const user = await User.findById(depositTx.userId).lean();
//     if (!user) throw new Error("User not found");

//     const totalLoan = Number(user.loanAmount) || 0;
//     const depositPercentage = 7;
//     const securityDeposit = Math.round((totalLoan * depositPercentage) / 100);
//     const totalDisbursement = totalLoan + securityDeposit;

//     // 3️⃣ Update user loan status & balance
//     await User.findByIdAndUpdate(user._id, {
//       $set: {
//         loanStatus: {
//           status: "approved",        // 🔥 THIS IS THE KEY FIX
//           depositPaid: true
//         },
//         loanBalance: totalDisbursement
//       }
//     });

//     // 4️⃣ Create ONE withdrawal for FULL amount
//     await Transaction.create({
//       userId: user._id,
//       amount: totalDisbursement,
//       type: "withdrawal",
//       description: "Loan Disbursement",
//       status: "awaiting_bank"
//     });

//     // 5️⃣ Revalidate
//     revalidatePath("/admin");
//     revalidatePath("/dashboard");

//     return { success: true };
//   } catch (error) {
//     console.error("Approve Transaction Error:", error);
//     return { success: false, message: error.message };
//   }
// }

// export async function finalizeDisbursement(transactionId) {
//   try {
//     await connectDB();

//     // Change status to completed so the "Processing" overlay disappears
//     await Transaction.findByIdAndUpdate(transactionId, {
//       $set: { status: "completed" }
//     });

//     revalidatePath("/admin");
//     revalidatePath("/dashboard");

//     return { success: true };
//   } catch (error) {
//     return { success: false, message: error.message };
//   }
// }


"use server";

import { connectDB } from "@/lib/config/db";
import Transaction from "@/lib/models/Transaction";
import User from "@/lib/models/User";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { revalidatePath } from "next/cache";

export async function processSecurityDeposit(amount) {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) throw new Error("Unauthorized");

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    await connectDB();

    // 1. Create the Transaction record
    const finalAmount = Math.round(amount * 100) / 100;
    await Transaction.create({
      userId: decoded.id,
      description: "Security Deposit Payment (7%)",
      amount: +finalAmount,
      status: "pending", // MUST BE LOWERCASE 'pending'
      type: "deposit",
    });

    // 2. Update User's loan status to reflect deposit paid
    await User.findByIdAndUpdate(decoded.id, {
      $set: { "loanStatus.depositPaid": true }
    });

    revalidatePath("/dashboard");
    return { success: true, message: "Payment recorded successfully" };
  } catch (error) {
    console.error("Payment Error:", error);
    return { success: false, message: "Failed to process payment" };
  }
}

export async function approveTransaction(transactionId) {
  try {
    await connectDB();

    // Find the transaction first
    const transaction = await Transaction.findById(transactionId);
    
    if (!transaction) {
      throw new Error("Transaction not found");
    }

    // Handle DEPOSIT approval
    if (transaction.type === "deposit") {
      // 1️⃣ Approve the deposit transaction
      transaction.status = "completed";
      await transaction.save();

      // 2️⃣ Fetch user (we need loan amount)
      const user = await User.findById(transaction.userId).lean();
      if (!user) throw new Error("User not found");

      const totalLoan = Number(user.loanAmount) || 0;
      const depositPercentage = 7;
      const securityDeposit = Math.round((totalLoan * depositPercentage) / 100);
      const totalDisbursement = totalLoan + securityDeposit;

      // 3️⃣ Update user loan status & balance
      await User.findByIdAndUpdate(user._id, {
        $set: {
          loanStatus: {
            status: "approved",
            depositPaid: true
          },
          loanBalance: totalDisbursement
        }
      });

      // 4️⃣ Create ONE withdrawal for FULL amount
      await Transaction.create({
        userId: user._id,
        amount: totalDisbursement,
        type: "withdrawal",
        description: "Loan Disbursement",
        status: "awaiting_bank"
      });

      console.log(`Deposit approved for user ${user._id}, withdrawal created`);
    } 
    // Handle WITHDRAWAL approval
    else if (transaction.type === "withdrawal") {
      // Simply approve the withdrawal disbursement
      transaction.status = "completed";
      await transaction.save();

      // Optionally update user's loan balance to 0 since money is disbursed
      await User.findByIdAndUpdate(transaction.userId, {
        $set: {
          loanBalance: 0,
          "loanStatus.disbursed": true
        }
      });

      console.log(`Withdrawal approved and disbursed for transaction ${transactionId}`);
    }
    // Handle other transaction types
    else {
      transaction.status = "completed";
      await transaction.save();
      console.log(`Transaction ${transactionId} approved`);
    }

    // Revalidate paths
    revalidatePath("/admin");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    console.error("Approve Transaction Error:", error);
    return { success: false, message: error.message };
  }
}

export async function finalizeDisbursement(transactionId) {
  try {
    await connectDB();

    // Change status to completed so the "Processing" overlay disappears
    await Transaction.findByIdAndUpdate(transactionId, {
      $set: { status: "completed" }
    });

    revalidatePath("/admin");
    revalidatePath("/dashboard");

    return { success: true };
  } catch (error) {
    return { success: false, message: error.message };
  }
}
