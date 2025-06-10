import emailjs from '@emailjs/browser';

export async function sendEmail(to: string, subject: string, message: string) {
  try {
    const result = await emailjs.send(
      process.env.EMAILJS_SERVICE_ID!,
      process.env.EMAILJS_TEMPLATE_ID!,
      {
        to_email: to,
        subject,
        message,
      },
      process.env.EMAILJS_PUBLIC_KEY
    );
    return result.status;
  } catch (err) {
    console.error('Email Error:', err);
    throw err;
  }
}
