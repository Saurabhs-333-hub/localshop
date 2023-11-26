import { NextResponse } from "next/server";

export async function GET() {
    try {

        const res = NextResponse.json({
            message: "Logout SuccessFull",
            success: true
        })
        // localStorage.setItem("token", "")
        res.cookies.delete("token")
        console.log(res)
        return res;
    } catch (error) {
        return NextResponse.json({
            error: error
        })
    }
}