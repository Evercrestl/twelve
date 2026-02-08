import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import Transaction from "@/lib/models/Transaction";
import TransactionsClient from "@/components/TransactionsClient";

export default async function TransactionsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) {
        redirect("/login");
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        redirect("/login");
    }

    await connectDB();
    const user = await User.findById(decoded.id).lean();

    if (!user) {
        redirect("/login");
    }

    // Fetch all transactions for the user
    const dbTransactions = await Transaction.find({ userId: decoded.id })
        .sort({ createdAt: -1 })
        .lean();

    // Transform transactions for client
    const transactions = dbTransactions.map((t) => ({
        _id: t._id.toString(),
        type: t.type || "payment",
        description: t.description || "Transaction",
        amount: Number(t.amount) || 0,
        status: t.status || "pending",
        referenceNumber: t.referenceNumber || null,
        createdAt: t.createdAt?.toISOString() || new Date().toISOString(),
    }));

    // Calculate stats
    const stats = {
        totalCredits: transactions
            .filter(t => t.amount > 0 && t.status === "completed")
            .reduce((sum, t) => sum + t.amount, 0),
        totalDebits: Math.abs(
            transactions
                .filter(t => t.amount < 0 && t.status === "completed")
                .reduce((sum, t) => sum + t.amount, 0)
        ),
        pendingCount: transactions.filter(t => t.status === "pending").length,
        completedCount: transactions.filter(t => t.status === "completed").length,
    };

    return (
        <TransactionsClient
            user={JSON.parse(JSON.stringify(user))}
            transactions={transactions}
            stats={stats}
        />
    );
}
