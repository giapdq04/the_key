import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, { useState } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from './Slider.module.scss';

const cx = classNames.bind(styles);

// const spanStyle = {
//     padding: '20px',
//     background: '#efefef',
//     color: '#000000'
// }

// const divStyle = {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//     backgroundSize: 'cover',
//     height: '270px',
//     borderRadius: '20px',
// }
// const slideImages = [
//     {
//         url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
//         caption: 'Slide 1'
//     },
//     {
//         url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
//         caption: 'Slide 2'
//     },
//     {
//         url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
//         caption: 'Slide 3'
//     },
// ];

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
                {/* {slideImages.map((slideImage, index) => (
                    <div key={index}>
                        <div style={{ ...divStyle, 'backgroundImage': `url(${slideImage.url})` }}>
                            <span style={spanStyle}>{slideImage.caption}</span>
                        </div>
                    </div>
                ))} */}
            </Slide>
        </div>
    )
}

export default Slideshow;