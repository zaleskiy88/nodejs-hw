const nodemailer = require("nodemailer");
require("dotenv").config("");
// ====================Email sender========================================= //

// const { SAPO_EMAIL_ADRESS, SAPO_EMAIL_PASS, SAPO_SMTP_SERVER } = process.env;

const nodemailerConfig = {
  host: "smtp.sapo.pt", // SAPO_SMTP_SERVER
  port: 465,
  secure: true,
  auth: {
    user: "zaleskiy88@sapo.pt", // SAPO_EMAIL_ADRESS
    pass: "Sl4vaUkraini", // SAPO_EMAIL_PASS
  },
};

const transporter = nodemailer.createTransport(nodemailerConfig);

const sendEmail = async (data) => {
  const email = { ...data, from: "zaleskiy88@sapo.pt" }; // SAPO_EMAIL_ADRESS

  await transporter.sendMail(email);

  console.log("Email sent");
  return true;
};

// ============================================================= //

module.exports = sendEmail;
