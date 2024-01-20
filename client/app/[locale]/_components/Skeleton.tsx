export default function Skeleton({ className }: { className: string }) {
  return <div className={`rounded bg-slate-200 motion-safe:animate-pulse ${className}`} />
}
