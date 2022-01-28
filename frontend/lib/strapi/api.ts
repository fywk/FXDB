export async function fetchAPI(query) {
  const response = await fetch(
    `${process.env.STRAPI_API_URL || "http://localhost:1337"}/graphql`,
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

export async function getLatestLenses() {
  const data = await fetchAPI(
    `query LatestLenses {
      lenses(sort: ["launchDate:desc", "name:asc"], pagination: {page: 1, pageSize: 6}) {
      data {
        attributes {
          name
          launchDate
          slug
          brand {
            data {
              attributes {
                name
              }
            }
          }
          mount {
            data {
              attributes {
                name
              }
            }
          }
          images {
            data {
              attributes {
                url
                width
                height
                alternativeText
              }
            }
          }
        }
      }
    }
  }`
  );
  return data.lenses;
}
