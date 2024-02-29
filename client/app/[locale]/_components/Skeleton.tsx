type TSkeleton = {
  className: string
}

export default function Skeleton(props: TSkeleton) {
  return <div className={`rounded bg-slate-200 motion-safe:animate-pulse ${props.className}`} />
}
