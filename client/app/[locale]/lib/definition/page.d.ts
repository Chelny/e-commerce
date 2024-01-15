interface PageParams {
  params: {
    locale: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}