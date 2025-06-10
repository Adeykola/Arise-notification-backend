import pool from './db';
import { sendEmail } from './email';
import { sendSMS } from './sms';

export async function generateAndSendOTP(
  userId: string,
  channel: 'email' | 'sms',
  contact: string
) {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  await pool.query('INSERT INTO otps (user_id, otp_code) VALUES ($1, $2)', [userId, otp]);

  const message = `Your OTP is: ${otp}`;
  if (channel === 'email') return await sendEmail(contact, 'Your OTP Code', message);
  if (channel === 'sms') return await sendSMS(contact, message);
}
