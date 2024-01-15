import Breadcrumbs from '@/app/[locale]/components/Breadcrumbs'

export default function AuthLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string },
}) {
  return (
    <div className='flex flex-col h-full'>
      <Breadcrumbs
        locale={params.locale}
      />
      <div className='w-full md:w-auto h-full p-4'>
        {children}
      </div>
    </div>
  )
}
