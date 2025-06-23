/*
  # Add Report Templates and Sections

  1. New Tables
    - `report_templates`: Stores report template definitions
      - `id` (uuid, primary key)
      - `name` (text, unique)
      - `description` (text)
      - `sections` (jsonb)
      - `is_active` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `report_sections`: Stores individual sections for each template
      - `id` (uuid, primary key)
      - `template_id` (uuid, references report_templates)
      - `name` (text)
      - `description` (text)
      - `data_source` (text)
      - `display_order` (integer)
      - `is_required` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated users to view templates and sections

  3. Default Data
    - Insert default templates and sections for:
      - Basic Verification
      - Comprehensive Analysis
      - Risk Assessment
*/

-- Create report_templates table
CREATE TABLE IF NOT EXISTS report_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  sections jsonb DEFAULT '[]',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add unique constraint for name
ALTER TABLE report_templates ADD CONSTRAINT report_templates_name_key UNIQUE (name);

-- Create report_sections table
CREATE TABLE IF NOT EXISTS report_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES report_templates(id) NOT NULL,
  name text NOT NULL,
  description text,
  data_source text NOT NULL,
  display_order integer NOT NULL,
  is_required boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Add unique constraint for template_id and name combination
ALTER TABLE report_sections ADD CONSTRAINT report_sections_template_name_key UNIQUE (template_id, name);

-- Enable RLS
ALTER TABLE report_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_sections ENABLE ROW LEVEL SECURITY;

-- Create policies (only if they don't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'report_templates' 
    AND policyname = 'Report templates are viewable by authenticated users'
  ) THEN
    CREATE POLICY "Report templates are viewable by authenticated users"
      ON report_templates
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'report_sections' 
    AND policyname = 'Report sections are viewable by authenticated users'
  ) THEN
    CREATE POLICY "Report sections are viewable by authenticated users"
      ON report_sections
      FOR SELECT
      TO authenticated
      USING (true);
  END IF;
END $$;

-- Insert default templates and sections
DO $$
DECLARE
  basic_id uuid;
  comprehensive_id uuid;
  risk_id uuid;
BEGIN
  -- Insert Basic Verification template
  INSERT INTO report_templates (name, description)
  VALUES ('Basic Verification', 'Quick verification of company credentials and status')
  RETURNING id INTO basic_id;

  -- Insert Comprehensive Analysis template
  INSERT INTO report_templates (name, description)
  VALUES ('Comprehensive Analysis', 'Detailed analysis including historical data and risk assessment')
  RETURNING id INTO comprehensive_id;

  -- Insert Risk Assessment template
  INSERT INTO report_templates (name, description)
  VALUES ('Risk Assessment', 'Focused evaluation of company risk factors and red flags')
  RETURNING id INTO risk_id;

  -- Insert sections for Basic Verification
  INSERT INTO report_sections (template_id, name, description, data_source, display_order)
  VALUES
    (basic_id, 'Company Information', 'Basic company details and credentials', 'companies', 1),
    (basic_id, 'License Verification', 'Current licensing status', 'companies', 2),
    (basic_id, 'Insurance Status', 'Active insurance coverage', 'companies', 3);

  -- Insert sections for Comprehensive Analysis
  INSERT INTO report_sections (template_id, name, description, data_source, display_order)
  VALUES
    (comprehensive_id, 'Company Overview', 'Detailed company information', 'companies', 1),
    (comprehensive_id, 'Risk Assessment', 'Complete risk analysis', 'company_metrics', 2),
    (comprehensive_id, 'Complaint History', 'Historical complaint analysis', 'company_complaints', 3),
    (comprehensive_id, 'Review Analysis', 'Customer review verification', 'company_reviews', 4),
    (comprehensive_id, 'Compliance Record', 'Regulatory compliance history', 'companies', 5);

  -- Insert sections for Risk Assessment
  INSERT INTO report_sections (template_id, name, description, data_source, display_order)
  VALUES
    (risk_id, 'Risk Score', 'Current risk assessment score', 'company_metrics', 1),
    (risk_id, 'Red Flags', 'Identified warning signs', 'company_complaints', 2),
    (risk_id, 'Review Authenticity', 'Analysis of review authenticity', 'review_analysis', 3),
    (risk_id, 'Historical Incidents', 'Past incidents and resolutions', 'company_complaints', 4);
END $$;