import nodemailer from "nodemailer";

export type SubmissionType = "CONTACT" | "NEWSLETTER" | "LEAD" | "PACKAGE";

const SUBMISSION_LABELS: Record<SubmissionType, string> = {
  CONTACT: "Contact Enquiry",
  NEWSLETTER: "Newsletter Subscriber",
  LEAD: "Lead Capture",
  PACKAGE: "Package Inquiry",
};

function getTransporter() {
  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.GMAIL_USER,
      pass: process.env.GMAIL_APP_PASSWORD,
    },
  });
}

/**
 * Sends a short admin-only notification email after a submission has been
 * successfully saved to the database. Never throws: failures are logged and
 * swallowed so a mail outage can never fail the caller's success response.
 * Contains no submitter data — just what happened and when.
 */
export async function sendSubmissionNotification(type: SubmissionType): Promise<void> {
  const label = SUBMISSION_LABELS[type];
  const recipient = process.env.ADMIN_NOTIFICATION_EMAIL || process.env.GMAIL_USER;

  if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD || !recipient) {
    console.error(`[Submission Notification] Skipped ${label}: mail is not configured`);
    return;
  }

  const timestamp = new Date().toLocaleString("en-IN", {
    timeZone: "Asia/Kolkata",
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });

  try {
    const transporter = getTransporter();
    await transporter.sendMail({
      from: `Ritera Publishing <${process.env.GMAIL_USER}>`,
      to: recipient,
      subject: `New ${label} – Ritera Publishing`,
      text: [
        `A new ${label} was submitted on Ritera Publishing.`,
        "",
        `Type: ${label}`,
        `Time: ${timestamp}`,
        "",
        "Please check the Admin Dashboard for the submission details.",
      ].join("\n"),
    });
  } catch (err) {
    console.error(`[Submission Notification] Failed to send ${label} notification`, err);
  }
}
