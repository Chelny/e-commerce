"use client"

import { useState } from "react"
import { dir } from "i18next"
import { KeenSliderPlugin, useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { ProductCard } from "@/app/[locale]/_components/ProductCard"
import { TProduct } from "@/app/[locale]/_core"

type TProductCarouselProps = {
  locale: TLocale
  products: TProduct[] | undefined
}

export const ProductCarousel = (props: TProductCarouselProps): JSX.Element => {
  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      rtl: dir(props.locale) === "rtl",
      initial: 0,
      mode: "free-snap",
      slides: {
        perView: () => {
          if (window.innerWidth < 1536) {
            const rootFontSize = parseFloat(getComputedStyle(document.documentElement).fontSize)
            const slideWidthRem = 17
            const spacing = 30
            const slideWidthPx = slideWidthRem * rootFontSize + spacing
            const slidesPerView = window.innerWidth / slideWidthPx
            return +slidesPerView.toFixed(1)
          }

          return 4.7
        },
        spacing: 20,
      },
      created() {
        setLoaded(true)
      },
      slideChanged(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
    },
    [ResizePlugin]
  )

  return (
    <div className="relative">
      {loaded && instanceRef.current && (
        <div className="hidden md:flex md:justify-end md:items-center md:space-x-4 rtl:md:space-x-reverse md:pb-2">
          <Arrow
            left
            onClick={(e: any) => e.stopPropagation() || instanceRef.current?.prev()}
            disabled={currentSlide === 0}
          />

          <Arrow
            onClick={(e: any) => e.stopPropagation() || instanceRef.current?.next()}
            disabled={currentSlide === instanceRef.current.track.details.maxIdx}
          />
        </div>
      )}

      <div ref={sliderRef} className="keen-slider pb-2">
        {props.products?.map((product: TProduct) => (
          <div key={product?.id} className="keen-slider__slide">
            <ProductCard locale={props.locale} product={product} />
          </div>
        ))}
      </div>
    </div>
  )
}

function Arrow(props: { disabled: boolean; left?: boolean; onClick: (e: any) => void }) {
  return (
    <button
      className={`appearance-none w-6 h-6 p-0 border-0 bg-transparent text-ecommerce-600 dark:text-ecommerce-400 no-underline disabled:opacity-30 cursor-pointer touch-manipulation ${
        props.left ? "start-0" : "end-0"
      }`}
      type="button"
      disabled={props.disabled}
      onClick={props.onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        {props.left && (
          <path fill="currentColor" d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
        )}
        {!props.left && <path fill="currentColor" d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
      </svg>
    </button>
  )
}

const ResizePlugin: KeenSliderPlugin = (slider): void => {
  const observer = new ResizeObserver(() => {
    slider.update()
  })

  slider.on("created", () => {
    observer.observe(slider.container)
  })

  slider.on("destroyed", () => {
    observer.unobserve(slider.container)
  })
}
