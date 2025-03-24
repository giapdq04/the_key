"use client"

import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames/bind"
import { useState } from "react"
import { Slide } from "react-slideshow-image"
import "react-slideshow-image/dist/styles.css"
import styles from "./Slider.module.scss"
import { useSelector } from "react-redux"

const cx = classNames.bind(styles)

const Slideshow = ({
                       autoplay = true,
                       infinite = true,
                       pauseOnHover = true,
                       duration = 5000,
                       easing = "ease",
                       nextArrowCustom,
                       prevArrowCustom,
                   }) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const slides = useSelector((state) => state.slides) // Lấy slides từ store
    console.log("Slides in Slideshow:", slides) // Kiểm tra slides trong component

    const nextArrow = (
        <button className={cx("arrow", "right")}>
            <FontAwesomeIcon icon={faChevronRight} />
        </button>
    )

    const prevArrow = (
        <button className={cx("arrow", "left")}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
    )

    return (
        <div className={cx("slide-container")}>
            <Slide
                cssClass={cx("slide-show")}
                onChange={(from, to) => {
                    setCurrentIndex(to)
                }}
                arrows={true}
                nextArrow={nextArrowCustom ?? nextArrow}
                prevArrow={prevArrowCustom ?? prevArrow}
                indicators={(index) => <span className={cx("indicator", { active: currentIndex === index })}></span>}
                autoplay={autoplay}
                infinite={infinite}
                duration={duration}
                pauseOnHover={pauseOnHover}
                easing={easing}
                transitionDuration={700}
            >
                {slides && slides.length > 0 ? (
                    slides.map((slide) => (
                        <div key={slide._id} className={cx("each-slide")}>
                            <div
                                className={cx("slide-image")}
                                style={{
                                    backgroundImage: `url(${slide.imageUrl})`,
                                }}
                            ></div>
                        </div>
                    ))
                ) : (
                    <div className={cx("no-slides")}>Không có slide để hiển thị</div>
                )}
            </Slide>
        </div>
    )
}

export default Slideshow

