"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { Lock, Eye, EyeOff, CheckCircle } from "lucide-react";

export default function ResetPasswordClient({ token }) {
    const router = useRouter();
    const [form, setForm] = useState({
        password: "",
        confirmPassword: "",
    });
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [resetSuccess, setResetSuccess] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!form.password || !form.confirmPassword) {
            toast.error("Please fill in all fields");
            return;
        }

        if (form.password.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        if (form.password !== form.confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch("/api/auth/reset-password", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    token,
                    password: form.password,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Failed to reset password");
                return;
            }

            toast.success("Password reset successful!");
            setResetSuccess(true);
            
            // Redirect to login after 2 seconds
            setTimeout(() => {
                router.push("/login");
            }, 2000);
        } catch (error) {
            toast.error("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    if (!token) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 p-4">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 max-w-md text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-2">Invalid Reset Link</h2>
                    <p className="text-slate-600 mb-6">
                        This password reset link is invalid or has expired.
                    </p>
                    <Link
                        href="/forgot-password"
                        className="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
                    >
                        Request New Link
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 p-4">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6">
                    {!resetSuccess ? (
                        <>
                            {/* Header */}
                            <div className="text-center space-y-2">
                                <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30">
                                    <Lock className="w-8 h-8 text-white" />
                                </div>
                                <h1 className="text-2xl font-bold text-slate-800">
                                    Reset Your Password
                                </h1>
                                <p className="text-sm text-slate-500">
                                    Enter your new password below
                                </p>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit} className="space-y-4">
                                {/* New Password */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        New Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type={showPassword ? "text" : "password"}
                                            className="w-full border border-slate-300 rounded-xl pl-12 pr-12 py-3 text-sm
                                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            placeholder="Enter new password"
                                            value={form.password}
                                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
                                    </div>
                                    <p className="text-xs text-slate-500 mt-1">
                                        Must be at least 6 characters
                                    </p>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 mb-2">
                                        Confirm Password
                                    </label>
                                    <div className="relative">
                                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                            <Lock size={18} />
                                        </div>
                                        <input
                                            type={showConfirmPassword ? "text" : "password"}
                                            className="w-full border border-slate-300 rounded-xl pl-12 pr-12 py-3 text-sm
                                                focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                            placeholder="Confirm new password"
                                            value={form.confirmPassword}
                                            onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                        >
                                            {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                        </button>
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
                                            Resetting Password...
                                        </span>
                                    ) : (
                                        "Reset Password"
                                    )}
                                </button>
                            </form>

                            <div className="text-center pt-4 border-t border-slate-100">
                                <Link
                                    href="/login"
                                    className="text-sm text-slate-600 hover:text-slate-800 font-semibold hover:underline transition-colors"
                                >
                                    Back to Login
                                </Link>
                            </div>
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
                                        Password Reset!
                                    </h2>
                                    <p className="text-sm text-slate-600">
                                        Your password has been successfully reset.
                                        <br />
                                        Redirecting to login...
                                    </p>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
