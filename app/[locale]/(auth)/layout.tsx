import { ReactNode } from "react"

type TAuthLayout = {
  children: ReactNode
  params: { locale: TLocale }
}

const AuthLayout = (props: TAuthLayout): JSX.Element => {
  return <div className="flex flex-col justify-center items-center h-full p-4">{props.children}</div>
}

export default AuthLayout
