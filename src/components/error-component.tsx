export function ErrorComponent({ error }: { error: string }) {
  return <div className="text-red-600">Error: {error}</div>;
}
