import axios from 'axios';

export async function sendSMS(to: string, message: string) {
  const payload = {
    api_key: process.env.TERMII_API_KEY,
    to,
    from: process.env.TERMII_SENDER_ID,
    sms: message,
    type: 'plain',
    channel: 'generic',
  };

  try {
    const response = await axios.post('https://api.ng.termii.com/api/sms/send', payload);
    return response.data;
  } catch (err) {
    console.error('SMS Error:', err);
    throw err;
  }
}
