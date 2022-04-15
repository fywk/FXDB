import "../lib/utils/removePunctuationSpaces.ts";

import { capitalize } from "lodash";
import { useEffect, useMemo, useState } from "react";
import { RootStateOrAny, useDispatch, useSelector } from "react-redux";

import { SearchIcon, XIcon } from "@heroicons/react/solid";

import { ProductsProps } from "../lib/types";
import actions from "../redux/actions";
import DisplayModeToggle from "./DisplayModeToggle";
import Meta from "./Meta";
import ProductCard from "./product/ProductCard";
import ProductTable from "./product/ProductTable";

const Products = ({
  products,
  category,
  description,
  imageBaseUrl,
  imageSizes,
  imageStyle,
}: ProductsProps) => {
  const { displayMode } = useSelector(
    (state: RootStateOrAny) => state.settings
  );
  const dispatch = useDispatch();

  const changeDisplayMode = (e) => {
    dispatch(actions.updateDisplayMode(e));
  };

  const searchPlaceholder = `Search all ${products.length} ${category}`;
  const [searchValue, setSearchValue] = useState("");
  const filteredProducts = useMemo(
    () =>
      products.filter((product) =>
        String(product.attributes.name)
          .removePunctuationSpaces()
          .includes(searchValue.removePunctuationSpaces())
      ),
    [searchValue, products]
  );

  const [hasMounted, setHasMounted] = useState(false);
  useEffect(() => {
    setHasMounted(true);
  }, []);
  if (!hasMounted) return null;

  return (
    <>
      <Meta title={capitalize(category)} description={description} />
      <div className="py-8">
        <div className="flex flex-col space-y-8">
          <section>
            <h1 className="mb-3 text-4xl font-bold tracking-tight">
              {capitalize(category)}
            </h1>
            <p className="mb-4 text-lg">{description}</p>
            <div className="flex gap-1.5 lg:gap-2">
              <form className="group relative w-full">
                <label htmlFor="search">
                  <SearchIcon className="absolute inset-y-0 left-3.5 m-auto h-5.5 w-5.5" />
                </label>
                <input
                  id="search"
                  type="text"
                  value={searchValue}
                  aria-label={searchPlaceholder}
                  placeholder={searchPlaceholder}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="text-highlight dark:placeholder:text-dimmed h-11 w-full rounded-md border bg-white px-[42px] focus:outline-none focus:ring-2 focus:ring-primary/25 dark:border-transparent dark:bg-gray-800 dark:focus:ring-secondary/50 md:px-11"
                />
                {searchValue && (
                  <button type="reset" onClick={() => setSearchValue("")}>
                    <XIcon className="absolute inset-y-0 right-4 m-auto -mr-1 h-6.5 w-6.5 rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-700" />
                  </button>
                )}
              </form>
              <DisplayModeToggle
                selectedMode={displayMode}
                setSelectedMode={(e) => changeDisplayMode(e)}
              />
            </div>
          </section>
          <section className="min-h-[20rem] space-y-8">
            {filteredProducts.length > 0 ? (
              <>
                {displayMode === "grid" && (
                  <div className="grid grid-cols-2 gap-x-3.5 gap-y-7 md:grid-cols-4 md:gap-x-7 lg:grid-cols-5">
                    {products.map((product) => (
                      <ProductCard
                        product={product.attributes}
                        key={product.attributes.slug}
                        path={category}
                        imageBaseUrl={imageBaseUrl}
                        imageSizes={imageSizes}
                        imageStyle={imageStyle}
                      />
                    ))}
                  </div>
                )}
                {displayMode === "list" && <></>}
              </>
            ) : (
              <div className="text-dimmed py-4 text-center md:text-lg">
                <p>
                  No {category} found for &quot;
                  <strong>{searchValue}</strong>
                  &quot;.
                </p>
                <p>{`Sorry if you can't find what you're looking for.`}</p>
              </div>
            )}
          </section>
        </div>
      </div>
    </>
  );
};

export default Products;
