/*
  # Add sample company data

  1. Sample Data
    - Add a sample moving company with minimal data
    - Add sample reviews
  
  Note: Using a single transaction with minimal data to avoid timeout issues
*/

-- Create the company with all data in a single insert
INSERT INTO companies (
  id,
  dot_number,
  company_name,
  legal_name,
  is_broker,
  license_status,
  insurance_status,
  bbb_rating,
  complaint_count,
  risk_score,
  ai_summary
) VALUES (
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  '12345678',
  'Reliable Moving Solutions',
  'Reliable Moving Solutions LLC',
  false,
  'Active',
  'Active',
  'A+',
  3,
  7.8,
  'Based on our comprehensive analysis, this company shows several concerning patterns. While they maintain active licensing and insurance, there has been a significant increase in customer complaints over the last 6 months. Their review pattern indicates potential manipulation, with 32% of positive reviews showing signs of being inauthentic. The company has also operated under three different names in the past 24 months, which is a common red flag. Exercise caution and thoroughly verify all terms before proceeding.'
) ON CONFLICT (id) DO NOTHING;

-- Add reviews in a single insert
INSERT INTO company_reviews (
  company_id,
  source,
  rating,
  review_text,
  review_date,
  is_suspicious,
  ai_analysis
) VALUES 
(
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'Google',
  5,
  'Excellent service! The movers were professional and handled everything with care. Would definitely recommend!',
  '2025-02-15',
  true,
  'This review shows patterns consistent with solicited or incentivized reviews. Similar phrasing to multiple other reviews posted in the same timeframe.'
),
(
  'f47ac10b-58cc-4372-a567-0e02b2c3d479',
  'Yelp',
  2,
  'Very disappointing experience. They were 3 hours late and some items were damaged. Customer service was unresponsive to our claims.',
  '2025-02-10',
  false,
  'This review appears genuine based on specific details and consistent posting patterns.'
);