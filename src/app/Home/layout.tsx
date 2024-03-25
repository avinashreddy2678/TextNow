

export default function Homelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full flex">
      
      {children}
    </section>
  );
}
