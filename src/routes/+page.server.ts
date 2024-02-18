import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = (data) =>
{
  const id = data.url.searchParams.get("id");

  return {
    props: {
      id
    }
  }
} 