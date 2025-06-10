import type { NextApiRequest, NextApiResponse } from 'next';
import { generateAndSendOTP } from '../../lib/otp';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, channel, email, phone } = req.body;

  if (!userId || !channel || (channel === 'email' && !email) || (channel === 'sms' && !phone)) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    const contact = channel === 'email' ? email : phone;
    await generateAndSendOTP(userId, channel, contact);
    res.status(200).json({ status: 'OTP sent' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to send OTP' });
  }
}
