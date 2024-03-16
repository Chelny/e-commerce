"use client"

import { useState } from "react"
import { FaRegStar, FaStar } from "react-icons/fa"
import styles from "./StarRating.module.css"

type TStarRating = {
  selectedRating: number
  errors: boolean
  onRatingChange: (rating: number) => void
}

export const StarRating = (props: TStarRating): JSX.Element => {
  const [rating, setRating] = useState<number>(props.selectedRating)

  const handleMouseOver = (starIndex: number): void => {
    setRating(starIndex)
  }

  const handleClick = (): void => {
    props.onRatingChange(rating)
  }

  return (
    <div className={styles.starRating}>
      {[...Array(5)].map((_, index: number) => (
        <div
          key={index}
          className={`${styles.star} ${props.errors ? styles.invalid : ""}`}
          onMouseOver={() => handleMouseOver(index + 1)}
          onClick={handleClick}
          style={{ cursor: "pointer" }}
        >
          {index + 1 <= rating ? <FaStar /> : <FaRegStar />}
        </div>
      ))}
    </div>
  )
}
