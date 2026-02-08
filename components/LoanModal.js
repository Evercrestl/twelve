// "use client"
// import { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { X } from 'lucide-react';

// const LoanModal = ({ isOpen, onClose }) => {
//   const [amount, setAmount] = useState(400000);
//   const [months, setMonths] = useState(7);
//   const [monthlyRepayment, setMonthlyRepayment] = useState(0);

//   const interestRate = 0.05; // 5% Fixed

//   useEffect(() => {
//     const totalToPay = amount + (amount * interestRate);
//     const monthly = totalToPay / months;
//     setMonthlyRepayment(monthly);
//   }, [amount, months]);

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm pt-16 md:pt-32">
//       <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative p-6 animate-in fade-in zoom-in duration-200">

//         {/* Header */}
//         <div className="flex justify-between items-center mb-6">
//           <h2 className="text-2xl font-bold text-gray-900">Loan Calculator</h2>
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
//             <X size={24} />
//           </button>
//         </div>

//         <p className="text-blue-600 font-semibold mb-6">5% Fixed Interest</p>

//         {/* Loan Amount Slider */}
//         <div className="space-y-4 mb-8">
//           <div className="flex justify-between">
//             <label className="text-gray-700 font-medium">Loan Amount (R)</label>
//           </div>
//           <input 
//             type="range" 
//             min="10000" 
//             max="1000000" 
//             step="1000"
//             value={amount}
//             onChange={(e) => setAmount(Number(e.target.value))}
//             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
//           />
//           <p className="text-xl font-bold text-gray-900">R{amount.toLocaleString()}</p>
//         </div>

//         {/* Repayment Period Slider */}
//         <div className="space-y-4 mb-8">
//           <label className="text-gray-700 font-medium">Repayment Period (Months)</label>
//           <input 
//             type="range" 
//             min="1" 
//             max="12" 
//             value={months}
//             onChange={(e) => setMonths(Number(e.target.value))}
//             className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
//           />
//           <p className="text-xl font-bold text-gray-900">{months} months</p>
//         </div>

//         {/* Repayment Display Box */}
//         <div className="bg-blue-50/50 border border-blue-100 rounded-xl p-8 text-center mb-6">
//           <p className="text-gray-600 mb-2">Monthly Repayment</p>
//           <p className="text-3xl font-black text-gray-900">
//             R{monthlyRepayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
//           </p>
//         </div>

//         {/* Action Button */}
//         <Link href="/register">
//         <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg shadow-blue-200">
//           Get Started
//         </button>
//         </Link>
//       </div>
//     </div>
//   );
// };

// export default LoanModal;

"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { X } from 'lucide-react';

const LoanModal = ({ isOpen, onClose }) => {
  const [amount, setAmount] = useState(400000);
  const [months, setMonths] = useState(7);
  const [monthlyRepayment, setMonthlyRepayment] = useState(0);

  const interestRate = 0.05; // 5% Fixed

  useEffect(() => {
    const totalToPay = amount + (amount * interestRate);
    const monthly = totalToPay / months;
    setMonthlyRepayment(monthly);

    // Lock body scroll when modal is open
    if (isOpen) document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, [amount, months, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden relative p-5 animate-in fade-in zoom-in duration-200">

        {/* Header - Reduced margin */}
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-xl font-bold text-gray-900">Loan Calculator</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
            <X size={22} />
          </button>
        </div>

        <p className="text-blue-600 text-sm font-semibold mb-4">5% Fixed Interest</p>

        {/* Loan Amount Slider - Compact spacing */}
        <div className="space-y-2 mb-5">
          <label className="text-sm text-gray-700 font-medium">Loan Amount (R)</label>
          <input
            type="range"
            min="10000"
            max="3000000"
            step="1000"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <p className="text-lg font-bold text-gray-900 leading-none">R{amount.toLocaleString()}</p>
        </div>

        {/* Repayment Period Slider - Compact spacing */}
        <div className="space-y-2 mb-5">
          <label className="text-sm text-gray-700 font-medium">Repayment Period (Months)</label>
          <input
            type="range"
            min="1"
            max="60"
            value={months}
            onChange={(e) => setMonths(Number(e.target.value))}
            className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
          />
          <p className="text-lg font-bold text-gray-900 leading-none">{months} months</p>
        </div>

        {/* Repayment Display Box - Reduced padding */}
        <div className="bg-blue-50/50 border border-blue-100 rounded-xl py-4 px-6 text-center mb-5">
          <p className="text-xs text-gray-600 uppercase tracking-wide mb-1">Monthly Repayment</p>
          <p className="text-2xl font-black text-gray-900">
            R{monthlyRepayment.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
        </div>

        {/* Action Button - Slightly shorter padding */}
        <Link href="/register" className="block">
          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-200">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default LoanModal;