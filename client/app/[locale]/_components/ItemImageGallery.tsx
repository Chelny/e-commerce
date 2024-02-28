"use client"

import { MutableRefObject } from "react"
import Image from "next/image"
import { dir } from "i18next"
import {
  useKeenSlider,
  KeenSliderPlugin,
  KeenSliderInstance,
  KeenSliderHooks,
  KeenSliderOptions,
  SliderInstance,
} from "keen-slider/react"
import { useTranslation } from "@/app/i18n/client"
import "keen-slider/keen-slider.min.css"

type TItemImageGalleryProps = {
  locale: TLocale
}

export function ItemImageGallery({ locale }: TItemImageGalleryProps) {
  const { t } = useTranslation(locale, "shop")
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    rtl: dir(locale) === "rtl",
    initial: 0,
  })
  const [thumbnailRef] = useKeenSlider<HTMLDivElement>(
    {
      rtl: dir(locale) === "rtl",
      initial: 0,
      slides: {
        perView: 4,
        spacing: 10,
      },
    },
    [ThumbnailPlugin(instanceRef)]
  )

  return (
    <div className="space-y-6">
      <div ref={sliderRef} className="keen-slider">
        <div className="keen-slider__slide number-slide1">
          <Image
            className="rounded-lg"
            src="https://picsum.photos/id/870/400/400"
            width="400"
            height="400"
            priority={true}
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide2">
          <Image className="rounded-lg" src="https://picsum.photos/id/888/400/400" width="400" height="400" alt="" />
        </div>
        <div className="keen-slider__slide number-slide3">
          <Image className="rounded-lg" src="https://picsum.photos/id/999/400/400" width="400" height="400" alt="" />
        </div>
        <div className="keen-slider__slide number-slide4">
          <Image className="rounded-lg" src="https://picsum.photos/id/901/400/400" width="400" height="400" alt="" />
        </div>
        <div className="keen-slider__slide number-slide5">
          <Image className="rounded-lg" src="https://picsum.photos/id/666/400/400" width="400" height="400" alt="" />
        </div>
        <div className="keen-slider__slide number-slide6">
          <Image className="rounded-lg" src="https://picsum.photos/id/73/400/400" width="400" height="400" alt="" />
        </div>
      </div>

      <div ref={thumbnailRef} className="keen-slider thumbnail">
        <div className="keen-slider__slide number-slide1">
          <Image
            className="rounded-lg"
            src="https://picsum.photos/id/870/400/400"
            width="400"
            height="400"
            priority={true}
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide2">
          <Image
            className="rounded-lg"
            src="https://picsum.photos/id/888/400/400"
            width="400"
            height="400"
            priority={true}
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide3">
          <Image
            className="rounded-lg"
            src="https://picsum.photos/id/999/400/400"
            width="400"
            height="400"
            priority={true}
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide4">
          <Image
            className="rounded-lg"
            src="https://picsum.photos/id/901/400/400"
            width="400"
            height="400"
            priority={true}
            alt=""
          />
        </div>
        <div className="keen-slider__slide number-slide5">
          <Image className="rounded-lg" src="https://picsum.photos/id/666/400/400" width="400" height="400" alt="" />
        </div>
        <div className="keen-slider__slide number-slide6">
          <Image className="rounded-lg" src="https://picsum.photos/id/73/400/400" width="400" height="400" alt="" />
        </div>
      </div>
    </div>
  )
}

function ThumbnailPlugin(mainRef: MutableRefObject<KeenSliderInstance | null>): KeenSliderPlugin {
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
