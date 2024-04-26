"use client"

import { MutableRefObject } from "react"
import Image from "next/image"
import { dir } from "i18next"
import {
  KeenSliderHooks,
  KeenSliderInstance,
  KeenSliderOptions,
  KeenSliderPlugin,
  SliderInstance,
  useKeenSlider,
} from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import { classMerge } from "@/app/[locale]/_lib"

type TProductImageGalleryProps = {
  locale: TLocale
}

export const ProductImageGallery = (props: TProductImageGalleryProps): JSX.Element => {
  const imageUrls = [
    "https://picsum.photos/id/870/400/400",
    "https://picsum.photos/id/888/400/400",
    "https://picsum.photos/id/999/400/400",
    "https://picsum.photos/id/901/400/400",
    "https://picsum.photos/id/666/400/400",
    "https://picsum.photos/id/73/400/400",
  ]

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    rtl: dir(props.locale) === "rtl",
    initial: 0,
  })
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      rtl: dir(props.locale) === "rtl",
      initial: 0,
      slides: {
        perView: 4,
        spacing: 20,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  )

  return (
    <div className="overflow-hidden space-y-2">
      <div ref={sliderRef} className="keen-slider">
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className={classMerge(`keen-slider__slide number-slide${index + 1}`, "flex justify-center")}>
            <Image
              className="rounded-lg"
              src={imageUrl}
              width={400}
              height={400}
              priority={true}
              alt={`Slide ${index + 1}`}
            />
          </div>
        ))}
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail">
        {imageUrls.map((imageUrl, index) => (
          <div key={index} className={classMerge(`keen-slider__slide number-slide${index + 1}`, "flex justify-center")}>
            <Image
              className="rounded-lg"
              src={imageUrl}
              width={400}
              height={400}
              priority={true}
              alt={`Thumbnail ${index + 1}`}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

const ThumbnailPlugin = (mainRef: MutableRefObject<KeenSliderInstance | null>): KeenSliderPlugin => {
  return (
    slider: SliderInstance<
      KeenSliderOptions<{}, {}, KeenSliderHooks>,
      KeenSliderInstance<{}, {}, KeenSliderHooks>,
      KeenSliderHooks
    >
  ) => {
    const removeActive = (): void => {
      slider.slides.forEach((slide: HTMLElement) => {
        slide.classList.remove("active")
      })
    }

    const addActive = (idx: number): void => {
      slider.slides[idx].classList.add("active")
    }

    const addClickEvents = (): void => {
      slider.slides.forEach((slide: HTMLElement, idx: number) => {
        slide.addEventListener("click", () => {
          if (mainRef.current) mainRef.current.moveToIdx(idx)
        })
      })
    }

    slider.on("created", () => {
      if (!mainRef.current) return
      addActive(slider.track.details.rel)
      addClickEvents()
      mainRef.current.on("animationStarted", (main) => {
        removeActive()
        const next: number = main.animator.targetIdx || 0
        addActive(main.track.absToRel(next))
        slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
      })
    })
  }
}
