const Email = require("../models/email.model");
const nodemailer = require("nodemailer");

exports.getEmails = async function (name, email, text) {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });
  const mailOption = {
    from: process.env.USER,
    to: process.env.EMAIL,
    html: `You got a message from
    Email : ${email}
    Name: ${name}
    Message: ${text}`,
  };
  try {
    await transporter.sendMail(mailOption);
    return Promise.resolve("Message Sent Successfully!");
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
};
