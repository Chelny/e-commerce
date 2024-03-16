"use client"

import { FaShare } from "react-icons/fa6"

export const Share = (): JSX.Element => {
  const handleShareProduct = () => {
    const shareData = {
      title: "title",
      text: "text",
      url: window.location.href,
    }

    if (!navigator.canShare) {
      console.error("navigator.canShare() not supported.")
    } else if (navigator.canShare(shareData)) {
      console.log("navigator.canShare() supported. We can use navigator.share() to send the data.")
    } else {
      console.error("Specified data cannot be shared.")
    }
  }

  return (
    <button className="button-link" type="button" onClick={handleShareProduct}>
      <FaShare />
    </button>
  )
}
