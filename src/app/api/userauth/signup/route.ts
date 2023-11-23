import connect from "@/db/config";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";


connect()

export async function POST(request: NextRequest) {

    const { username, password, email } = await request.json();

    //? Check if user exists
    const user = await User.findOne({ email })
    if (user) {
        return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    //? Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //? create new user
    const newUser = new User({
        username,
        password: hashedPassword,
        email,
    });

    //? save user
    const res = await newUser.save();
    console.log(res)
    return NextResponse.json(res)

}