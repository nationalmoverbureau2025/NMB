import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle, AlertCircle } from 'lucide-react';
import { Button } from './Button';
import { supabase } from '../lib/supabase';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMessage('');
    
    try {
      // Save to database
      const { error: dbError } = await supabase
        .from('contact_messages')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            subject: formData.subject,
            message: formData.message
          }
        ]);

      if (dbError) throw dbError;

      // Send email notification
      const { error: emailError } = await supabase.functions.invoke('send-email', {
        body: {
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message
        }
      });

      if (emailError) throw emailError;
      
      setStatus('success');
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      setStatus('error');
      setErrorMessage(err instanceof Error ? err.message : 'Failed to send message. Please try again later.');
      console.error('Contact form error:', err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Contact Us</h1>
            <p className="text-xl text-gray-600">
              Have questions about our verification system? We're here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div className="space-y-8">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Get in Touch</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Email</p>
                      <a href="mailto:info@nationalmoverbureau.org" className="text-blue-600 hover:text-blue-500">
                        info@nationalmoverbureau.org
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <a href="tel:1-800-555-0123" className="text-blue-600 hover:text-blue-500">
                        1-800-555-0123
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-blue-600 mt-1" />
                    <div>
                      <p className="font-medium">Office</p>
                      <p className="text-gray-600">
                        123 Verification Ave<br />
                        Suite 456<br />
                        Washington, DC 20001
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Hours of Operation</h2>
                <div className="space-y-2 text-gray-600">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM EST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM EST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {status === 'success' && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
                      <CheckCircle className="w-5 h-5" />
                      <span>Message sent successfully! We'll get back to you soon.</span>
                    </div>
                  )}

                  {status === 'error' && (
                    <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-md">
                      <AlertCircle className="w-5 h-5" />
                      <span>{errorMessage}</span>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full"
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? (
                      'Sending...'
                    ) : (
                      <>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>

          {/* Map Section */}
          <div className="mt-12">
            <div className="bg-gray-200 rounded-lg h-64 flex items-center justify-center">
              <p className="text-gray-600">Map integration will be added here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}