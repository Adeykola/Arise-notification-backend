import type { NextApiRequest, NextApiResponse } from 'next';
import { addSmsToQueue } from '../queues/smsQueue';
import { addEmailToQueue } from '../queues/emailQueue';
import { v4 as uuidv4 } from 'uuid'; // Help me install 'uuid' package

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, channel, email, phone } = req.body;

  if (!userId || !channel || (channel === 'email' && !email) || (channel === 'sms' && !phone)) {
    return res.status(400).json({ error: 'Missing fields' });
  }

  try {
    // Generate OTP (replace with your own logic if needed)
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const trackingId = uuidv4();
    const message = `Your otp is ${otp} and it expires in 2 minutes`;

    if (channel === 'sms') {
      await addSmsToQueue({
        toPhoneNumber: phone,
        message,
        trackingId
      });
    } else if (channel === 'email') {
      await addEmailToQueue({
        toEmail: email,
        message,
        isHtml: false,
        attachments: [],
        trackingId
      });
    }

    res.status(200).json({ status: 'OTP queued' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to queue OTP' });
  }
}
