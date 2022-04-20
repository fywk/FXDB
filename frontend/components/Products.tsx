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
          .toLowerCase()
          .removePunctuationSpaces()
          .includes(searchValue.toLowerCase().removePunctuationSpaces())
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
      <div className="pt-8 pb-10">
        <div className="flex flex-col space-y-8">
          <section>
            <h1 className="mb-2.5 text-4xl font-bold tracking-tight">
              {capitalize(category)}
            </h1>
            <p className="mb-4 text-lg">{description}</p>
            <div className="flex gap-1.5 lg:gap-2">
              <form className="relative w-full">
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
                    <XIcon className="hover:text-highlight absolute inset-y-0 right-3.5 m-auto -mr-1 h-6.5 w-6.5 rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-700" />
                  </button>
                )}
              </form>
              <DisplayModeToggle
                selectedMode={displayMode}
                setSelectedMode={(e) => changeDisplayMode(e)}
              />
            </div>
          </section>
          <section className="min-h-[20rem]">
            {filteredProducts.length > 0 ? (
              <>
                {displayMode === "grid" && (
                  <div className="grid grid-cols-2 gap-x-4 gap-y-5 md:grid-cols-4 md:gap-x-5 md:gap-y-6 lg:grid-cols-5 lg:gap-x-6 lg:gap-y-7">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        type="grid"
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
                {displayMode === "list" && (
                  <div className="-mx-5 -mt-2 grid grid-cols-1 sm:-mx-8 md:hidden">
                    {filteredProducts.map((product) => (
                      <ProductCard
                        type="list"
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
                {displayMode === "list" && category === "cameras" && (
                  <TableWrapper>
                    <TableHead
                      title={[
                        "",
                        "Name",
                        "Eff. pixels",
                        "Sensor size",
                        "Announced",
                        "Views",
                      ]}
                    />
                    <tbody>
                      <tr>
                        <td className="h-3"></td>
                      </tr>
                    </tbody>
                    <tbody>
                      {filteredProducts.map((product, i) => (
                        <ProductCard
                          index={i + 1}
                          type="table-row"
                          product={product.attributes}
                          key={product.attributes.slug}
                          path={category}
                          imageBaseUrl={imageBaseUrl}
                          imageSizes={imageSizes}
                          imageStyle="scale-[.8]"
                        />
                      ))}
                    </tbody>
                  </TableWrapper>
                )}
                {displayMode === "list" && category === "lenses" && (
                  <TableWrapper>
                    <TableHead
                      title={[
                        "",
                        "Name",
                        "Focal length",
                        "Lens mount",
                        "Announced",
                        "Views",
                      ]}
                    />
                    <tbody>
                      <tr>
                        <td className="h-3"></td>
                      </tr>
                    </tbody>
                    <tbody>
                      {filteredProducts.map((product, i) => (
                        <ProductCard
                          index={i + 1}
                          type="table-row"
                          product={product.attributes}
                          key={product.attributes.slug}
                          path={category}
                          imageBaseUrl={imageBaseUrl}
                          imageSizes={imageSizes}
                          imageStyle="scale-95"
                        />
                      ))}
                    </tbody>
                  </TableWrapper>
                )}
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

const TableWrapper = ({ children }) => {
  return (
    <div className="relative -mt-4 hidden overflow-x-auto md:block">
      <table className="w-full text-sm font-medium tracking-tight">
        {children}
      </table>
    </div>
  );
};

const TableHead = ({ title }: { title: string[] }) => {
  return (
    <thead className="border-b-2 border-gray-100 text-xs uppercase dark:border-gray-800/50">
      <tr>
        {title.map((item) => (
          <th scope="col" className="px-2 py-3 second:text-left" key={item}>
            {item}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Products;
