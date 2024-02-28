import { ReactNode } from "react"

type TAuthLayout = {
  children: ReactNode
  params: { locale: TLocale }
}

export default function AuthLayout(props: TAuthLayout) {
  return <div className="flex flex-col justify-center items-center h-full p-4">{props.children}</div>
}
