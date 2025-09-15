import Redis from 'ioredis';
import { EmailMessage } from '../types/emailMessage';

const redis = new Redis(); // Connects to localhost:6379 by default
const EMAIL_QUEUE_KEY = 'emailQueue';

/**
 * Adds an email message to the Redis queue.
 */
export async function addEmailToQueue(email: EmailMessage) {
    await redis.rpush(EMAIL_QUEUE_KEY, JSON.stringify(email));
}

/**
 * Gets the next email message from the Redis queue (FIFO).
 * Returns null if the queue is empty.
 */
export async function getEmailFromQueue(): Promise<EmailMessage | null> {
    const emailString = await redis.lpop(EMAIL_QUEUE_KEY);
    if (!emailString) return null;
    try {
        return JSON.parse(emailString) as EmailMessage;
    } catch {
        return null;


}    
}    
