"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
    Search,
    Edit,
    Trash2,
    Eye,
    X,
    Save,
    Mail,
    Phone,
    MapPin,
    CreditCard,
    Building2,
    User as UserIcon,
    Calendar
} from "lucide-react";
import toast from "react-hot-toast";

export default function UserManagement({ users }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedUser, setSelectedUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const router = useRouter();

    const [editForm, setEditForm] = useState({
        name: "",
        email: "",
        phoneNumber: "",
        address: "",
        loanAmount: 0,
        loanBalance: 0,
        repaymentMonths: 0,
    });

    const filteredUsers = users.filter((user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleView = (user) => {
        setSelectedUser(user);
        setIsEditing(false);
    };

    const handleEdit = (user) => {
        setSelectedUser(user);
        setEditForm({
            name: user.name || "",
            email: user.email || "",
            phoneNumber: user.phoneNumber || "",
            address: user.address || "",
            loanAmount: user.loanAmount || 0,
            loanBalance: user.loanBalance || 0,
            repaymentMonths: user.repaymentMonths || 0,
        });
        setIsEditing(true);
    };

    const handleSave = async () => {
        try {
            const res = await fetch(`/api/admin/users/${selectedUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(editForm),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Failed to update user");
                return;
            }

            toast.success("User updated successfully");
            setIsEditing(false);
            setSelectedUser(null);
            router.refresh();
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    const handleDelete = async (userId) => {
        if (!confirm("Are you sure you want to delete this user? This action cannot be undone.")) {
            return;
        }

        setIsDeleting(true);
        try {
            const res = await fetch(`/api/admin/users/${userId}`, {
                method: "DELETE",
                credentials: "include",
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Failed to delete user");
                return;
            }

            toast.success("User deleted successfully");
            setSelectedUser(null);
            router.refresh();
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setIsDeleting(false);
        }
    };

    return (
        <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                <input
                    type="text"
                    placeholder="Search users by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-slate-50 border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                    User
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                    Email
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                    Loan Amount
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                    Status
                                </th>
                                <th className="px-6 py-4 text-left text-xs font-bold text-slate-600 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="px-6 py-12 text-center text-slate-400">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user._id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <img
                                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                                                    className="w-10 h-10 rounded-full border border-slate-200"
                                                    alt="avatar"
                                                />
                                                <div>
                                                    <p className="font-bold text-slate-800">{user.name}</p>
                                                    <p className="text-xs text-slate-500">
                                                        {user.role === "admin" ? "Admin" : "User"}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">
                                            {user.email}
                                        </td>
                                        <td className="px-6 py-4 text-sm font-bold text-slate-800">
                                            R {Number(user.loanAmount || 0).toLocaleString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold ${user.emailVerified
                                                        ? "bg-green-100 text-green-700"
                                                        : "bg-amber-100 text-amber-700"
                                                    }`}
                                            >
                                                {user.emailVerified ? "Verified" : "Unverified"}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleView(user)}
                                                    className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                                    title="View"
                                                >
                                                    <Eye size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleEdit(user)}
                                                    className="p-2 text-slate-600 hover:bg-slate-50 rounded-lg transition-colors"
                                                    title="Edit"
                                                >
                                                    <Edit size={18} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(user._id)}
                                                    disabled={isDeleting}
                                                    className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                                                    title="Delete"
                                                >
                                                    <Trash2 size={18} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* View/Edit Modal */}
            {selectedUser && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
                        {/* Header */}
                        <div className="sticky top-0 bg-white border-b border-slate-200 p-6 flex items-center justify-between">
                            <h2 className="text-xl font-bold text-slate-800">
                                {isEditing ? "Edit User" : "User Details"}
                            </h2>
                            <button
                                onClick={() => {
                                    setSelectedUser(null);
                                    setIsEditing(false);
                                }}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-6">
                            {/* Profile Header */}
                            <div className="flex items-center gap-4 p-4 bg-linear-to-r from-blue-50 to-blue-100 rounded-xl">
                                <img
                                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedUser.name}`}
                                    className="w-16 h-16 rounded-full border-2 border-white"
                                    alt="avatar"
                                />
                                <div>
                                    <h3 className="text-lg font-bold text-slate-800">
                                        {isEditing ? editForm.name : selectedUser.name}
                                    </h3>
                                    <p className="text-sm text-slate-600">
                                        {isEditing ? editForm.email : selectedUser.email}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Personal Information */}
                                <div className="space-y-4">
                                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                        <UserIcon size={18} className="text-blue-600" />
                                        Personal Information
                                    </h4>

                                    {isEditing ? (
                                        <>
                                            <InputField
                                                label="Full Name"
                                                value={editForm.name}
                                                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
                                            />
                                            <InputField
                                                label="Email"
                                                value={editForm.email}
                                                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                                                type="email"
                                            />
                                            <InputField
                                                label="Phone Number"
                                                value={editForm.phoneNumber}
                                                onChange={(e) => setEditForm({ ...editForm, phoneNumber: e.target.value })}
                                            />
                                            <InputField
                                                label="Address"
                                                value={editForm.address}
                                                onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                                                multiline
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <DetailRow label="Phone Number" value={selectedUser.phoneNumber || "N/A"} />
                                            <DetailRow label="Address" value={selectedUser.address || "N/A"} />
                                            <DetailRow
                                                label="Member Since"
                                                value={new Date(selectedUser.createdAt).toLocaleDateString()}
                                            />
                                            <DetailRow
                                                label="Email Verified"
                                                value={
                                                    <span className={`px-2 py-1 rounded-full text-xs font-bold ${selectedUser.emailVerified
                                                            ? "bg-green-100 text-green-700"
                                                            : "bg-amber-100 text-amber-700"
                                                        }`}>
                                                        {selectedUser.emailVerified ? "Yes" : "No"}
                                                    </span>
                                                }
                                            />
                                        </>
                                    )}
                                </div>

                                {/* Loan Information */}
                                <div className="space-y-4">
                                    <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                        <CreditCard size={18} className="text-blue-600" />
                                        Loan Information
                                    </h4>

                                    {isEditing ? (
                                        <>
                                            <InputField
                                                label="Loan Amount"
                                                value={editForm.loanAmount}
                                                onChange={(e) => setEditForm({ ...editForm, loanAmount: e.target.value })}
                                                type="number"
                                            />
                                            <InputField
                                                label="Loan Balance"
                                                value={editForm.loanBalance}
                                                onChange={(e) => setEditForm({ ...editForm, loanBalance: e.target.value })}
                                                type="number"
                                            />
                                            <InputField
                                                label="Repayment Months"
                                                value={editForm.repaymentMonths}
                                                onChange={(e) => setEditForm({ ...editForm, repaymentMonths: e.target.value })}
                                                type="number"
                                            />
                                        </>
                                    ) : (
                                        <>
                                            <DetailRow
                                                label="Loan Amount"
                                                value={`R ${Number(selectedUser.loanAmount || 0).toLocaleString()}`}
                                            />
                                            <DetailRow
                                                label="Loan Balance"
                                                value={`R ${Number(selectedUser.loanBalance || 0).toLocaleString()}`}
                                            />
                                            <DetailRow
                                                label="Repayment Period"
                                                value={`${selectedUser.repaymentMonths || 0} months`}
                                            />
                                        </>
                                    )}
                                </div>

                                {/* Bank Information */}
                                {selectedUser.bank && (
                                    <div className="md:col-span-2 space-y-4">
                                        <h4 className="font-bold text-slate-800 flex items-center gap-2">
                                            <Building2 size={18} className="text-blue-600" />
                                            Bank Information
                                        </h4>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                            <DetailRow label="Bank Name" value={selectedUser.bank.bank || "N/A"} />
                                            <DetailRow label="Account Name" value={selectedUser.bank.accountName || "N/A"} />
                                            <DetailRow
                                                label="Account Number"
                                                value={`**** **** **** ${selectedUser.bank.accountNumber?.slice(-4) || "****"}`}
                                            />
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-6 flex justify-end gap-3">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={() => {
                                            setIsEditing(false);
                                            setEditForm({
                                                name: selectedUser.name || "",
                                                email: selectedUser.email || "",
                                                phoneNumber: selectedUser.phoneNumber || "",
                                                address: selectedUser.address || "",
                                                loanAmount: selectedUser.loanAmount || 0,
                                                loanBalance: selectedUser.loanBalance || 0,
                                                repaymentMonths: selectedUser.repaymentMonths || 0,
                                            });
                                        }}
                                        className="px-6 py-2 bg-slate-100 text-slate-700 rounded-lg font-semibold hover:bg-slate-200 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        <Save size={18} />
                                        Save Changes
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => handleDelete(selectedUser._id)}
                                        disabled={isDeleting}
                                        className="px-6 py-2 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50"
                                    >
                                        Delete User
                                    </button>
                                    <button
                                        onClick={() => handleEdit(selectedUser)}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                                    >
                                        Edit User
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

function DetailRow({ label, value }) {
    return (
        <div className="border-b border-slate-100 pb-2">
            <p className="text-xs text-slate-500 uppercase font-semibold mb-1">{label}</p>
            <p className="text-sm text-slate-800 font-semibold">{value}</p>
        </div>
    );
}

function InputField({ label, value, onChange, type = "text", multiline = false }) {
    return (
        <div>
            <label className="text-xs text-slate-500 uppercase font-semibold block mb-2">
                {label}
            </label>
            {multiline ? (
                <textarea
                    value={value}
                    onChange={onChange}
                    rows={3}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
            ) : (
                <input
                    type={type}
                    value={value}
                    onChange={onChange}
                    className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                />
            )}
        </div>
    );
}
