// mailSender.js
// Uses Brevo Email API (HTTP) – Render safe

const axios = require("axios");

const mailSender = async (email, title, body) => {
  try {
    const response = await axios.post(
      "https://api.brevo.com/v3/smtp/email",
      {
        sender: {
          name: "StudyNotion",
          email: "maheshtitare748@gmail.com", // ✅ VERIFIED BREVO EMAIL
        },
        to: [{ email }],
        subject: title,
        htmlContent: body,
      },
      {
        headers: {
          "api-key": process.env.BREVO_API_KEY,
          "Content-Type": "application/json",
        },
        timeout: 15000,
      }
    );

    console.log("EMAIL SENT VIA BREVO API ✅", response.data);
    return response.data;
  } catch (error) {
    console.error(
      "BREVO API ERROR ❌",
      error.response?.data || error.message
    );
    throw error;
  }
};

module.exports = mailSender;
