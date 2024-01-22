type TPageProps = {
  params: {
    locale: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}

type TForm = {
  locale: string
}

type TFormPreviousState = {
  message: string
  errors?: Partial<Record<string, [string, ...string[]]>>
}
