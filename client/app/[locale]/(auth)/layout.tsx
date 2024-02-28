export default function AuthLayout({ children, params }: { children: React.ReactNode; params: { locale: TLocale } }) {
  return <div className="flex flex-col justify-center items-center h-full p-4">{children}</div>
}
