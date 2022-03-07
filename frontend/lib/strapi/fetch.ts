const { STRAPI_API_URL } = process.env;

export async function fetchGraphQL(query: string) {
  const response = await fetch(
    `${STRAPI_API_URL || "http://localhost:1337"}/graphql`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
      }),
    }
  );

  const json = await response.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch data from API");
  }

  return json.data;
}

export async function fetchREST(url: string) {
  const response = await fetch(
    `${STRAPI_API_URL || "http://localhost:1337"}/api` + url
  );
  const json = await response.json();
  if (json.errors) {
    console.error(json.errors);
    throw new Error("Failed to fetch data from API");
  }

  return json;
}
