import Image from "next/image";
import Link from "next/link";

export function Home({ products }: { products: Product[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map(({ id, thumbnail, title }) => {
        return (
          <Link
            href={`/product/${id}`}
            key={id}
            className="rounded-lg cursor-pointer p-3 hover:shadow border-[0.5px] border-gray-300"
          >
            <div className="aspect-square relative max-w-48 mx-auto">
              <Image src={thumbnail} alt={title} fill />
            </div>

            <p className="text-xs text-center mt-10 truncate">{title}</p>
          </Link>
        );
      })}
    </div>
  );
}
