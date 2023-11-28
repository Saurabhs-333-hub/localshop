import { NextResponse } from "next/server";

export async function GET() {
    try {

        const res = NextResponse.json({
            message: "Logout SuccessFull",
            success: true
        })
        // localStorage.setItem("token", "hhghhj")
        if (res.cookies.get("token") == null) {
            console.log("null")
        }
        else {
            res.cookies.delete("token")
            console.log(`res${res.cookies.getAll().forEach((cookie) => {
                console.log(cookie)
            })}`)
        }

        return res;
    } catch (error) {
        return NextResponse.json({
            error: error
        })
    }
}