import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export function getDataFromToken(request: NextRequest) {
    try {


        const token = request.cookies.get("token")?.value || "";


        const decodedToken: any = jwt.verify(token, process.env.TOKEN! || "");
        return decodedToken.id;
    } catch (error) {

    }
}