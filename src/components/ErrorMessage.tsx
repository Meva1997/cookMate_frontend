export default function ErrorMessage({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="text-red-500 pt-2">{children}</div>;
}
