// import { cookies } from "next/headers";
// import { redirect } from "next/navigation";
// import jwt from "jsonwebtoken";
// import { connectDB } from "@/lib/config/db";
// import User from "@/lib/models/User";
// import Bank from "@/lib/models/Bank";
// import Link from "next/link";
// import { ArrowLeft, Mail, Phone, Calendar, CreditCard, Building2, User as UserIcon, MapPin } from "lucide-react";
// import ProfileDropdown from "@/components/ProfileDropdown";

// export default async function ProfilePage() {
//     const cookieStore = await cookies();
//     const token = cookieStore.get("token")?.value;
//     if (!token) redirect("/login");

//     let decoded;
//     try {
//         decoded = jwt.verify(token, process.env.JWT_SECRET);
//     } catch {
//         redirect("/login");
//     }

//     await connectDB();
//     const user = await User.findById(decoded.id).lean();
//     const bank = await Bank.findOne({ userId: decoded.id }).lean();

//     if (!user) redirect("/login");

//     const formattedDate = user.createdAt
//         ? new Date(user.createdAt).toLocaleDateString("en-US", {
//               month: "long",
//               day: "numeric",
//               year: "numeric",
//           })
//         : "N/A";

//     return (
//         <div className="min-h-screen bg-[#F8FAFC]">
//             {/* Top Navbar */}
//             <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 px-8 flex items-center justify-between">
//                 <div className="flex items-center gap-4">
//                     <Link
//                         href="/dashboard"
//                         className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
//                     >
//                         <ArrowLeft size={20} className="text-slate-600" />
//                     </Link>
//                     <div>
//                         <h1 className="text-xl font-bold text-slate-800">My Profile</h1>
//                         <p className="text-sm text-slate-500">View your account information</p>
//                     </div>
//                 </div>
//                 <ProfileDropdown user={JSON.parse(JSON.stringify(user))} />
//             </header>

//             <main className="max-w-5xl mx-auto p-8 space-y-8">
//                 {/* Profile Header Card */}
//                 <div className="bg-linear-to-r from-blue-600 to-blue-400 rounded-3xl p-8 text-white shadow-xl">
//                     <div className="flex flex-col md:flex-row items-center gap-6">
//                         <img
//                             src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
//                             className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-lg"
//                             alt="avatar"
//                         />
//                         <div className="text-center md:text-left">
//                             <h2 className="text-3xl font-bold">{user.name}</h2>
//                             <p className="text-blue-100 text-sm mt-1">{user.email}</p>
//                             <div className="mt-3 inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full">
//                                 <p className="text-xs font-bold uppercase tracking-wide">
//                                     Premium Member
//                                 </p>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//                     {/* Personal Information */}
//                     <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
//                         <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
//                             <UserIcon size={20} className="text-blue-600" />
//                             Personal Information
//                         </h3>

//                         <div className="space-y-4">
//                             <InfoRow
//                                 icon={<UserIcon size={18} />}
//                                 label="Full Name"
//                                 value={user.name || "N/A"}
//                             />
//                             <InfoRow
//                                 icon={<Mail size={18} />}
//                                 label="Email Address"
//                                 value={user.email || "N/A"}
//                             />
//                             <InfoRow
//                                 icon={<Phone size={18} />}
//                                 label="Phone Number"
//                                 value={user.phoneNumber || "Not provided"}
//                             />
//                             <InfoRow
//                                 icon={<MapPin size={18} />}
//                                 label="Address"
//                                 value={user.address || "Not provided"}
//                             />
//                             <InfoRow
//                                 icon={<Calendar size={18} />}
//                                 label="Member Since"
//                                 value={formattedDate}
//                             />
//                         </div>
//                     </div>

//                     {/* Loan Information */}
//                     <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
//                         <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
//                             <CreditCard size={20} className="text-blue-600" />
//                             Loan Information
//                         </h3>

//                         <div className="space-y-4">
//                             <InfoRow
//                                 icon={<CreditCard size={18} />}
//                                 label="Loan Amount"
//                                 value={`R ${Number(user.loanAmount || 0).toLocaleString()}`}
//                             />
//                             <InfoRow
//                                 icon={<CreditCard size={18} />}
//                                 label="Current Balance"
//                                 value={`R ${Number(user.loanBalance || 0).toLocaleString()}`}
//                             />
//                             <InfoRow
//                                 icon={<Calendar size={18} />}
//                                 label="Repayment Period"
//                                 value={`${user.repaymentMonths || 0} months`}
//                             />
//                             <InfoRow
//                                 icon={<UserIcon size={18} />}
//                                 label="Account Status"
//                                 value={
//                                     <span
//                                         className={`px-3 py-1 rounded-full text-xs font-bold ${
//                                             user.emailVerified
//                                                 ? "bg-green-100 text-green-700"
//                                                 : "bg-amber-100 text-amber-700"
//                                         }`}
//                                     >
//                                         {user.emailVerified ? "Verified" : "Unverified"}
//                                     </span>
//                                 }
//                             />
//                         </div>
//                     </div>

//                     {/* Bank Information */}
//                     {bank && (
//                         <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm lg:col-span-2">
//                             <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
//                                 <Building2 size={20} className="text-blue-600" />
//                                 Linked Bank Account
//                             </h3>

//                             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//                                 <InfoRow
//                                     icon={<Building2 size={18} />}
//                                     label="Bank Name"
//                                     value={bank.bank || "N/A"}
//                                 />
//                                 <InfoRow
//                                     icon={<UserIcon size={18} />}
//                                     label="Account Name"
//                                     value={bank.accountName || "N/A"}
//                                 />
//                                 <InfoRow
//                                     icon={<CreditCard size={18} />}
//                                     label="Account Number"
//                                     value={`**** **** **** ${bank.accountNumber?.slice(-4) || "****"}`}
//                                 />
//                             </div>
//                         </div>
//                     )}

//                     {!bank && (
//                         <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm lg:col-span-2">
//                             <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
//                                 <Building2 size={20} className="text-blue-600" />
//                                 Linked Bank Account
//                             </h3>
//                             <div className="text-center py-8">
//                                 <Building2 size={48} className="mx-auto text-slate-300 mb-3" />
//                                 <p className="text-slate-500 text-sm">
//                                     No bank account linked yet
//                                 </p>
//                             </div>
//                         </div>
//                     )}
//                 </div>

//                 {/* Action Buttons */}
//                 <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                     <Link
//                         href="/dashboard"
//                         className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center"
//                     >
//                         Back to Dashboard
//                     </Link>
//                     <Link
//                         href="/settings"
//                         className="px-6 py-3 bg-white text-slate-700 border border-slate-300 rounded-xl font-semibold hover:bg-slate-50 transition-colors text-center"
//                     >
//                         Edit Profile
//                     </Link>
//                 </div>
//             </main>
//         </div>
//     );
// }

// function InfoRow({ icon, label, value }) {
//     return (
//         <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
//             <div className="text-slate-400 mt-0.5">{icon}</div>
//             <div className="flex-1">
//                 <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
//                     {label}
//                 </p>
//                 <p className="text-sm text-slate-800 font-semibold mt-1">{value}</p>
//             </div>
//         </div>
//     );
// }


import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import Bank from "@/lib/models/Bank";
import ProfileEditClient from "@/components/ProfileEditClient";

export default async function ProfilePage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    if (!token) redirect("/login");

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        redirect("/login");
    }

    await connectDB();
    const user = await User.findById(decoded.id).lean();
    const bank = await Bank.findOne({ userId: decoded.id }).lean();

    if (!user) redirect("/login");

    return (
        <ProfileEditClient
            user={JSON.parse(JSON.stringify(user))}
            bank={bank ? JSON.parse(JSON.stringify(bank)) : null}
        />
    );
}
