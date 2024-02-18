type Payment = {
  banklinks: PaymentItem[],
  //cards:
  //paylater:
  //other
}

type PaymentItem = {
  name: string,
  url: string,
  country: string,
  countries: string[],
  channel: string,
  max_amount: number,
  display_name: string,
  logo_url: string,
}

type BasicAuth = {
  username: string,
  password: string,
}

type UrlData = {
  url: string,
  method: string,
}

type ApiData = {
  url: string,
  payment_url: string,
  shopId: string,
  secret: string,
  return_url: UrlData,
  cancel_url: UrlData,
  notification_url: UrlData,
}

type FormData = {
  api_data: ApiData,
  currentPayment?: PaymentItem,
  paymentData: PaymentData
}

type PaymentData = {
  amount: number,
  currency?: string,
  reference?: string,
  merchant_data?: string,
  country: string,
  locale: string,
}

type TransactionStatus = {
  amount: string,
  currency: string,
  customer_name: string,
  merchant_data: string,
  message_time: string,
  message_type: string,
  reference: string,
  shop: string,
  signature: string,
  status: string,
  transaction: string
}


export type { Payment, BasicAuth, PaymentItem, PaymentData, TransactionStatus, FormData, UrlData, ApiData }