import Link from "next/link";

export function CategoriesComponent({
  categories,
}: {
  categories: Category[];
}) {
  return (
    <div className="mt-5">
      <p className="text-lg">Suggested Categories</p>

      <ul className="mt-3 list-disc">
        {categories.map(({ name }) => (
          <li key={name} className="text-blue-500 hover:underline">
            <Link href="/">{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
