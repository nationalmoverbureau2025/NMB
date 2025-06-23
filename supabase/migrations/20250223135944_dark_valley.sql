/*
  # Add owner name to companies table

  1. Changes
    - Add owner_name column to companies table
  
  2. Data
    - Update example company with owner name
*/

-- Add owner_name column to companies table
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS owner_name text;

-- Update example company with owner name
UPDATE companies 
SET owner_name = 'John Smith'
WHERE id = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';