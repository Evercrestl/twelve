"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
    ArrowLeft,
    Shield,
    Bell,
    Moon,
    Eye,
    EyeOff,
    Lock,
    Mail,
    Smartphone,
    Globe,
    Palette,
    Save,
    Check,
    AlertCircle
} from "lucide-react";
import ProfileDropdown from "@/components/ProfileDropdown";
import toast from "react-hot-toast";

export default function SettingsClient({ user }) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("security");

    // Security Settings
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

    // Notification Settings
    const [notifications, setNotifications] = useState({
        emailNotifications: true,
        paymentReminders: true,
        loanUpdates: true,
        promotionalEmails: false,
        smsNotifications: false,
        pushNotifications: true,
    });

    // Preferences
    const [preferences, setPreferences] = useState({
        darkMode: false,
        language: "en",
        currency: "PHP",
        dateFormat: "MM/DD/YYYY",
    });

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (loading) return;

        if (passwordData.newPassword !== passwordData.confirmPassword) {
            toast.error("New passwords do not match");
            return;
        }

        if (passwordData.newPassword.length < 6) {
            toast.error("Password must be at least 6 characters");
            return;
        }

        setLoading(true);
        try {
            const res = await fetch("/api/user/change-password", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({
                    currentPassword: passwordData.currentPassword,
                    newPassword: passwordData.newPassword,
                }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Failed to change password");
                return;
            }

            toast.success("Password changed successfully!");
            setPasswordData({
                currentPassword: "",
                newPassword: "",
                confirmPassword: "",
            });
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handleNotificationUpdate = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/user/update-notifications", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(notifications),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Failed to update notifications");
                return;
            }

            toast.success("Notification preferences updated!");
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const handlePreferencesUpdate = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/user/update-preferences", {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(preferences),
            });

            const data = await res.json();

            if (!res.ok) {
                toast.error(data.error || "Failed to update preferences");
                return;
            }

            toast.success("Preferences updated!");
        } catch (error) {
            toast.error("An error occurred");
        } finally {
            setLoading(false);
        }
    };

    const tabs = [
        { id: "security", label: "Security", icon: Shield },
        { id: "notifications", label: "Notifications", icon: Bell },
        { id: "preferences", label: "Preferences", icon: Palette },
    ];

    return (
        <div className="min-h-screen bg-linear-to-br from-slate-50 via-blue-50/30 to-slate-50">
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
                        <h1 className="text-xl font-bold text-slate-800">Settings</h1>
                        <p className="text-sm text-slate-500">
                            Manage your account settings and preferences
                        </p>
                    </div>
                </div>
                <ProfileDropdown user={user} />
            </header>

            <main className="max-w-6xl mx-auto p-8">
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Sidebar Navigation */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm sticky top-28">
                            <nav className="space-y-1">
                                {tabs.map((tab) => {
                                    const Icon = tab.icon;
                                    return (
                                        <button
                                            key={tab.id}
                                            onClick={() => setActiveTab(tab.id)}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${activeTab === tab.id
                                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                                    : "text-slate-600 hover:bg-slate-50"
                                                }`}
                                        >
                                            <Icon size={20} />
                                            <span className="font-semibold text-sm">{tab.label}</span>
                                        </button>
                                    );
                                })}
                            </nav>
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="lg:col-span-3">
                        {/* Security Settings */}
                        {activeTab === "security" && (
                            <div className="space-y-6">
                                {/* Change Password */}
                                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-blue-100 rounded-xl">
                                            <Lock size={24} className="text-blue-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-800">Change Password</h2>
                                            <p className="text-sm text-slate-500">Update your password to keep your account secure</p>
                                        </div>
                                    </div>

                                    <form onSubmit={handlePasswordChange} className="space-y-4">
                                        <PasswordInput
                                            label="Current Password"
                                            value={passwordData.currentPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                                            showPassword={showCurrentPassword}
                                            toggleShow={() => setShowCurrentPassword(!showCurrentPassword)}
                                        />
                                        <PasswordInput
                                            label="New Password"
                                            value={passwordData.newPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                                            showPassword={showNewPassword}
                                            toggleShow={() => setShowNewPassword(!showNewPassword)}
                                        />
                                        <PasswordInput
                                            label="Confirm New Password"
                                            value={passwordData.confirmPassword}
                                            onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                                            showPassword={showConfirmPassword}
                                            toggleShow={() => setShowConfirmPassword(!showConfirmPassword)}
                                        />

                                        <div className="pt-4">
                                            <button
                                                type="submit"
                                                disabled={loading}
                                                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                                            >
                                                <Save size={18} />
                                                {loading ? "Updating..." : "Update Password"}
                                            </button>
                                        </div>
                                    </form>
                                </div>

                                {/* Two-Factor Authentication */}
                                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-3 bg-green-100 rounded-xl">
                                                <Shield size={24} className="text-green-600" />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-slate-800">Two-Factor Authentication</h2>
                                                <p className="text-sm text-slate-500">Add an extra layer of security to your account</p>
                                            </div>
                                        </div>
                                        <ToggleSwitch
                                            enabled={twoFactorEnabled}
                                            onChange={setTwoFactorEnabled}
                                        />
                                    </div>

                                    {twoFactorEnabled && (
                                        <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                                            <div className="flex items-start gap-3">
                                                <Check size={20} className="text-green-600 mt-0.5" />
                                                <div>
                                                    <p className="font-semibold text-green-900">2FA is enabled</p>
                                                    <p className="text-sm text-green-700 mt-1">Your account is protected with two-factor authentication</p>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>

                                {/* Email Verification */}
                                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                                    <div className="flex items-start justify-between">
                                        <div className="flex items-center gap-3">
                                            <div className={`p-3 rounded-xl ${user.emailVerified ? 'bg-green-100' : 'bg-amber-100'}`}>
                                                <Mail size={24} className={user.emailVerified ? 'text-green-600' : 'text-amber-600'} />
                                            </div>
                                            <div>
                                                <h2 className="text-xl font-bold text-slate-800">Email Verification</h2>
                                                <p className="text-sm text-slate-500">{user.email}</p>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-2 rounded-full text-xs font-bold ${user.emailVerified
                                                ? "bg-green-100 text-green-700"
                                                : "bg-amber-100 text-amber-700"
                                            }`}>
                                            {user.emailVerified ? "Verified" : "Unverified"}
                                        </span>
                                    </div>

                                    {!user.emailVerified && (
                                        <button className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors">
                                            Send Verification Email
                                        </button>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Notifications Settings */}
                        {activeTab === "notifications" && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-purple-100 rounded-xl">
                                            <Bell size={24} className="text-purple-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-800">Notification Preferences</h2>
                                            <p className="text-sm text-slate-500">Choose what updates you want to receive</p>
                                        </div>
                                    </div>

                                    <div className="space-y-4">
                                        <NotificationRow
                                            icon={<Mail size={20} />}
                                            title="Email Notifications"
                                            description="Receive important updates via email"
                                            enabled={notifications.emailNotifications}
                                            onChange={(val) => setNotifications({ ...notifications, emailNotifications: val })}
                                        />
                                        <NotificationRow
                                            icon={<AlertCircle size={20} />}
                                            title="Payment Reminders"
                                            description="Get notified before payment due dates"
                                            enabled={notifications.paymentReminders}
                                            onChange={(val) => setNotifications({ ...notifications, paymentReminders: val })}
                                        />
                                        <NotificationRow
                                            icon={<Bell size={20} />}
                                            title="Loan Updates"
                                            description="Updates about your loan status and progress"
                                            enabled={notifications.loanUpdates}
                                            onChange={(val) => setNotifications({ ...notifications, loanUpdates: val })}
                                        />
                                        <NotificationRow
                                            icon={<Mail size={20} />}
                                            title="Promotional Emails"
                                            description="Special offers and promotional content"
                                            enabled={notifications.promotionalEmails}
                                            onChange={(val) => setNotifications({ ...notifications, promotionalEmails: val })}
                                        />
                                        <NotificationRow
                                            icon={<Smartphone size={20} />}
                                            title="SMS Notifications"
                                            description="Receive alerts via text message"
                                            enabled={notifications.smsNotifications}
                                            onChange={(val) => setNotifications({ ...notifications, smsNotifications: val })}
                                        />
                                        <NotificationRow
                                            icon={<Smartphone size={20} />}
                                            title="Push Notifications"
                                            description="Browser and mobile push notifications"
                                            enabled={notifications.pushNotifications}
                                            onChange={(val) => setNotifications({ ...notifications, pushNotifications: val })}
                                        />
                                    </div>

                                    <div className="pt-6 mt-6 border-t border-slate-200">
                                        <button
                                            onClick={handleNotificationUpdate}
                                            disabled={loading}
                                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                                        >
                                            <Save size={18} />
                                            {loading ? "Saving..." : "Save Preferences"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Preferences Settings */}
                        {activeTab === "preferences" && (
                            <div className="space-y-6">
                                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-3 bg-indigo-100 rounded-xl">
                                            <Palette size={24} className="text-indigo-600" />
                                        </div>
                                        <div>
                                            <h2 className="text-xl font-bold text-slate-800">Display & Preferences</h2>
                                            <p className="text-sm text-slate-500">Customize how you view the application</p>
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        {/* Dark Mode */}
                                        <PreferenceRow
                                            icon={<Moon size={20} />}
                                            title="Dark Mode"
                                            description="Switch to a darker color scheme"
                                        >
                                            <ToggleSwitch
                                                enabled={preferences.darkMode}
                                                onChange={(val) => setPreferences({ ...preferences, darkMode: val })}
                                            />
                                        </PreferenceRow>

                                        {/* Language */}
                                        <PreferenceRow
                                            icon={<Globe size={20} />}
                                            title="Language"
                                            description="Choose your preferred language"
                                        >
                                            <select
                                                value={preferences.language}
                                                onChange={(e) => setPreferences({ ...preferences, language: e.target.value })}
                                                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            >
                                                <option value="en">English</option>
                                                <option value="tl">Tagalog</option>
                                                <option value="es">Spanish</option>
                                            </select>
                                        </PreferenceRow>

                                        {/* Currency */}
                                        <PreferenceRow
                                            icon={<Globe size={20} />}
                                            title="Currency"
                                            description="Display currency format"
                                        >
                                            <select
                                                value={preferences.currency}
                                                onChange={(e) => setPreferences({ ...preferences, currency: e.target.value })}
                                                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            >
                                                <option value="PHP">PHP (R)</option>
                                                <option value="USD">USD ($)</option>
                                                <option value="EUR">EUR (€)</option>
                                            </select>
                                        </PreferenceRow>

                                        {/* Date Format */}
                                        <PreferenceRow
                                            icon={<Globe size={20} />}
                                            title="Date Format"
                                            description="How dates are displayed"
                                        >
                                            <select
                                                value={preferences.dateFormat}
                                                onChange={(e) => setPreferences({ ...preferences, dateFormat: e.target.value })}
                                                className="px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                                            >
                                                <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                                                <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                                                <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                                            </select>
                                        </PreferenceRow>
                                    </div>

                                    <div className="pt-6 mt-6 border-t border-slate-200">
                                        <button
                                            onClick={handlePreferencesUpdate}
                                            disabled={loading}
                                            className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-50"
                                        >
                                            <Save size={18} />
                                            {loading ? "Saving..." : "Save Preferences"}
                                        </button>
                                    </div>
                                </div>

                                {/* Danger Zone */}
                                <div className="bg-red-50 border-2 border-red-200 rounded-2xl p-8">
                                    <div className="flex items-center gap-3 mb-4">
                                        <AlertCircle size={24} className="text-red-600" />
                                        <h2 className="text-xl font-bold text-red-900">Danger Zone</h2>
                                    </div>
                                    <p className="text-sm text-red-700 mb-6">
                                        These actions are irreversible. Please proceed with caution.
                                    </p>
                                    <button className="px-6 py-3 bg-red-600 text-white rounded-xl font-semibold hover:bg-red-700 transition-colors">
                                        Delete Account
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}

function PasswordInput({ label, value, onChange, showPassword, toggleShow }) {
    return (
        <div>
            <label className="block text-sm font-semibold text-slate-700 mb-2">
                {label}
            </label>
            <div className="relative">
                <input
                    type={showPassword ? "text" : "password"}
                    value={value}
                    onChange={onChange}
                    className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none pr-12"
                    required
                />
                <button
                    type="button"
                    onClick={toggleShow}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
            </div>
        </div>
    );
}

function ToggleSwitch({ enabled, onChange }) {
    return (
        <button
            type="button"
            onClick={() => onChange(!enabled)}
            className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors ${enabled ? "bg-blue-600" : "bg-slate-300"
                }`}
        >
            <span
                className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${enabled ? "translate-x-6" : "translate-x-1"
                    }`}
            />
        </button>
    );
}

function NotificationRow({ icon, title, description, enabled, onChange }) {
    return (
        <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0">
            <div className="flex items-start gap-3">
                <div className="text-slate-400 mt-1">{icon}</div>
                <div>
                    <h3 className="font-semibold text-slate-800">{title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{description}</p>
                </div>
            </div>
            <ToggleSwitch enabled={enabled} onChange={onChange} />
        </div>
    );
}

function PreferenceRow({ icon, title, description, children }) {
    return (
        <div className="flex items-start justify-between py-4 border-b border-slate-100 last:border-0">
            <div className="flex items-start gap-3">
                <div className="text-slate-400 mt-1">{icon}</div>
                <div>
                    <h3 className="font-semibold text-slate-800">{title}</h3>
                    <p className="text-sm text-slate-500 mt-1">{description}</p>
                </div>
            </div>
            {children}
        </div>
    );
}
