-- this user table is not needed 
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY,
  email TEXT,
  phone TEXT
);

CREATE TABLE IF NOT EXISTS notifications (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  title TEXT,
  message TEXT,
  type TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- this also is not needed otp is for the authentication service
CREATE TABLE IF NOT EXISTS otps (
  id SERIAL PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  otp_code TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
