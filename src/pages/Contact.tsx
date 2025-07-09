import { Mail, Send, CheckCircle, AlertCircle } from 'lucide-react'
import { Button } from '../components/Button'
import { useContactForm } from '../hooks/useContactForm'
import { Input } from '../components/ui/Input'

export function Contact() {
  const { status, errorMessage, handleSubmit, formData, setFormData } =
    useContactForm()

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Contact Us
            </h1>
            <p className="text-xl text-gray-600">
              Have questions about our verification system? We're here to help.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Contact Information */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Get in Touch
              </h2>
              <div className="flex items-start gap-3">
                <Mail className="w-5 h-5 text-blue-600 mt-1" />
                <div>
                  <p className="font-medium">Email</p>
                  <a
                    href="mailto:info@nationalmoverbureau.org"
                    className="text-blue-600 hover:text-blue-500"
                  >
                    info@nationalmoverbureau.org
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="md:col-span-2">
              <div className="bg-white rounded-lg shadow-md p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <Input
                      name="name"
                      label="Name"
                      value={formData.name}
                      onChange={({ target: { value } }) =>
                        setFormData((prev) => ({
                          ...prev,
                          name: value,
                        }))
                      }
                    />
                    <Input
                      name="email"
                      label="Email"
                      value={formData.email}
                      onChange={({ target: { value } }) =>
                        setFormData((prev) => ({
                          ...prev,
                          email: value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <Input
                      name="subject"
                      label="Subject"
                      value={formData.subject}
                      onChange={({ target: { value } }) =>
                        setFormData((prev) => ({
                          ...prev,
                          subject: value,
                        }))
                      }
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-medium text-gray-700 mb-1"
                    >
                      Message
                    </label>
                    <textarea
                      id="message"
                      required
                      rows={6}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          message: e.target.value,
                        }))
                      }
                      className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>

                  {status === 'success' && (
                    <div className="flex items-center gap-2 text-green-600 bg-green-50 p-3 rounded-md">
                      <CheckCircle className="w-5 h-5" />
                      <span>
                        Message sent successfully! We'll get back to you soon.
                      </span>
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
        </div>
      </div>
    </div>
  )
}
