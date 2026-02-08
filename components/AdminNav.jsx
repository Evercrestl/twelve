"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Users, FileText, LogOut, Menu, X, MessagesSquare } from "lucide-react";
import toast from "react-hot-toast";

export default function AdminNav({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
            });

            if (res.ok) {
                toast.success("Logged out successfully");
                router.push("/");
            } else {
                toast.error("Logout failed");
            }
        } catch (error) {
            toast.error("An error occurred");
        }
    };

    const navLinks = [
        { name: "Approvals", href: "/admin", icon: <FileText size={20} /> },
        { name: "Users", href: "/admin/users", icon: <Users size={20} /> },
        { name: "Messages", href: "/admin/messages", icon: <MessagesSquare size={20} /> },
    ];

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <Link href="/admin" className="flex items-center">
                        <img src="/logo.png" alt="Logo" className="h-10 w-auto" />
                        <span className="ml-2 text-sm font-bold text-slate-600">Admin Panel</span>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                href={link.href}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-colors ${
                                    pathname === link.href
                                        ? "bg-blue-50 text-blue-600"
                                        : "text-slate-600 hover:bg-slate-50"
                                }`}
                            >
                                {link.icon}
                                {link.name}
                            </Link>
                        ))}
                        
                        <div className="h-8 w-px bg-slate-200"></div>
                        
                        <div className="flex items-center gap-3">
                            <div className="text-right">
                                <p className="text-sm font-bold text-slate-800">{user.name}</p>
                                <p className="text-xs text-slate-500 uppercase">Admin</p>
                            </div>
                            <img
                                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
                                className="w-10 h-10 rounded-full border border-slate-200"
                                alt="avatar"
                            />
                        </div>
                        
                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold transition-colors"
                        >
                            <LogOut size={20} />
                            Logout
                        </button>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                        <button onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <div className="md:hidden bg-white border-t p-4 space-y-2">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={() => setIsOpen(false)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold ${
                                pathname === link.href
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-slate-600"
                            }`}
                        >
                            {link.icon}
                            {link.name}
                        </Link>
                    ))}
                    <button
                        onClick={() => {
                            handleLogout();
                            setIsOpen(false);
                        }}
                        className="w-full flex items-center gap-2 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg font-semibold"
                    >
                        <LogOut size={20} />
                        Logout
                    </button>
                </div>
            )}
        </nav>
    );
}
