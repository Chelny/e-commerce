import React from "react"
import { classMerge } from "@/app/[locale]/_lib"

type TSkeleton = {
  className?: string
  lines?: number
}

const Skeleton = ({ className, lines = 1 }: TSkeleton): JSX.Element => {
  const skeletonLines = []

  for (let i = 0; i < lines; i++) {
    skeletonLines.push(
      <span
        key={i}
        className={classMerge("block w-full h-5 rounded bg-slate-200 motion-safe:animate-pulse", className)}
      />
    )
  }

  return <>{skeletonLines}</>
}

export default Skeleton
