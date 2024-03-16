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
  data: {
    errors?: Partial<Record<string, [string, ...string[]]>>
  }
}

type TApiResponse<T = {}> = {
  status: string
  message?: string
  data?: T
}

type TFormActions = TFormState | TApiResponse | { twoFactor: boolean }
