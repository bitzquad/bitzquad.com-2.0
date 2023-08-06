/*  Importings    */
import { NextApiRequest, NextApiResponse } from "next";
import jwt from "jsonwebtoken";
import { serialize } from "cookie";

const cookieTime = 4 * 60 * 60; // 4 hours

const setToken = async (res: NextApiResponse, user: { id: string; name: string; status: number } = { id: "", name: "", status: 0 }) => {
    res.setHeader(
        "Set-Cookie",
        serialize("auth", jwt.sign({ I: user.id, N: user.name, T: user.status }, process.env.JWT_SECRET || "123456789"), {
            path: "/",
            httpOnly: true,
            sameSite: true,
            secure: true,
            maxAge: cookieTime,
        })
    ); // set the cookie
};

const resolveToken = (req: NextApiRequest, res: NextApiResponse) => {
    const token = req.cookies.auth;
    if (token) {
        try {
            const v = jwt.verify(token, process.env.JWT_SECRET || "123456789") as { I: string; N: string; T: number; iat: number };
            const expierd = v.iat + cookieTime < Date.now() / 1000;
            console.log("expierd : ", expierd);
            return { success: v !== null, user: { id: v.I, name: v.N, status: v.T }, expierd };
        } catch (err: any) {
            return { success: false, error: { type: err.name, message: err.message }, user: { id: "", name: "", status: 0 }, expierd: true };
        }
    }
    return { success: false, error: { type: "NoToken", message: "No token found" }, user: { id: "", name: "", status: 0 }, expierd: true };
};

export default { setToken, resolveToken };
