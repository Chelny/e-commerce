"use client"

import { ChangeEvent, useCallback, useEffect, useRef, useState } from "react"
// @ts-ignore
import { useFormState, useFormStatus } from "react-dom"
import Link from "next/link"
import { Trans } from "react-i18next"
import {
  getAuthUserProductReviewCount,
  sendProductReview,
} from "@/app/[locale]/(shop)/shop/product/[product]/product-review.actions"
import { Alert } from "@/app/[locale]/_components/Alert"
import { FieldErrorMessage } from "@/app/[locale]/_components/FieldErrorMessage"
import { StarRating } from "@/app/[locale]/_components/StarRating"
import {
  EAlertVariant,
  EHttpResponseStatus,
  PRODUCT_REVIEW_MAX_COMMENT_CHARS,
  PRODUCT_REVIEW_MAX_TITLE_CHARS,
  ROUTE_LOGIN,
} from "@/app/[locale]/_core"
import { useCurrentUser } from "@/app/[locale]/_hooks"
import { useTranslation } from "@/app/i18n/client"

export const ProductReviewForm = (props: TFormProps): JSX.Element => {
  const { t } = useTranslation(props.page.params.locale, "form")
  const [state, formAction] = useFormState(sendProductReview, undefined)
  const [selectedRating, setSelectedRating] = useState<number>(0)
  const commentRef = useRef<HTMLTextAreaElement>(null)
  const [comment, setComment] = useState("")
  const { pending } = useFormStatus()
  const authUser = useCurrentUser()
  const [authUserProductReviewCount, setAuthUserProductReviewCount] = useState<number>(0)

  const fetchAuthUserProductReviewCount = useCallback(async () => {
    if (authUser?.id) {
      const response = await getAuthUserProductReviewCount(props.productId, authUser.id)
      const data = response.data
      setAuthUserProductReviewCount(data ?? 0)
    }
  }, [props.productId, authUser])

  const handleRatingChange = (rating: number): void => {
    setSelectedRating(rating)
  }

  const handleCommentChange = (event: ChangeEvent<HTMLTextAreaElement>): void => {
    setComment(event.target.value)
  }

  useEffect(() => {
    fetchAuthUserProductReviewCount()
  }, [state, fetchAuthUserProductReviewCount])

  return (
    <>
      {authUserProductReviewCount === 0 &&
        (authUser?.email ? (
          <form className="flex flex-col space-y-4 md:w-[500px]" noValidate action={formAction}>
            <h3>{t("form:comment")}</h3>

            {state?.status && (
              <Alert variant={state?.status} locale={props.page.params.locale} message={state?.message} />
            )}

            <input type="hidden" id="productId" name="productId" value={props.productId} required />
            <input type="hidden" id="userId" name="userId" value={authUser?.id} required />

            <StarRating
              selectedRating={selectedRating}
              errors={state?.data?.errors?.rating || state?.status === EHttpResponseStatus.ERROR}
              onRatingChange={handleRatingChange}
            />
            <input type="hidden" id="rating" name="rating" value={selectedRating} required />
            <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.rating} />

            <label htmlFor="title">{t("form:label.title")}</label>
            <input
              type="text"
              id="title"
              name="title"
              className={`${
                state?.data?.errors?.title || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
              }`}
              maxLength={PRODUCT_REVIEW_MAX_TITLE_CHARS}
              required
            />
            <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.title} />

            <label htmlFor="comment">{t("form:label.comment")}</label>
            <textarea
              ref={commentRef}
              id="comment"
              name="comment"
              className={`${
                state?.data?.errors?.comment || state?.status === EHttpResponseStatus.ERROR ? "invalid" : ""
              }`}
              maxLength={PRODUCT_REVIEW_MAX_COMMENT_CHARS}
              required
              onChange={handleCommentChange}
            />
            <div className="self-end !mt-0 text-sm">
              {t("form:comment_chars_count", { count: comment.length, limit: PRODUCT_REVIEW_MAX_COMMENT_CHARS })}
            </div>
            <FieldErrorMessage locale={props.page.params.locale} field={state?.data?.errors?.comment} />

            <button type="submit" disabled={pending}>
              {t("form:button.post_comment")}
            </button>
          </form>
        ) : (
          <Alert variant={EAlertVariant.WARNING} locale={props.page.params.locale}>
            <Trans
              i18nKey={t("form:comment_unauthenticated")}
              components={{
                anchor: (
                  <Link href={`/${props.page.params.locale}${ROUTE_LOGIN.PATH}`} aria-label={ROUTE_LOGIN.TITLE} />
                ),
              }}
            />
          </Alert>
        ))}
    </>
  )
}
