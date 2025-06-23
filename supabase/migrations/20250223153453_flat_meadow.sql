/*
  # Add Missing Company Fields

  1. New Fields
    - Operating Status
    - Operating Authority Types
    - Insurance Details
      - Insurance Coverage Amount
      - Insurance Expiry Date
      - Insurance Provider
      - Insurance Policy Number
    - Business History
      - Date Established
      - Previous Business Names
    - Service Information
      - Authorized for Household Goods
      - Storage Facilities
    - Compliance History
      - Out-of-Service Orders
      - Penalty History
    - Financial Information
      - Bond Status
      - Bond Amount
    
  2. Changes
    - Adds new columns to companies table
    - Includes default values where appropriate
    - Maintains existing data
*/

-- Add operating information
ALTER TABLE companies
ADD COLUMN IF NOT EXISTS operating_status text DEFAULT 'Unknown',
ADD COLUMN IF NOT EXISTS operating_authority_types text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS authorized_for_hhg boolean DEFAULT false,
ADD COLUMN IF NOT EXISTS date_established date;

-- Add insurance details
ALTER TABLE companies
ADD COLUMN IF NOT EXISTS insurance_coverage_amount numeric DEFAULT 0,
ADD COLUMN IF NOT EXISTS insurance_expiry_date date,
ADD COLUMN IF NOT EXISTS insurance_provider text,
ADD COLUMN IF NOT EXISTS insurance_policy_number text;

-- Add business history
ALTER TABLE companies
ADD COLUMN IF NOT EXISTS previous_business_names text[] DEFAULT '{}',
ADD COLUMN IF NOT EXISTS has_storage_facilities boolean DEFAULT false;

-- Add compliance history
ALTER TABLE companies
ADD COLUMN IF NOT EXISTS out_of_service_orders integer DEFAULT 0,
ADD COLUMN IF NOT EXISTS penalty_history jsonb DEFAULT '[]';

-- Add financial information
ALTER TABLE companies
ADD COLUMN IF NOT EXISTS bond_status text,
ADD COLUMN IF NOT EXISTS bond_amount numeric DEFAULT 0;

-- Update example company with new information
UPDATE companies 
SET 
  operating_status = 'Active',
  operating_authority_types = ARRAY['Common Carrier', 'Contract Carrier'],
  authorized_for_hhg = true,
  date_established = '2020-01-15',
  insurance_coverage_amount = 750000,
  insurance_expiry_date = '2025-12-31',
  insurance_provider = 'SafeMove Insurance Co.',
  insurance_policy_number = 'POL-123456789',
  previous_business_names = ARRAY['ABC Moving', 'Smith & Sons Moving'],
  has_storage_facilities = true,
  out_of_service_orders = 0,
  penalty_history = '[
    {
      "date": "2024-08-15",
      "amount": 5000,
      "description": "Late filing of annual report"
    }
  ]',
  bond_status = 'Active',
  bond_amount = 75000
WHERE id = 'f47ac10b-58cc-4372-a567-0e02b2c3d479';