import { fetchGraphQL } from "./fetch";

export async function getTotalBrands() {
  const data = await fetchGraphQL(
    `query TotalBrands {
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
