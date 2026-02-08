import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import SettingsClient from "@/components/SettingsClient";

export default async function SettingsPage() {
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

    if (!user) {
        redirect("/login");
    }

    return (
        <SettingsClient 
            user={JSON.parse(JSON.stringify(user))}
        />
    );
}
