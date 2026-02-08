import { connectDB } from "@/lib/config/db";
import User from "@/lib/models/User";
import Bank from "@/lib/models/Bank";
import UserManagement from "@/components/UserManagement";

export default async function AdminUsersPage() {
    await connectDB();

    const dbUsers = await User.find({})
        .sort({ createdAt: -1 })
        .lean();

    const users = await Promise.all(
        dbUsers.map(async (user) => {
            const bank = await Bank.findOne({ userId: user._id }).lean();
            return {
                ...user,
                _id: user._id.toString(),
                createdAt: user.createdAt?.toISOString(),
                bank: bank ? {
                    ...bank,
                    _id: bank._id.toString(),
                } : null,
            };
        })
    );

    return (
        <div className="px-4 py-6 max-w-7xl mx-auto">
            <div className="mb-6">
                <h1 className="text-2xl font-black text-slate-800">User Management</h1>
                <p className="text-slate-500 text-sm mt-1">View and manage all users</p>
            </div>
            <UserManagement users={JSON.parse(JSON.stringify(users))} />
        </div>
    );
}
