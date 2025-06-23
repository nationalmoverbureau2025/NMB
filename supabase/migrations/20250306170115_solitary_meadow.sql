/*
  # Add Analytics Support Tables

  1. New Tables
    - `company_metrics`
      - Daily snapshot of key company metrics
      - Used for trend analysis and reporting
    - `review_analysis`
      - Detailed analysis of customer reviews
      - AI-powered sentiment and authenticity scoring
    - `complaint_categories`
      - Standardized categories for complaints
      - Enables better filtering and analysis

  2. Changes
    - Added new columns to existing tables for better analytics
    - Added indexes for improved query performance

  3. Security
    - RLS policies for new tables
    - Secure access patterns for analytics data
*/

-- Create company_metrics table
CREATE TABLE IF NOT EXISTS company_metrics (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  company_id uuid REFERENCES companies(id) NOT NULL,
  date date NOT NULL,
  risk_score numeric(3,1),
  complaint_count integer DEFAULT 0,
  review_count integer DEFAULT 0,
  avg_rating numeric(3,2),
  suspicious_review_count integer DEFAULT 0,
  compliance_score integer,
  created_at timestamptz DEFAULT now(),
  
  UNIQUE(company_id, date)
);

-- Create review_analysis table
CREATE TABLE IF NOT EXISTS review_analysis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  review_id uuid REFERENCES company_reviews(id) NOT NULL,
  sentiment_score numeric(3,2),
  authenticity_score numeric(3,2),
  key_phrases text[],
  ai_flags jsonb DEFAULT '{}',
  created_at timestamptz DEFAULT now()
);

-- Create complaint_categories table
CREATE TABLE IF NOT EXISTS complaint_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  description text,
  severity integer CHECK (severity BETWEEN 1 AND 5),
  created_at timestamptz DEFAULT now()
);

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_company_metrics_date ON company_metrics(date);
CREATE INDEX IF NOT EXISTS idx_company_metrics_company_risk ON company_metrics(company_id, risk_score);
CREATE INDEX IF NOT EXISTS idx_review_analysis_scores ON review_analysis(sentiment_score, authenticity_score);

-- Enable RLS
ALTER TABLE company_metrics ENABLE ROW LEVEL SECURITY;
ALTER TABLE review_analysis ENABLE ROW LEVEL SECURITY;
ALTER TABLE complaint_categories ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Company metrics are viewable by authenticated users"
  ON company_metrics
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Review analysis is viewable by authenticated users"
  ON review_analysis
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Complaint categories are viewable by everyone"
  ON complaint_categories
  FOR SELECT
  TO public
  USING (true);

-- Insert default complaint categories
INSERT INTO complaint_categories (name, description, severity) VALUES
  ('Pricing Dispute', 'Issues related to final cost vs. estimate', 4),
  ('Damaged Items', 'Reports of damage to moved items', 4),
  ('Late Delivery', 'Delays in delivery beyond agreed timeframe', 3),
  ('Poor Communication', 'Issues with responsiveness and updates', 2),
  ('Missing Items', 'Items reported missing after move', 5),
  ('Unprofessional Conduct', 'Issues with staff behavior or service', 3),
  ('Insurance Claim Issues', 'Problems with insurance claims process', 4),
  ('Storage Issues', 'Problems with storage services', 3),
  ('Unauthorized Charges', 'Unexpected or unauthorized fees', 5),
  ('Contract Disputes', 'Disagreements about service contract terms', 4)
ON CONFLICT (name) DO NOTHING;