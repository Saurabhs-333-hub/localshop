import connect from "@/db/config";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect()

export async function POST(request: NextRequest) {

    const { password, email } = await request.json();

    //? Check if user exists
    const user = await User.findOne({ email })
    if (!user) {
        return NextResponse.json({ message: "User doesn't exist!" }, { status: 400 });
    }

    //? Validate password
    const validatepassword = await bcrypt.compare(password, user.password);

    if (!validatepassword) {
        return NextResponse.json({ error: "Incorrect username or password" })
    }
    //? Create token data
    const tokenData = {
        id: user._id,
        username: user.username,
        email: user.email
    }

    //? Create token
    const token = await jwt.sign(tokenData, process.env.TOKEN!, { expiresIn: "1h" })

    const res = NextResponse.json({
        message: "Login SuccessFull",
        success: true
    })

    //? Setting token to cookies
    res.cookies.set("token", token, {
        httpOnly: true
    })

    console.log(res)
    return res

}