// // import { NextResponse } from "next/server";
// // import { connectDB } from "@/lib/config/db";
// // import Bank from "@/lib/models/Bank";

// // export async function POST(req) {
// //   await connectDB();
// //   const body = await req.json();

// //   await Bank.create(body);

// //   return NextResponse.json({ success: true });
// // }


// import { cookies } from "next/headers";
// import jwt from "jsonwebtoken";
// import Bank from "@/lib/models/Bank";
// import { connectDB } from "@/lib/config/db";

// export async function POST(req) {
//   await connectDB();

//   const token = cookies().get("token")?.value;
//   const decoded = jwt.verify(token, process.env.JWT_SECRET);

//   const { bank, accountName, accountNumber } = await req.json();

//   await Bank.findOneAndUpdate(
//     { userId: decoded.id },
//     { bank, accountName, accountNumber, userId: decoded.id },
//     { upsert: true, new: true }
//   );

//   return Response.json({ success: true });
// }


import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import { connectDB } from "@/lib/config/db";
import Bank from "@/lib/models/Bank";

export async function POST(req) {
    await connectDB();

    // ✅ cookies() IS ASYNC
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    if (!token) {
        return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    let decoded;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
        return Response.json({ error: "Invalid token" }, { status: 401 });
    }

    const { bank, accountName, accountNumber } = await req.json();

    await Bank.findOneAndUpdate(
        { userId: decoded.id },
        { bank, accountName, accountNumber, userId: decoded.id },
        { upsert: true, new: true }
    );

    return Response.json({ success: true });
}
