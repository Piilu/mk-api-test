import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (data) =>
{
  const status = data.url.searchParams.get("status");

  return {
    props: {
      status
    }
  }
} 