import nodemailer from "nodemailer";

export const sendEmail = (
  first_name: string,
  last_name: string,
  email: string
) => {
  const transporter = nodemailer.createTransport({
    service: process.env.EMAIL_SERVICE,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: email,
    subject: "Welcome to Super League",
    html: `
      <h1>Hi ${first_name} ${last_name}</h1>
      <p>welcome to Super League</p>
    `,
  };

  transporter.sendMail(mailOptions, (error) => {
    if (error) {
      console.log(error);
    }
  });
};
