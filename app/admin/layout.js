import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import AdminNav from "@/components/AdminNav";

export default async function AdminLayout({ children }) {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;
    
    if (!token) redirect("/login");

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        redirect("/login");
    }

    await connectDB();
    const user = await User.findById(decoded.id).lean();

    // Check if user is admin
    if (!user || user.role !== "admin") {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <AdminNav user={JSON.parse(JSON.stringify(user))} />
            <main>{children}</main>
        </div>
    );
}
