"use client";
import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    Search,
    Filter,
    Download,
    Calendar,
    ArrowUpRight,
    ArrowDownLeft,
    CheckCircle,
    Clock,
    XCircle,
    Eye,
    RefreshCw,
    TrendingUp,
    TrendingDown
} from "lucide-react";
import ProfileDropdown from "@/components/ProfileDropdown";

export default function TransactionsClient({ user, transactions, stats }) {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedFilter, setSelectedFilter] = useState("all");
    const [selectedType, setSelectedType] = useState("all");
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    // Filter transactions
    const filteredTransactions = transactions.filter(transaction => {
        const matchesSearch = transaction.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = selectedFilter === "all" || transaction.status === selectedFilter;
        const matchesType = selectedType === "all" || transaction.type === selectedType;
        return matchesSearch && matchesFilter && matchesType;
    });

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/20 to-slate-50">
            {/* Top Navbar */}
            <header className="h-20 bg-white/90 backdrop-blur-xl sticky top-0 z-10 border-b border-slate-200/60 px-8 flex items-center justify-between shadow-sm">
                <div className="flex items-center gap-4">
                    <Link
                        href="/dashboard"
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <ArrowLeft size={20} className="text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-sm md:text-xl font-bold text-slate-800">Transaction History</h1>
                        <p className="text-sm text-slate-500">
                            View all your financial activities
                        </p>
                    </div>
                </div>
                <ProfileDropdown user={user} />
            </header>

            <main className="max-w-7xl mx-auto p-8 space-y-8">
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatsCard
                        icon={<TrendingUp className="text-green-600" size={24} />}
                        label="Total Credits"
                        value={`R ${stats.totalCredits.toLocaleString()}`}
                        change="+12.5%"
                        positive={true}
                        bgColor="bg-green-50"
                        borderColor="border-green-200"
                    />
                    <StatsCard
                        icon={<TrendingDown className="text-red-600" size={24} />}
                        label="Total Debits"
                        value={`R ${stats.totalDebits.toLocaleString()}`}
                        change="-8.3%"
                        positive={false}
                        bgColor="bg-red-50"
                        borderColor="border-red-200"
                    />
                    <StatsCard
                        icon={<RefreshCw className="text-blue-600" size={24} />}
                        label="Pending"
                        value={stats.pendingCount}
                        change={`${stats.pendingCount} transactions`}
                        bgColor="bg-blue-50"
                        borderColor="border-blue-200"
                    />
                    <StatsCard
                        icon={<CheckCircle className="text-emerald-600" size={24} />}
                        label="Completed"
                        value={stats.completedCount}
                        change={`${stats.completedCount} transactions`}
                        bgColor="bg-emerald-50"
                        borderColor="border-emerald-200"
                    />
                </div>

                {/* Filters and Search */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm">
                    <div className="flex flex-col lg:flex-row gap-4">
                        {/* Search */}
                        <div className="flex-1 relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search transactions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            />
                        </div>

                        {/* Status Filter */}
                        <select
                            value={selectedFilter}
                            onChange={(e) => setSelectedFilter(e.target.value)}
                            className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-semibold"
                        >
                            <option value="all">All Status</option>
                            <option value="completed">Completed</option>
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="failed">Failed</option>
                        </select>

                        {/* Type Filter */}
                        <select
                            value={selectedType}
                            onChange={(e) => setSelectedType(e.target.value)}
                            className="px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none font-semibold"
                        >
                            <option value="all">All Types</option>
                            <option value="deposit">Deposits</option>
                            <option value="withdrawal">Withdrawals</option>
                            <option value="payment">Payments</option>
                        </select>

                        {/* Export Button */}
                        <button className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors font-semibold text-slate-700">
                            <Download size={18} />
                            <span className="hidden sm:inline">Export</span>
                        </button>
                    </div>
                </div>

                {/* Transactions List */}
                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <div>
                            <h2 className="text-2xl font-bold text-slate-800">All Transactions</h2>
                            <p className="text-sm text-slate-500 mt-1">{filteredTransactions.length} transactions found</p>
                        </div>
                    </div>

                    {filteredTransactions.length > 0 ? (
                        <div className="space-y-3">
                            {filteredTransactions.map((transaction) => (
                                <TransactionRow
                                    key={transaction._id}
                                    transaction={transaction}
                                    onClick={() => setSelectedTransaction(transaction)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="py-16 text-center">
                            <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                <Search size={32} className="text-slate-400" />
                            </div>
                            <h3 className="text-lg font-bold text-slate-800 mb-2">No transactions found</h3>
                            <p className="text-sm text-slate-500">
                                Try adjusting your search or filter criteria
                            </p>
                        </div>
                    )}
                </div>
            </main>

            {/* Transaction Detail Modal */}
            {selectedTransaction && (
                <TransactionDetailModal
                    transaction={selectedTransaction}
                    onClose={() => setSelectedTransaction(null)}
                />
            )}
        </div>
    );
}

function StatsCard({ icon, label, value, change, positive, bgColor, borderColor }) {
    return (
        <div className={`${bgColor} border ${borderColor} rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between mb-4">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                    {icon}
                </div>
            </div>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">{label}</p>
            <p className="text-2xl font-bold text-slate-900 mb-2">{value}</p>
            {change && (
                <p className={`text-xs font-semibold ${positive === true ? 'text-green-600' : positive === false ? 'text-red-600' : 'text-slate-500'}`}>
                    {change}
                </p>
            )}
        </div>
    );
}

function TransactionRow({ transaction, onClick }) {
    const isCredit = transaction.type === "deposit" || transaction.amount > 0;
    const statusColors = {
        completed: "bg-green-100 text-green-700 border-green-200",
        pending: "bg-amber-100 text-amber-700 border-amber-200",
        processing: "bg-blue-100 text-blue-700 border-blue-200",
        failed: "bg-red-100 text-red-700 border-red-200",
    };

    const statusIcons = {
        completed: <CheckCircle size={16} />,
        pending: <Clock size={16} />,
        processing: <RefreshCw size={16} className="animate-spin" />,
        failed: <XCircle size={16} />,
    };

    return (
        <div
            className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl border border-slate-200 transition-all cursor-pointer group"
            onClick={onClick}
        >
            <div className="flex items-center gap-4 flex-1">
                <div className={`p-3 rounded-xl ${isCredit ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    {isCredit ? (
                        <ArrowDownLeft size={20} className="text-green-600" />
                    ) : (
                        <ArrowUpRight size={20} className="text-red-600" />
                    )}
                </div>
                <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm">{transaction.description}</p>
                    <div className="flex items-center gap-3 mt-1">
                        <p className="text-xs text-slate-500">
                            {new Date(transaction.createdAt).toLocaleDateString("en-US", {
                                month: "short",
                                day: "numeric",
                                year: "numeric",
                                hour: "2-digit",
                                minute: "2-digit"
                            })}
                        </p>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase flex items-center gap-1 ${statusColors[transaction.status]}`}>
                            {statusIcons[transaction.status]}
                            {transaction.status}
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex items-center gap-4">
                <div className="text-right">
                    <p className={`text-lg font-bold ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
                        {isCredit ? '+' : '-'} R {Math.abs(transaction.amount).toLocaleString()}
                    </p>
                    {transaction.referenceNumber && (
                        <p className="text-xs text-slate-500">Ref: {transaction.referenceNumber}</p>
                    )}
                </div>
                <Eye size={18} className="text-slate-400 group-hover:text-slate-600 transition-colors" />
            </div>
        </div>
    );
}

function TransactionDetailModal({ transaction, onClose }) {
    const isCredit = transaction.type === "deposit" || transaction.amount > 0;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
            <div className="bg-white rounded-3xl p-8 max-w-2xl w-full shadow-2xl" onClick={(e) => e.stopPropagation()}>
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <h2 className="text-2xl font-bold text-slate-800">Transaction Details</h2>
                        <p className="text-sm text-slate-500 mt-1">Reference: {transaction.referenceNumber || transaction._id}</p>
                    </div>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                    >
                        <XCircle size={24} className="text-slate-400" />
                    </button>
                </div>

                <div className="space-y-6">
                    {/* Amount Display */}
                    <div className={`p-6 rounded-2xl ${isCredit ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                        <p className="text-sm font-semibold text-slate-600 uppercase mb-2">Amount</p>
                        <p className={`text-4xl font-bold ${isCredit ? 'text-green-600' : 'text-red-600'}`}>
                            {isCredit ? '+' : '-'} R {Math.abs(transaction.amount).toLocaleString()}
                        </p>
                    </div>

                    {/* Transaction Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <InfoField label="Transaction Type" value={transaction.type} />
                        <InfoField label="Status" value={transaction.status} />
                        <InfoField label="Date" value={new Date(transaction.createdAt).toLocaleDateString()} />
                        <InfoField label="Time" value={new Date(transaction.createdAt).toLocaleTimeString()} />
                    </div>

                    {/* Description */}
                    <div>
                        <p className="text-xs font-semibold text-slate-600 uppercase mb-2">Description</p>
                        <p className="text-sm text-slate-800">{transaction.description}</p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3 pt-4 border-t border-slate-200">
                        <button className="flex-1 px-4 py-3 bg-slate-100 hover:bg-slate-200 rounded-xl font-semibold text-slate-700 transition-colors flex items-center justify-center gap-2">
                            <Download size={18} />
                            Download Receipt
                        </button>
                        <button
                            onClick={onClose}
                            className="flex-1 px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-semibold transition-colors"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

function InfoField({ label, value }) {
    return (
        <div>
            <p className="text-xs font-semibold text-slate-600 uppercase mb-1">{label}</p>
            <p className="text-sm font-bold text-slate-800 capitalize">{value}</p>
        </div>
    );
}
