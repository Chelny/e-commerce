type TLocale = string | undefined

type TLayoutProps = {
  children: React.ReactNode
  params: { locale: TLocale }
}

type TPageProps = {
  params: {
    locale: TLocale
    product?: string
  }
  searchParams?: {
    [key: string]: string | string[] | undefined
  }
}

type TPopover = {
  locale: TLocale
}

type TFormProps = {
  page: TPageProps
  productId?: string
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
