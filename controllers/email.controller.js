const EmailService = require("../services/email.service");

exports.getEmails = async function (req, res, next) {
  const name = req.body.name;
  const email = req.body.email;
  const text = req.body.text;
  try {
    const emails = await EmailService.getEmails({}, name, email, text);
    return res.status(200).json({ status: 200, data: emails, message: "Message Sent Successfully!" });
  } catch (e) {
    return res.status(400).json({ status: 400, message: e.message });
  }
};
