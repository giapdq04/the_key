import {faChevronLeft, faChevronRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, {memo, useState} from 'react';
import {Slide} from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from './Slider.module.scss';
import {useSelector} from "react-redux";

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
    const slideImages = useSelector(state => state.slides);
    console.log(slideImages)

    const nextArrow = (
        <button className={cx('arrow', 'right')}>
            <FontAwesomeIcon icon={faChevronRight}/>
        </button>
    )

    const prevArrow = (
        <button className={cx('arrow', 'left')}>
            <FontAwesomeIcon icon={faChevronLeft}/>
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
                    <span className={cx('indicator', {active: currentIndex === index})}
                    ></span>
                ))}

                autoplay={autoplay} infinite={infinite} duration={duration} pauseOnHover={pauseOnHover} easing={easing}
                transitionDuration={700}
            >
                {slideImages.map((slideImage) => (
                    <a href={slideImage.link} key={slideImage._id}>
                        <img
                            src={slideImage.imageUrl}
                            className={cx("slide")}
                            alt={slideImage.title}
                        />
                    </a>
                ))}
            </Slide>
        </div>
    )
}

export default memo(Slideshow);