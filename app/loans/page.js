import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import Bank from "@/lib/models/Bank";
import LoansClient from "@/components/LoansClient";

export default async function LoansPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) {
        redirect("/login");
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        redirect("/login");
    }

    await connectDB();
    const user = await User.findById(decoded.id).lean();
    const bank = await Bank.findOne({ userId: decoded.id }).lean();

    if (!user) {
        redirect("/login");
    }

    // Calculate loan data
    const totalLoan = Number(user?.loanAmount) || 0;
    const currentBalance = Number(user?.loanBalance) || 0;
    const repaymentMonths = Number(user?.repaymentMonths) || 0;

    const depositPercentage = 7;
    const securityDeposit = Math.round((totalLoan * depositPercentage) / 100);

    // Interest calculation
    let interestRate = 5; // 5% per annum
    const totalInterest = (totalLoan * interestRate * repaymentMonths) / (100 * 12);
    const totalLoanWithInterest = Math.round(totalLoan + totalInterest);
    const monthlyPayment = repaymentMonths > 0 ? Math.round(totalLoanWithInterest / repaymentMonths) : 0;

    // Next payment date
    let nextPaymentDate = "—";
    if (user?.createdAt) {
        const registrationDate = new Date(user.createdAt);
        const nextDate = new Date(registrationDate);
        nextDate.setMonth(registrationDate.getMonth() + 1);
        nextPaymentDate = nextDate.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric"
        });
    }

    // Generate payment schedule
    const paymentSchedule = [];
    if (user?.createdAt && repaymentMonths > 0) {
        const startDate = new Date(user.createdAt);
        const today = new Date();
        
        for (let i = 1; i <= repaymentMonths; i++) {
            const paymentDate = new Date(startDate);
            paymentDate.setMonth(startDate.getMonth() + i);
            
            const isPast = paymentDate < today;
            let status = "upcoming";
            
            if (isPast) {
                // For demo purposes, assume first 2 payments are paid
                status = i <= 2 ? "paid" : "overdue";
            } else if (i === 3) {
                status = "pending";
            }

            paymentSchedule.push({
                month: i,
                date: paymentDate.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric"
                }),
                amount: monthlyPayment,
                status,
                isPast
            });
        }
    }

    const loanData = {
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
    };

    return (
        <LoansClient
            user={JSON.parse(JSON.stringify(user))}
            bank={bank ? JSON.parse(JSON.stringify(bank)) : null}
            loanData={loanData}
        />
    );
}
