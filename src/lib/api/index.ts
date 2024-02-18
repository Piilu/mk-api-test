import axios from "axios"
import { type FormData, type Payment } from "./types"
import { browser } from "$app/environment";

const FORM_DATA = "formData";

async function getPaymentMethods(formData: FormData)
{
  const { data } = await axios.get<Payment>(`${formData.api_data.url}/v1/methods?transaction=&amount=75.95&currency=EUR&country=${formData.paymentData.country}`, {
    auth: {
      username: formData.api_data.shopId,
      password: formData.api_data.secret,
    }
  });

  return data;
}

function createTransactionLink(data: FormData)
{
  const newUrl = `${data.api_data.payment_url}/pay/1/link.html?shop=${data.api_data.shopId}&amount=${data.paymentData.amount}&merchant_data=${data.paymentData.merchant_data}&country=ee&locale=et&reference=${data.paymentData.reference}&preferred_method=${data.currentPayment?.name}&return_url=${data.api_data.return_url.url}&return_method=${data.api_data.return_url.method}&cancel_url=${data.api_data.cancel_url.url}&cancel_method=${data.api_data.cancel_url.method}&notification_url=${data.api_data.notification_url.url}&notification_method=${data.api_data.notification_url.method}`;
  return newUrl;
}

function saveData(data: FormData)
{
  const serializedData = JSON.stringify(data);
  localStorage.setItem(FORM_DATA, serializedData);
}

function getData()
{
  if (browser)
  {
    const json = localStorage.getItem(FORM_DATA);
    let data: FormData | undefined = undefined;
    if (json)
    {
      data = JSON.parse(json) as FormData;
    }
    return data;
  }
  return undefined;
}

function distinctArray<T>(inputArray: T[]): T[]
{
  const distinctArray: T[] = [];

  for (const item of inputArray)
  {
    if (!distinctArray.includes(item))
    {
      distinctArray.push(item);
    }
  }

  return distinctArray;
}

export { getPaymentMethods, createTransactionLink, saveData, getData, distinctArray }