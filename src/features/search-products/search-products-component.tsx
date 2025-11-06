import { CategoriesComponent } from "./categories-component";
import { SearchResultComponent } from "./search-results-component";

type Props = {
  products: Product[];
  categories: Category[];
  query: string;
  error?: string;
};

export function SearchProducts({ products, categories, query, error }: Props) {
  return (
    <div>
      <div className="flex justify-center items-center">
        <form method="GET" action="/search">
          <input
            type="text"
            name="q"
            defaultValue={query}
            placeholder="Search for products..."
            className="border px-4 py-2 rounded-md w-64"
          />
          <button
            type="submit"
            className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-md"
          >
            Search
          </button>
        </form>
      </div>

      <div className="mt-10">
        <SearchResultComponent
          products={products}
          error={error}
          query={query}
        />

        {categories?.length ? (
          <CategoriesComponent categories={categories} />
        ) : null}
      </div>
    </div>
  );
}
