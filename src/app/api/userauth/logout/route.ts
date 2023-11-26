import { NextResponse } from "next/server";

export async function GET() {
    try {
        const res = NextResponse.json({
            message: "Logout SuccessFull",
            success: true
        })

        await res.cookies.set("token", "", {
            httpOnly: true, expires: new Date(0)
        })
        console.log(res)
        return res;
    } catch (error) {
        return NextResponse.json({
            error: error
        })
    }
}