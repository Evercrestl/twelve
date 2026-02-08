"use client";
import { useState } from "react";
import Link from "next/link";
import {
    ArrowLeft,
    TrendingUp,
    Calendar,
    DollarSign,
    Clock,
    FileText,
    CheckCircle,
    AlertCircle,
    Download,
    CreditCard,
    Building2,
    Users,
    RefreshCw
} from "lucide-react";
import ProfileDropdown from "@/components/ProfileDropdown";

export default function LoansClient({ user, bank, loanData }) {
    const [selectedTab, setSelectedTab] = useState("overview");

    const {
        totalLoan,
        currentBalance,
        repaymentMonths,
        interestRate,
        totalInterest,
        totalLoanWithInterest,
        monthlyPayment,
        nextPaymentDate,
        securityDeposit,
        depositPercentage,
        paymentSchedule
    } = loanData;

    const progress = totalLoan > 0 ? ((totalLoan - currentBalance) / totalLoan) * 100 : 0;
    const amountPaid = totalLoan - currentBalance;

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-emerald-50/20 to-slate-50">
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
                        <h1 className="text-xl font-bold text-slate-800">My Loans</h1>
                        <p className="text-sm text-slate-500">
                            Track and manage your loan details
                        </p>
                    </div>
                </div>
                <ProfileDropdown user={user} />
            </header>

            <main className="max-w-7xl mx-auto p-8 space-y-8">
                {/* Hero Stats */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    <StatCard
                        icon={<DollarSign className="text-emerald-600" size={24} />}
                        label="Total Loan Amount"
                        value={`R ${totalLoan.toLocaleString()}`}
                        bgColor="bg-emerald-50"
                        borderColor="border-emerald-200"
                    />
                    <StatCard
                        icon={<TrendingUp className="text-blue-600" size={24} />}
                        label="Current Balance"
                        value={`R ${currentBalance.toLocaleString()}`}
                        bgColor="bg-blue-50"
                        borderColor="border-blue-200"
                    />
                    <StatCard
                        icon={<Calendar className="text-purple-600" size={24} />}
                        label="Monthly Payment"
                        value={`R ${monthlyPayment.toLocaleString()}`}
                        bgColor="bg-purple-50"
                        borderColor="border-purple-200"
                    />
                    <StatCard
                        icon={<Clock className="text-amber-600" size={24} />}
                        label="Next Payment"
                        value={nextPaymentDate}
                        bgColor="bg-amber-50"
                        borderColor="border-amber-200"
                    />
                </div>

                {/* Main Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left Column - Loan Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Tab Navigation */}
                        <div className="bg-white rounded-2xl p-2 border border-slate-200 shadow-sm flex gap-2">
                            <TabButton
                                active={selectedTab === "overview"}
                                onClick={() => setSelectedTab("overview")}
                            >
                                Overview
                            </TabButton>
                            <TabButton
                                active={selectedTab === "schedule"}
                                onClick={() => setSelectedTab("schedule")}
                            >
                                Payment Schedule
                            </TabButton>
                            <TabButton
                                active={selectedTab === "documents"}
                                onClick={() => setSelectedTab("documents")}
                            >
                                Documents
                            </TabButton>
                        </div>

                        {/* Overview Tab */}
                        {selectedTab === "overview" && (
                            <div className="space-y-6">
                                {/* Progress Card */}
                                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                                    <div className="flex justify-between items-start mb-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-slate-800">Repayment Progress</h3>
                                            <p className="text-sm text-slate-500 mt-1">Track your loan repayment journey</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-3xl font-bold text-emerald-600">{progress.toFixed(1)}%</p>
                                            <p className="text-xs text-slate-500 mt-1">Completed</p>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="relative h-6 bg-slate-100 rounded-full overflow-hidden mb-6">
                                        <div
                                            className="absolute inset-y-0 left-0 bg-linear-to-r from-emerald-500 to-emerald-400 rounded-full transition-all duration-1000 ease-out"
                                            style={{ width: `${progress}%` }}
                                        >
                                            <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-6">
                                        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                                            <p className="text-xs text-emerald-700 font-semibold uppercase tracking-wider">Amount Paid</p>
                                            <p className="text-2xl font-bold text-emerald-800 mt-2">R {amountPaid.toLocaleString()}</p>
                                        </div>
                                        <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                                            <p className="text-xs text-slate-600 font-semibold uppercase tracking-wider">Remaining</p>
                                            <p className="text-2xl font-bold text-slate-800 mt-2">R {currentBalance.toLocaleString()}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Loan Details Card */}
                                <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                                    <h3 className="text-xl font-bold text-slate-800 mb-6">Loan Details</h3>
                                    <div className="space-y-4">
                                        <DetailRow label="Principal Amount" value={`R ${totalLoan.toLocaleString()}`} />
                                        <DetailRow label="Interest Rate" value={`${interestRate}% per annum`} />
                                        <DetailRow label="Total Interest" value={`R ${Math.round(totalInterest).toLocaleString()}`} />
                                        <DetailRow
                                            label="Total Repayment Amount"
                                            value={`R ${totalLoanWithInterest.toLocaleString()}`}
                                            highlight
                                        />
                                        <DetailRow label="Loan Term" value={`${repaymentMonths} months`} />
                                        <DetailRow label="Monthly Payment" value={`R ${monthlyPayment.toLocaleString()}`} />
                                        <DetailRow
                                            label="Security Deposit"
                                            value={`R ${securityDeposit.toLocaleString()} (${depositPercentage}%)`}
                                        />
                                        <DetailRow
                                            label="Loan Status"
                                            value={
                                                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-bold">
                                                    Active
                                                </span>
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Payment Schedule Tab */}
                        {selectedTab === "schedule" && (
                            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                                <div className="flex justify-between items-start mb-6">
                                    <div>
                                        <h3 className="text-xl font-bold text-slate-800">Payment Schedule</h3>
                                        <p className="text-sm text-slate-500 mt-1">{repaymentMonths} monthly installments</p>
                                    </div>
                                    <button className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors text-sm font-semibold text-slate-700">
                                        <Download size={16} />
                                        Export
                                    </button>
                                </div>

                                <div className="space-y-3 max-h-150 overflow-y-auto">
                                    {paymentSchedule.map((payment, index) => (
                                        <PaymentScheduleRow
                                            key={index}
                                            month={payment.month}
                                            date={payment.date}
                                            amount={payment.amount}
                                            status={payment.status}
                                            isPast={payment.isPast}
                                        />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Documents Tab */}
                        {selectedTab === "documents" && (
                            <div className="bg-white rounded-3xl p-8 border border-slate-200 shadow-sm">
                                <h3 className="text-xl font-bold text-slate-800 mb-6">Loan Documents</h3>
                                <div className="space-y-3">
                                    <DocumentRow
                                        name="Loan Agreement"
                                        date="Jan 15, 2026"
                                        size="2.4 MB"
                                    />
                                    <DocumentRow
                                        name="Payment Schedule"
                                        date="Jan 15, 2026"
                                        size="1.1 MB"
                                    />
                                    <DocumentRow
                                        name="Terms & Conditions"
                                        date="Jan 15, 2026"
                                        size="856 KB"
                                    />
                                    <DocumentRow
                                        name="Security Deposit Receipt"
                                        date="Jan 15, 2026"
                                        size="324 KB"
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="lg:col-span-1 space-y-6">
                        {/* Quick Actions */}
                        <div className="bg-linear-to-br from-blue-600 to-blue-500 rounded-3xl p-6 text-white shadow-xl">
                            <h3 className="text-lg font-bold mb-4">Quick Actions</h3>
                            <div className="space-y-3">
                                <ActionButton icon={<CreditCard size={18} />} label="Make Payment" />
                                <ActionButton icon={<RefreshCw size={18} />} label="Request Extension" />
                                <ActionButton icon={<FileText size={18} />} label="View Statement" />
                            </div>
                        </div>

                        {/* Bank Details */}
                        {bank && (
                            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-sm">
                                <div className="flex items-center gap-2 mb-4">
                                    <Building2 size={20} className="text-blue-600" />
                                    <h3 className="text-lg font-bold text-slate-800">Linked Bank Account</h3>
                                </div>
                                <div className="space-y-3">
                                    <div>
                                        <p className="text-xs text-slate-500 font-semibold uppercase">Bank Name</p>
                                        <p className="text-sm font-bold text-slate-800 mt-1">{bank.bank}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-semibold uppercase">Account Name</p>
                                        <p className="text-sm font-bold text-slate-800 mt-1">{bank.accountName}</p>
                                    </div>
                                    <div>
                                        <p className="text-xs text-slate-500 font-semibold uppercase">Account Number</p>
                                        <p className="text-sm font-bold text-slate-800 mt-1">**** **** **** {bank.accountNumber.slice(-4)}</p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Need Help */}
                        <div className="bg-slate-50 border border-slate-200 rounded-3xl p-6">
                            <div className="flex items-center gap-2 mb-3">
                                <Users size={20} className="text-slate-600" />
                                <h3 className="text-lg font-bold text-slate-800">Need Help?</h3>
                            </div>
                            <p className="text-sm text-slate-600 mb-4">
                                Our support team is here to assist you with any loan-related questions.
                            </p>
                            <button className="w-full px-4 py-3 bg-slate-800 hover:bg-slate-900 text-white rounded-xl font-semibold transition-colors">
                                Contact Support
                            </button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
}

function StatCard({ icon, label, value, bgColor, borderColor }) {
    return (
        <div className={`${bgColor} border ${borderColor} rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow`}>
            <div className="flex items-start justify-between mb-4">
                <div className={`p-3 bg-white rounded-xl shadow-sm`}>
                    {icon}
                </div>
            </div>
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-2">{label}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
        </div>
    );
}

function TabButton({ active, onClick, children }) {
    return (
        <button
            onClick={onClick}
            className={`flex-1 px-4 py-3 rounded-xl font-semibold text-sm transition-all ${active
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                    : "text-slate-600 hover:bg-slate-50"
                }`}
        >
            {children}
        </button>
    );
}

function DetailRow({ label, value, highlight }) {
    return (
        <div className={`flex justify-between items-center py-3 border-b border-slate-100 last:border-0 ${highlight ? 'bg-blue-50 -mx-4 px-4 rounded-lg' : ''}`}>
            <p className={`text-sm ${highlight ? 'font-bold text-slate-800' : 'text-slate-600'}`}>{label}</p>
            <p className={`text-sm font-bold ${highlight ? 'text-blue-600' : 'text-slate-900'}`}>{value}</p>
        </div>
    );
}

function PaymentScheduleRow({ month, date, amount, status, isPast }) {
    const statusColors = {
        paid: "bg-green-100 text-green-700 border-green-200",
        pending: "bg-amber-100 text-amber-700 border-amber-200",
        upcoming: "bg-blue-100 text-blue-700 border-blue-200",
        overdue: "bg-red-100 text-red-700 border-red-200"
    };

    const statusIcons = {
        paid: <CheckCircle size={16} />,
        pending: <Clock size={16} />,
        upcoming: <Calendar size={16} />,
        overdue: <AlertCircle size={16} />
    };

    return (
        <div className={`flex items-center justify-between p-4 rounded-xl border transition-all hover:shadow-md ${isPast ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-200'
            }`}>
            <div className="flex items-center gap-4">
                <div className={`p-2 rounded-lg ${statusColors[status]}`}>
                    {statusIcons[status]}
                </div>
                <div>
                    <p className="font-bold text-slate-800 text-sm">Payment #{month}</p>
                    <p className="text-xs text-slate-500">{date}</p>
                </div>
            </div>
            <div className="text-right">
                <p className="font-bold text-slate-900">R {amount.toLocaleString()}</p>
                <span className={`text-[10px] px-2 py-0.5 rounded-full border font-bold uppercase ${statusColors[status]}`}>
                    {status}
                </span>
            </div>
        </div>
    );
}

function DocumentRow({ name, date, size }) {
    return (
        <div className="flex items-center justify-between p-4 hover:bg-slate-50 rounded-xl border border-slate-200 transition-all group cursor-pointer">
            <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-50 border border-blue-200 rounded-xl group-hover:bg-blue-100 transition-colors">
                    <FileText size={20} className="text-blue-600" />
                </div>
                <div>
                    <p className="font-bold text-slate-800 text-sm">{name}</p>
                    <p className="text-xs text-slate-500">{date} • {size}</p>
                </div>
            </div>
            <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors">
                <Download size={18} className="text-slate-600" />
            </button>
        </div>
    );
}

function ActionButton({ icon, label }) {
    return (
        <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-xl transition-all text-white font-semibold text-sm">
            {icon}
            {label}
        </button>
    );
}
