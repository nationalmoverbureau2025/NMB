import { z } from 'zod';

export const companySearchSchema = z.object({
  query: z.string().min(1, 'Search query is required'),
  type: z.enum(['name', 'dot', 'mc']),
});

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(20, 'Message must be at least 20 characters'),
});

export const reportFilterSchema = z.object({
  dateRange: z.object({
    start: z.date(),
    end: z.date(),
  }).optional(),
  riskLevel: z.enum(['low', 'medium', 'high']).optional(),
  status: z.enum(['active', 'inactive', 'suspended']).optional(),
  type: z.enum(['broker', 'carrier', 'both']).optional(),
});

export const companySchema = z.object({
  company_name: z.string().min(2, 'Company name is required'),
  dot_number: z.string().optional(),
  mc_number: z.string().optional(),
  is_broker: z.boolean(),
  license_status: z.string(),
  insurance_status: z.string(),
  risk_score: z.number().min(0).max(10),
  complaint_count: z.number().min(0),
  bbb_rating: z.string().optional(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    zip: z.string(),
  }),
});