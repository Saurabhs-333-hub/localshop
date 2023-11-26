import connect from "@/db/config";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json()
        const { token } = reqBody
        console.log(token)

        const user = await User.findOne({
            verificationToken: token,
            verificationTokenExpiry: { $gt: Date.now() }
        })
        if (!user) {
            return NextResponse.json({
                message: 'Verification token is invalid or has expired'
            })
        }
        user.isVerified = true
        user.verificationToken = undefined
        user.verificationTokenExpiry = undefined
        await user.save()
        return NextResponse.json({
            message: 'Email Verified successfully',
            success: true
        })

    } catch (error) {
        return NextResponse.json({ error: error })
    }
}