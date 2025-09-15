import { EmailMessage } from '../types/emailMessage';

// Simulated in-memory DB
const sentEmails: EmailMessage[] = [];

/**
 * Checks if an email with the given trackingId has already been sent.
 */
export async function findEmailByTrackingId(trackingId: string): Promise<EmailMessage | undefined> {
    return sentEmails.find(email => email.trackingId === trackingId);
}

/**
 * Saves the email message to the DB.
 */
export async function saveEmailToDb(email: EmailMessage): Promise<void> {
    sentEmails.push(email);
}