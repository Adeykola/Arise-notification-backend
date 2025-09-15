import { SmsMessage } from '../types/smsMessage';

// Simulated in-memory DB
const sentMessages: SmsMessage[] = [];

/**
 * Checks if an SMS with the given trackingId has already been sent.
 */
export async function findMessageByTrackingId(trackingId: string): Promise<SmsMessage | undefined> {
    return sentMessages.find(msg => msg.trackingId === trackingId);
}

/**
 * Saves the SMS message to the DB.
 */
export async function saveMessageToDb(sms: SmsMessage): Promise<void> {
    sentMessages.push(sms);
}