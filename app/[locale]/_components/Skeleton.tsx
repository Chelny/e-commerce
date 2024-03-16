type TSkeleton = {
  className: string
}

const Skeleton = (props: TSkeleton): JSX.Element => {
  return <div className={`rounded bg-slate-200 motion-safe:animate-pulse ${props.className}`} />
}

export default Skeleton
