// "use client";
// import { useState, useEffect } from "react";
// import toast from "react-hot-toast";
// import Link from "next/link";

// export default function LoginClient({ searchParams }) {
//     const [form, setForm] = useState({
//         email: "",
//         password: "",
//     });

//     const [loading, setLoading] = useState(false);

//     const submit = async () => {
//         if (loading) return;

//         if (!form.email || !form.password) {
//             toast.error("Email and password are required");
//             return;
//         }
//         setLoading(true);

//         try {
//             const res = await fetch("/api/auth/login", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(form),
//             });
//             const data = await res.json();

//             if (!res.ok) {
//                 toast.error(data.error || "Login failed");
//                 return;
//             }

//             toast.success("Login successful");
//             // Use replace instead of href - this removes login page from browser history
//             // So when user presses back button from dashboard, they go to home page
//             window.location.replace("/dashboard");
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (searchParams?.verified === "1") {
//             toast.success("Email verified! You can now log in.");
//         }
//     }, [searchParams]);

//     return (
//         <div className="min-h-screen flex items-center justify-center">
//             <div className="w-full max-w-md bg-white p-8 space-y-6">
//                 <h1 className="text-2xl font-semibold text-center text-gray-800">
//                     Login to your Evercrest Account
//                 </h1>

//                 <div className="space-y-4">
//                     {/* Email */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">
//                             Email
//                         </label>
//                         <input
//                             type="email"
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
//                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                             placeholder="example@email.com"
//                             value={form.email}
//                             onChange={(e) => setForm({ ...form, email: e.target.value })}
//                         />
//                     </div>

//                     {/* Password */}
//                     <div>
//                         <label className="block text-sm font-medium text-gray-600 mb-1">
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
//                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
//                             placeholder="••••••••"
//                             value={form.password}
//                             onChange={(e) => setForm({ ...form, password: e.target.value })}
//                             onKeyDown={(e) => {
//                                 if (e.key === "Enter") {
//                                     submit();
//                                 }
//                             }}
//                         />
//                     </div>
//                 </div>
                
//                 <div className="flex">
//                     <p className="px-1">Don't have an account? </p>
//                     <Link className="text-blue-700" href="/register">register</Link>
//                 </div>

//                 {/* Submit */}
//                 <button
//                     onClick={submit}
//                     disabled={loading}
//                     className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium
//                      hover:bg-blue-700 active:scale-[0.98] transition disabled:opacity-50 disabled:cursor-not-allowed"
//                 >
//                     {loading ? "Logging in..." : "Login"}
//                 </button>
//             </div>
//         </div>
//     );
// }


"use client";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import Link from "next/link";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

export default function LoginClient({ searchParams }) {
    const [form, setForm] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const submit = async () => {
        if (loading) return;

        if (!form.email || !form.password) {
            toast.error("Email and password are required");
            return;
        }
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });
            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Login failed");
                return;
            }

            toast.success("Login successful");
            window.location.replace("/dashboard");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (searchParams?.verified === "1") {
            toast.success("Email verified! You can now log in.");
        }
    }, [searchParams]);

    return (
        <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50 p-4">
            <div className="w-full max-w-md">
                {/* Card Container */}
                <div className="bg-white rounded-3xl shadow-xl border border-slate-200 p-8 space-y-6">
                    {/* Header */}
                    <div className="text-center space-y-2">
                        <div className="w-16 h-16 bg-linear-to-br from-blue-600 to-blue-500 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-600/30">
                            <Lock className="w-8 h-8 text-white" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800">
                            Welcome Back
                        </h1>
                        <p className="text-sm text-slate-500">
                            Login to your Evercrest account
                        </p>
                    </div>

                    {/* Form */}
                    <div className="space-y-4">
                        {/* Email Field */}
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
                                    placeholder="example@email.com"
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                />
                            </div>
                        </div>

                        {/* Password Field */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                    <Lock size={18} />
                                </div>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    className="w-full border border-slate-300 rounded-xl pl-12 pr-12 py-3 text-sm
                                        focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                                    placeholder="••••••••"
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            submit();
                                        }
                                    }}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Forgot Password Link */}
                        <div className="flex justify-end">
                            <Link 
                                href="/forgot-password" 
                                className="text-sm text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                            >
                                Forgot password?
                            </Link>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <button
                        onClick={submit}
                        disabled={loading}
                        className="w-full bg-linear-to-r from-blue-600 to-blue-500 text-white py-3 rounded-xl font-semibold
                            hover:from-blue-700 hover:to-blue-600 active:scale-[0.98] transition-all shadow-lg shadow-blue-600/30
                            disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-600 disabled:hover:to-blue-500"
                    >
                        {loading ? (
                            <span className="flex items-center justify-center gap-2">
                                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Logging in...
                            </span>
                        ) : (
                            "Login"
                        )}
                    </button>

                    {/* Register Link */}
                    <div className="text-center pt-4 border-t border-slate-100">
                        <p className="text-sm text-slate-600">
                            Don't have an account?{" "}
                            <Link 
                                href="/register" 
                                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
                            >
                                Register now
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
