import { fetchGraphQL, fetchREST } from "./fetch";

export async function getLatestCameras() {
  const data = await fetchGraphQL(
    `query LatestCameras {
      cameras(sort: ["launchDate:desc", "name:asc"], pagination: {page: 1, pageSize: 5}) {
        data {
          attributes {
            slug
            name
            launchDate
            resolutionX
            resolutionY
            sensorSize
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
  return data.cameras;
}

export async function getAllCamerasPaths() {
  const data = await fetchGraphQL(
    `query AllCamerasPaths {
      cameras(pagination: {limit: -1}) {
        data {
          attributes {
            slug
          }
        }
      }
    }`
  );
  return data.cameras;
}

export async function getAllCameras() {
  const data = await fetchREST(
    `/cameras?populate=*&sort[0]=launchDate:desc&sort[1]=name:asc&pagination[limit]=-1`
  );

  return data;
}

export async function getCameraDetails(slug: string | string[]) {
  const data = await fetchREST(
    `/cameras?filters[slug][$eq]=${slug}&populate=*`
  );

  return data;
}

export async function getTotalCameras() {
  const data = await fetchGraphQL(
    `query TotalCameras {
      cameras {
        meta {
          pagination {
            total
          }
        }
      }
    }`
  );
  return data.cameras;
}
