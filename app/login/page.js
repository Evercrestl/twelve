// // "use client";
// // import { useState, useEffect, Suspense } from "react";
// // import { useSearchParams } from "next/navigation";
// // import toast from "react-hot-toast";
// // import Link from "next/link";
// // import Navbar from "@/components/Navbar";
// // import Footer from "@/components/Footer";


// // function LoginContent() {
// //     const params = useSearchParams();
// //     const [form, setForm] = useState({
// //         email: "",
// //         password: "",
// //     });

// //     const [loading, setLoading] = useState(false);

// //     const submit = async () => {
// //         if (loading) return;

// //         if (!form.email || !form.password) {
// //             toast.error("Email and password are required");
// //             return;
// //         }
// //         setLoading(true);

// //         try{
// //         const res = await fetch("/api/auth/login", {
// //             method: "POST",
// //             headers: { "Content-Type": "application/json" },
// //             body: JSON.stringify(form),
// //         });
// //         const data = await res.json();

// //         if (!res.ok) {
// //             toast.error(data.error || "Login failed");
// //             return;
// //         }

// //         toast.success("Login successful");
// //         window.location.href = "/dashboard";
// //     } finally {
// //         setLoading(false)
// //     }

// // }


// //     useEffect(() => {
// //         if (params.get("verified") === "1") {
// //             toast.success("Email verified! You can now log in.");
// //         }
// //     }, []);


// //     return (
// //         <div className="min-h-screen flex items-center justify-center">
// //             <div className="w-full max-w-md bg-white p-8 space-y-6">

// //                 <h1 className="text-2xl font-semibold text-center text-gray-800">
// //                     Login to your Evercrest Account
// //                 </h1>

// //                 <div className="space-y-4">
// //                     {/* Email */}
// //                     <div>
// //                         <label className="block text-sm font-medium text-gray-600 mb-1">
// //                             Email
// //                         </label>
// //                         <input
// //                             type="email"
// //                             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
// //                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
// //                             placeholder="example@email.com"
// //                             onChange={(e) => setForm({ ...form, email: e.target.value })}
// //                         />
// //                     </div>

// //                     {/* Password */}
// //                     <div>
// //                         <label className="block text-sm font-medium text-gray-600 mb-1">
// //                             Password
// //                         </label>
// //                         <input
// //                             type="password"
// //                             className="w-full border border-gray-300 rounded-lg px-4 py-2 text-sm
// //                          focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
// //                             placeholder="••••••••"
// //                             onChange={(e) => setForm({ ...form, password: e.target.value })}
// //                         />
// //                     </div>
// //                 </div>
// //                 <div className="flex">
// //                     <p className="px-1">Don't have an account? </p>
// //                     <Link className="text-blue-700" href="/register">register</Link>
// //                 </div>

// //                 {/* Submit */}
// //                 <button
// //                     onClick={submit} disabled={loading}
// //                     className="w-full bg-blue-600 text-white py-2.5 rounded-lg font-medium
// //                      hover:bg-blue-700 active:scale-[0.98] transition"
// //                 >
// //                     {loading ? "Logging in..." : "Login"}
// //                 </button>
// //             </div>
// //         </div>
// //     );
// // }

// // export default function Login(){
// //     return (
// //         <Suspense fallback={null}>
// //             <Navbar />
// //             <LoginContent />
// //             <Footer />
// //         </Suspense>
// //     )
// // }


// // "use client";
// import { useState, useEffect, Suspense } from "react";
// import { useSearchParams, useRouter } from "next/navigation";
// import toast from "react-hot-toast";
// import Link from "next/link";
// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";


// function LoginContent() {
//     const params = useSearchParams();
//     const router = useRouter();
//     const [form, setForm] = useState({
//         email: "",
//         password: "",
//     });

//     const [loading, setLoading] = useState(false);
//     const [checkingAuth, setCheckingAuth] = useState(true);

//     // Check if user is already logged in
//     useEffect(() => {
//         const checkAuth = async () => {
//             try {
//                 const res = await fetch("/api/auth/check", {
//                     method: "GET",
//                     credentials: "include",
//                 });
                
//                 if (res.ok) {
//                     // User is already authenticated, redirect to dashboard
//                     router.replace("/dashboard");
//                 } else {
//                     setCheckingAuth(false);
//                 }
//             } catch (error) {
//                 setCheckingAuth(false);
//             }
//         };

//         checkAuth();
//     }, [router]);

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
//             window.location.href = "/dashboard";
//         } finally {
//             setLoading(false);
//         }
//     };

//     useEffect(() => {
//         if (params.get("verified") === "1") {
//             toast.success("Email verified! You can now log in.");
//         }
//     }, [params]);

//     // Show loading while checking authentication
//     if (checkingAuth) {
//         return (
//             <div className="min-h-screen flex items-center justify-center">
//                 <div className="text-gray-600">Loading...</div>
//             </div>
//         );
//     }

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
//                             onChange={(e) => setForm({ ...form, password: e.target.value })}
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

// export default function Login() {
//     return (
//         <Suspense fallback={null}>
//             <Navbar />
//             <LoginContent />
//             <Footer />
//         </Suspense>
//     );
// }


import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import LoginClient from "@/components/LoginClient";
import Navbar from "@/components/Navbar";


export default async function LoginPage({ searchParams }) {
    // Check if user is already logged in
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
        try {
            jwt.verify(token, process.env.JWT_SECRET);
            // User is authenticated, redirect to dashboard
            redirect("/dashboard");
        } catch {
            // Token is invalid, continue to login page
        }
    }

    return (
        <>
            <Navbar />
            <LoginClient searchParams={searchParams} />
            {/* <Footer /> */}
        </>
    );
}
