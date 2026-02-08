// // "use client";

// // import { useState } from "react";
// // import { useRouter } from "next/navigation";
// // import { Landmark, ChevronDown, Check, X } from "lucide-react";
// // import toast from "react-hot-toast";

// // // const PH_BANKS = [
// // //     "BDO Unibank",
// // //     "Bank of the Philippine Islands (BPI)",
// // //     "Metropolitan Bank and Trust Company (Metrobank)",
// // //     "Land Bank of the Philippines",
// // //     "Philippine National Bank (PNB)",
// // //     "Security Bank",
// // //     "China Banking Corporation (China Bank)",
// // //     "Union Bank of the Philippines",
// // //     "GCash / GCash Padala",
// // //     "Maya (formerly PayMaya)",


// // // ];


// // const PH_BANKS = [
// //     "BDO Unibank, Inc.",
// //     "Metropolitan Bank and Trust Company (Metrobank)",
// //     "Bank of the Philippine Islands (BPI)",
// //     "Land Bank of the Philippines",
// //     "GCash / GCash Padala",
// //     "Maya (formerly PayMaya)",
// //     "Philippine National Bank (PNB)",
// //     "Security Bank Corporation (Security Bank)",
// //     "China Banking Corporation (Chinabank)",
// //     "Development Bank of the Philippines (DBP)",
// //     "Union Bank of the Philippines, Inc. (UnionBank)",
// //     "Rizal Commercial Banking Corporation (RCBC)",
// //     "United Coconut Planters Bank (UCPB)",
// //     "East West Banking Corporation (EastWest Bank)",
// //     "Citibank Philippines",
// //     "Asia United Bank Corporation (AUB)",
// //     "The Hongkong and Shanghai Banking Corporation Limited (HSBC)",
// //     "Philippine Trust Company (Philtrust Bank)",
// //     "Bank of Commerce",
// //     "Maybank Philippines, Inc.",
// //     "Robinsons Bank Corporation",
// //     "Philippine Bank of Communications (PBCom)",
// //     "Mizuho Bank, Ltd. – Manila Branch",
// //     "MUFG Bank, Ltd.",
// //     "BDO Private Bank",
// //     "Standard Chartered Bank Philippines",
// //     "Deutsche Bank",
// //     "Philippine Veterans Bank (Veterans Bank; PVB)",
// //     "CTBC Bank (Chinatrust)",
// //     "JPMorgan Chase & Co. (JPMorgan Chase)",
// //     "Australia and New Zealand Banking Group (ANZ)",
// //     "Sumitomo Mitsui Banking Corporation – Manila Branch",
// //     "ING Group N.V.",
// //     "Bank of America, N.A.",
// //     "Bank of China – Manila Branch",
// //     "Mega International Commercial Bank Co., Ltd.",
// //     "KEB Hana Bank – Manila Branch",
// //     "Bangkok Bank Co., Ltd.",
// //     "Industrial Bank of Korea – Manila Branch",
// //     "United Overseas Bank Limited – Manila Branch",
// //     "Cathay United Bank Co., Ltd. – Manila Branch",
// //     "Shinhan Bank – Manila Branch",
// //     "Hua Nan Commercial Bank Ltd. – Manila",
// //     "First Commercial Bank – Manila",
// //     "Al-Amanah Islamic Investment Bank of the Philippines"
// // ];

// // export default function BankAction({ onClose }) { // Added onClose prop from your Dashboard usage
// //     const router = useRouter();
// //     const [isOpen, setIsOpen] = useState(false);
// //     const [showModal, setShowModal] = useState(false);
// //     const [selectedBank, setSelectedBank] = useState("");
// //     const [loading, setLoading] = useState(false); // Add loading state

// //     const [form, setForm] = useState({
// //         accountName: "",
// //         accountNumber: "",
// //     });

// //     const handleSave = async () => {
// //         if (!form.accountName || !form.accountNumber) {
// //             toast.error("Please fill in all fields");
// //             return;
// //         }

// //         setLoading(true);
// //         const toastId = toast.loading("Saving bank details...");

// //         try {
// //             const res = await fetch("/api/bank", {
// //                 method: "POST",
// //                 headers: { "Content-Type": "application/json" },
// //                 body: JSON.stringify({
// //                     bank: selectedBank,
// //                     ...form,
// //                 }),
// //             });

// //             if (!res.ok) throw new Error("Failed to save bank");

// //             // Success handling
// //             toast.success("Bank account linked successfully!", { id: toastId });
// //             setShowModal(false);
// //             if (onClose) onClose(); // Close the parent modal state
// //             router.refresh();
// //         } catch (error) {
// //             toast.error("Could not save bank details. Try again.", { id: toastId });
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     return (
// //         <>
// //             {/* If used as a standalone selector */}
// //             <div className="relative w-full">
// //                 <button
// //                     onClick={() => setIsOpen(!isOpen)}
// //                     className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl w-full text-left hover:border-blue-300 hover:shadow-md transition-all"
// //                 >
// //                     <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
// //                         <Landmark className="text-blue-600" />
// //                     </div>

// //                     <div className="flex-1">
// //                         <p className="text-sm font-bold text-slate-800">
// //                             {selectedBank || "Add Bank Account"}
// //                         </p>
// //                         <p className="text-xs text-slate-400">
// //                             {selectedBank
// //                                 ? "Change your linked bank"
// //                                 : "Link your PH bank account"}
// //                         </p>
// //                     </div>

// //                     <ChevronDown
// //                         size={18}
// //                         className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
// //                     />
// //                 </button>

// //                 {isOpen && (
// //                     <div className="absolute z-60 mt-2 w-full bg-white border rounded-2xl shadow-xl max-h-60 overflow-y-auto p-2">
// //                         {PH_BANKS.map((bank) => (
// //                             <div
// //                                 key={bank}
// //                                 onClick={() => {
// //                                     setSelectedBank(bank);
// //                                     setIsOpen(false);
// //                                     setShowModal(true);
// //                                 }}
// //                                 className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 rounded-xl cursor-pointer"
// //                             >
// //                                 <span className="text-sm font-medium">{bank}</span>
// //                                 {selectedBank === bank && (
// //                                     <Check size={16} className="text-blue-600" />
// //                                 )}
// //                             </div>
// //                         ))}
// //                     </div>
// //                 )}
// //             </div>

// //             {/* MODAL */}
// //             {showModal && (
// //                 <div className="fixed inset-0 z-70 bg-black/40 flex items-center justify-center px-4">
// //                     <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-5 animate-in fade-in zoom-in">
// //                         <div className="flex justify-between items-center">
// //                             <h2 className="text-lg font-bold text-slate-800">
// //                                 {selectedBank}
// //                             </h2>
// //                             <button onClick={() => setShowModal(false)} disabled={loading}>
// //                                 <X className="text-slate-400" />
// //                             </button>
// //                         </div>

// //                         <div className="space-y-4">
// //                             <input
// //                                 type="text"
// //                                 placeholder="Account Name"
// //                                 className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
// //                                 value={form.accountName}
// //                                 onChange={(e) =>
// //                                     setForm({ ...form, accountName: e.target.value })
// //                                 }
// //                             />

// //                             <input
// //                                 type="text"
// //                                 placeholder="Account Number"
// //                                 className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
// //                                 value={form.accountNumber}
// //                                 onChange={(e) =>
// //                                     setForm({ ...form, accountNumber: e.target.value })
// //                                 }
// //                             />
// //                         </div>

// //                         <button
// //                             onClick={handleSave}
// //                             disabled={loading}
// //                             className={`w-full ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 rounded-xl font-semibold transition flex justify-center items-center`}
// //                         >
// //                             {loading ? "Processing..." : "Save Bank Details"}
// //                         </button>
// //                     </div>
// //                 </div>
// //             )}
// //         </>
// //     );
// // }

// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import { Landmark, ChevronDown, Check, X } from "lucide-react";
// import toast from "react-hot-toast";

// const PH_BANKS = [
//     "BDO Unibank, Inc.",
//     "Metropolitan Bank and Trust Company (Metrobank)",
//     "Bank of the Philippine Islands (BPI)",
//     "Land Bank of the Philippines",
//     "GCash / GCash Padala",
//     "Maya (formerly PayMaya)",
//     "Philippine National Bank (PNB)",
//     "Security Bank Corporation (Security Bank)",
//     "China Banking Corporation (Chinabank)",
//     "Development Bank of the Philippines (DBP)",
//     "Union Bank of the Philippines, Inc. (UnionBank)",
//     "Rizal Commercial Banking Corporation (RCBC)",
//     "United Coconut Planters Bank (UCPB)",
//     "East West Banking Corporation (EastWest Bank)",
//     "Citibank Philippines",
//     "Asia United Bank Corporation (AUB)",
//     "The Hongkong and Shanghai Banking Corporation Limited (HSBC)",
//     "Philippine Trust Company (Philtrust Bank)",
//     "Bank of Commerce",
//     "Maybank Philippines, Inc.",
//     "Robinsons Bank Corporation",
//     "Philippine Bank of Communications (PBCom)",
//     "Mizuho Bank, Ltd. – Manila Branch",
//     "MUFG Bank, Ltd.",
//     "BDO Private Bank",
//     "Standard Chartered Bank Philippines",
//     "Deutsche Bank",
//     "Philippine Veterans Bank (Veterans Bank; PVB)",
//     "CTBC Bank (Chinatrust)",
//     "JPMorgan Chase & Co. (JPMorgan Chase)",
//     "Australia and New Zealand Banking Group (ANZ)",
//     "Sumitomo Mitsui Banking Corporation – Manila Branch",
//     "ING Group N.V.",
//     "Bank of America, N.A.",
//     "Bank of China – Manila Branch",
//     "Mega International Commercial Bank Co., Ltd.",
//     "KEB Hana Bank – Manila Branch",
//     "Bangkok Bank Co., Ltd.",
//     "Industrial Bank of Korea – Manila Branch",
//     "United Overseas Bank Limited – Manila Branch",
//     "Cathay United Bank Co., Ltd. – Manila Branch",
//     "Shinhan Bank – Manila Branch",
//     "Hua Nan Commercial Bank Ltd. – Manila",
//     "First Commercial Bank – Manila",
//     "Al-Amanah Islamic Investment Bank of the Philippines"
// ];

// export default function BankAction({ onClose }) {
//     const router = useRouter();
//     const [isOpen, setIsOpen] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [selectedBank, setSelectedBank] = useState("");
//     const [loading, setLoading] = useState(false);

//     const [form, setForm] = useState({
//         accountName: "",
//         accountNumber: "",
//     });

//     const handleSave = async () => {
//         if (!form.accountName || !form.accountNumber) {
//             toast.error("Please fill in all fields");
//             return;
//         }

//         setLoading(true);
//         const toastId = toast.loading("Saving bank details...");

//         try {
//             const res = await fetch("/api/bank", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     bank: selectedBank,
//                     ...form,
//                 }),
//             });

//             if (!res.ok) throw new Error("Failed to save bank");

//             toast.success("Bank account linked successfully!", { id: toastId });
//             setShowModal(false);
//             if (onClose) onClose();
//             router.refresh();
//         } catch (error) {
//             toast.error("Could not save bank details. Try again.", { id: toastId });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleCancel = () => {
//         setShowModal(false);
//         setSelectedBank("");
//         setForm({ accountName: "", accountNumber: "" });
//     };

//     return (
//         <>
//             {/* Bank Selector */}
//             <div className="relative w-full">
//                 <button
//                     onClick={() => setIsOpen(!isOpen)}
//                     className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl w-full text-left hover:border-blue-300 hover:shadow-md transition-all"
//                 >
//                     <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
//                         <Landmark className="text-blue-600" />
//                     </div>

//                     <div className="flex-1">
//                         <p className="text-sm font-bold text-slate-800">
//                             {selectedBank || "Add Bank Account"}
//                         </p>
//                         <p className="text-xs text-slate-400">
//                             {selectedBank
//                                 ? "Change your linked bank"
//                                 : "Link your PH bank account"}
//                         </p>
//                     </div>

//                     <ChevronDown
//                         size={18}
//                         className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
//                     />
//                 </button>

//                 {isOpen && (
//                     <div className="absolute z-60 mt-2 w-full bg-white border rounded-2xl shadow-xl max-h-60 overflow-y-auto p-2">
//                         {PH_BANKS.map((bank) => (
//                             <div
//                                 key={bank}
//                                 onClick={() => {
//                                     setSelectedBank(bank);
//                                     setIsOpen(false);
//                                     setShowModal(true);
//                                 }}
//                                 className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 rounded-xl cursor-pointer"
//                             >
//                                 <span className="text-sm font-medium">{bank}</span>
//                                 {selectedBank === bank && (
//                                     <Check size={16} className="text-blue-600" />
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 )}
//             </div>

//             {/* MODAL */}
//             {showModal && (
//                 <div className="fixed inset-0 z-70 bg-black/40 flex items-center justify-center px-4">
//                     <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-5 animate-in fade-in zoom-in">
//                         <div className="flex justify-between items-center">
//                             <h2 className="text-lg font-bold text-slate-800">
//                                 {selectedBank}
//                             </h2>
//                             <button 
//                                 onClick={handleCancel} 
//                                 disabled={loading}
//                                 className="p-1 hover:bg-slate-100 rounded-lg transition disabled:opacity-50"
//                             >
//                                 <X className="text-slate-400" />
//                             </button>
//                         </div>

//                         <div className="space-y-4">
//                             <input
//                                 type="text"
//                                 placeholder="Account Name"
//                                 className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                                 value={form.accountName}
//                                 onChange={(e) =>
//                                     setForm({ ...form, accountName: e.target.value })
//                                 }
//                                 disabled={loading}
//                             />

//                             <input
//                                 type="text"
//                                 placeholder="Account Number"
//                                 className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
//                                 value={form.accountNumber}
//                                 onChange={(e) =>
//                                     setForm({ ...form, accountNumber: e.target.value })
//                                 }
//                                 disabled={loading}
//                             />
//                         </div>

//                         <div className="flex gap-3">
//                             <button
//                                 onClick={handleCancel}
//                                 disabled={loading}
//                                 className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleSave}
//                                 disabled={loading}
//                                 className={`flex-1 ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed`}
//                             >
//                                 {loading ? "Saving..." : "Save"}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </>
//     );
// }


"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Landmark, ChevronDown, Check, X } from "lucide-react";
import toast from "react-hot-toast";

const PH_BANKS = [
    "BDO Unibank, Inc.",
    "Metropolitan Bank and Trust Company (Metrobank)",
    "Bank of the Philippine Islands (BPI)",
    "Land Bank of the Philippines",
    "GCash / GCash Padala",
    "Maya (formerly PayMaya)",
    "Philippine National Bank (PNB)",
    "Security Bank Corporation (Security Bank)",
    "China Banking Corporation (Chinabank)",
    "Development Bank of the Philippines (DBP)",
    "Union Bank of the Philippines, Inc. (UnionBank)",
    "Rizal Commercial Banking Corporation (RCBC)",
    "United Coconut Planters Bank (UCPB)",
    "East West Banking Corporation (EastWest Bank)",
    "Citibank Philippines",
    "Asia United Bank Corporation (AUB)",
    "The Hongkong and Shanghai Banking Corporation Limited (HSBC)",
    "Philippine Trust Company (Philtrust Bank)",
    "Bank of Commerce",
    "Maybank Philippines, Inc.",
    "Robinsons Bank Corporation",
    "Philippine Bank of Communications (PBCom)",
    "Mizuho Bank, Ltd. – Manila Branch",
    "MUFG Bank, Ltd.",
    "BDO Private Bank",
    "Standard Chartered Bank Philippines",
    "Deutsche Bank",
    "Philippine Veterans Bank (Veterans Bank; PVB)",
    "CTBC Bank (Chinatrust)",
    "JPMorgan Chase & Co. (JPMorgan Chase)",
    "Australia and New Zealand Banking Group (ANZ)",
    "Sumitomo Mitsui Banking Corporation – Manila Branch",
    "ING Group N.V.",
    "Bank of America, N.A.",
    "Bank of China – Manila Branch",
    "Mega International Commercial Bank Co., Ltd.",
    "KEB Hana Bank – Manila Branch",
    "Bangkok Bank Co., Ltd.",
    "Industrial Bank of Korea – Manila Branch",
    "United Overseas Bank Limited – Manila Branch",
    "Cathay United Bank Co., Ltd. – Manila Branch",
    "Shinhan Bank – Manila Branch",
    "Hua Nan Commercial Bank Ltd. – Manila",
    "First Commercial Bank – Manila",
    "Al-Amanah Islamic Investment Bank of the Philippines"
];

export default function BankAction({ onClose }) {
    const router = useRouter();
    const [isOpen, setIsOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [selectedBank, setSelectedBank] = useState("");
    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        accountName: "",
        accountNumber: "",
    });

    const handleSave = async () => {
        if (!form.accountName || !form.accountNumber) {
            toast.error("Please fill in all fields");
            return;
        }

        setLoading(true);
        const toastId = toast.loading("Saving bank details...");

        try {
            const res = await fetch("/api/bank", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    bank: selectedBank,
                    ...form,
                }),
            });

            if (!res.ok) throw new Error("Failed to save bank");

            toast.success("Bank account linked successfully!", { id: toastId });
            setShowModal(false);
            if (onClose) onClose();
            router.refresh();
        } catch (error) {
            toast.error("Could not save bank details. Try again.", { id: toastId });
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setShowModal(false);
        setSelectedBank("");
        setForm({ accountName: "", accountNumber: "" });
    };

    return (
        <>
            {/* Bank Selector */}
            <div className="relative w-full">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-4 p-5 bg-white border border-slate-200 rounded-2xl w-full text-left hover:border-blue-300 hover:shadow-md transition-all"
                >
                    <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                        <Landmark className="text-blue-600" />
                    </div>

                <div className="flex items-center justify-between mb-6">
                    <div className="flex-1">
                        <p className="text-sm font-bold text-slate-800">
                            {selectedBank || "Add Bank Account"}
                        </p>
                        <p className="text-xs text-slate-400">
                            {selectedBank
                                ? "Change your linked bank"
                                : "Link your PH bank account"}
                        </p>

                    </div>
                    <button
        onClick={onClose}
        className="flex items-center justify-center w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 transition-all active:scale-95 ml-4"
        type="button"
    >
        <X className="w-5 h-5 text-slate-600" strokeWidth={2.5} />
    </button>
                    </div>

                    <ChevronDown
                        size={18}
                        className={`transition-transform ${isOpen ? "rotate-180" : ""}`}
                    />
                </button>

                {isOpen && (
                    <div className="absolute z-60 mt-2 w-full bg-white border rounded-2xl shadow-xl max-h-60 overflow-y-auto">
                        {/* Close/Cancel Button */}
                        <div className="sticky top-0 bg-white border-b border-slate-200 p-3 flex items-center justify-between rounded-t-2xl">
                            <p className="text-sm font-bold text-slate-700">Select Your Bank</p>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="p-1 hover:bg-slate-100 rounded-lg transition"
                            >
                                <X size={18} className="text-slate-400" />
                            </button>
                        </div>
                        
                        <div className="p-2">
                            {PH_BANKS.map((bank) => (
                                <div
                                    key={bank}
                                    onClick={() => {
                                        setSelectedBank(bank);
                                        setIsOpen(false);
                                        setShowModal(true);
                                    }}
                                    className="flex items-center justify-between px-4 py-3 hover:bg-blue-50 rounded-xl cursor-pointer"
                                >
                                    <span className="text-sm font-medium">{bank}</span>
                                    {selectedBank === bank && (
                                        <Check size={16} className="text-blue-600" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* MODAL */}
            {showModal && (
                <div className="fixed inset-0 z-70 bg-black/40 flex items-center justify-center px-4">
                    <div className="bg-white w-full max-w-md rounded-2xl p-6 space-y-5 animate-in fade-in zoom-in">
                        <div className="flex justify-between items-center">
                            <h2 className="text-lg font-bold text-slate-800">
                                {selectedBank}
                            </h2>
                            <button 
                                onClick={handleCancel} 
                                disabled={loading}
                                className="p-1 hover:bg-slate-100 rounded-lg transition disabled:opacity-50"
                            >
                                <X className="text-slate-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <input
                                type="text"
                                placeholder="Account Name"
                                className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                value={form.accountName}
                                onChange={(e) =>
                                    setForm({ ...form, accountName: e.target.value })
                                }
                                disabled={loading}
                            />

                            <input
                                type="text"
                                placeholder="Account Number"
                                className="w-full border rounded-xl px-4 py-3 text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                                value={form.accountNumber}
                                onChange={(e) =>
                                    setForm({ ...form, accountNumber: e.target.value })
                                }
                                disabled={loading}
                            />
                        </div>

                        <div className="flex gap-3">
                            <button
                                onClick={handleCancel}
                                disabled={loading}
                                className="flex-1 bg-slate-100 text-slate-700 py-3 rounded-xl font-semibold hover:bg-slate-200 transition disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                disabled={loading}
                                className={`flex-1 ${loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'} text-white py-3 rounded-xl font-semibold transition disabled:opacity-50 disabled:cursor-not-allowed`}
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
