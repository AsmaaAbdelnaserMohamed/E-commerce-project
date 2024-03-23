import nodemailer from "nodemailer";
import { emailTemplate } from "./emailTemplate.js";
import jwt from "jsonwebtoken";

export const sendEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      // TODO: replace `user` and `pass` values from <https://forwardemail.net>
      user: process.env.EMAIL_NAME,
      pass: process.env.EMAIL_PASS,
    },
  });
  let token = jwt.sign({ email }, "sendingEmails");
  const info = await transporter.sendMail({
    from: ` "Asmaa Abdelnaser Mohamed" <${process.env.EMAIL_NAME}>`, // sender address
    to: email, // list of receivers
    subject: "Hello from Asmaa Abdelnaser Mohamed ✔", // Subject line
    html: emailTemplate(token), // plain text body
  });

  console.log(`Message sent:send to ${token}`);
};

// ayaa14213@gmail.com,saol25974@gmail.com
