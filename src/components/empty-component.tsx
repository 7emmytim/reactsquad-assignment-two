export function EmptyComponent({
  message = "Nothing to show):",
}: {
  message?: string;
}) {
  return <div>{message}</div>;
}
