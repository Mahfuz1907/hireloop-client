const BASE_URL = process.env.NEXT_PUBLIC_API

export const CheckoutVerify = async (sessionId: string) => {
  const response = await fetch(`${BASE_URL}/payments/checkout-verify`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ sessionId }),
  })

  return response.json()
}
