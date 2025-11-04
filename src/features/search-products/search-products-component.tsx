export function SearchProducts() {
  return (
    <div>
      <input
        type="text"
        name="q"
        // defaultValue={query}
        placeholder="Search for products..."
        className="border px-4 py-2 rounded-md w-64"
      />
    </div>
  );
}
