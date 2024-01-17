export default function ShopLayout({ children, params }: { children: React.ReactNode; params: { locale: string } }) {
  return <div className="flex flex-col h-full p-4">{children}</div>
}
