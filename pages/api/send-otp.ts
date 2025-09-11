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

  /** SMS Queue
   * // write a conusmer that listens to the sms queue;
   * // check using the tracking Id if that message has been sent before
   * // pick the service preferred client(either from db or config) to process the sms.
   * //send the sms to the user;
   * // save the message to the db
   *
   * {
   *     toPhoneNumber: "08179606787",
   *     message: "Your otp is 124456 and it expires in 2 minutes",
   *     trackingId : uuid
   * }
   */


  /**
   * EMAIL QUEUE
   * write a consumer that listens to the email queue;
   * check using the trackingId if that message has been sent before
   * pick the preferred client (either from config or db) to process the email;
   * send the email to user;
   * save the email to the db
   * {
   * toEmail : "test@gmail.com"
   * message :"dear kdfsdkaldfke",
   * isHtml : true,
   * attachments: Document[]
   * }
   */

}
