config("dotenv").config("nodemailer");
//const express = require("express");
const nodemailer = require("nodemailer");
const Email = require("../models/emails");
const router = express.Router();

//const app = express();
// const PORT = 3000;

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   tls: {
//     rejectUnauthorized: false,
//   },
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASSWORD,
//   },
// });

// transporter.sendMail(
//   {
//     from: "coderscampprojekt@gmail.com",
//     to: "justyna.staniszewska@coderscrew.pl",
//     subject: "test mail",
//     text: "test mail",
//   },
//   (error, response) => {
//     if (error) console.log("Error", error);
//     else console.log("Mail sent, ", response);
//   }
// );

// app.listen(PORT, () => {
//   console.log("Server started on PORT", PORT);
// });

const path = require("path");
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

async function mainMail(name, email, message) {
  const transporter = await nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.PASSWORD,
    },
  });
  const mailOption = {
    from: process.env.GMAIL_USER,
    to: process.env.EMAIL,
    html: `You got a message from 
    Email : ${email}
    Name: ${name}
    Message: ${message}`,
  };
  try {
    await transporter.sendMail(mailOption);
    return Promise.resolve("Message Sent Successfully!");
  } catch (error) {
    console.log(error);
    return Promise.reject(error);
  }
}

app.get("/", (req, res) => {
  res.render(index.html);
});

app.get("/ContactForm", (req, res) => {
  res.render(ContactForm.jsx);
});

app.post("/ ContactForm", async (req, res, next) => {
  const { yourname, youremail, yourmessage } = req.body;
  try {
    await mainMail(yourname, youremail, yourmessage);

    res.send("Message Successfully Sent!");
  } catch (error) {
    res.send("Message Could not be Sent");
  }
});

app.listen(3000, () => console.log("Server is running!"));
