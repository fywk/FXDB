import { fetchGraphQL, fetchREST } from "./fetch";

export async function getLatestLenses() {
  const data = await fetchGraphQL(
    `query LatestLenses {
      lenses(sort: ["launchDate:desc", "name:asc"], pagination: {page: 1, pageSize: 5}) {
        data {
          attributes {
            slug
            name
            launchDate
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
                  hash
                  ext
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

export async function getAllLensesPaths() {
  const data = await fetchGraphQL(
    `query AllLensesPaths {
      lenses(pagination: {limit: -1}) {
        data {
          attributes {
            slug
          }
        }
      }
    }`
  );
  return data.lenses;
}

export async function getAllLenses() {
  const data = await fetchREST(
    `/lenses?populate=*&sort[0]=launchDate:desc&sort[1]=name:asc&pagination[limit]=-1`
  );

  return data;
}

export async function getLensesAnalytics() {
  const data = await fetchGraphQL(
    `query LensesAnalytics {
      lenses(pagination: {limit: -1}) {
        data {
          attributes {
            slug
            name
            brand {
              data {
                attributes {
                  name
                }
              }
            }
          }
        }
        meta {
          pagination {
            total
          }
        }
      }
    }`
  );
  return data.lenses;
}

export async function getLensesDetails(slug: string | string[]) {
  const data = await fetchREST(`/lenses?filters[slug][$eq]=${slug}&populate=*`);

  return data;
}
