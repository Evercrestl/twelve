// // // "use client";

// // // import { useEffect, useState } from "react";
// // // import PaymentModal from "@/components/PaymentModal";
// // // import BankAction from "@/components/BankSelect";

// // // export default function DashboardClient({
// // //   user,
// // //   totalLoan,
// // //   securityDeposit,
// // //   depositPercentage,
// // //   depositTx,
// // //   withdrawalTx,
// // //   bank,
// // // }) {
// // //   const [showBankModal, setShowBankModal] = useState(false);
// // //   const [isFinalizing, setIsFinalizing] = useState(false);
// // //   const [spinning, setSpinning] = useState(false);

// // //   useEffect(() => {
// // //     if (isFinalizing) {
// // //       setSpinning(true);
// // //       const timer = setTimeout(() => {
// // //         setSpinning(false);
// // //       }, 20000);
// // //       return () => clearTimeout(timer);
// // //     }
// // //   }, [isFinalizing]);

// // //   const isDepositPaid = depositTx?.status === "completed" || user?.loanStatus?.depositPaid;
// // //   const hasBankDetails = Boolean(bank);
// // //   const isAwaitingWithdrawal = withdrawalTx?.status === "awaiting_bank";

// // //   return (
// // //     <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-50">
      
// // //       {/* THE PERSISTENT CARD CONTAINER */}
// // //       <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full border border-gray-100 min-h-75 flex flex-col items-center justify-center text-center">
        
// // //         {/* STATE 1: 40-Second Processing (Inline) */}
// // //         {isFinalizing && spinning ? (
// // //           <div className="animate-in fade-in duration-500 flex flex-col items-center">
// // //             <h3 className="text-xl font-bold text-slate-800">Withdrawal Processing</h3>
// // //             <p className="text-sm text-slate-500 mt-3 leading-relaxed">
// // //               Your bank details have been verified.
// // //               <br />
// // //               Please stay on this page while we finalize your loan disbursement.
// // //             </p>
// // //             <div className="mt-8 flex flex-col items-center">
// // //               <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
// // //               <span className="mt-4 text-[10px] font-bold text-green-600 uppercase tracking-widest animate-pulse">
// // //                 Securing Transfer...
// // //               </span>
// // //             </div>
// // //           </div>
// // //         ) : 

// // //         /* STATE 2: Success Message (Inline) */
// // //         isFinalizing && !spinning ? (
// // //           <div className="animate-in zoom-in duration-500">
// // //             <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
// // //               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// // //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
// // //               </svg>
// // //             </div>
// // //             <h1 className="text-2xl font-bold text-green-600">Transfer Processing</h1>
// // //             <p className="text-gray-500 mt-2">
// // //               Your funds are being processed to be disbursed to your bank account.
// // //             </p>
// // //           </div>
// // //         ) : (

// // //           /* STATE 3: The Steps Workflow (Inline) */
// // //           <div className="w-full space-y-6 animate-in fade-in">
// // //             <div className="mb-6">
// // //               <h2 className="text-2xl font-black text-slate-900">Loan Dashboard</h2>
// // //               <p className="text-slate-400 text-sm">Please complete the required actions.</p>
// // //             </div>

// // //             {!isDepositPaid ? (
// // //               <PaymentModal
// // //                 triggerLabel="Pay Security Deposit"
// // //                 loanAmount={totalLoan}
// // //                 deposit={securityDeposit}
// // //                 percentage={depositPercentage}
// // //               />
// // //             ) : !hasBankDetails ? (
// // //               <button
// // //                 onClick={() => setShowBankModal(true)}
// // //                 className="w-full px-8 py-5 rounded-2xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-all active:scale-95"
// // //               >
// // //                 Add Bank Details
// // //               </button>
// // //             ) : isAwaitingWithdrawal ? (
// // //               <button
// // //                 onClick={() => setIsFinalizing(true)}
// // //                 className="w-full px-8 py-5 rounded-2xl font-bold bg-green-600 text-white hover:bg-green-700 shadow-lg transition-all active:scale-95"
// // //               >
// // //                 Make Withdrawal
// // //               </button>
// // //             ) : (
// // //               <p className="text-gray-400 italic">No pending actions available.</p>
// // //             )}
// // //           </div>
// // //         )}
// // //       </div>

// // //       {/* --- EXTERNAL POPUPS --- */}

// // //       {/* Bank Details Modal (Renders as Pop-up) */}
// // //       {showBankModal && (
// // //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
// // //           <BankAction
// // //             withdrawalId={withdrawalTx?._id}
// // //             amount={withdrawalTx?.amount}
// // //             onClose={() => setShowBankModal(false)}
// // //           />
// // //         </div>
// // //       )}
// // //     </div>
// // //   );
// // // }

// // // continue from here

// // "use client";

// // import { useEffect, useState } from "react";
// // import PaymentModal from "@/components/PaymentModal";
// // import BankAction from "@/components/BankSelect";

// // export default function DashboardClient({
// //   user,
// //   totalLoan,
// //   securityDeposit,
// //   depositPercentage,
// //   depositTx,
// //   withdrawalTx,
// //   bank,
// // }) {
// //   const [showBankModal, setShowBankModal] = useState(false);
// //   // Changed: Check if the withdrawal is already processing from props to persist on reload
// //   const [isFinalizing, setIsFinalizing] = useState(withdrawalTx?.status === "processing");
// //   const [spinning, setSpinning] = useState(false);

// //   const fullAmount = totalLoan + securityDeposit;

// // const [displayBalance, setDisplayBalance] = useState(() => {
// //   // If withdrawal is already processing in the DB, show 0
// //   if (withdrawalTx && withdrawalTx.status === "processing") return 0;
// //   // If deposit isn't done, show base loan
// //   if (!depositTx || depositTx.status !== "completed") return totalLoan;
// //   // Fallback to full amount
// //   return fullAmount;
// // });


// //   useEffect(() => {
// //     if (isFinalizing) {
// //       setSpinning(true);
// //       const timer = setTimeout(() => {
// //         setSpinning(false);
// //       }, 20000);
// //       return () => clearTimeout(timer);
// //     }
// //   }, [isFinalizing]);

// //   // Logic helpers based on server data (Persistent)
// //   const isDepositPaid = depositTx?.status === "completed" || user?.loanStatus?.depositPaid;
// //   const hasBankDetails = Boolean(bank);
  
// //   // Withdrawal is available only if deposit is paid and bank is added
// //   const canWithdraw = isDepositPaid && hasBankDetails && withdrawalTx?.status === "awaiting_bank";
  
// //   // Final state: Success message stays if the transaction is finished or we just finished the timer
// //   const isTransactionComplete = withdrawalTx?.status === "completed" || (isFinalizing && !spinning);

// //   const handleMakeWithdrawal = async () => {
// //     setIsFinalizing(true);
// //     // OPTIONAL: Add an API call here to update withdrawalTx.status to "processing" in DB
// //     // await fetch('/api/withdraw/finalize', { method: 'POST', body: JSON.stringify({ id: withdrawalTx._id }) });
// //     setIsFinalizing(true);
// //   setDisplayBalance(0);
// //   };

// //   return (
// //     <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-50">
// //       <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full border border-gray-100 min-h-75 flex flex-col items-center justify-center text-center">
        
// //         {/* CASE A: The 20-Second Loading Spinner */}
// //         {isFinalizing && spinning ? (
// //           <div className="animate-in fade-in duration-500 flex flex-col items-center">
// //             <h3 className="text-xl font-bold text-slate-800">Withdrawal Processing</h3>
// //             <p className="text-sm text-slate-500 mt-3 leading-relaxed">
// //               Your bank details have been verified. <br />
// //               Please stay on this page while we finalize your loan disbursement.
// //             </p>
// //             <div className="mt-8 flex flex-col items-center">
// //               <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
// //               <span className="mt-4 text-[10px] font-bold text-green-600 uppercase tracking-widest animate-pulse">
// //                 Securing Transfer...
// //               </span>
// //             </div>
// //           </div>
// //         ) : 

// //         /* CASE B: Final Success State (Persistent) */
// //         isTransactionComplete ? (
// //           <div className="animate-in zoom-in duration-500">
// //             <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
// //               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
// //                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
// //               </svg>
// //             </div>
// //             <h1 className="text-2xl font-bold text-green-600">Transfer Processing</h1>
// //             <p className="text-gray-500 mt-2">
// //               Your funds are being processed to be disbursed to your bank account.
// //             </p>
// //           </div>
// //         ) : (

// //           /* CASE C: Sequential Workflow Steps */
// //           <div className="w-full space-y-6 animate-in fade-in">
// //             <div className="mb-6">
// //               <h2 className="text-2xl font-black text-slate-900">Loan Dashboard</h2>
// //               <p className="text-slate-400 text-sm">Please complete the required actions.</p>
// //             </div>

// //             {/* Step 1: Deposit */}
// //             {!isDepositPaid ? (
// //               <PaymentModal
// //                 triggerLabel="Pay Security Deposit"
// //                 loanAmount={totalLoan}
// //                 deposit={securityDeposit}
// //                 percentage={depositPercentage}
// //               />
// //             ) : 
// //             /* Step 2: Bank Details (Only shows if Deposit is Done) */
// //             !hasBankDetails ? (
// //               <button
// //                 onClick={() => setShowBankModal(true)}
// //                 className="w-full px-8 py-5 rounded-2xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-all active:scale-95"
// //               >
// //                 Add Bank Details
// //               </button>
// //             ) : 
// //             /* Step 3: Final Withdrawal (Only shows if Bank is Done) */
// //             canWithdraw ? (
// //               <button
// //                 onClick={handleMakeWithdrawal}
// //                 className="w-full px-8 py-5 rounded-2xl font-bold bg-green-600 text-white hover:bg-green-700 shadow-lg transition-all active:scale-95"
// //               >
// //                 Make Withdrawal
// //               </button>
// //             ) : (
// //               <p className="text-gray-400 italic">No pending actions available.</p>
// //             )}
// //           </div>
// //         )}
// //       </div>

// //       {/* External Bank Modal */}
// //       {showBankModal && (
// //         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
// //           <BankAction
// //             withdrawalId={withdrawalTx?._id}
// //             amount={withdrawalTx?.amount}
// //             onClose={() => setShowBankModal(false)}
// //           />
// //         </div>
// //       )}
// //     </div>
// //   );
// // }


// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import PaymentModal from "@/components/PaymentModal";
// import BankAction from "@/components/BankSelect";

// export default function DashboardClient({
//   user,
//   totalLoan,
//   securityDeposit,
//   depositPercentage,
//   depositTx,
//   withdrawalTx,
//   bank,
// }) {
//   const router = useRouter();
//   const [showBankModal, setShowBankModal] = useState(false);
//   const [isFinalizing, setIsFinalizing] = useState(withdrawalTx?.status === "processing");
//   const [spinning, setSpinning] = useState(false);

//   const fullAmount = totalLoan + securityDeposit;

//   const [displayBalance, setDisplayBalance] = useState(() => {
//     // If withdrawal is already processing in the DB, show 0
//     if (withdrawalTx && withdrawalTx.status === "processing") return 0;
//     // If deposit isn't done, show base loan
//     if (!depositTx || depositTx.status !== "completed") return totalLoan;
//     // Fallback to full amount
//     return fullAmount;
//   });

//   useEffect(() => {
//     if (isFinalizing) {
//       setSpinning(true);
//       const timer = setTimeout(() => {
//         setSpinning(false);
//         // Refresh the page to get updated data from server
//         router.refresh();
//       }, 20000);
//       return () => clearTimeout(timer);
//     }
//   }, [isFinalizing, router]);

//   // Logic helpers based on server data (Persistent)
//   const isDepositPaid = depositTx?.status === "completed" || user?.loanStatus?.depositPaid;
//   const hasBankDetails = Boolean(bank);
  
//   // Withdrawal is available only if deposit is paid and bank is added
//   const canWithdraw = isDepositPaid && hasBankDetails && (!withdrawalTx || withdrawalTx?.status === "awaiting_bank");
  
//   // Final state: Success message stays if the transaction is finished or we just finished the timer
//   const isTransactionComplete = withdrawalTx?.status === "completed" || (isFinalizing && !spinning);

//   const handleMakeWithdrawal = async () => {
//     try {
//       // Call API to create/update withdrawal transaction
//       const response = await fetch('/api/withdraw/finalize', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           userId: user._id,
//           amount: fullAmount,
//           withdrawalId: withdrawalTx?._id
//         })
//       });

//       if (!response.ok) {
//         throw new Error('Failed to process withdrawal');
//       }

//       const data = await response.json();
      
//       // Update UI immediately
//       setDisplayBalance(0);
//       setIsFinalizing(true);
      
//       // Refresh to get updated data from server
//       router.refresh();
//     } catch (error) {
//       console.error('Withdrawal error:', error);
//       alert('Failed to process withdrawal. Please try again.');
//     }
//   };

//   return (
//     <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-50">
//       <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full border border-gray-100 min-h-75 flex flex-col items-center justify-center text-center">
        
//         {/* CASE A: The 20-Second Loading Spinner */}
//         {isFinalizing && spinning ? (
//           <div className="animate-in fade-in duration-500 flex flex-col items-center">
//             <h3 className="text-xl font-bold text-slate-800">Withdrawal Processing</h3>
//             <p className="text-sm text-slate-500 mt-3 leading-relaxed">
//               Your bank details have been verified. <br />
//               Please stay on this page while we finalize your loan disbursement.
//             </p>
//             <div className="mt-8 flex flex-col items-center">
//               <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
//               <span className="mt-4 text-[10px] font-bold text-green-600 uppercase tracking-widest animate-pulse">
//                 Securing Transfer...
//               </span>
//             </div>
//           </div>
//         ) : 

//         /* CASE B: Final Success State (Persistent) */
//         isTransactionComplete ? (
//           <div className="animate-in zoom-in duration-500">
//             <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
//               </svg>
//             </div>
//             <h1 className="text-2xl font-bold text-green-600">Transfer Processing</h1>
//             <p className="text-gray-500 mt-2">
//               Your funds are being processed to be disbursed to your bank account.
//             </p>
//           </div>
//         ) : (

//           /* CASE C: Sequential Workflow Steps */
//           <div className="w-full space-y-6 animate-in fade-in">
//             <div className="mb-6">
//               <h2 className="text-2xl font-black text-slate-900">Loan Dashboard</h2>
//               <p className="text-slate-400 text-sm">Please complete the required actions.</p>
//             </div>

//             {/* Step 1: Deposit */}
//             {!isDepositPaid ? (
//               <PaymentModal
//                 triggerLabel="Pay Security Deposit"
//                 loanAmount={totalLoan}
//                 deposit={securityDeposit}
//                 percentage={depositPercentage}
//               />
//             ) : 
//             /* Step 2: Bank Details (Only shows if Deposit is Done) */
//             !hasBankDetails ? (
//               <button
//                 onClick={() => setShowBankModal(true)}
//                 className="w-full px-8 py-5 rounded-2xl font-bold bg-blue-600 text-white hover:bg-blue-700 shadow-lg transition-all active:scale-95"
//               >
//                 Add Bank Details
//               </button>
//             ) : 
//             /* Step 3: Final Withdrawal (Only shows if Bank is Done) */
//             canWithdraw ? (
//               <button
//                 onClick={handleMakeWithdrawal}
//                 className="w-full px-8 py-5 rounded-2xl font-bold bg-green-600 text-white hover:bg-green-700 shadow-lg transition-all active:scale-95"
//               >
//                 Make Withdrawal
//               </button>
//             ) : (
//               <p className="text-gray-400 italic">No pending actions available.</p>
//             )}
//           </div>
//         )}
//       </div>

//       {/* External Bank Modal */}
//       {showBankModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
//           <BankAction
//             withdrawalId={withdrawalTx?._id}
//             amount={withdrawalTx?.amount}
//             onClose={() => setShowBankModal(false)}
//           />
//         </div>
//       )}
//     </div>
//   );
// }


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import PaymentModal from "@/components/PaymentModal";
import BankAction from "@/components/BankSelect";

export default function DashboardClient({
  user,
  totalLoan,
  securityDeposit,
  depositPercentage,
  depositTx,
  withdrawalTx,
  bank,
}) {
  const router = useRouter();
  const [showBankModal, setShowBankModal] = useState(false);
  const [isFinalizing, setIsFinalizing] = useState(withdrawalTx?.status === "processing");
  const [spinning, setSpinning] = useState(false);

  const fullAmount = totalLoan + securityDeposit;

  const [displayBalance, setDisplayBalance] = useState(() => {
    // If withdrawal is already processing in the DB, show 0
    if (withdrawalTx && withdrawalTx.status === "processing") return 0;
    // If deposit isn't done, show base loan
    if (!depositTx || depositTx.status !== "completed") return totalLoan;
    // Fallback to full amount
    return fullAmount;
  });

  useEffect(() => {
    if (isFinalizing) {
      setSpinning(true);
      const timer = setTimeout(() => {
        setSpinning(false);
        // Refresh the page to get updated data from server
        router.refresh();
      }, 20000);
      return () => clearTimeout(timer);
    }
  }, [isFinalizing, router]);

  // Logic helpers based on server data (Persistent)
  const isDepositPaid = depositTx?.status === "completed" || user?.loanStatus?.depositPaid;
  const hasBankDetails = Boolean(bank);
  
  // Withdrawal is available only if deposit is paid and bank is added
  const canWithdraw = isDepositPaid && hasBankDetails && (!withdrawalTx || withdrawalTx?.status === "awaiting_bank");
  
  // Final state: Success message stays if the transaction is finished or we just finished the timer
  const isTransactionComplete = withdrawalTx?.status === "completed" || (isFinalizing && !spinning);

  const handleMakeWithdrawal = async () => {
    try {
      // Update UI immediately for better UX
      setDisplayBalance(0);
      setIsFinalizing(true);
      
      // Call API to create/update withdrawal transaction
      const response = await fetch('/api/withdraw/finalize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user._id?.toString() || user._id,
          amount: fullAmount,
          withdrawalId: withdrawalTx?._id?.toString() || withdrawalTx?._id
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('API Error:', errorData);
        throw new Error(errorData.error || 'Failed to process withdrawal');
      }

      const data = await response.json();
      console.log('Withdrawal success:', data);
      
      // Refresh to get updated data from server
      router.refresh();
    } catch (error) {
      console.error('Withdrawal error:', error);
      alert(`Failed to process withdrawal: ${error.message}`);
      // Reset UI on error
      setDisplayBalance(fullAmount);
      setIsFinalizing(false);
    }
  };

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-3xl p-8 shadow-xl max-w-md w-full border border-gray-100 min-h-75 flex flex-col items-center justify-center text-center">
        
        {/* CASE A: The 20-Second Loading Spinner */}
        {isFinalizing && spinning ? (
          <div className="animate-in fade-in duration-500 flex flex-col items-center">
            <h3 className="text-xl font-bold text-slate-800">Withdrawal Processing</h3>
            <p className="text-sm text-slate-500 mt-3 leading-relaxed">
              Your bank details have been verified. <br />
              Please stay on this page while we finalize your loan disbursement.
            </p>
            <div className="mt-8 flex flex-col items-center">
              <div className="w-12 h-12 border-4 border-green-600 border-t-transparent rounded-full animate-spin"></div>
              <span className="mt-4 text-[10px] font-bold text-green-600 uppercase tracking-widest animate-pulse">
                Securing Transfer...
              </span>
            </div>
          </div>
        ) : 

        /* CASE B: Final Success State (Persistent) */
        isTransactionComplete ? (
          <div className="animate-in zoom-in duration-500">
            <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-green-600">Transfer Processing</h1>
            <p className="text-gray-500 mt-2">
              Your funds are being processed to be disbursed to your bank account.
            </p>
          </div>
        ) : (

          /* CASE C: Sequential Workflow Steps */
          <div className="w-full space-y-6 animate-in fade-in">
            <div className="mb-6">
              <h2 className="text-2xl font-black text-slate-900">Loan Dashboard</h2>
              <p className="text-slate-400 text-sm">Please complete the required actions.</p>
            </div>

            {/* Step 1: Deposit */}
            {!isDepositPaid ? (
              <PaymentModal
                triggerLabel="Withdraw"
                loanAmount={totalLoan}
                deposit={securityDeposit}
                percentage={depositPercentage}
              />
            ) : 
            /* Step 2: Bank Details (Only shows if Deposit is Done) */
            !hasBankDetails ? (
              <button
                onClick={() => setShowBankModal(true)}
                className="w-full px-8 py-5 rounded-2xl font-bold bg-[#0056b3] text-white hover:bg-blue-700 shadow-lg transition-all active:scale-95"
              >
                Add Bank Details
              </button>
            ) : 
            /* Step 3: Final Withdrawal (Only shows if Bank is Done) */
            canWithdraw ? (
              <button
                onClick={handleMakeWithdrawal}
                className="w-full px-8 py-5 rounded-2xl font-bold bg-green-600 text-white hover:bg-green-700 shadow-lg transition-all active:scale-95"
              >
                Make Withdrawal
              </button>
            ) : (
              <p className="text-gray-400 italic">No pending actions available.</p>
            )}
          </div>
        )}
      </div>

      {/* External Bank Modal */}
      {showBankModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <BankAction
            withdrawalId={withdrawalTx?._id}
            amount={withdrawalTx?.amount}
            onClose={() => setShowBankModal(false)}
          />
        </div>
      )}
    </div>
  );
}
