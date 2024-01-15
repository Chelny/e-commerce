type TPageProps = {
  params: {
    locale: string
  }
  searchParams: {
    [key: string]: string | string[] | undefined
  }
}