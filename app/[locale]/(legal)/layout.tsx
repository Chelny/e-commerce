const LegalLayout = (props: TLayoutProps): JSX.Element => {
  return <div className="flex flex-col h-full p-4">{props.children}</div>
}

export default LegalLayout
