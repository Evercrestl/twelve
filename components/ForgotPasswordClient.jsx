"use client";
import { useState } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Mail, ArrowLeft, CheckCircle } from "lucide-react";

export default function ForgotPasswordClient() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [emailSent, setEmailSent] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!email) {
            toast.error("Please enter your email address");
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Failed to send reset email");
                return;
            }

            toast.success("Password reset email sent!");
            setEmailSent(true);
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6">
                    {/* Back Button */}
                    <Link 
                        href="/login"
                        className="inline-flex items-center gap-2 text-sm text-slate-600 hover:text-slate-800 font-semibold transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to login
                    </Link>

                    {!emailSent ? (
                        <>
                            {/* Header */}
                            <div className="text-center space-y-2">
                                <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30">
                                    <Mail className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-2xl font-bold text-slate-800">
                                    Forgot Password?
                                </h1>
                                <p className="text-sm text-slate-500">
                                    No worries, we'll send you reset instructions
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            <Mail size={18} />
                                        </div>
                                        <input
                                            type="email"
                                            className="w-full border border-slate-300 rounded-xl pl-12 pr-4 py-3 text-sm
                                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full bg-linear-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold
                                        hover:from-blue-700 hover:to-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/30
                                        disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-blue-500"
                                >
                                    {loading ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            Sending...
                                        </span>
                                    ) : (
                                        "Send Reset Link"
                                    )}
                                </button>
                            </form>
                        </>
                    ) : (
                        <>
                            {/* Success State */}
                            <div className="text-center space-y-4 py-8">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                    <CheckCircle className="w-10 h-10 text-green-600" />
                                </div>
                                <div className="space-y-2">
                                    <h2 className="text-2xl font-bold text-slate-800">
                                        Check Your Email
                                    </h2>
                                    <p className="text-sm text-slate-600 max-w-sm mx-auto">
                                        We've sent a password reset link to{" "}
                                        <span className="font-semibold text-slate-800">{email}</span>
                                    </p>
                                </div>

                                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mt-6">
                                    <p className="text-xs text-slate-600">
                                        <span className="font-semibold text-slate-800">Didn't receive the email?</span>
                                        <br />
                                        Check your spam folder or{" "}
                                        <button
                                            onClick={() => setEmailSent(false)}
                                            className="text-blue-600 hover:text-blue-700 font-semibold hover:underline"
                                        >
                                            try again
                                        </button>
                                    </p>
                                </div>

                                <Link
                                    href="/login"
                                    className="inline-block mt-6 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-semibold transition-colors"
                                >
                                    Back to Login
                                </Link>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
