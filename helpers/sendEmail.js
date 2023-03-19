const nodemailer = require("nodemailer");
require("dotenv").config("");
// ====================Email sender========================================= //

const { SAPO_EMAIL_ADRESS, SAPO_EMAIL_PASS, SAPO_SMTP_SERVER } = process.env;

const nodemailerConfig = {
  host: SAPO_SMTP_SERVER,
  port: 465,
  secure: true,
  auth: {
    user: SAPO_EMAIL_ADRESS,
    pass: SAPO_EMAIL_PASS,
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: SAPO_EMAIL_ADRESS };

  await transporter.sendMail(email);

  console.log("Email sent");
  return true;
};

// ============================================================= //

module.exports = sendEmail;
