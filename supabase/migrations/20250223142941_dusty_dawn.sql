-- Add address and rating fields to companies table
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS address_street text,
ADD COLUMN IF NOT EXISTS address_city text,
ADD COLUMN IF NOT EXISTS address_state text,
ADD COLUMN IF NOT EXISTS address_zip text,
ADD COLUMN IF NOT EXISTS raw_rating numeric(3,2) DEFAULT 0,
ADD COLUMN IF NOT EXISTS adjusted_rating numeric(3,2) DEFAULT 0;

-- Update example company with address and ratings
UPDATE companies 
SET 
  address_street = '123 Moving Ave',
  address_city = 'Chicago',
  address_state = 'IL',
  address_zip = '60601',
  raw_rating = 4.8,
  adjusted_rating = 3.2
WHERE id = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';