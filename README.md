 README.md – How to Setup & Test
md
Copy
Edit
# Next.js Notification Backend

## Features
- In-App Notification (Database)
- Email Notification via EmailJS
- SMS via Termii
- OTP System (Email or SMS)

## Setup

1. Clone the project
2. Install dependencies:

```bash
npm install
Add your environment variables to .env.local

Set up PostgreSQL tables:

bash
Copy
Edit
psql -U youruser -d yourdb -f prisma/migrations.sql
Run the dev server:

bash
Copy
Edit
npm run dev
API Endpoints
POST /api/notify

json
Copy
Edit
{
  "userId": "uuid",
  "type": "email" | "sms" | "in-app",
  "title": "Notification Title",
  "message": "Content here",
  "email": "optional",
  "phone": "optional"
}
POST /api/send-otp

json
Copy
Edit
{
  "userId": "uuid",
  "channel": "email" | "sms",
  "email": "optional",
  "phone": "optional"
}
Testing
Use Postman to test notify and send-otp endpoints.
Check logs for delivery or errors.

yaml
Copy
Edit

---

Shall I bundle all this in a downloadable `.zip`