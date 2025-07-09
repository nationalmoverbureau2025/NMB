import { Link } from 'react-router-dom'
import { CheckoutButton } from '../CheckoutButton'
import { Button } from '../Button'
import {products} from '../../lib/stripe'

export const FinalSection = () => (
  <section className="bg-blue-900 py-20">
    <div className="container mx-auto px-4 text-center">
      <h2 className="text-3xl font-bold text-white mb-6">
        Don't Risk Your Move
      </h2>
      <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
        Get instant access to our AI-powered moving company reports. Protect
        yourself from fraud, hidden fees, and unreliable movers.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
        <Link to="/search">
          <Button variant="secondary" size="lg">
            Start Your Search
          </Button>
        </Link>
        <CheckoutButton
          priceId={products.singleReport.id}
          className="bg-transparent text-white border-white hover:bg-white hover:text-blue-900"
        >
          Buy Single Report
        </CheckoutButton>
      </div>
    </div>
  </section>
)
