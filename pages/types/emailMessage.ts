/**
 * Represents an email message for the queue and processing.
 */
export interface EmailMessage {
    toEmail: string;
    message: string;
    isHtml: boolean;
    attachments?: Document[]; // Optional, adjust Document type as needed
    trackingId: string;
}

// Example Document type (customize as needed)
export interface Document {
    filename: string;
    content:  string;
    mimeType: string;
}