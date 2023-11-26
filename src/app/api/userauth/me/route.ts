import { getDataFromToken } from "@/helpers/getDataFromToken";

import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import connect from "@/db/config";

connect()

export async function GET(request: NextRequest) {
    try {


        const id = getDataFromToken(request)
        const user = await User.findOne({ _id: id }).select('-password')
        return NextResponse.json({
            message: 'User found',
            user: user
        })
    } catch (error) {
        return NextResponse.json({ error: error })
    }
}
