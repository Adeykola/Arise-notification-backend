/**
 * Simulated list of available email clients.
 * Replace with DB/config lookup as needed.
 */
const emailClients = [
    { name: 'SendGrid', apiKey: 'SENDGRID_API_KEY' },
    { name: 'Mailgun', apiKey: 'MAILGUN_API_KEY' }
];

/**
 * Returns the preferred email client.
 * In production, fetch from DB or config.
 */
export async function getPreferredEmailClient() {
    // Example: always pick the first client
    return emailClients[0];
}