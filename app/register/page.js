// "use client";
// import { useState } from "react";
// import { toast } from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import Autocomplete from "react-google-autocomplete";
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import CurrencyInput from "@/components/CurrencyInput";
// import Navbar from "@/components/Navbar";
// import { Eye, EyeOff, Upload, X } from "lucide-react";

// // Helper function to convert file to base64
// const fileToBase64 = (file) => {
//     return new Promise((resolve, reject) => {
//         const reader = new FileReader();
//         reader.readAsDataURL(file);
//         reader.onload = () => resolve(reader.result);
//         reader.onerror = (error) => reject(error);
//     });
// };

// export default function Register() {
//     const router = useRouter();
//     const [step, setStep] = useState(1);
//     const [agreedToTerms, setAgreedToTerms] = useState(false);
//     const [showPassword, setShowPassword] = useState(false);
//     const [idPreview, setIdPreview] = useState(null);
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         password: "",
//         phoneNumber: "",
//         dateOfBirth: "",
//         gender: "",
//         workStatus: "",
//         workStatusOther: "",
//         loanType: "",
//         loanAmount: "",
//         loanAmountFormatted: "",
//         interestRate: 5,
//         repaymentMonths: "",
//         address: "",
//         latitude: null,
//         longitude: null,
//         idDocument: null,
//     });



//     const [loading, setLoading] = useState(false);
//     const [showSuccessModal, setShowSuccessModal] = useState(false);
//     const [countdown, setCountdown] = useState(60);
//     const [processStatus, setProcessStatus] = useState("Initializing application...");
//     const [emailError, setEmailError] = useState("");
//     const [passwordError, setPasswordError] = useState("");

//     const goToStep2 = () => {
//         const required = ['name', 'email', 'password', 'phoneNumber', 'dateOfBirth', 'gender', 'workStatus', 'loanType', 'loanAmount', 'repaymentMonths'];
//         if (required.some(field => !form[field])) {
//             toast.error("Please fill all required fields");
//             return;
//         }
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(form.email)) {
//             toast.error("Please enter a valid email address");
//             return;
//         }
//         const passwordValidationError = validatePassword(form.password);
//         if (passwordValidationError) {
//             toast.error(passwordValidationError);
//             return;
//         }

//         // Validate minimum loan amount
//         if (parseFloat(form.loanAmount) < 10000) {
//             toast.error("Minimum loan amount is R10,000");
//             return;
//         }

//         if (!agreedToTerms) {
//             toast.error("You must agree to the Terms and Conditions");
//             return;
//         }
//         setStep(2);
//         window.scrollTo({ top: 0, behavior: 'smooth' })
//     };

//     const handleEmailChange = (e) => {
//         const email = e.target.value;
//         setForm({ ...form, email });

//         // Real-time validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (email && !emailRegex.test(email)) {
//             setEmailError("Please enter a valid email address");
//         } else {
//             setEmailError("");
//         }
//     };

//     const handleFileChange = (e) => {
//         const file = e.target.files[0];

//         if (!file) return;

//         // Validate file type
//         const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
//         if (!allowedTypes.includes(file.type)) {
//             toast.error("Invalid file type. Only JPG, PNG, and PDF are allowed");
//             e.target.value = null;
//             return;
//         }

//         // Validate file size (10MB max)
//         const maxSize = 10 * 1024 * 1024;
//         if (file.size > maxSize) {
//             toast.error("File size exceeds 10MB limit");
//             e.target.value = null;
//             return;
//         }

//         setForm({ ...form, idDocument: file });

//         // Create preview for images
//         if (file.type.startsWith('image/')) {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setIdPreview(reader.result);
//             };
//             reader.readAsDataURL(file);
//         } else {
//             setIdPreview('pdf');
//         }
//     };

//     const removeFile = () => {
//         setForm({ ...form, idDocument: null });
//         setIdPreview(null);
//     };

//     const submit = async () => {
//         if (loading) return;

//         // if (!form.idDocument) {
//         //     toast.error("Please upload your ID document");
//         //     return;
//         // }

//         setLoading(true);
//         setCountdown(60);
//         setProcessStatus("Initializing application...");

//         try {
//             // Convert ID document to base64
//             let idDocumentBase64 = null;
//             let idDocumentFilename = null;

//             // if (form.idDocument) {
//             //     try {
//             //         setProcessStatus("Uploading ID document...");
//             //         idDocumentBase64 = await fileToBase64(form.idDocument);
//             //         idDocumentFilename = form.idDocument.name;
//             //     } catch (error) {
//             //         toast.error("Failed to process ID document");
//             //         setLoading(false);
//             //         return;
//             //     }
//             // }

//             if (form.idDocument) {
//       try {
//         idDocumentBase64 = await fileToBase64(form.idDocument);
//         idDocumentFilename = form.idDocument.name;
//       } catch (error) {
//         toast.error("Failed to process ID document");
//         setLoading(false);
//         return;
//       }
//     }



//             setProcessStatus("Submitting application...");

//             const res = await fetch("/api/auth/register", {
//                 method: "POST",
//                 body: JSON.stringify({
//                     name: form.name,
//                     email: form.email,
//                     password: form.password,
//                     phoneNumber: form.phoneNumber,
//                     dateOfBirth: form.dateOfBirth,
//                     gender: form.gender,
//                     address: form.address,
//                     latitude: form.latitude,
//                     longitude: form.longitude,
//                     workStatus: form.workStatus,
//                     workStatusOther: form.workStatusOther,
//                     loanType: form.loanType,
//                     loanAmount: form.loanAmount,
//                     repaymentMonths: form.repaymentMonths,
//                     idDocumentBase64,
//                     idDocumentFilename,
//                     idDocument: undefined //Remove File object
//                 }),
//                 headers: { "Content-Type": "application/json" }
//             });

//             if (!res.ok) {
//                 const data = await res.json();
//                 toast.error(data.error || "Registration failed");
//                 setLoading(false);
//                 return;
//             }

//             let secondsLeft = 60;
//             const interval = setInterval(async () => {
//                 secondsLeft -= 1;
//                 setCountdown(secondsLeft);

//                 if (secondsLeft > 45) setProcessStatus("Verifying identity documents...");
//                 else if (secondsLeft > 30) setProcessStatus("Checking credit score...");
//                 else if (secondsLeft > 15) setProcessStatus("Finalizing loan terms...");
//                 else if (secondsLeft > 0) setProcessStatus("Generating approval certificate...");

//                 if (secondsLeft <= 0) {
//                     clearInterval(interval);
//                     try {
//                         const loginRes = await fetch("/api/auth/login", {
//                             method: "POST",
//                             body: JSON.stringify({ email: form.email, password: form.password }),
//                             headers: { "Content-Type": "application/json" }
//                         });

//                         if (loginRes.ok) {
//                             setLoading(false);
//                             setShowSuccessModal(true);
//                         } else {
//                             router.push("/login");
//                         }
//                     } catch (err) {
//                         router.push("/login");
//                     }
//                 }
//             }, 1000);
//         } catch (error) {
//             console.error("Registration error:", error);
//             toast.error("An error occurred during registration");
//             setLoading(false);
//         }
//     };

//     const validatePassword = (password) => {
//         if (!password) {
//             return "Password is required";
//         }
//         if (password.length < 8) {
//             return "Password must be at least 8 characters long";
//         }
//         if (!/(?=.*[a-z])/.test(password)) {
//             return "Password must contain at least one lowercase letter";
//         }
//         if (!/(?=.*[A-Z])/.test(password)) {
//             return "Password must contain at least one uppercase letter";
//         }
//         if (!/(?=.*\d)/.test(password)) {
//             return "Password must contain at least one number";
//         }
//         if (!/(?=.*[^A-Za-z0-9])/.test(password)) {
//             return "Password must contain at least one special character";
//         }
//         return "";
//     }

//     const handlePasswordChange = (e) => {
//         const password = e.target.value;
//         setForm({ ...form, password });

//         // Real-time validation
//         const error = validatePassword(password);
//         setPasswordError(error);
//     };

//     return (
//         <div className="flex flex-col min-h-screen bg-white">
//             {/* 1. NAVBAR */}
//             <Navbar />

//             {/* 2. REGISTRATION FORM (MAIN CONTENT) */}
//             <main className="grow py-12 px-4 bg-gray-50">
//                 <div className="max-w-3xl mx-auto overflow-hidden">
//                     <div className="p-8 text-center">
//                         <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
//                         <p className="text-black mt-2 font-extrabold md:text-3xl">Create an Evercrest Account to Continue</p>
//                     </div>

//                     <div className="p-8 md:p-12">
//                         {step === 1 ? (
//                             <div className="space-y-6">
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div className="space-y-1">
//                                         <label className="text-xs font-bold text-black uppercase ml-1">Full Name</label>
//                                         <input type="text" placeholder="John Doe" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, name: e.target.value })} value={form.name} />
//                                     </div>
//                                     <div className="space-y-1">
//                                         <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address</label>
//                                         <input
//                                             type="email"
//                                             placeholder="john@example.com"
//                                             className={`w-full border ${emailError ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 ${emailError ? 'focus:ring-red-500' : 'focus:ring-blue-500'} outline-none`}
//                                             onChange={handleEmailChange}
//                                             value={form.email}
//                                         />
//                                         {emailError && <p className="text-xs text-red-500 ml-1 mt-1">{emailError}</p>}
//                                     </div>

//                                     <div className="space-y-1">
//                                         <label className="text-xs font-bold text-gray-500 uppercase ml-1">Password</label>
//                                         <div className="relative">
//                                             <input
//                                                 type={showPassword ? "text" : "password"}
//                                                 placeholder="••••••••"
//                                                 className={`w-full border ${passwordError ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 pr-12 bg-gray-50 focus:ring-2 ${passwordError ? 'focus:ring-red-500' : 'focus:ring-blue-500'} outline-none`}
//                                                 onChange={handlePasswordChange}
//                                                 value={form.password}
//                                             />
//                                             <button
//                                                 type="button"
//                                                 onClick={() => setShowPassword(!showPassword)}
//                                                 className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                                             >
//                                                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                                             </button>
//                                         </div>
//                                         {passwordError && (
//                                             <p className="text-xs text-red-500 ml-1 mt-1">{passwordError}</p>
//                                         )}
//                                         {/* Password strength indicator */}
//                                         <div className="ml-1 mt-2 space-y-1">
//                                             <div className="flex items-center gap-2 text-xs">
//                                                 <span className={form.password.length >= 8 ? "text-green-600" : "text-gray-400"}>
//                                                     {form.password.length >= 8 ? "✓" : "○"} At least 8 characters
//                                                 </span>
//                                             </div>
//                                             <div className="flex items-center gap-2 text-xs">
//                                                 <span className={/(?=.*[A-Z])/.test(form.password) ? "text-green-600" : "text-gray-400"}>
//                                                     {/(?=.*[A-Z])/.test(form.password) ? "✓" : "○"} One uppercase letter
//                                                 </span>
//                                             </div>
//                                             <div className="flex items-center gap-2 text-xs">
//                                                 <span className={/(?=.*[a-z])/.test(form.password) ? "text-green-600" : "text-gray-400"}>
//                                                     {/(?=.*[a-z])/.test(form.password) ? "✓" : "○"} One lowercase letter
//                                                 </span>
//                                             </div>
//                                             <div className="flex items-center gap-2 text-xs">
//                                                 <span className={/(?=.*\d)/.test(form.password) ? "text-green-600" : "text-gray-400"}>
//                                                     {/(?=.*\d)/.test(form.password) ? "✓" : "○"} One number
//                                                 </span>
//                                             </div>
//                                             <div className="flex items-center gap-2 text-xs">
//                                                 <span className={/(?=.*[^A-Za-z0-9])/.test(form.password) ? "text-green-600" : "text-gray-400"}>
//                                                     {/(?=.*[^A-Za-z0-9])/.test(form.password) ? "✓" : "○"} One special character (any symbol)
//                                                 </span>
//                                             </div>
//                                         </div>
//                                     </div>

//                                     <div className="space-y-1">
//                                         <label className="text-xs font-bold text-gray-500 uppercase ml-1">Phone Number</label>
//                                         <PhoneInput country={'ph'} value={form.phoneNumber} onChange={(phone) => setForm({ ...form, phoneNumber: phone })} inputClass="!w-full !h-[50px] !border-gray-200 !rounded-xl !bg-gray-50" />
//                                     </div>
//                                     <div className="space-y-1">
//                                         <label className="text-xs font-bold text-gray-500 uppercase ml-1">Date of Birth</label>
//                                         <input type="text" placeholder="DD/MM/YYYY" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={form.dateOfBirth}
//                                             onChange={(e) => {
//                                                 let v = e.target.value.replace(/\D/g, "").slice(0, 8);
//                                                 if (v.length >= 3 && v.length <= 4) v = `${v.slice(0, 2)}/${v.slice(2)}`;
//                                                 else if (v.length >= 5) v = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4, 8)}`;
//                                                 setForm({ ...form, dateOfBirth: v });
//                                             }} />
//                                     </div>
//                                     <div className="space-y-1">
//                                         <label className="text-xs font-bold text-gray-500 uppercase ml-1">Gender</label>
//                                         <select className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, gender: e.target.value })} value={form.gender}>
//                                             <option value="">Select Gender</option>
//                                             <option value="male">Male</option>
//                                             <option value="female">Female</option>
//                                             <option value="other">Other</option>
//                                         </select>
//                                     </div>
//                                 </div>

//                                 <div className="space-y-1">
//                                     <label className="text-xs font-bold text-gray-500 uppercase ml-1">Residential Address</label>
//                                     <Autocomplete
//                                         apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
//                                         onPlaceSelected={(place) => {
//                                             setForm({
//                                                 ...form,
//                                                 address: place.formatted_address,
//                                                 latitude: place.geometry.location.lat(),
//                                                 longitude: place.geometry.location.lng(),
//                                             });
//                                         }}
//                                         className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
//                                         placeholder="Search your address"
//                                     />
//                                 </div>

//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                     <div className="space-y-1">
//                                         <label className="text-xs font-bold text-gray-500 uppercase ml-1">Work Status</label>
//                                         <select className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, workStatus: e.target.value })} value={form.workStatus}>
//                                             <option value="">Select Status</option>
//                                             <option value="employed">Employed</option>
//                                             <option value="self-employed">Self-Employed</option>
//                                             <option value="unemployed">Unemployed</option>
//                                             <option value="student">Student</option>
//                                             <option value="other">Other</option>
//                                         </select>
//                                     </div>
//                                     {form.workStatus === "other" && (
//                                         <div className="space-y-1">
//                                             <label className="text-xs font-bold text-gray-500 uppercase ml-1">Please Specify</label>
//                                             <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, workStatusOther: e.target.value })} value={form.workStatusOther} />
//                                         </div>
//                                     )}
//                                     <div className="space-y-1">
//                                         <label className="text-xs font-bold text-gray-500 uppercase ml-1">Loan Type</label>
//                                         <select className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, loanType: e.target.value })} value={form.loanType}>
//                                             <option value="">Select Loan Type</option>
//                                             <option value="Personal Loan">Personal Loan</option>
//                                             <option value="Salary Loan">Salary Loan</option>
//                                             <option value="Business Loan">Business Loan</option>
//                                         </select>
//                                     </div>
//                                 </div>

//                                 <div className="bg-blue-50 rounded-2xl p-6 space-y-4">
//                                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                                         <CurrencyInput
//                                             label="Desired Loan Amount (Min: R10,000)"
//                                             value={form.loanAmountFormatted}
//                                             onChange={({ raw, formatted }) => setForm({ ...form, loanAmount: raw, loanAmountFormatted: formatted })}
//                                         />
//                                         <div className="space-y-1">
//                                             <label className="text-xs font-bold text-gray-500 uppercase ml-1">Repayment Period (Months)</label>
//                                             <input type="number" placeholder="e.g. 12" min="1"
//                                                 max="24" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, repaymentMonths: e.target.value })} value={form.repaymentMonths} />
//                                         </div>
//                                     </div>
//                                     <div className="pt-4 border-t border-blue-100 flex flex-col md:flex-row justify-between items-start">
//                                         <span className="text-sm font-semibold text-blue-800 uppercase">Total Repayment (5% Interest)</span>
//                                         <span className="text-lg md:text-2xl font-black text-blue-600 ">R {form.loanAmount ? (form.loanAmount * 1.05).toLocaleString() : "0"}</span>
//                                     </div>
//                                 </div>

//                                 {/* TERMS AND CONDITIONS */}
//                                 <div className="flex items-start gap-3 p-2">
//                                     <input
//                                         type="checkbox"
//                                         id="terms"
//                                         className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
//                                         checked={agreedToTerms}
//                                         onChange={(e) => setAgreedToTerms(e.target.checked)}
//                                     />
//                                     <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer select-none">
//                                         I agree to the{' '}
//                                         <Link
//                                             href="/terms"
//                                             target="_blank"
//                                             className="text-blue-600 font-bold hover:underline"
//                                             onClick={(e) => e.stopPropagation()}
//                                         >
//                                             Terms of Service
//                                         </Link>{' '}
//                                         and{' '}
//                                         <Link
//                                             href="/privacy-policies"
//                                             target="_blank"
//                                             className="text-blue-600 font-bold hover:underline"
//                                             onClick={(e) => e.stopPropagation()}
//                                         >
//                                             Privacy Policy
//                                         </Link>
//                                         , and I authorize Evercrest to process my credit information.
//                                     </label>
//                                 </div>

//                                 <button onClick={goToStep2} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95">
//                                     Continue to ID Verification
//                                 </button>
//                             </div>
//                         ) : (
//                             <div className="space-y-8 py-4">
//                                 <div className="text-center">
//                                     <h3 className="text-xl font-bold text-gray-800 mb-2">Final Step: ID Verification</h3>
//                                     <p className="text-gray-500 mb-8">Please upload a clear photo of your government-issued ID.</p>

//                                     <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 bg-gray-50 hover:bg-gray-100 transition-all">
//                                         {!form.idDocument ? (
//                                             <label className="cursor-pointer block">
//                                                 <input 
//                                                     type="file" 
//                                                     className="hidden"
//                                                     accept=".jpg,.jpeg,.png,.pdf"
//                                                     onChange={handleFileChange}
//                                                 />
//                                                 <div className="flex flex-col items-center">
//                                                     <Upload className="w-16 h-16 text-gray-400 mb-4" />
//                                                     <p className="text-lg font-semibold text-gray-700 mb-2">
//                                                         Click to upload ID document
//                                                     </p>
//                                                     <p className="text-xs text-gray-400">
//                                                         Supported formats: JPG, PNG, PDF (Max 10MB)
//                                                     </p>
//                                                 </div>
//                                             </label>
//                                         ) : (
//                                             <div className="space-y-4">
//                                                 {idPreview && idPreview !== 'pdf' ? (
//                                                     <img 
//                                                         src={idPreview} 
//                                                         alt="ID Preview" 
//                                                         className="max-h-64 mx-auto rounded-lg"
//                                                     />
//                                                 ) : (
//                                                     <div className="bg-red-100 rounded-lg p-6 mx-auto max-w-xs">
//                                                         <div className="text-center">
//                                                             <div className="text-4xl mb-2">📄</div>
//                                                             <p className="font-semibold text-gray-700">PDF Document</p>
//                                                         </div>
//                                                     </div>
//                                                 )}
//                                                 <div className="flex items-center justify-center gap-4">
//                                                     <p className="text-sm text-gray-600 font-medium">
//                                                         {form.idDocument.name}
//                                                     </p>
//                                                     <button
//                                                         type="button"
//                                                         onClick={removeFile}
//                                                         className="text-red-600 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
//                                                     >
//                                                         <X size={20} />
//                                                     </button>
//                                                 </div>
//                                                 <p className="text-xs text-gray-400">
//                                                     {(form.idDocument.size / 1024 / 1024).toFixed(2)} MB
//                                                 </p>
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>

//                                 <div className="flex gap-4">
//                                     <button onClick={() => setStep(1)} className="flex-1 bg-gray-100 text-gray-600 font-bold py-4 rounded-xl hover:bg-gray-200 transition-all">Back</button>
//                                     <button onClick={submit} disabled={loading || !form.idDocument} className="flex-1 bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
//                                         {loading ? "Processing..." : "Submit Application"}
//                                     </button>
//                                 </div>
//                             </div>
//                         )}
//                     </div>
//                 </div>
//             </main>

//             {/* --- MODALS AND OVERLAYS --- */}
//             {loading && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm p-6">
//                     <div className="w-full max-w-sm text-center">
//                         <div className="relative flex items-center justify-center mb-10">
//                             <div className="h-24 w-24 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>
//                             <span className="absolute text-xl font-black text-blue-600">{countdown}s</span>
//                         </div>
//                         <h2 className="text-2xl font-bold text-gray-900 mb-2">{processStatus}</h2>
//                         <p className="text-gray-400 text-sm italic">Please do not close or refresh this page.</p>
//                         <div className="mt-10 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
//                             <div className="bg-blue-600 h-full transition-all duration-1000 ease-linear" style={{ width: `${((60 - countdown) / 60) * 100}%` }}></div>
//                         </div>
//                     </div>
//                 </div>
//             )}

//             {showSuccessModal && (
//                 <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
//                     <div className="bg-white rounded-[40px] p-10 max-w-md w-full text-center shadow-2xl">
//                         <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8 text-green-600 text-5xl">✓</div>
//                         <h2 className="text-3xl font-black text-gray-900 mb-4">You're Approved!</h2>
//                         <p className="text-gray-500 mb-8 leading-relaxed">
//                             Your application for <span className="font-bold text-blue-600">R{form.loanAmountFormatted}</span> has been successfully processed and approved.
//                         </p>
//                         <button
//                             onClick={() => window.location.replace("/dashboard")}
//                             className="w-full bg-[#0056b3] text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-black transition-all"
//                         >
//                             Access Your Dashboard
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }


"use client";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Autocomplete from "react-google-autocomplete";
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import CurrencyInput from "@/components/CurrencyInput";
import Navbar from "@/components/Navbar";
import { Eye, EyeOff, Upload, X } from "lucide-react";

// Helper function to convert file to base64
const fileToBase64 = (file) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    });
};

const compressImage = (file, maxSizeMB = 2, maxWidthOrHeight = 1920) => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;
            img.onload = () => {
                const canvas = document.createElement('canvas');
                let width = img.width;
                let height = img.height;

                // Calculate resize dimensions
                if (width > height) {
                    if (width > maxWidthOrHeight) {
                        height *= maxWidthOrHeight / width;
                        width = maxWidthOrHeight;
                    }
                } else {
                    if (height > maxWidthOrHeight) {
                        width *= maxWidthOrHeight / height;
                        height = maxWidthOrHeight;
                    }
                }

                canvas.width = width;
                canvas.height = height;

                const ctx = canvas.getContext('2d');
                ctx.drawImage(img, 0, 0, width, height);

                // Try different quality levels to hit target size
                const tryQuality = (quality) => {
                    canvas.toBlob(
                        (blob) => {
                            if (!blob) {
                                reject(new Error('Failed to compress image'));
                                return;
                            }

                            const sizeMB = blob.size / 1024 / 1024;

                            // If still too large and quality can be reduced more
                            if (sizeMB > maxSizeMB && quality > 0.3) {
                                tryQuality(quality - 0.1);
                            } else {
                                // Create File from Blob
                                const compressedFile = new File([blob], file.name, {
                                    type: 'image/jpeg',
                                    lastModified: Date.now(),
                                });
                                resolve(compressedFile);
                            }
                        },
                        'image/jpeg',
                        quality
                    );
                };

                tryQuality(0.8); // Start with 80% quality
            };
            img.onerror = reject;
        };
        reader.onerror = reject;
    });
};

export default function Register() {
    const router = useRouter();
    const [step, setStep] = useState(1);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [idPreview, setIdPreview] = useState(null);
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        dateOfBirth: "",
        gender: "",
        workStatus: "",
        workStatusOther: "",
        loanType: "",
        loanAmount: "",
        loanAmountFormatted: "",
        interestRate: 5,
        repaymentMonths: "",
        address: "",
        latitude: null,
        longitude: null,
        idDocument: null,
    });

    const [loading, setLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [countdown, setCountdown] = useState(60);
    const [processStatus, setProcessStatus] = useState("Initializing application...");
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");

    const goToStep2 = () => {
        // Updated to include address validation
        const required = ['name', 'email', 'password', 'phoneNumber', 'dateOfBirth', 'gender', 'address', 'workStatus', 'loanType', 'loanAmount', 'repaymentMonths'];

        const missingFields = required.filter(field => !form[field]);
        if (missingFields.length > 0) {
            toast.error("Please fill all required fields");
            console.log("Missing fields:", missingFields);
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(form.email)) {
            toast.error("Please enter a valid email address");
            return;
        }

        const passwordValidationError = validatePassword(form.password);
        if (passwordValidationError) {
            toast.error(passwordValidationError);
            return;
        }

        // Validate minimum loan amount
        if (parseFloat(form.loanAmount) < 10000) {
            toast.error("Minimum loan amount is R10,000");
            return;
        }

        if (!agreedToTerms) {
            toast.error("You must agree to the Terms and Conditions");
            return;
        }

        setStep(2);
        window.scrollTo({ top: 0, behavior: 'smooth' })
    };

    const handleEmailChange = (e) => {
        const email = e.target.value;
        setForm({ ...form, email });

        // Real-time validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (email && !emailRegex.test(email)) {
            setEmailError("Please enter a valid email address");
        } else {
            setEmailError("");
        }
    };

    // const handleFileChange = (e) => {
    //     const file = e.target.files[0];

    //     if (!file) return;

    //     // Validate file type
    //     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
    //     if (!allowedTypes.includes(file.type)) {
    //         toast.error("Invalid file type. Only JPG, PNG, and PDF are allowed");
    //         e.target.value = null;
    //         return;
    //     }

    //     // Validate file size (10MB max)
    //     const maxSize = 10 * 1024 * 1024;
    //     if (file.size > maxSize) {
    //         toast.error("File size exceeds 10MB limit");
    //         e.target.value = null;
    //         return;
    //     }

    //     setForm({ ...form, idDocument: file });

    //     // Create preview for images
    //     if (file.type.startsWith('image/')) {
    //         const reader = new FileReader();
    //         reader.onloadend = () => {
    //             setIdPreview(reader.result);
    //         };
    //         reader.readAsDataURL(file);
    //     } else {
    //         setIdPreview('pdf');
    //     }
    // };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        // Validate file type
        const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'application/pdf'];
        if (!allowedTypes.includes(file.type)) {
            toast.error("Invalid file type. Only JPG, PNG, and PDF are allowed");
            e.target.value = null;
            return;
        }

        let fileToUpload = file;

        // COMPRESS IMAGE FILES AUTOMATICALLY
        if (file.type.startsWith('image/')) {
            const originalSizeMB = file.size / 1024 / 1024;

            // Only compress if larger than 1MB
            if (originalSizeMB > 1) {
                try {
                    toast.info("Compressing image, please wait...");
                    fileToUpload = await compressImage(file, 2); // Target: 2MB max
                    const newSizeMB = fileToUpload.size / 1024 / 1024;
                    toast.success(`Image compressed: ${originalSizeMB.toFixed(2)}MB → ${newSizeMB.toFixed(2)}MB`);
                } catch (error) {
                    console.error("Compression error:", error);
                    toast.error("Failed to compress image. Please use a smaller file.");
                    e.target.value = null;
                    return;
                }
            }
        }

        // Validate final file size (after compression)
        const maxSize = 5 * 1024 * 1024; // 5MB
        if (fileToUpload.size > maxSize) {
            toast.error("File size exceeds 5MB limit even after compression. Please use a smaller image.");
            e.target.value = null;
            return;
        }

        setForm({ ...form, idDocument: fileToUpload });

        // Create preview for images
        if (fileToUpload.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setIdPreview(reader.result);
            };
            reader.readAsDataURL(fileToUpload);
        } else {
            setIdPreview('pdf');
        }
    };

    const removeFile = () => {
        setForm({ ...form, idDocument: null });
        setIdPreview(null);
    };

    const submit = async () => {
        if (loading) return;

        setLoading(true);
        setCountdown(60);
        setProcessStatus("Initializing application...");

        try {
            // Convert ID document to base64 (if exists)
            let idDocumentBase64 = null;
            let idDocumentFilename = null;

            if (form.idDocument) {
                try {
                    setProcessStatus("Processing ID document...");
                    idDocumentBase64 = await fileToBase64(form.idDocument);
                    idDocumentFilename = form.idDocument.name;
                } catch (error) {
                    console.error("File conversion error:", error);
                    toast.error("Failed to process ID document");
                    setLoading(false);
                    return;
                }
            }

            setProcessStatus("Submitting application...");

            const payload = {
                name: form.name,
                email: form.email,
                password: form.password,
                phoneNumber: form.phoneNumber,
                dateOfBirth: form.dateOfBirth,
                gender: form.gender,
                address: form.address,
                latitude: form.latitude,
                longitude: form.longitude,
                workStatus: form.workStatus,
                workStatusOther: form.workStatusOther,
                loanType: form.loanType,
                loanAmount: form.loanAmount,
                repaymentMonths: form.repaymentMonths,
                idDocumentBase64,
                idDocumentFilename
            };

            console.log("Submitting registration...");

            const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: { "Content-Type": "application/json" }
            });

            const data = await res.json();

            if (!res.ok) {
                console.error("Registration failed:", data);
                toast.error(data.error || "Registration failed");
                setLoading(false);
                return;
            }

            console.log("Registration successful");

            let secondsLeft = 60;
            const interval = setInterval(async () => {
                secondsLeft -= 1;
                setCountdown(secondsLeft);

                if (secondsLeft > 45) setProcessStatus("Verifying identity documents...");
                else if (secondsLeft > 30) setProcessStatus("Checking credit score...");
                else if (secondsLeft > 15) setProcessStatus("Finalizing loan terms...");
                else if (secondsLeft > 0) setProcessStatus("Generating approval certificate...");

                if (secondsLeft <= 0) {
                    clearInterval(interval);
                    try {
                        const loginRes = await fetch("/api/auth/login", {
                            method: "POST",
                            body: JSON.stringify({
                                email: form.email,
                                password: form.password
                            }),
                            headers: { "Content-Type": "application/json" }
                        });

                        if (loginRes.ok) {
                            setLoading(false);
                            setShowSuccessModal(true);
                        } else {
                            toast.success("Registration successful! Please login.");
                            router.push("/login");
                        }
                    } catch (err) {
                        console.error("Auto-login error:", err);
                        toast.success("Registration successful! Please login.");
                        router.push("/login");
                    }
                }
            }, 1000);
        } catch (error) {
            console.error("Registration error:", error);
            toast.error("An error occurred during registration. Please try again.");
            setLoading(false);
        }
    };

    const validatePassword = (password) => {
        if (!password) {
            return "Password is required";
        }
        if (password.length < 8) {
            return "Password must be at least 8 characters long";
        }
        if (!/(?=.*[a-z])/.test(password)) {
            return "Password must contain at least one lowercase letter";
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            return "Password must contain at least one uppercase letter";
        }
        if (!/(?=.*\d)/.test(password)) {
            return "Password must contain at least one number";
        }
        if (!/(?=.*[^A-Za-z0-9])/.test(password)) {
            return "Password must contain at least one special character";
        }
        return "";
    }

    const handlePasswordChange = (e) => {
        const password = e.target.value;
        setForm({ ...form, password });

        // Real-time validation
        const error = validatePassword(password);
        setPasswordError(error);
    };

    return (
        <div className="flex flex-col min-h-screen bg-white">
            {/* 1. NAVBAR */}
            <Navbar />

            {/* 2. REGISTRATION FORM (MAIN CONTENT) */}
            <main className="grow py-12 px-4 bg-gray-50">
                <div className="max-w-3xl mx-auto overflow-hidden">
                    <div className="p-8 text-center">
                        <h1 className="text-3xl font-bold text-white">Create Your Account</h1>
                        <p className="text-black mt-2 font-extrabold md:text-3xl">Create an Evercrest Account to Continue</p>
                    </div>

                    <div className="p-8 md:p-12">
                        {step === 1 ? (
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-black uppercase ml-1">Full Name *</label>
                                        <input type="text" placeholder="John Doe" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, name: e.target.value })} value={form.name} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Email Address *</label>
                                        <input
                                            type="email"
                                            placeholder="john@example.com"
                                            className={`w-full border ${emailError ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 ${emailError ? 'focus:ring-red-500' : 'focus:ring-blue-500'} outline-none`}
                                            onChange={handleEmailChange}
                                            value={form.email}
                                        />
                                        {emailError && <p className="text-xs text-red-500 ml-1 mt-1">{emailError}</p>}
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Password *</label>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? "text" : "password"}
                                                placeholder="••••••••"
                                                className={`w-full border ${passwordError ? 'border-red-500' : 'border-gray-200'} rounded-xl px-4 py-3 pr-12 bg-gray-50 focus:ring-2 ${passwordError ? 'focus:ring-red-500' : 'focus:ring-blue-500'} outline-none`}
                                                onChange={handlePasswordChange}
                                                value={form.password}
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                                            >
                                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                            </button>
                                        </div>
                                        {passwordError && (
                                            <p className="text-xs text-red-500 ml-1 mt-1">{passwordError}</p>
                                        )}
                                        {/* Password strength indicator */}
                                        <div className="ml-1 mt-2 space-y-1">
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className={form.password.length >= 8 ? "text-green-600" : "text-gray-400"}>
                                                    {form.password.length >= 8 ? "✓" : "○"} At least 8 characters
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className={/(?=.*[A-Z])/.test(form.password) ? "text-green-600" : "text-gray-400"}>
                                                    {/(?=.*[A-Z])/.test(form.password) ? "✓" : "○"} One uppercase letter
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className={/(?=.*[a-z])/.test(form.password) ? "text-green-600" : "text-gray-400"}>
                                                    {/(?=.*[a-z])/.test(form.password) ? "✓" : "○"} One lowercase letter
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className={/(?=.*\d)/.test(form.password) ? "text-green-600" : "text-gray-400"}>
                                                    {/(?=.*\d)/.test(form.password) ? "✓" : "○"} One number
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs">
                                                <span className={/(?=.*[^A-Za-z0-9])/.test(form.password) ? "text-green-600" : "text-gray-400"}>
                                                    {/(?=.*[^A-Za-z0-9])/.test(form.password) ? "✓" : "○"} One special character
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Phone Number *</label>
                                        <PhoneInput country={'ph'} value={form.phoneNumber} onChange={(phone) => setForm({ ...form, phoneNumber: phone })} inputClass="!w-full !h-[50px] !border-gray-200 !rounded-xl !bg-gray-50" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Date of Birth *</label>
                                        <input type="text" placeholder="DD/MM/YYYY" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" value={form.dateOfBirth}
                                            onChange={(e) => {
                                                let v = e.target.value.replace(/\D/g, "").slice(0, 8);
                                                if (v.length >= 3 && v.length <= 4) v = `${v.slice(0, 2)}/${v.slice(2)}`;
                                                else if (v.length >= 5) v = `${v.slice(0, 2)}/${v.slice(2, 4)}/${v.slice(4, 8)}`;
                                                setForm({ ...form, dateOfBirth: v });
                                            }} />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Gender *</label>
                                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, gender: e.target.value })} value={form.gender}>
                                            <option value="">Select Gender</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-bold text-gray-500 uppercase ml-1">Residential Address *</label>
                                    <Autocomplete
                                        apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
                                        onPlaceSelected={(place) => {
                                            setForm({
                                                ...form,
                                                address: place.formatted_address,
                                                latitude: place.geometry.location.lat(),
                                                longitude: place.geometry.location.lng(),
                                            });
                                        }}
                                        className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
                                        placeholder="Search your address"
                                        value={form.address}
                                        onChange={(e) => setForm({ ...form, address: e.target.value })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Work Status *</label>
                                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, workStatus: e.target.value })} value={form.workStatus}>
                                            <option value="">Select Status</option>
                                            <option value="employed">Employed</option>
                                            <option value="self-employed">Self-Employed</option>
                                            <option value="unemployed">Unemployed</option>
                                            <option value="student">Student</option>
                                            <option value="other">Other</option>
                                        </select>
                                    </div>
                                    {form.workStatus === "other" && (
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Please Specify</label>
                                            <input type="text" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, workStatusOther: e.target.value })} value={form.workStatusOther} />
                                        </div>
                                    )}
                                    <div className="space-y-1">
                                        <label className="text-xs font-bold text-gray-500 uppercase ml-1">Loan Type *</label>
                                        <select className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, loanType: e.target.value })} value={form.loanType}>
                                            <option value="">Select Loan Type</option>
                                            <option value="Personal Loan">Personal Loan</option>
                                            <option value="Salary Loan">Salary Loan</option>
                                            <option value="Business Loan">Business Loan</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="bg-blue-50 rounded-2xl p-6 space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <CurrencyInput
                                            label="Desired Loan Amount (Min: R10,000) *"
                                            value={form.loanAmountFormatted}
                                            onChange={({ raw, formatted }) => setForm({ ...form, loanAmount: raw, loanAmountFormatted: formatted })}
                                        />
                                        <div className="space-y-1">
                                            <label className="text-xs font-bold text-gray-500 uppercase ml-1">Repayment Period (Months) *</label>
                                            <input type="number" placeholder="e.g. 12" min="1"
                                                max="60" className="w-full border border-gray-200 rounded-xl px-4 py-3 bg-white focus:ring-2 focus:ring-blue-500 outline-none" onChange={(e) => setForm({ ...form, repaymentMonths: e.target.value })} value={form.repaymentMonths} />
                                        </div>
                                    </div>
                                    <div className="pt-4 border-t border-blue-100 flex flex-col md:flex-row justify-between items-start">
                                        <span className="text-sm font-semibold text-blue-800 uppercase">Total Repayment (5% Interest)</span>
                                        <span className="text-lg md:text-2xl font-black text-blue-600 ">R {form.loanAmount ? (form.loanAmount * 1.05).toLocaleString() : "0"}</span>
                                    </div>
                                </div>

                                {/* TERMS AND CONDITIONS */}
                                <div className="flex items-start gap-3 p-2">
                                    <input
                                        type="checkbox"
                                        id="terms"
                                        className="mt-1 w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                        checked={agreedToTerms}
                                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                                    />
                                    <label htmlFor="terms" className="text-sm text-gray-600 cursor-pointer select-none">
                                        I agree to the{' '}
                                        <Link
                                            href="/terms"
                                            target="_blank"
                                            className="text-blue-600 font-bold hover:underline"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Terms of Service
                                        </Link>{' '}
                                        and{' '}
                                        <Link
                                            href="/privacy-policies"
                                            target="_blank"
                                            className="text-blue-600 font-bold hover:underline"
                                            onClick={(e) => e.stopPropagation()}
                                        >
                                            Privacy Policy
                                        </Link>
                                        , and I authorize Evercrest to process my credit information.
                                    </label>
                                </div>

                                <button onClick={goToStep2} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl transition-all shadow-lg active:scale-95">
                                    Continue to ID Verification
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-8 py-4">
                                <div className="text-center">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">Final Step: ID Verification (Optional)</h3>
                                    <p className="text-gray-500 mb-8">Please upload a clear photo of your government-issued ID.</p>

                                    <div className="border-2 border-dashed border-gray-200 rounded-3xl p-12 bg-gray-50 hover:bg-gray-100 transition-all">
                                        {!form.idDocument ? (
                                            <label className="cursor-pointer block">
                                                <input
                                                    type="file"
                                                    className="hidden"
                                                    accept=".jpg,.jpeg,.png,.pdf"
                                                    onChange={handleFileChange}
                                                />
                                                <div className="flex flex-col items-center">
                                                    <Upload className="w-16 h-16 text-gray-400 mb-4" />
                                                    <p className="text-lg font-semibold text-gray-700 mb-2">
                                                        Click to upload ID document
                                                    </p>
                                                    <p className="text-xs text-gray-400">
                                                        Supported formats: JPG, PNG, PDF (Max 10MB)
                                                    </p>
                                                </div>
                                            </label>
                                        ) : (
                                            <div className="space-y-4">
                                                {idPreview && idPreview !== 'pdf' ? (
                                                    <img
                                                        src={idPreview}
                                                        alt="ID Preview"
                                                        className="max-h-64 mx-auto rounded-lg"
                                                    />
                                                ) : (
                                                    <div className="bg-red-100 rounded-lg p-6 mx-auto max-w-xs">
                                                        <div className="text-center">
                                                            <div className="text-4xl mb-2">📄</div>
                                                            <p className="font-semibold text-gray-700">PDF Document</p>
                                                        </div>
                                                    </div>
                                                )}
                                                <div className="flex items-center justify-center gap-4">
                                                    <p className="text-sm text-gray-600 font-medium">
                                                        {form.idDocument.name}
                                                    </p>
                                                    <button
                                                        type="button"
                                                        onClick={removeFile}
                                                        className="text-red-600 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
                                                    >
                                                        <X size={20} />
                                                    </button>
                                                </div>
                                                <p className="text-xs text-gray-400">
                                                    {(form.idDocument.size / 1024 / 1024).toFixed(2)} MB
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="flex gap-4">
                                    <button onClick={() => setStep(1)} disabled={loading} className="flex-1 bg-gray-100 text-gray-600 font-bold py-4 rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50">Back</button>
                                    <button onClick={submit} disabled={loading} className="flex-1 bg-green-600 text-white font-bold py-4 rounded-xl hover:bg-green-700 shadow-lg transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed">
                                        {loading ? "Processing..." : "Submit Application"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </main>

            {/* --- MODALS AND OVERLAYS --- */}
            {loading && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/95 backdrop-blur-sm p-6">
                    <div className="w-full max-w-sm text-center">
                        <div className="relative flex items-center justify-center mb-10">
                            <div className="h-24 w-24 border-4 border-gray-100 border-t-blue-600 rounded-full animate-spin"></div>
                            <span className="absolute text-xl font-black text-blue-600">{countdown}s</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">{processStatus}</h2>
                        <p className="text-gray-400 text-sm italic">Please do not close or refresh this page.</p>
                        <div className="mt-10 w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                            <div className="bg-blue-600 h-full transition-all duration-1000 ease-linear" style={{ width: `${((60 - countdown) / 60) * 100}%` }}></div>
                        </div>
                    </div>
                </div>
            )}

            {showSuccessModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
                    <div className="bg-white rounded-[40px] p-10 max-w-md w-full text-center shadow-2xl">
                        <div className="mx-auto flex items-center justify-center h-24 w-24 rounded-full bg-green-100 mb-8 text-green-600 text-5xl">✓</div>
                        <h2 className="text-3xl font-black text-gray-900 mb-4">You're Approved!</h2>
                        <p className="text-gray-500 mb-8 leading-relaxed">
                            Your application for <span className="font-bold text-blue-600">R{form.loanAmountFormatted}</span> has been successfully processed and approved.
                        </p>
                        <button
                            onClick={() => window.location.replace("/dashboard")}
                            className="w-full bg-[#0056b3] text-white font-bold py-5 rounded-2xl shadow-xl hover:bg-black transition-all"
                        >
                            Access Your Dashboard
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
