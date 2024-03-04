"use client"

import { ChangeEvent, useRef, useState } from "react"
import { useFormState, useFormStatus } from "react-dom"
import { Alert } from "@/app/[locale]/_components/Alert"
import { FieldErrorMessage } from "@/app/[locale]/_components/FieldErrorMessage"
import { StarRating } from "@/app/[locale]/_components/StarRating"
import { EVariant, PRODUCT_REVIEW_MAX_COMMENT_CHARS, PRODUCT_REVIEW_MAX_TITLE_CHARS } from "@/app/[locale]/_core"
import { sendProductReview } from "@/app/[locale]/(shop)/shop/product-review.actions"
import { useTranslation } from "@/app/i18n/client"

export function ProductReviewForm(props: TForm) {
  const { t } = useTranslation(props.page.params.locale, "form")
  const [state, formAction] = useFormState(sendProductReview, undefined)
  const [selectedRating, setSelectedRating] = useState<number>(0)
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const [comment, setComment] = useState("")
  const { pending } = useFormStatus()

  const handleRatingChange = (rating: number): void => {
    setSelectedRating(rating)
  }

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(event.target.value)
  }

  return (
    <form className="flex flex-col space-y-4 md:w-[500px]" noValidate action={formAction}>
      <h3>{t("comment")}</h3>

      {state?.status && <Alert variant={state?.status} locale={props.page.params.locale} message={state?.message} />}

      <StarRating
        selectedRating={selectedRating}
        errors={state?.data?.errors?.rating || state?.status === EVariant.ERROR}
        onRatingChange={handleRatingChange}
      />
      <input type="hidden" id="rating" name="rating" value={selectedRating} required />
      <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.rating} />

      <label htmlFor="title">{t("label.title")}</label>
      <input
        type="text"
        id="title"
        name="title"
        className={`${state?.data?.errors?.title || state?.status === EVariant.ERROR ? "invalid" : ""}`}
        maxLength={PRODUCT_REVIEW_MAX_TITLE_CHARS}
        required
      />
      <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.title} />

      <label htmlFor="comment">{t("label.comment")}</label>
      <textarea
        ref={commentRef}
        id="comment"
        name="comment"
        className={`${state?.data?.errors?.comment || state?.status === EVariant.ERROR ? "invalid" : ""}`}
        maxLength={PRODUCT_REVIEW_MAX_COMMENT_CHARS}
        required
        onChange={handleCommentChange}
      />
      <div className="self-end !mt-0 text-sm">
        {t("comment_chars_count", { count: comment.length, limit: PRODUCT_REVIEW_MAX_COMMENT_CHARS })}
      </div>
      <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.comment} />

      <button type="submit" disabled={pending}>
        {t("button.post_comment")}
      </button>
    </form>
  )
}
