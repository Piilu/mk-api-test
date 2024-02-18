import type { TransactionStatus } from "$lib/api/types"
import { json, type RequestEvent } from "@sveltejs/kit"
import axios from "axios"

export async function POST(event: RequestEvent)
{
  try
  {
    const body = await event.request.json();
    const { data } = await axios.get<TransactionStatus>(`${body.url}/v1/transactions/${body.id}`, { auth: body.auth });
    return json(data, { status: 200 })
  } catch (er)
  {
    return json({ isSuccess: false, message: "Something went wrong" }, {
      status: 500,
    })
  }
}