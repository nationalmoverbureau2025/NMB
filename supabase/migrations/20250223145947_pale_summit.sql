/*
  # Add Company Fields Migration

  1. New Fields
    - owner_name (text)
    - mc_number (text)
    - safety_rating (text)
    - fleet_size (integer)
    - dot_complaints (integer)
    - address_street (text)
    - address_city (text)
    - address_state (text)
    - address_zip (text)
    - raw_rating (numeric(3,2))
    - adjusted_rating (numeric(3,2))

  2. Changes
    - Adds all fields if they don't exist
    - Sets appropriate default values
    - Updates example company data

  3. Security
    - No changes to RLS policies (using existing)
*/

-- Add all fields if they don't exist
DO $$ 
BEGIN
  -- Basic company information
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'owner_name'
  ) THEN
    ALTER TABLE companies ADD COLUMN owner_name text;
  END IF;

  -- FMCSA Information
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'mc_number'
  ) THEN
    ALTER TABLE companies ADD COLUMN mc_number text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'safety_rating'
  ) THEN
    ALTER TABLE companies ADD COLUMN safety_rating text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'fleet_size'
  ) THEN
    ALTER TABLE companies ADD COLUMN fleet_size integer DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'dot_complaints'
  ) THEN
    ALTER TABLE companies ADD COLUMN dot_complaints integer DEFAULT 0;
  END IF;

  -- Address Information
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'address_street'
  ) THEN
    ALTER TABLE companies ADD COLUMN address_street text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'address_city'
  ) THEN
    ALTER TABLE companies ADD COLUMN address_city text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'address_state'
  ) THEN
    ALTER TABLE companies ADD COLUMN address_state text;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'address_zip'
  ) THEN
    ALTER TABLE companies ADD COLUMN address_zip text;
  END IF;

  -- Rating Information
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'raw_rating'
  ) THEN
    ALTER TABLE companies ADD COLUMN raw_rating numeric(3,2) DEFAULT 0;
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns 
    WHERE table_name = 'companies' AND column_name = 'adjusted_rating'
  ) THEN
    ALTER TABLE companies ADD COLUMN adjusted_rating numeric(3,2) DEFAULT 0;
  END IF;
END $$;

-- Update example company with complete information
UPDATE companies 
SET 
  owner_name = 'John Smith',
  mc_number = 'MC-123456',
  safety_rating = 'Satisfactory',
  fleet_size = 45,
  dot_complaints = 12,
  address_street = '123 Moving Ave',
  address_city = 'Chicago',
  address_state = 'IL',
  address_zip = '60601',
  raw_rating = 4.8,
  adjusted_rating = 3.2,
  ai_summary = 'Based on our comprehensive analysis, this company shows several concerning patterns. While they maintain active licensing and insurance, there has been a significant increase in customer complaints over the last 6 months, with 12 DOT complaints filed. Their review pattern indicates potential manipulation, with 32% of positive reviews showing signs of being inauthentic. The company has also operated under three different names in the past 24 months, which is a common red flag. The significant difference between their raw rating (4.8) and AI-adjusted rating (3.2) suggests systematic review manipulation. Exercise caution and thoroughly verify all terms before proceeding.'
WHERE id = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';