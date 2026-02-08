// export async function POST(res) {
//   try {
//     const response = NextResponse.json(
//       { success: true, message: "Logged out successfully" },
//       { status: 200 }
//     );

//     // Clear the cookie by setting maxAge to 0
//     response.cookies.set("token", "", {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//       expires: new Date(0), // Forces the cookie to expire immediately
//     });

//     return response;
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Failed to logout" },
//       { status: 500 }
//     );
//   }
// }


import { NextResponse } from "next/server";

export async function POST() {
    try {
        const res = NextResponse.json({ success: true, message: "Logged out successfully" });

        // Clear the token cookie
        res.cookies.set("token", "", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            path: "/",
            maxAge: 0, // Expire immediately
        });

        return res;
    } catch (error) {
        console.error("LOGOUT ERROR:", error);
        return NextResponse.json(
            { error: "Logout failed" },
            { status: 500 }
        );
    }
}
