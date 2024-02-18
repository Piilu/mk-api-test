import type { TransactionStatus } from "$lib/api/types";
import { redirect, type RequestEvent } from "@sveltejs/kit";

export async function POST(event: RequestEvent)
{
  const data = await event.request.json()
  console.log(data);
  return new Response("I HAVE A RESPONSE", {
    status: 200,
  });
}


export async function GET(event: RequestEvent)
{
  const status: TransactionStatus = JSON.parse(event.url.searchParams.get("json") ?? "")
  redirect(301, `/?status=${status.status}`)
}