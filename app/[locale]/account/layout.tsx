const AccountLayout = (props: TLayoutProps): JSX.Element => {
  return <div className="flex flex-col justify-center items-center h-full p-4">{props.children}</div>
}

export default AccountLayout
