type TLocale = string | undefined

type TLayout = {
  children: React.ReactNode
  params: { locale: TLocale }
}

type TPage = {
  params: {
    locale: TLocale
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

type TForm = {
  page: TPage
}

type TFormState = {
  message?: string
  errors?: Partial<Record<string, [string, ...string[]]>>
}

type TApiResponse = {
  status: string
  code: number
  message: string
  data: Record<string, any> | null
}
