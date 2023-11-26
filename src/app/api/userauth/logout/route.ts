import { NextResponse } from "next/server";

export async function GET() {
    try {

        const res = NextResponse.json({
            message: "Logout SuccessFull",
            success: true
        })
        // localStorage.setItem("token", "")
        res.cookies.set("token", "", {
            expires: new Date(0)
        })
        console.log(res)
        return res;
    } catch (error) {
        return NextResponse.json({
            error: error
        })
    }
}