
import { useCheckoutSuccess } from '../hooks/useCheckoutSuccess'
import { CheckoutLoading } from '../components/CheckoutLoading'
import { ErrorView } from '../components/ErrorView'
import { CheckoutInfo } from '../components/CheckoutInfo'

export function CheckoutSuccess() {
  const { loading, error, orderDetails } = useCheckoutSuccess()

  if (loading) {
    return <CheckoutLoading />
  }

  if (error || !orderDetails) {
    return <ErrorView error={error} />
  }

  return <CheckoutInfo orderDetails={orderDetails} />
}
