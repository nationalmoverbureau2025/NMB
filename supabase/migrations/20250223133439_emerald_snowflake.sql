/*
  # Add contact messages table

  1. New Tables
    - `contact_messages`
      - `id` (uuid, primary key)
      - `name` (text)
      - `email` (text)
      - `subject` (text)
      - `message` (text)
      - `recaptcha_token` (text)
      - `created_at` (timestamp)
      - `status` (text)

  2. Security
    - Enable RLS on `contact_messages` table
    - Add policy for authenticated users to read their own messages
    - Add policy for anyone to insert messages (with reCAPTCHA)
*/

CREATE TABLE IF NOT EXISTS contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  subject text NOT NULL,
  message text NOT NULL,
  recaptcha_token text NOT NULL,
  status text DEFAULT 'pending',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert messages (with reCAPTCHA)
CREATE POLICY "Anyone can insert messages"
  ON contact_messages FOR INSERT
  TO public
  WITH CHECK (true);

-- Only authenticated users can view their own messages
CREATE POLICY "Users can view their own messages"
  ON contact_messages FOR SELECT
  TO authenticated
  USING (email = auth.jwt() ->> 'email');