import nodemailer from "nodemailer";
import { EMAIL, PASS } from "../config/envConfig";

class EmailMethods {
  static sendEmail(to:string, subject:string, message:string) {
    let template;
    if (subject == "Email Verification") {
      template = emailTemplate(message);
    } else {
      template = successEmailTemplate(message);
    }

    //  2) nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: EMAIL, // email
        pass: PASS, // ye password hai uper wali email ka but google app passwrod wala hai
      },
    });

    const mailOptions = {
      from: EMAIL, // jis key  trf say email jaye gi yhan uper wali email jo transporter may hvi use hogi yahn kuch b do kam ni kry ga
      to: to, // jis ko bhjni email valid dalna
      subject: subject, // email subject
      html: template, // email body
    };

    // 3) nodemailer
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email Sent: " + info.response);
      }
    });
  }
}

// email template
function emailTemplate(OTP:string) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    
        <style>
            @media only screen and (max-width: 620px){
            h1{
            font-size: 20px;
            padding: 5px;
            }
            }
        </style>
    </head>
    <body>
        <div>
            <div style="max-width: 620px; margin: 0 auto; font-family:
            sans-serif; color: #272727;">
            <h1 style="background: #f6f6f6; padding: 10px; text-align:
            center; color: #272727;">We are delighted to welcome you to our
            team!</h1
            <P>Please Verify Your Email To Continue Your verification code
            is:</p>
            <p style="width: 80px; margin: 0 auto; font-weight: bold;
            text-align: center; background: #f6f6f6; border-radius: 5px;
            font-size: 25px;">${OTP}</p>
            </div>
            </div>
    </body>
    </html>`;
}

function successEmailTemplate(message:string) {
  return `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    
        <style>
            @media only screen and (max-width: 620px){
            h1{
            font-size: 20px;
            padding: 5px;
            }
            }
        </style>
    </head>
    <body>
       
        <div style="max-width: 620px; margin: 0 auto; font-family:
        sans-serif; color: #272727;">
        <h1 style="background: #f6f6f6; padding: 10px; text-align:
        center; color: #272727;">${message}</h1>
        </div>
        </div>
    </body>
    </html>`;
}

export default EmailMethods;
