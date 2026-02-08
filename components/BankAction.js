"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function BankAction({ withdrawalId, amount, onClose }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!mounted) return null;

    return createPortal(
        <Modal
            withdrawalId={withdrawalId}
            amount={amount}
            onClose={onClose}
        />,
        document.body
    );
}

/* ============================
   ACTUAL MODAL UI COMPONENT
============================ */
function Modal({ withdrawalId, amount, onClose }) {
    return (
        <div className="fixed inset-0 z-9999 flex items-center justify-center">

            {/* Dark background */}
            <div
                onClick={onClose}
                className="absolute inset-0 bg-black/40 backdrop-blur-sm animate-fade-in"
            />

            {/* Modal Card */}
            <div className="relative bg-white w-105 max-w-[90vw] rounded-2xl p-6 shadow-2xl animate-modal-pop">
                <h3 className="text-lg font-bold text-slate-800 mb-4">
                    Select Bank
                </h3>

                <p className="text-sm text-slate-500 mb-6">
                    Withdraw R{amount.toLocaleString()} to your bank account
                </p>

                {/* BANK LIST / FORM GOES HERE */}

                <div className="mt-6 flex gap-3">
                    <button
                        onClick={onClose}
                        className="flex-1 py-3 rounded-xl bg-slate-100 hover:bg-slate-200 font-semibold"
                    >
                        Cancel
                    </button>

                    <button
                        className="flex-1 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
}
