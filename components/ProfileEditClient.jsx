"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Mail, Phone, User as UserIcon, MapPin, Save, X, Edit, Building2, CreditCard } from "lucide-react";
import ProfileDropdown from "@/components/ProfileDropdown";
import toast from "react-hot-toast";

export default function ProfileEditClient({ user, bank }) {
    const router = useRouter();
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: user.name || "",
        phoneNumber: user.phoneNumber || "",
        address: user.address || "",
    });

    const [bankData, setBankData] = useState({
        bank: bank?.bank || "",
        accountName: bank?.accountName || "",
        accountNumber: bank?.accountNumber || "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;

        setLoading(true);
        try {
            const res = await fetch("/api/user/update-profile", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    ...formData,
                    bank: bankData,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Failed to update profile");
                return;
            }

            toast.success("Profile updated successfully!");
            setIsEditing(false);
            router.refresh();
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setFormData({
            name: user.name || "",
            phoneNumber: user.phoneNumber || "",
            address: user.address || "",
        });
        setBankData({
            bank: bank?.bank || "",
            accountName: bank?.accountName || "",
            accountNumber: bank?.accountNumber || "",
        });
        setIsEditing(false);
    };

    const formattedDate = user.createdAt
        ? new Date(user.createdAt).toLocaleDateString("en-US", {
            month: "long",
            day: "numeric",
            year: "numeric",
        })
        : "N/A";

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            {/* Top Navbar */}
            <header className="h-20 bg-white/80 backdrop-blur-md sticky top-0 z-10 border-b border-slate-200 px-8 flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} className="text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-xl font-bold text-slate-800">My Profile</h1>
                        <p className="text-sm text-slate-500">
                            {isEditing ? "Edit your account information" : "View your account information"}
                        </p>
                    </div>
                </div>
                <ProfileDropdown user={user} />
            </header>

            <main className="max-w-5xl mx-auto p-8 space-y-8">
                {/* Profile Header Card */}
                <div className="bg-linear-to-r from-blue-600 to-blue-400 rounded-3xl p-8 text-white shadow-xl">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex flex-col md:flex-row items-center gap-6">
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                                className="w-24 h-24 rounded-full border-4 border-white bg-white shadow-lg"
                                alt="avatar"
                            />
                            <div className="text-center md:text-left">
                                <h2 className="text-3xl font-bold">{formData.name || user.name}</h2>
                                <p className="text-blue-100 text-sm mt-1">{user.email}</p>
                                <div className="mt-3 inline-block bg-white/20 backdrop-blur-sm px-4 py-1 rounded-full">
                                    <p className="text-xs font-bold uppercase tracking-wide">
                                        Premium Member
                                    </p>
                                </div>
                            </div>
                        </div>

                        {!isEditing ? (
                            <button
                                onClick={() => setIsEditing(true)}
                                className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors"
                            >
                                <Edit size={18} />
                                Edit Profile
                            </button>
                        ) : (
                            <div className="flex gap-3">
                                <button
                                    onClick={handleCancel}
                                    className="flex items-center gap-2 px-6 py-3 bg-white/20 backdrop-blur-sm text-white rounded-xl font-semibold hover:bg-white/30 transition-colors"
                                >
                                    <X size={18} />
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSubmit}
                                    disabled={loading}
                                    className="flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-xl font-semibold hover:bg-blue-50 transition-colors disabled:opacity-50"
                                >
                                    <Save size={18} />
                                    {loading ? "Saving..." : "Save Changes"}
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Personal Information */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <UserIcon size={20} className="text-blue-600" />
                                Personal Information
                            </h3>

                            <div className="space-y-4">
                                {isEditing ? (
                                    <>
                                        <InputField
                                            icon={<UserIcon size={18} />}
                                            label="Full Name"
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            placeholder="Enter your full name"
                                        />
                                        <InfoRow
                                            icon={<Mail size={18} />}
                                            label="Email Address"
                                            value={user.email}
                                            readonly
                                        />
                                        <InputField
                                            icon={<Phone size={18} />}
                                            label="Phone Number"
                                            value={formData.phoneNumber}
                                            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                                            placeholder="Enter your phone number"
                                        />
                                        <InputField
                                            icon={<MapPin size={18} />}
                                            label="Address"
                                            value={formData.address}
                                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                            placeholder="Enter your address"
                                            multiline
                                        />
                                    </>
                                ) : (
                                    <>
                                        <InfoRow
                                            icon={<UserIcon size={18} />}
                                            label="Full Name"
                                            value={user.name || "N/A"}
                                        />
                                        <InfoRow
                                            icon={<Mail size={18} />}
                                            label="Email Address"
                                            value={user.email || "N/A"}
                                        />
                                        <InfoRow
                                            icon={<Phone size={18} />}
                                            label="Phone Number"
                                            value={user.phoneNumber || "Not provided"}
                                        />
                                        <InfoRow
                                            icon={<MapPin size={18} />}
                                            label="Address"
                                            value={user.address || "Not provided"}
                                        />
                                    </>
                                )}
                                <InfoRow
                                    icon={<UserIcon size={18} />}
                                    label="Member Since"
                                    value={formattedDate}
                                />
                            </div>
                        </div>

                        {/* Loan Information - Read Only */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <CreditCard size={20} className="text-blue-600" />
                                Loan Information
                            </h3>

                            <div className="space-y-4">
                                <InfoRow
                                    icon={<CreditCard size={18} />}
                                    label="Loan Amount"
                                    value={`R ${Number(user.loanAmount || 0).toLocaleString()}`}
                                />
                                <InfoRow
                                    icon={<CreditCard size={18} />}
                                    label="Current Balance"
                                    value={`R ${Number(user.loanBalance || 0).toLocaleString()}`}
                                />
                                <InfoRow
                                    icon={<UserIcon size={18} />}
                                    label="Repayment Period"
                                    value={`${user.repaymentMonths || 0} months`}
                                />
                                <InfoRow
                                    icon={<UserIcon size={18} />}
                                    label="Account Status"
                                    value={
                                        <span
                                            className={`px-3 py-1 rounded-full text-xs font-bold ${user.emailVerified
                                                ? "bg-green-100 text-green-700"
                                                : "bg-amber-100 text-amber-700"
                                                }`}
                                        >
                                            {user.emailVerified ? "Verified" : "Unverified"}
                                        </span>
                                    }
                                />
                            </div>
                        </div>

                        {/* Bank Information */}
                        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm lg:col-span-2">
                            <h3 className="text-lg font-bold text-slate-800 mb-6 flex items-center gap-2">
                                <Building2 size={20} className="text-blue-600" />
                                Linked Bank Account
                            </h3>

                            {isEditing ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <InputField
                                        icon={<Building2 size={18} />}
                                        label="Bank Name"
                                        value={bankData.bank}
                                        onChange={(e) => setBankData({ ...bankData, bank: e.target.value })}
                                        placeholder="e.g., BDO, BPI, Metrobank"
                                    />
                                    <InputField
                                        icon={<UserIcon size={18} />}
                                        label="Account Name"
                                        value={bankData.accountName}
                                        onChange={(e) => setBankData({ ...bankData, accountName: e.target.value })}
                                        placeholder="Name on account"
                                    />
                                    <InputField
                                        icon={<CreditCard size={18} />}
                                        label="Account Number"
                                        value={bankData.accountNumber}
                                        onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                                        placeholder="Account number"
                                    />
                                </div>
                            ) : bank ? (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <InfoRow
                                        icon={<Building2 size={18} />}
                                        label="Bank Name"
                                        value={bank.bank || "N/A"}
                                    />
                                    <InfoRow
                                        icon={<UserIcon size={18} />}
                                        label="Account Name"
                                        value={bank.accountName || "N/A"}
                                    />
                                    <InfoRow
                                        icon={<CreditCard size={18} />}
                                        label="Account Number"
                                        value={`**** **** **** ${bank.accountNumber?.slice(-4) || "****"}`}
                                    />
                                </div>
                            ) : (
                                <div className="text-center py-8">
                                    <Building2 size={48} className="mx-auto text-slate-300 mb-3" />
                                    <p className="text-slate-500 text-sm">
                                        No bank account linked yet
                                    </p>
                                    {!isEditing && (
                                        <button
                                            type="button"
                                            onClick={() => setIsEditing(true)}
                                            className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                        >
                                            Add Bank Account
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </form>

                {/* Action Buttons */}
                {!isEditing && (
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <Link
                            href="/dashboard"
                            className="px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors text-center"
                        >
                            Back to Dashboard
                        </Link>
                    </div>
                )}
            </main>
        </div>
    );
}

function InfoRow({ icon, label, value, readonly }) {
    return (
        <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
            <div className="text-slate-400 mt-0.5">{icon}</div>
            <div className="flex-1">
                <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">
                    {label}
                </p>
                <p className="text-sm text-slate-800 font-semibold mt-1">
                    {value}
                    {readonly && <span className="text-xs text-slate-400 ml-2">(Cannot be changed)</span>}
                </p>
            </div>
        </div>
    );
}

function InputField({ icon, label, value, onChange, placeholder, multiline }) {
    return (
        <div className="flex items-start gap-3 py-3 border-b border-slate-100 last:border-0">
            <div className="text-slate-400 mt-3">{icon}</div>
            <div className="flex-1">
                <label className="text-xs text-slate-500 font-medium uppercase tracking-wide block mb-2">
                    {label}
                </label>
                {multiline ? (
                    <textarea
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        rows={3}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                ) : (
                    <input
                        type="text"
                        value={value}
                        onChange={onChange}
                        placeholder={placeholder}
                        className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                    />
                )}
            </div>
        </div>
    );
}
