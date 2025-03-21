import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, { useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

const Slideshow = ({
    children,
    autoplay = true,
    infinite = true,
    pauseOnHover = true,
    duration = 5000,
    easing = 'ease',
    nextArrowCustom,
    prevArrowCustom,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    const nextArrow = (
        <button className={cx('arrow', 'right')}>
            <FontAwesomeIcon icon={faChevronRight} />
        </button>
    )

    const prevArrow = (
        <button className={cx('arrow', 'left')}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
    )
    return (
        <div className="slide-container">
            <Slide
                cssClass={cx('slide-show')}

                onChange={(from, to) => {
                    setCurrentIndex(to)
                }}

                arrows={true}
                nextArrow={nextArrowCustom ?? nextArrow}
                prevArrow={prevArrowCustom ?? prevArrow}

                indicators={((index) => (
                    <span className={cx('indicator', { active: currentIndex === index ? true : false })}
                    ></span>
                ))}

                autoplay={autoplay} infinite={infinite} duration={duration} pauseOnHover={pauseOnHover} easing={easing}
                transitionDuration={700}
            >
                {children}
            </Slide>
        </div>
    )
}

export default Slideshow;