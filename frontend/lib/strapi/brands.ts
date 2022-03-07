import { fetchGraphQL } from "./fetch";

export async function getNumOfBrands() {
  const data = await fetchGraphQL(
    `query NumOfBrands {
      brands {
        meta {
          pagination {
            total
          }
        }
      }
    }`
  );
  return data.brands;
}
