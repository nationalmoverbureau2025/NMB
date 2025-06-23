/*
  # Add FMCSA Fields to Companies Table

  1. New Columns
    - `mc_number` (text) - Motor Carrier number
    - `safety_rating` (text) - FMCSA safety rating
    - `fleet_size` (integer) - Number of registered trucks
    - `dot_complaints` (integer) - Number of DOT complaints

  2. Changes
    - Add new columns to companies table
    - Update example company with FMCSA data
*/

-- Add new columns to companies table
ALTER TABLE companies 
ADD COLUMN IF NOT EXISTS mc_number text,
ADD COLUMN IF NOT EXISTS safety_rating text,
ADD COLUMN IF NOT EXISTS fleet_size integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS dot_complaints integer DEFAULT 0;

-- Update example company with FMCSA data
UPDATE companies 
SET 
  mc_number = 'MC-123456',
  safety_rating = 'Satisfactory',
  fleet_size = 45,
  dot_complaints = 3
WHERE id = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';