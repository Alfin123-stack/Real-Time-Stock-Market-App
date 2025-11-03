// lib/nodemailer/index.ts
import nodemailer from "nodemailer";
import {
  WELCOME_EMAIL_TEMPLATE,
  NEWS_SUMMARY_EMAIL_TEMPLATE,
} from "@/lib/nodemailer/templates";

type WelcomeEmailData = {
  email: string;
  name: string;
  intro: string;
};

const EMAIL = process.env.NODEMAILER_EMAIL!;
const PASSWORD = process.env.NODEMAILER_PASSWORD!;

// === Transporter Konfigurasi ===
export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true, // true untuk port 465 (TLS)
  auth: {
    user: EMAIL,
    pass: PASSWORD,
  },
});

// === Tes koneksi SMTP (opsional tapi sangat berguna) ===
(async () => {
  try {
    await transporter.verify();
    console.log("✅ Nodemailer connected to Gmail SMTP server");
  } catch (err) {
    console.error("❌ Nodemailer connection failed:", err);
  }
})();

// === Kirim Welcome Email ===
export const sendWelcomeEmail = async ({
  email,
  name,
  intro,
}: WelcomeEmailData) => {
  try {
    const htmlTemplate = WELCOME_EMAIL_TEMPLATE.replaceAll(
      "{{name}}",
      name
    ).replaceAll("{{intro}}", intro);

    const mailOptions = {
      from: `"RTStock" <${EMAIL}>`,
      to: email,
      subject: "👋 Welcome to RTStock – Your stock market toolkit is ready!",
      text: `Hi ${name}, welcome to RTStock! ${intro}`,
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Welcome email sent to ${email}`);
  } catch (err) {
    console.error("❌ Failed to send welcome email:", err);
  }
};

// === Kirim Market News Summary ===
export const sendNewsSummaryEmail = async ({
  email,
  date,
  newsContent,
}: {
  email: string;
  date: string;
  newsContent: string;
}): Promise<void> => {
  try {
    const htmlTemplate = NEWS_SUMMARY_EMAIL_TEMPLATE.replaceAll(
      "{{date}}",
      date
    ).replaceAll("{{newsContent}}", newsContent);

    const mailOptions = {
      from: `"RTStock News" <${EMAIL}>`,
      to: email,
      subject: `📈 Market News Summary – ${date}`,
      text: `Today's market news summary from RTStock`,
      html: htmlTemplate,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ News summary sent to ${email}`);
  } catch (err) {
    console.error("❌ Failed to send news summary email:", err);
  }
};
