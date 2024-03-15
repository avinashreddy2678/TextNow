import Sidebar from "@/components/Home/Sidebar";

export default function Homelayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="h-full flex">
      <Sidebar />
      {children}
    </section>
  );
}
