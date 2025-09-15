/**
 * Simulated list of available SMS clients.
 * Replace with DB/config lookup as needed.
 */
const smsClients = [
    { name: 'Twilio', apiKey: 'TWILIO_API_KEY' },
    { name: 'Nexmo', apiKey: 'NEXMO_API_KEY' }
];

/**
 * Returns the preferred SMS client.
 * In production, fetch from DB or config.
 */
export async function getPreferredSmsClient() {
    // Example: always pick the first client
    return smsClients[0];
}