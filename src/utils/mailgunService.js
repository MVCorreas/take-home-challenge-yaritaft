import FormData from "form-data";
import Mailgun from "mailgun.js";

const mg = new Mailgun(FormData).client({
  username: "api",
  key: process.env.MAILGUN_API_KEY || "API_KEY",
});

export const mailgunService = {
  async sendEmail(to, subject, text) {
    return await mg.messages.create(
      "sandbox0f834edf36be435085f436c0ba14531e.mailgun.org",
      {
        from: "Mailgun Sandbox <postmaster@sandbox0f834edf36be435085f436c0ba14531e.mailgun.org>",
        to: [to],
        subject,
        text,
      }
    );
  },
};
