import mailgun from "mailgun-js";
import nodemailer from "nodemailer";
import {adjectives, nouns} from "./words";
import jwt from "jsonwebtoken";

export const generateSecret = () => {
    const randomNumber = Math.floor(Math.random()*adjectives.length);
    return `${adjectives[randomNumber]} ${nouns[randomNumber]}`;
}

export const sendSecretMail = (address, secret) => {

    const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_PW
        }
    });

    const email= {
        from : process.env.ADMIN_EMAIL,
        to: address,
        subject: "Login Secret for instagram",
        text: "Thank you!",
        html: `Hello! you login secret is <b>${secret}</b>. <br/> Copy paste on the app!`
    };
    transport.sendMail(email, (err, info)=>{
        // console.log(info);
    });

}

export const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}