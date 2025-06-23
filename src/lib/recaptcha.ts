// This file is kept for backward compatibility but no longer used

export const RECAPTCHA_SITE_KEY = '';

export async function verifyRecaptchaToken(token: string): Promise<boolean> {
  // Always return true since we're not using reCAPTCHA anymore
  return true;
}