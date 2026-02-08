import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return NextResponse.json({ authenticated: false }, { status: 401 });
        }

        // Verify the token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        return NextResponse.json({ 
            authenticated: true,
            user: { id: decoded.id, role: decoded.role }
        }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ authenticated: false }, { status: 401 });
    }
}
