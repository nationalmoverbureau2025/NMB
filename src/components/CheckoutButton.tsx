import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard, Loader } from 'lucide-react';
import { Button } from './Button';
import { createCheckoutSession } from '../lib/stripe';
import { useAuth } from '../context/AuthContext';

interface CheckoutButtonProps {
  priceId: string;
  className?: string;
  children?: React.ReactNode;
}

export function CheckoutButton({
  priceId,
  className,
  children,
}: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  const handleCheckout = async () => {
    setLoading(true);

    try {
      // Check if user is authenticated
      if (!isAuthenticated) {
        // Save the product they wanted to buy in localStorage
        localStorage.setItem('checkoutPriceId', priceId);
        navigate('/login?redirect=checkout');
        return;
      }

      // Create checkout session
      const { url } = await createCheckoutSession(priceId, user.id);

      // Redirect to Stripe Checkout
      if (url) {
        window.location.href = url;
      } else {
        throw new Error('Failed to create checkout session');
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('There was an error processing your checkout. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button onClick={handleCheckout} disabled={loading} className={className}>
      {loading ? (
        <>
          <Loader className="w-4 h-4 mr-2 animate-spin" />
          Processing...
        </>
      ) : (
        <>
          {children || (
            <>
              <CreditCard className="w-4 h-4 mr-2" />
              Checkout
            </>
          )}
        </>
      )}
    </Button>
  );
}
