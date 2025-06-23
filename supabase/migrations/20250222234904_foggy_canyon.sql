/*
  # Add Reports Functionality

  1. New Tables
    - `report_templates` - Predefined report templates
    - `report_sections` - Sections that make up a report
    - `report_data` - Actual report data and content
    - `report_access_logs` - Track report access and usage

  2. Security
    - Enable RLS on all new tables
    - Add policies for authenticated users
    - Add policies for report access control
*/

-- Report templates table
CREATE TABLE IF NOT EXISTS report_templates (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  description text,
  sections jsonb NOT NULL DEFAULT '[]',
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Report sections table
CREATE TABLE IF NOT EXISTS report_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id uuid REFERENCES report_templates NOT NULL,
  name text NOT NULL,
  description text,
  data_source text NOT NULL,
  display_order integer NOT NULL,
  is_required boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Report data table
CREATE TABLE IF NOT EXISTS report_data (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid REFERENCES reports NOT NULL,
  section_id uuid REFERENCES report_sections NOT NULL,
  data jsonb NOT NULL,
  generated_at timestamptz DEFAULT now(),
  expires_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Report access logs table
CREATE TABLE IF NOT EXISTS report_access_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  report_id uuid REFERENCES reports NOT NULL,
  user_id uuid REFERENCES auth.users NOT NULL,
  accessed_at timestamptz DEFAULT now(),
  ip_address text,
  user_agent text
);

-- Enable RLS
ALTER TABLE report_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_sections ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_data ENABLE ROW LEVEL SECURITY;
ALTER TABLE report_access_logs ENABLE ROW LEVEL SECURITY;

-- Report templates policies
CREATE POLICY "Report templates are viewable by authenticated users"
  ON report_templates FOR SELECT
  TO authenticated
  USING (true);

-- Report sections policies
CREATE POLICY "Report sections are viewable by authenticated users"
  ON report_sections FOR SELECT
  TO authenticated
  USING (true);

-- Report data policies
CREATE POLICY "Users can view report data they have access to"
  ON report_data FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM reports r
      WHERE r.id = report_data.report_id
      AND r.user_id = auth.uid()
    )
  );

-- Report access logs policies
CREATE POLICY "Users can view their own access logs"
  ON report_access_logs FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "System can insert access logs"
  ON report_access_logs FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Add updated_at triggers
CREATE TRIGGER update_report_templates_updated_at
  BEFORE UPDATE ON report_templates
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_report_sections_updated_at
  BEFORE UPDATE ON report_sections
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_report_data_updated_at
  BEFORE UPDATE ON report_data
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert default report template
INSERT INTO report_templates (name, description, sections) VALUES (
  'Standard Company Report',
  'Comprehensive moving company verification report including licensing, insurance, complaints, and risk analysis',
  '[
    {
      "name": "Company Overview",
      "required": true,
      "dataSource": "companies"
    },
    {
      "name": "Verification Status",
      "required": true,
      "dataSource": "licenses,insurance"
    },
    {
      "name": "Risk Analysis",
      "required": true,
      "dataSource": "risk_scores,complaints"
    },
    {
      "name": "Review Analysis",
      "required": true,
      "dataSource": "reviews,ratings"
    }
  ]'
) ON CONFLICT DO NOTHING;