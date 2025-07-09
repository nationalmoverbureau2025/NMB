import { OrderDetailsType } from '../hooks/useCheckoutSuccess'
import { Link } from 'react-router-dom'
import { CheckCircle, FileText, ArrowRight } from 'lucide-react'
import { Button } from '../components/Button'

export const CheckoutInfo = ({
  orderDetails,
}: {
  orderDetails: OrderDetailsType
}) => (
  <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4">
    <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
      <div className="text-center mb-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">
          Payment Successful!
        </h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase. Your order has been processed
          successfully.
        </p>
      </div>

      {orderDetails && (
        <div className="bg-gray-50 rounded-lg p-4 mb-6">
          <h2 className="font-semibold text-gray-900 mb-3">Order Summary</h2>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Product:</span>
              <span className="font-medium">{orderDetails.product_name}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Amount:</span>
              <span className="font-medium">
                ${(orderDetails.amount / 100).toFixed(2)}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Order ID:</span>
              <span className="font-mono text-xs">
                {orderDetails.payment_intent}
              </span>
            </div>
          </div>
        </div>
      )}

      <div className="space-y-4">
        {orderDetails?.product_type === 'single_report' ? (
          <Link to="/search" className="block">
            <Button className="w-full">
              <FileText className="w-4 h-4 mr-2" />
              Start Using Your Report Credit
            </Button>
          </Link>
        ) : (
          <Link to="/dashboard" className="block">
            <Button className="w-full">
              <ArrowRight className="w-4 h-4 mr-2" />
              Go to Your Dashboard
            </Button>
          </Link>
        )}

        <Link to="/" className="block">
          <Button variant="outline" className="w-full">
            Return to Home
          </Button>
        </Link>
      </div>
    </div>
  </div>
)
