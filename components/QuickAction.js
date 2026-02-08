// QuickActions.jsx - Update your component with this logic

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function QuickActions({ depositCompleted, bankLinked, withdrawalStarted }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    // Determine which button/state to show
    const showMakePayment = !depositCompleted;
    const showAddBank = depositCompleted && !bankLinked;
    const showMakeWithdrawal = depositCompleted && bankLinked && !withdrawalStarted;
    const showProcessing = withdrawalStarted;

    const handleMakeWithdrawal = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/withdrawal/initiate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
            });

            if (response.ok) {
                router.refresh(); // Refresh to show processing state
            } else {
                alert("Failed to initiate withdrawal");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-4">
            {/* Make Payment Button */}
            {showMakePayment && (
                <button className="w-full bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-all flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                        <CreditCardIcon />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-bold text-slate-800">Make Payment</p>
                        <p className="text-xs text-slate-500">Pay using Card or Bank</p>
                    </div>
                </button>
            )}

            {/* Add Bank Account Button */}
            {showAddBank && (
                <button className="w-full bg-white border border-slate-200 rounded-2xl p-4 hover:shadow-md transition-all flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                        <BankIcon />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-bold text-slate-800">Add Bank Account</p>
                        <p className="text-xs text-slate-500">Link your PH bank account</p>
                    </div>
                </button>
            )}

            {/* Make Withdrawal Button */}
            {showMakeWithdrawal && (
                <button
                    onClick={handleMakeWithdrawal}
                    disabled={loading}
                    className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-2xl p-4 hover:shadow-lg transition-all flex items-center gap-4 disabled:opacity-50"
                >
                    <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                        <WithdrawIcon />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-bold">
                            {loading ? "Processing..." : "Make Withdrawal"}
                        </p>
                        <p className="text-xs opacity-90">Disburse loan to your bank</p>
                    </div>
                </button>
            )}

            {/* Transfer Processing State */}
            {showProcessing && (
                <div className="w-full bg-linear-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-4 flex items-center gap-4">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                        <CheckIcon />
                    </div>
                    <div className="text-left">
                        <p className="text-sm font-bold text-green-800">Transfer Processing</p>
                        <p className="text-xs text-green-600">
                            Your funds are being processed to be disbursed to your bank account.
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

// Icon components (you can use your own)
const CreditCardIcon = () => (
    <svg className="w-6 h-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
    </svg>
);

const BankIcon = () => (
    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z" />
    </svg>
);

const WithdrawIcon = () => (
    <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
    </svg>
);

const CheckIcon = () => (
    <svg className="w-6 h-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
