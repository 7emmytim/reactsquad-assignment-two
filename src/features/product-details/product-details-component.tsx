import Image from "next/image";

export function ProductDetails({ product }: { product: Product }) {
  function handleAddToCart() {}

  return (
    <div className="max-w-2xl mx-auto text-2xl shadow-lg px-20 py-10 rounded-lg">
      <div className="aspect-square relative max-w-xs mx-auto">
        <Image src={product?.thumbnail} alt={product.title} fill />
      </div>

      <div className="grid grid-cols-1 gap-5 mt-10">
        {[
          { label: "Name", value: product?.title },
          { label: "Description", value: product?.description },
          { label: "Price", value: product?.price },
          { label: "Rating", value: product?.rating },
        ].map(({ label, value }) => (
          <div key={label}>
            <p className="text-black/50 text-sm">{label}:</p>
            <p className="text-sm">{value ?? "-"}</p>
          </div>
        ))}
      </div>

      <div className="text-center mt-3">
        <button
          onClick={handleAddToCart}
          className="bg-blue-500 text-white cursor-pointer px-3 py-2 rounded-lg text-base"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}
