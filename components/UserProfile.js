"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LogOut, User, Settings, ChevronDown, AlertCircle, Loader2 } from "lucide-react";

export default function UserProfile({ userName }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Loading state
    const dropdownRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        setIsLoading(true); // Start loading
        try {
            const res = await fetch("/api/auth/logout", { method: "POST" });
            if (res.ok) {
                router.push("/login");
                router.refresh();
            } else {
                setIsLoading(false); // Stop loading if failed
            }
        } catch (error) {
            console.error("Logout failed", error);
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="relative" ref={dropdownRef}>
                <button
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="flex items-center gap-3 pl-6 border-l border-slate-200 group transition-all"
                >
                    <div className="text-right hidden sm:block">
                        <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors">
                            {userName}
                        </p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-tight">Premium Member</p>
                    </div>
                    <div className="relative">
                        <img
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${userName}`}
                            className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50 group-hover:border-blue-300 transition-all"
                            alt="avatar"
                        />
                        <div className="absolute -bottom-1 -right-1 bg-white rounded-full border border-slate-200 p-0.5">
                            <ChevronDown size={12} className={`text-slate-400 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
                        </div>
                    </div>
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 mt-3 w-48 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in duration-150">
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                            <User size={16} /> Profile Settings
                        </button>
                        <button className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-600 hover:bg-slate-50 transition-colors">
                            <Settings size={16} /> Security
                        </button>
                        <hr className="my-1 border-slate-50" />
                        <button
                            onClick={() => {
                                setIsMenuOpen(false);
                                setShowLogoutModal(true);
                            }}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors font-semibold"
                        >
                            <LogOut size={16} /> Logout
                        </button>
                    </div>
                )}
            </div>

            {showLogoutModal && (
                <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
                    <div
                        className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={!isLoading ? () => setShowLogoutModal(false) : undefined}
                    ></div>

                    <div className="relative bg-white rounded-4xl p-8 max-w-sm w-full shadow-2xl animate-in zoom-in slide-in-from-bottom-4 duration-200">
                        <div className="flex flex-col items-center text-center">
                            <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mb-4">
                                <AlertCircle className="text-red-500 w-8 h-8" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">Confirm Logout</h3>
                            <p className="text-slate-500 mb-8">Are you sure you want to sign out? You will need to log back in to access your dashboard.</p>

                            <div className="flex gap-3 w-full">
                                <button
                                    disabled={isLoading}
                                    onClick={() => setShowLogoutModal(false)}
                                    className="flex-1 px-6 py-3 rounded-xl border border-slate-200 font-bold text-slate-600 hover:bg-slate-50 transition-all disabled:opacity-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    disabled={isLoading}
                                    onClick={handleLogout}
                                    className="flex-1 px-6 py-3 rounded-xl bg-red-500 font-bold text-white hover:bg-red-600 shadow-lg shadow-red-200 transition-all active:scale-95 disabled:bg-red-400 flex items-center justify-center"
                                >
                                    {isLoading ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        "Logout"
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}