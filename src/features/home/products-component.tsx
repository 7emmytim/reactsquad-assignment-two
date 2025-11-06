import Image from "next/image";
import Link from "next/link";

export function ProductsComponent({
  products,
  withPrice,
}: {
  products: Product[];
  withPrice?: boolean;
}) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {products.map(({ id, thumbnail, title, price }) => {
        return (
          <Link
            href={`/product/${id}`}
            key={id}
            className="rounded-lg cursor-pointer p-3 hover:shadow border-[0.5px] border-gray-300"
          >
            <div className="aspect-square relative max-w-48 mx-auto">
              <Image src={thumbnail} alt={title} fill />
            </div>

            <div className="text-center mt-10">
              <p className="text-xs truncate">{title}</p>
              {withPrice ? (
                <p className="text-2xl font-bold mt-3">${price.toFixed(2)}</p>
              ) : null}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
