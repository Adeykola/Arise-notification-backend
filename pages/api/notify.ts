import type { NextApiRequest, NextApiResponse } from 'next';
import { addEmailToQueue } from '../queues/emailQueue';
import { addSmsToQueue } from '../queues/smsQueue';
import { v4 as uuidv4 } from 'uuid';
import prisma from '../../lib/prisma'; // you would have set up Prisma

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { userId, type, title, message, email, phone } = req.body;

  // Service-to-service: skip user validation, but check required fields
  if (!userId || !type || !title || !message) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    // Use Prisma ORM to avoid SQL injection
    await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
      },
    });

    const trackingId = uuidv4();

    if (type === 'email' && email) {
      await addEmailToQueue({
        toEmail: email,
        message: `${title}\n\n${message}`,
        isHtml: false,
        attachments: [],
        trackingId,
      });
    } else if (type === 'sms' && phone) {
      await addSmsToQueue({
        toPhoneNumber: phone,
        message: `${title}: ${message}`,
        trackingId,
      });
    }

    res.status(200).json({ status: 'Notification queued' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Notification failed' });
  }
}
