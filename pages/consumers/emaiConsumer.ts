/**
 * EMAIL QUEUE CONSUMER
 * Listens to the email queue, checks for duplicate messages using trackingId,
 * selects the preferred email service client, sends the email, and saves the message to the DB.
 */

import { getEmailFromQueue } from '../queues/emailQueue'; // Assumed queue consumer function
import { EmailMessage } from '../types/emailMessage'; // Assumed type definition
import { findEmailByTrackingId, saveEmailToDb } from '../db/emailMessages'; // DB functions
import { getPreferredEmailClient } from '../services/emailClientSelector'; // Service selector
import { sendEmail } from '../services/emailService'; // Email sending function

// Main consumer function
export async function emailConsumer() {
    while (true) {
        // 1. Listen for new email messages from the queue
        const email: EmailMessage | null = await getEmailFromQueue();
        if (!email) {
            await new Promise(res => setTimeout(res, 1000)); // Wait before polling again
            continue;
        }

        // 2. Check if the message has already been sent using trackingId
        const alreadySent = await findEmailByTrackingId(email.trackingId);
        if (alreadySent) {
            console.log(`Email with trackingId ${email.trackingId} already sent.`);
            continue;
        }

        // 3. Pick the preferred email service client (from DB or config)
        const emailClient = await getPreferredEmailClient();

        // 4. Send the email to the user
        try {
            await sendEmail(
                emailClient,
                email.toEmail,
                email.message,
                email.isHtml,
                email.attachments
            );
            console.log(`Email sent to ${email.toEmail}`);
        } catch (error) {
            console.error(`Failed to send email: ${error}`);
            continue; // Optionally, requeue or log for retry
        }

        // 5. Save the email to the DB
        await saveEmailToDb(email);
    }
}

// Optionally, start the consumer if this file is run directly
if (require.main === module) {
    emailConsumer().catch(console.error);
}

/*
Example EmailMessage object:
{
    toEmail : "test@gmail.com",
    message :"dear kdfsdkaldfke",
    isHtml : true,
    attachments: [/* Document objects * /],
    trackingId: "uuid"
}
*/

// ...You may need to implement or adjust the imported functions/types as per your project