import axios from 'axios';

/**
 * We are normalizing a Nigerian phone number to the E.164 format without the leading '+'.
 * Example: 08012345678 -> 2348012345678
 * @param phoneNumber The phone number to normalize.
 * @returns The normalized phone number.
 */
const normalizePhoneNumber = (phoneNumber: string): string => {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  if (digitsOnly.startsWith('0')) {
    return `234${digitsOnly.substring(1)}`;
  }
  if (digitsOnly.startsWith('234')) {
    return digitsOnly;
  }
  return digitsOnly;
};

export async function sendSMS(to: string, message: string) {
  //Normalizing the phone number data from termii.
  const normalizedTo = normalizePhoneNumber(to);

  const payload = {
    api_key: process.env.TERMII_API_KEY,
    to: normalizedTo,
    from: process.env.TERMII_SENDER_ID,
    sms: message,
    type: 'plain',
    channel: 'dnd',
  };

  try {
    const response = await axios.post('https://api.ng.termii.com/api/sms/send', payload);
    
    console.log('SMS sent successfully:', response.data);
    return response.data;
  } catch (err) {
    //Generic  message type is advert. we want to use dnd - Yinka
    // It's better to log the detailed error response from axios if available
    if (axios.isAxiosError(err) && err.response) {
      console.error('SMS API Error:', err.response.data);
    } else {
      console.error('SMS Error:', err);
    }
    throw err;
  }
}
