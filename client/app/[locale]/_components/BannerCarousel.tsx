"use client"

import React, { useState } from "react"
// import Image from 'next/image'
import { useParams } from "next/navigation"
import { dir } from "i18next"
import { useKeenSlider } from "keen-slider/react"
// import { useTranslation } from '@/app/i18n/client'
import "keen-slider/keen-slider.min.css"

type TBannerCarouselProps = {
  locale: string
}

export function BannerCarousel({ locale }: TBannerCarouselProps) {
  const params = useParams()
  // const { t } = await useTranslation(locale, 'common')

  const slides = [
    "https://picsum.photos/id/237/1600/900",
    "https://picsum.photos/id/564/1600/900",
    "https://picsum.photos/id/532/1600/900",
    "https://picsum.photos/id/360/1600/900",
    "https://picsum.photos/id/6/1600/900",
  ]

  const [currentSlide, setCurrentSlide] = useState<number>(0)
  const [loaded, setLoaded] = useState<boolean>(false)

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
    {
      slides: slides.length,
      // loop: true,
      rtl: dir(locale) === "rtl",
      initial: 0,
      created() {
        setLoaded(true)
      },
      slideChanged(slider) {
        // setCurrentSlide(slider.track.details.rel)
      },
      animationEnded(slider) {
        setCurrentSlide(slider.track.details.rel)
      },
    },
    [
      (slider) => {
        let timeout: ReturnType<typeof setTimeout>
        let mouseOver = false

        function clearNextTimeout() {
          clearTimeout(timeout)
        }

        function nextTimeout() {
          clearTimeout(timeout)
          if (mouseOver) return
          timeout = setTimeout(() => {
            slider.next()
          }, 8000)
        }

        slider.on("created", () => {
          slider.container.addEventListener("mouseover", () => {
            mouseOver = true
            clearNextTimeout()
          })
          slider.container.addEventListener("mouseout", () => {
            mouseOver = false
            nextTimeout()
          })
          nextTimeout()
        })

        slider.on("dragStarted", clearNextTimeout)

        slider.on("animationEnded", nextTimeout)

        slider.on("updated", nextTimeout)
      },
    ]
  )

  return (
    <div className="relative">
      <div className="keen-slider" ref={sliderRef}>
        {slides.map((src: string, index: number) => (
          <div
            key={index}
            className="keen-slider__slide !min-w-full !max-w-full h-96"
            style={{ backgroundImage: `url(${src})`, backgroundSize: "cover", backgroundPosition: "center center" }}
          >
            {/* <Image src={src} width={1600} height={900} priority={true} alt={src} /> */}
          </div>
        ))}
      </div>

      {loaded && instanceRef.current && (
        <div className="absolute z-10 start-0 end-0 bottom-0 flex justify-center items-center">
          {Array.from({ length: instanceRef.current.track.details.slides.length }, (_, idx) => (
            <button
              key={idx}
              onClick={() => {
                instanceRef.current?.moveToIdx(idx)
              }}
              className={"carousel-navigation-button appearance-none flex items-center w-10 h-10 border-0 bg-transparent after:rounded-full no-underline cursor-pointer touch-manipulation after:content-['']".concat(
                currentSlide === idx
                  ? " after:w-8 after:h-4 after:border after:border-ecommerce-500 after:bg-ecommerce-300 dark:after:bg-ecommerce-500"
                  : " after:w-3 after:h-3 hover:after:w-8 hover:after:h-4 after:bg-ecommerce-500 dark:after:bg-ecommerce-700"
              )}
            ></button>
          ))}
        </div>
      )}
    </div>
  )
}
