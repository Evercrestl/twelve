import { connectDB } from "@/lib/config/db";
import Transaction from "@/lib/models/Transaction";
import User from "@/lib/models/User";
import { approveTransaction } from "@/app/actions/payment";
import { Clock, CheckCircle, ArrowDownCircle, ArrowUpCircle } from "lucide-react";

export default async function AdminPage() {
    await connectDB();

    const dbTransactions = await Transaction.find({
        $or: [
            { status: "pending" },
            { status: "processing" },
            { status: { $exists: false } }
        ]
    })
        .populate("userId", "name")
        .sort({ createdAt: -1 })
        .lean();

    const pendingTransactions = dbTransactions.map((t) => ({
        ...t,
        _id: t._id.toString(),
        userId: t.userId?._id?.toString(),
        userName: t.userId?.name || "Unknown User",
        userAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${t.userId?.name || 'Guest'}`,
        createdAt: t.createdAt?.toISOString(),
    }));

    return (
        <div className="px-4 py-6 max-w-5xl mx-auto">
            <h1 className="text-xl sm:text-2xl font-black text-slate-800 mb-6">
                Pending Approvals
            </h1>

            {pendingTransactions.length === 0 ? (
                <div className="flex flex-col items-center justify-center min-h-[60vh] px-6 text-slate-400">
                    <Clock size={48} className="mb-4 opacity-20" />
                    <p className="font-bold text-center">No pending approvals</p>
                </div>
            ) : (
                <div className="space-y-5">
                    {pendingTransactions.map((t) => {
                        const isWithdrawal = t.type === "withdrawal";
                        const isDeposit = t.type === "deposit";
                        const isProcessing = t.status === "processing";

                        return (
                            <div
                                key={t._id}
                                className={`
                                    bg-white border shadow-sm
                                    rounded-3xl p-5
                                    flex flex-col
                                    gap-5
                                    ${isWithdrawal ? 'border-red-200 bg-red-50/30' : 'border-slate-200'}
                                    ${isProcessing ? 'ring-2 ring-blue-400' : ''}
                                `}
                            >
                                {/* USER */}
                                <div className="flex flex-col items-center text-center gap-3 sm:flex-row sm:text-left">
                                    <img
                                        src={t.userAvatar}
                                        alt="avatar"
                                        className="w-16 h-16 rounded-full border bg-white"
                                    />
                                    <div className="flex-1">
                                        <p className="font-extrabold text-slate-900 text-lg">
                                            {t.userName}
                                        </p>
                                        <div className="flex items-center gap-2 justify-center sm:justify-start">
                                            {isWithdrawal ? (
                                                <ArrowDownCircle size={14} className="text-red-600" />
                                            ) : (
                                                <ArrowUpCircle size={14} className="text-green-600" />
                                            )}
                                            <p className={`text-xs font-bold uppercase ${isWithdrawal ? 'text-red-600' : 'text-blue-600'
                                                }`}>
                                                {t.description || t.type}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Status Badge */}
                                    <span className={`
                                        text-[10px] px-3 py-1 rounded-full border font-bold uppercase tracking-wider
                                        ${isProcessing
                                            ? 'bg-blue-100 text-blue-700 border-blue-200'
                                            : 'bg-amber-100 text-amber-700 border-amber-200'
                                        }
                                    `}>
                                        {t.status || 'pending'}
                                    </span>
                                </div>

                                {/* AMOUNT */}
                                <div className="text-center sm:text-left">
                                    <p className={`text-2xl font-black ${isWithdrawal ? 'text-red-600' : 'text-slate-900'
                                        }`}>
                                        {isWithdrawal ? '-' : '+'} R{Math.abs(t.amount).toLocaleString()}
                                    </p>
                                    <p className="text-xs text-slate-400 font-semibold">
                                        {new Date(t.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                {/* ACTION */}
                                <form
                                    action={async (formData) => {
                                        "use server";
                                        await approveTransaction(formData.get("id"));
                                    }}
                                >
                                    <input type="hidden" name="id" value={t._id} />
                                    <button
                                        className={`
                                            w-full
                                            text-white py-4
                                            rounded-2xl
                                            text-base font-bold
                                            shadow-lg
                                            transition active:scale-95
                                            flex items-center justify-center gap-2
                                            ${isWithdrawal
                                                ? 'bg-red-600 hover:bg-red-700 shadow-red-100'
                                                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-100'
                                            }
                                        `}
                                    >
                                        <CheckCircle size={20} />
                                        {isWithdrawal ? 'Approve Disbursement' : 'Approve Transaction'}
                                    </button>
                                </form>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
