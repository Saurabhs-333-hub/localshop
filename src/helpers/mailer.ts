import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";



export const sendEmail = async ({ email, emailType, userID }: any) => {
    try {
        const hashedToken = await bcrypt.hash(userID.toString(), 12)
        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userID, { verificationToken: hashedToken, verificationTokenExpiry: Date.now() + 3600000 })
        } else if (emailType === "RESET PASSWORD") {
            await User.findByIdAndUpdate(userID, { forgotPasswordToken: hashedToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: process.env.MAILTRAP_USERID,
                pass: process.env.MAILTRAP_PASSWORD
            }
        });

        const mailOptions = {
            from: 'pearsocial.333@gmail.com',
            to: email,
            subject: emailType === 'VERIFY' ? 'Verify your account' : 'Reset your password',
            html: `<h1>${emailType}</h1>
            <pre>Click this <i><a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">link</a></i> or <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">${process.env.DOMAIN}/verifyemail?token=${hashedToken}</a>  ${emailType === "VERIFY" ? "to verify your account" : "to reset your password"} </pre>`
        }

        const mailResponse = await transport.sendMail(mailOptions)
        return mailResponse
    } catch (error: any) {
        throw new Error(error)
    }
}
