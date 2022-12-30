import { Twilio } from "twilio";

const client = new Twilio(
  process.env.TWILIO_ACCOUNT_SID as string,
  process.env.TWILIO_AUTH_TOKEN as string
);

export const sendSMS = (phone: string) => {
  try {
    client.messages.create({
      body: "Welcome to Super League",
      from: process.env.TWILIO_PHONE_NUMBER,
      to: `+55${phone}`,
    });
  } catch (error) {
    console.log(error);
  }
};
