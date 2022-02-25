config("dotenv").config("nodemailer");
const nodemailer = require("nodemailer");
const mainMail = require("../models/emails");
const path = require("path");
const app = express();

const PORT = 3000;

// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   tls: {
//     rejectUnauthorized: false,
//   },
//   auth: {
//     user: process.env.EMAIL,
//     pass: process.env.PASS,
//   },
// });

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

async function mainMail(name, email, message) {
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

app.listen(PORT, () => {
  console.log("Server started on PORT", PORT);
});

app.get("/", (req, res, next) => {
  res.render("");
});
