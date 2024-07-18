import nodemailer from "nodemailer";

//The main thing in this file is transporterInfo and mailInfo
let transporterInfo = {
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    //user and pass must be genuine
    user: "anishadk96@gmail.com",
    pass: "lvig waeh kxqe mtmn",
  },
};

export const sendEmail = async (mailInfo) => {
  try {
    let transporter = nodemailer.createTransport(transporterInfo);
    let info = await transporter.sendMail(mailInfo);
  } catch (error) {
    console.log("error has occurred", error.message);
  }
};
