/**
 * SMS Queue Consumer
 * Listens to the SMS queue, checks for duplicate messages using trackingId,
 * selects the preferred SMS service client, sends the SMS, and saves the message to the DB.
 */

import { getSmsFromQueue } from '../queues/smsQueue'; // Assumed queue consumer function
import { SmsMessage } from '../types/smsMessage'; // Assumed type definition
import { findMessageByTrackingId, saveMessageToDb } from '../db/smsMessages'; // DB functions
import { getPreferredSmsClient } from '../services/smsClientSelector'; // Service selector
import { sendSms } from '../services/smsService'; // SMS sending function

// Main consumer function
export async function smsConsumer() {
    while (true) {
        // 1. Listen for new SMS messages from the queue
        const sms: SmsMessage | null = await getSmsFromQueue();
        if (!sms) {
            await new Promise(res => setTimeout(res, 1000)); // Wait before polling again
            continue;
        }

        // 2. Check if the message has already been sent using trackingId
        const alreadySent = await findMessageByTrackingId(sms.trackingId);
        if (alreadySent) {
            console.log(`Message with trackingId ${sms.trackingId} already sent.`);
            continue;
        }

        // 3. Pick the preferred SMS service client (from DB or config)
        const smsClient = await getPreferredSmsClient();

        // 4. Send the SMS to the user
        try {
            await sendSms(smsClient, sms.toPhoneNumber, sms.message);
            console.log(`SMS sent to ${sms.toPhoneNumber}`);
        } catch (error) {
            console.error(`Failed to send SMS: ${error}`);
            continue; // Optionally, requeue or log for retry
        }

        // 5. Save the message to the DB
        await saveMessageToDb(sms);
    }
}

// Optionally, start the consumer if this file is run directly
if (require.main === module) {
    smsConsumer().catch(console.error);
}

/*
Example SmsMessage object:
{
    toPhoneNumber: "08179606787",
    message: "Your otp is 124456 and it expires in 2 minutes",
    trackingId : "uuid"
}
*/

// ...You may need to implement or adjust the imported functions/types as per your project structure...