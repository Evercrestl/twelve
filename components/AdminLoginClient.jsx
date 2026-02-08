"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import { Shield, Lock, Mail, ArrowLeft } from "lucide-react";

export default function AdminLoginClient() {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        if (!form.email || !form.password) {
            toast.error("Email and password are required");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/auth/admin-login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(form),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Login failed");
                return;
            }

            toast.success("Admin login successful");
            window.location.replace("/admin");
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-20 h-20 bg-blue-100 rounded-full mb-4">
                        <Shield className="text-blue-600" size={40} />
                    </div>
                    <h1 className="text-3xl font-bold text-slate-800">Admin Login</h1>
                    <p className="text-slate-600 mt-2">Access the admin panel</p>
                </div>

                {/* Security Notice */}
                <div className="bg-amber-50 border-l-4 border-amber-500 p-4 mb-6 rounded">
                    <div className="flex items-start gap-3">
                        <Lock className="text-amber-600 shrink-0 mt-0.5" size={18} />
                        <div className="text-sm">
                            <p className="font-bold text-amber-800 mb-1">Restricted Access</p>
                            <p className="text-amber-700">
                                This area is for authorized administrators only.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2  items-center gap-2">
                            <Mail size={16} />
                            Admin Email
                        </label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="admin@evercrest.com"
                            autoComplete="email"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-semibold text-slate-700 mb-2  items-center gap-2">
                            <Lock size={16} />
                            Password
                        </label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    handleSubmit(e);
                                }
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-3 rounded-lg font-bold hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 shadow-lg"
                    >
                        <Shield size={20} />
                        {loading ? "Logging in..." : "Login to Admin Panel"}
                    </button>
                </form>

                {/* Footer */}
                <div className="mt-6 pt-6 border-t border-slate-200">
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 text-sm text-slate-600 hover:text-blue-600 transition-colors"
                    >
                        <ArrowLeft size={16} />
                        Back to Home
                    </Link>
                </div>

                {/* Info */}
                <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                    <p className="text-xs text-slate-600 text-center">
                        🔒 All login attempts are logged and monitored for security purposes.
                    </p>
                </div>
            </div>
        </div>
    );
}
