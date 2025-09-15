import Redis from 'ioredis';
import { SmsMessage } from '../types/smsMessage';

const redis = new Redis(); // Connects to localhost:6379 by default
const SMS_QUEUE_KEY = 'smsQueue';

/**
 * Adds an SMS message to the Redis queue.
 */
export async function addSmsToQueue(sms: SmsMessage) {
    await redis.rpush(SMS_QUEUE_KEY, JSON.stringify(sms));
}

/**
 * Gets the next SMS message from the Redis queue (FIFO).
 * Returns null if the queue is empty.
 */
export async function getSmsFromQueue(): Promise<SmsMessage | null> {
    const smsString = await redis.lpop(SMS_QUEUE_KEY);
    if (!smsString) return null;
    try {
        return JSON.parse(smsString) as SmsMessage;
    } catch {
        return null;
    }
}