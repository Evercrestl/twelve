import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { redirect } from "next/navigation";
import AdminLoginClient from "@/components/AdminLoginClient";

export default async function AdminLoginPage() {
    // Check if user is already logged in
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (token) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // If user is already logged in and is admin, redirect to admin panel
            if (decoded.role === "admin") {
                redirect("/admin");
            }
            // If user is logged in but not admin, redirect to dashboard
            redirect("/dashboard");
        } catch {
            // Token is invalid, continue to login page
        }
    }

    return <AdminLoginClient />;
}
