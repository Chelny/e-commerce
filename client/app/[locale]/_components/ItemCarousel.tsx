"use client"

import { Suspense, useState } from "react"
import { dir } from "i18next"
import { KeenSliderPlugin, useKeenSlider } from "keen-slider/react"
import { ItemCard } from "@/app/[locale]/_components/ItemCard"
import ItemCarouselSkeleton from "@/app/[locale]/_components/ItemCarousel.skeleton"
import "keen-slider/keen-slider.min.css"

type TItemCarouselProps = {
  locale: TLocale
}

export function ItemCarousel({ locale }: TItemCarouselProps) {
  const slides = [
    "https://picsum.photos/id/10/275/300",
    "https://picsum.photos/id/18/275/300",
    "https://picsum.photos/id/39/275/300",
    "https://picsum.photos/id/40/275/300",
    "https://picsum.photos/id/53/275/300",
    "https://picsum.photos/id/54/275/300",
    "https://picsum.photos/id/56/275/300",
    "https://picsum.photos/id/82/275/300",
    "https://picsum.photos/id/145/275/300",
    "https://picsum.photos/id/149/275/300",
    "https://picsum.photos/id/184/275/300",
    "https://picsum.photos/id/185/275/300",
    "https://picsum.photos/id/210/275/300",
    "https://picsum.photos/id/218/275/300",
    "https://picsum.photos/id/235/275/300",
  ]

  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [loaded, setLoaded] = useState<boolean>(false)
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      rtl: dir(locale) === "rtl",
      initial: 0,
      mode: "free-snap",
      breakpoints: {
        "(min-width: 400px)": {
          slides: { perView: 1.3 },
        },
        "(min-width: 640px)": {
          slides: { perView: 2.3 },
        },
        "(min-width: 768px)": {
          slides: { perView: 2.5 },
        },
        "(min-width: 1024px)": {
          slides: { perView: 3.5 },
        },
        "(min-width: 1200px)": {
          slides: { perView: 4.9 },
        },
      },
      slides: {
        perView: 1,
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

      <div className="keen-slider pb-2" ref={sliderRef}>
        <Suspense fallback={<ItemCarouselSkeleton />}>
          {slides.map((src: string, index: number) => (
            <div key={index} className="keen-slider__slide">
              <ItemCard locale={locale} item={{ id: index, imagePath: src }}></ItemCard>
            </div>
          ))}
        </Suspense>
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

const ResizePlugin: KeenSliderPlugin = (slider) => {
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
