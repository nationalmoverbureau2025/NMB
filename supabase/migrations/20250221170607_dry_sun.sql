/*
  # Initial MoveGuard Schema Setup

  1. New Tables
    - `companies`
      - Core table for moving company data
      - Stores official records, licensing info, and computed scores
    - `reports`
      - Tracks purchased reports and their status
    - `report_credits`
      - Manages user's available report credits
    - `company_reviews`
      - Stores review data for analysis
    - `company_complaints`
      - Tracks official complaints and resolutions

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
    - Ensure data privacy and access control
*/

-- Companies table
CREATE TABLE IF NOT EXISTS companies (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dot_number text UNIQUE,
  company_name text NOT NULL,
  legal_name text,
  is_broker boolean DEFAULT false,
  license_status text,
  insurance_status text,
  bbb_rating text,
  complaint_count integer DEFAULT 0,
  risk_score decimal(3,1),
  ai_summary text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reports table
CREATE TABLE IF NOT EXISTS reports (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  company_id uuid REFERENCES companies NOT NULL,
  status text NOT NULL DEFAULT 'active',
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Report credits table
CREATE TABLE IF NOT EXISTS report_credits (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  credits_remaining integer NOT NULL DEFAULT 0,
  bundle_size integer NOT NULL,
  purchase_date timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Company reviews table
CREATE TABLE IF NOT EXISTS company_reviews (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies NOT NULL,
  source text NOT NULL,
  rating integer,
  review_text text,
  review_date date,
  is_suspicious boolean DEFAULT false,
  ai_analysis text,
  created_at timestamptz DEFAULT now()
);

-- Company complaints table
CREATE TABLE IF NOT EXISTS company_complaints (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies NOT NULL,
  source text NOT NULL,
  complaint_type text,
  description text,
  filing_date date,
  resolution_status text,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE reports ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_credits ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE company_complaints ENABLE ROW LEVEL SECURITY;

-- Companies policies
CREATE POLICY "Companies are viewable by everyone"
  ON companies FOR SELECT
  TO public
  USING (true);

-- Reports policies
CREATE POLICY "Users can view their own reports"
  ON reports FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own reports"
  ON reports FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Report credits policies
CREATE POLICY "Users can view their own credits"
  ON report_credits FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own credits"
  ON report_credits FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Reviews are viewable by everyone"
  ON company_reviews FOR SELECT
  TO public
  USING (true);

-- Complaints policies
CREATE POLICY "Complaints are viewable by everyone"
  ON company_complaints FOR SELECT
  TO public
  USING (true);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Add updated_at triggers
CREATE TRIGGER update_companies_updated_at
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_reports_updated_at
  BEFORE UPDATE ON reports
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create function to check report credits
CREATE OR REPLACE FUNCTION check_report_credits(user_id uuid)
RETURNS integer AS $$
BEGIN
  RETURN (
    SELECT COALESCE(SUM(credits_remaining), 0)
    FROM report_credits
    WHERE report_credits.user_id = $1
  );
END;
$$ language 'plpgsql' SECURITY DEFINER;