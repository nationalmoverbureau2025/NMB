/*
  # Update contact_messages table

  1. Changes
    - Remove recaptcha_token column requirement
    - Make recaptcha_token column nullable
*/

-- Make recaptcha_token column nullable
ALTER TABLE contact_messages 
ALTER COLUMN recaptcha_token DROP NOT NULL;