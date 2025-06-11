import type { NextApiRequest, NextApiResponse } from 'next';
import pool from '../../lib/db';
import { sendEmail } from '../../lib/email';
import { sendSMS } from '../../lib/sms';


// I think we should separate sms and email notification api
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, type, title, message, email, phone } = req.body;
// should not confirm the validate since it is a service to service validation
  if (!userId || !type || !title || !message)
    return res.status(400).json({ error: 'Missing required fields' });

  try {
    await pool.query(
      'INSERT INTO notifications (user_id, title, message, type) VALUES ($1, $2, $3, $4)',
      [userId, title, message, type]
    );

    if (type === 'email' && email) await sendEmail(email, title, message);
    else if (type === 'sms' && phone) await sendSMS(phone, message);

    res.status(200).json({ status: 'Notification sent' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Notification failed' });
  }
}
