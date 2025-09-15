/**
 * Represents an SMS message for the queue and processing.
 */
export interface SmsMessage {
    toPhoneNumber: string;
    message: string;
    trackingId: string;
}