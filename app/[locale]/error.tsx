"use client" // Error components must be Client Components

import { useEffect } from "react"

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }): JSX.Element => {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error)
  }, [error])

  return (
    <div className="flex flex-col justify-center items-center gap-4 h-full p-4">
      <h2>Something went wrong!</h2>
      <button
        type="button"
        className="primary-action"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        Try again
      </button>
    </div>
  )
}

export default Error
