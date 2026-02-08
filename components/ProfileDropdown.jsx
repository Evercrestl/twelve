// // "use client";
// // import { useState, useRef, useEffect } from "react";
// // import { useRouter } from "next/navigation";
// // import { User, Settings, LogOut, ChevronDown } from "lucide-react";
// // import toast from "react-hot-toast";

// // export default function ProfileDropdown({ user }) {
// //     const [isOpen, setIsOpen] = useState(false);
// //     const dropdownRef = useRef(null);
// //     const router = useRouter();

// //     // Close dropdown when clicking outside
// //     useEffect(() => {
// //         const handleClickOutside = (event) => {
// //             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
// //                 setIsOpen(false);
// //             }
// //         };

// //         document.addEventListener("mousedown", handleClickOutside);
// //         return () => document.removeEventListener("mousedown", handleClickOutside);
// //     }, []);

// //     const handleLogout = async () => {
// //         try {
// //             const res = await fetch("/api/auth/logout", {
// //                 method: "POST",
// //                 credentials: "include",
// //             });

// //             if (res.ok) {
// //                 toast.success("Logged out successfully");
// //                 window.location.href = "/";
// //             } else {
// //                 toast.error("Logout failed");
// //             }
// //         } catch (error) {
// //             toast.error("An error occurred");
// //         }
// //     };

// //     return (
// //         <div className="relative" ref={dropdownRef}>
// //             {/* Profile Button */}
// //             <button
// //                 onClick={() => setIsOpen(!isOpen)}
// //                 className="flex items-center gap-3 pl-6 border-l border-slate-200 hover:bg-slate-50 p-2 rounded-lg transition-colors cursor-pointer"
// //             >
// //                 <div className="text-right">
// //                     <p className="text-sm font-bold text-slate-800">{user.name}</p>
// //                     <p className="text-[10px] text-slate-500 font-bold uppercase">Premium Member</p>
// //                 </div>
// //                 <img
// //                     src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
// //                     className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50"
// //                     alt="avatar"
// //                 />
// //                 <ChevronDown 
// //                     size={16} 
// //                     className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
// //                 />
// //             </button>

// //             {/* Dropdown Menu */}
// //             {isOpen && (
// //                 <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
// //                     {/* User Info */}
// //                     <div className="px-4 py-3 border-b border-slate-100">
// //                         <p className="text-sm font-bold text-slate-800">{user.name}</p>
// //                         <p className="text-xs text-slate-500">{user.email}</p>
// //                     </div>

// //                     {/* Menu Items */}
// //                     <div className="py-2">
// //                         <button
// //                             onClick={() => {
// //                                 router.push("/dashboard");
// //                                 setIsOpen(false);
// //                             }}
// //                             className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
// //                         >
// //                             <User size={16} />
// //                             <span>My Profile</span>
// //                         </button>

// //                         <button
// //                             onClick={() => {
// //                                 router.push("/settings");
// //                                 setIsOpen(false);
// //                             }}
// //                             className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
// //                         >
// //                             <Settings size={16} />
// //                             <span>Settings</span>
// //                         </button>
// //                     </div>

// //                     {/* Logout */}
// //                     <div className="border-t border-slate-100 pt-2">
// //                         <button
// //                             onClick={handleLogout}
// //                             className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
// //                         >
// //                             <LogOut size={16} />
// //                             <span>Logout</span>
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //         </div>
// //     );
// // }


// "use client";
// import { useState, useRef, useEffect } from "react";
// import { useRouter } from "next/navigation";
// import { User, Settings, LogOut, ChevronDown, Wallet, History } from "lucide-react";
// import toast from "react-hot-toast";

// export default function ProfileDropdown({ user }) {
//     const [isOpen, setIsOpen] = useState(false);
//     const dropdownRef = useRef(null);
//     const router = useRouter();

//     // Close dropdown when clicking outside
//     useEffect(() => {
//         const handleClickOutside = (event) => {
//             if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//                 setIsOpen(false);
//             }
//         };

//         document.addEventListener("mousedown", handleClickOutside);
//         return () => document.removeEventListener("mousedown", handleClickOutside);
//     }, []);

//     const handleLogout = async () => {
//         try {
//             const res = await fetch("/api/auth/logout", {
//                 method: "POST",
//                 credentials: "include",
//             });

//             if (res.ok) {
//                 toast.success("Logged out successfully");
//                 window.location.href = "/";
//             } else {
//                 toast.error("Logout failed");
//             }
//         } catch (error) {
//             toast.error("An error occurred");
//         }
//     };

//     return (
//         <div className="relative" ref={dropdownRef}>
//             {/* Profile Button */}
//             <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="flex items-center gap-3 pl-6 border-l border-slate-200 hover:bg-slate-50 p-2 rounded-lg transition-colors cursor-pointer"
//             >
//                 <div className="text-right">
//                     <p className="text-sm font-bold text-slate-800">{user.name}</p>
//                     <p className="text-[10px] text-slate-500 font-bold uppercase">Premium Member</p>
//                 </div>
//                 <img
//                     src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`}
//                     className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50"
//                     alt="avatar"
//                 />
//                 <ChevronDown 
//                     size={16} 
//                     className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
//                 />
//             </button>

//             {/* Dropdown Menu */}
//             {isOpen && (
//                 <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-50">
//                     {/* User Info */}
//                     <div className="px-4 py-3 border-b border-slate-100">
//                         <p className="text-sm font-bold text-slate-800">{user.name}</p>
//                         <p className="text-xs text-slate-500">{user.email}</p>
//                     </div>

//                     {/* Menu Items */}
//                     <div className="py-2">
//                         <button
//                             onClick={() => {
//                                 router.push("/profile");
//                                 setIsOpen(false);
//                             }}
//                             className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
//                         >
//                             <User size={16} />
//                             <span>My Profile</span>
//                         </button>

//                         <button
//                             onClick={() => {
//                                 router.push("/loans");
//                                 setIsOpen(false);
//                             }}
//                             className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
//                         >
//                             <Wallet size={16} />
//                             <span>Loans</span>
//                         </button>

//                         <button
//                             onClick={() => {
//                                 router.push("/transactions");
//                                 setIsOpen(false);
//                             }}
//                             className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
//                         >
//                             <History size={16} />
//                             <span>Transactions</span>
//                         </button>

//                         <button
//                             onClick={() => {
//                                 router.push("/settings");
//                                 setIsOpen(false);
//                             }}
//                             className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
//                         >
//                             <Settings size={16} />
//                             <span>Settings</span>
//                         </button>
//                     </div>

//                     {/* Logout */}
//                     <div className="border-t border-slate-100 pt-2">
//                         <button
//                             onClick={handleLogout}
//                             className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
//                         >
//                             <LogOut size={16} />
//                             <span>Logout</span>
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { User, Settings, LogOut, ChevronDown, Wallet, History } from "lucide-react";
import toast from "react-hot-toast";

export default function ProfileDropdown({ user }) {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const dropdownRef = useRef(null);
    const router = useRouter();

    // Validate user prop
    if (!user) {
        console.error("ProfileDropdown: user prop is required");
        return null;
    }

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = async () => {
        if (isLoggingOut) return; // Prevent double-clicks

        setIsLoggingOut(true);

        try {
            const res = await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!res.ok) {
                const errorData = await res.json().catch(() => ({}));
                throw new Error(errorData.message || `Logout failed with status ${res.status}`);
            }

            toast.success("Logged out successfully");
            window.location.href = "/";
        } catch (error) {
            console.error("Logout error:", error);
            toast.error(error.message || "Failed to logout. Please try again.");
            setIsLoggingOut(false);
        }
    };

    const handleNavigation = (path) => {
        try {
            setIsOpen(false);
            router.push(path);
        } catch (error) {
            console.error(`Navigation error to ${path}:`, error);
            toast.error("Navigation failed. Please try again.");
        }
    };

    return (
        <div className="relative z-100" ref={dropdownRef}>
            {/* Profile Button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center gap-3 pl-6 border-l border-slate-200 hover:bg-slate-50 p-2 rounded-lg transition-colors cursor-pointer"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <div className="text-right">
                    <p className="text-sm font-bold text-slate-800 capitalize">
                        {user.name || "User"}
                    </p>
                    {/* <p className="text-[10px] text-slate-500 font-bold uppercase">
                        Premium Member
                    </p> */}
                </div>
                <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name || "default")}`}
                    className="w-10 h-10 rounded-full border border-slate-200 bg-slate-50"
                    alt={`${user.name}'s avatar`}
                    onError={(e) => {
                        e.target.src = "/default-avatar.png"; // Fallback image
                    }}
                />
                <ChevronDown
                    size={16}
                    className={`text-slate-400 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-200 py-2 z-100">
                    {/* User Info */}
                    <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-bold text-slate-800 truncate">
                            {user.name || "User"}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                            {user.email || "No email"}
                        </p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-2">
                        <button
                            onClick={() => handleNavigation("/profile")}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            <User size={16} />
                            <span>My Profile</span>
                        </button>

                        <button
                            onClick={() => handleNavigation("/loans")}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            <Wallet size={16} />
                            <span>Loans</span>
                        </button>

                        <button
                            onClick={() => handleNavigation("/transactions")}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            <History size={16} />
                            <span>Transactions</span>
                        </button>

                        <button
                            onClick={() => handleNavigation("/settings")}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50 transition-colors"
                        >
                            <Settings size={16} />
                            <span>Settings</span>
                        </button>
                    </div>

                    {/* Logout */}
                    <div className="border-t border-slate-100 pt-2">
                        <button
                            onClick={handleLogout}
                            disabled={isLoggingOut}
                            className="w-full flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <LogOut size={16} />
                            <span>{isLoggingOut ? "Logging out..." : "Logout"}</span>
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}