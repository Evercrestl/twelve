import { cookies } from "next/headers";
import jwt from "jsonwebtoken";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return Response.json({ authenticated: false }, { status: 401 });
        }

        // Verify the token
        jwt.verify(token, process.env.JWT_SECRET);
        
        return Response.json({ authenticated: true }, { status: 200 });
    } catch (error) {
        return Response.json({ authenticated: false }, { status: 401 });
    }
}
