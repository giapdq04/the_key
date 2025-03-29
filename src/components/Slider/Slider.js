import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import classNames from "classnames/bind";
import React, { memo, useState, useEffect } from 'react';
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import styles from './Slider.module.scss';
import { useSelector } from "react-redux";
import Slide1 from '../../assets/images/Slide 1.jpg'; // Đổi tên file thành Slide1.jpg
import Slide2 from '../../assets/images/3.jpg'; // Đổi tên file thành Slide2.jpg (thay vì 3.jpg)
import Slide3 from '../../assets/images/Slide 3.jpg'; // Đổi tên file thành Slide3.jpg
const cx = classNames.bind(styles);

// Mảng ảnh cứng cho mobile
const staticSlides = [
    { _id: 1, imageUrl: Slide1, link: "https://thekey.edu.vn", title: "Slide 1" },
    { _id: 2, imageUrl: Slide2, link: "https://thekey.edu.vn", title: "Slide 2" },
    { _id: 3, imageUrl: Slide3, link: "https://thekey.edu.vn", title: "Slide 3" },
];

const Slideshow = ({
    autoplay = true,
    infinite = true,
    pauseOnHover = true,
    duration = 5000,
    easing = 'ease',
    nextArrowCustom,
    prevArrowCustom,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);
    const slideImages = useSelector(state => state.slides);

    // Kiểm tra kích thước màn hình để xác định mobile hay desktop
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768); // Giả sử 768px là breakpoint cho mobile
        };

        // Gọi ngay khi component mount
        handleResize();
            
        // Lắng nghe sự kiện resize
        window.addEventListener('resize', handleResize);

        // Cleanup
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Chọn nguồn dữ liệu dựa trên trạng thái mobile hay desktop
    const slidesToShow = isMobile ? staticSlides : slideImages;

    const nextArrow = (
        <button className={cx('arrow', 'right')}>
            <FontAwesomeIcon icon={faChevronRight} />
        </button>
    );

    const prevArrow = (
        <button className={cx('arrow', 'left')}>
            <FontAwesomeIcon icon={faChevronLeft} />
        </button>
    );

    return (
        <div className="slide-container">
            <Slide
                cssClass={cx('slide-show')}
                onChange={(from, to) => {
                    setCurrentIndex(to);
                }}
                arrows={true}
                nextArrow={nextArrowCustom ?? nextArrow}
                prevArrow={prevArrowCustom ?? prevArrow}
                indicators={(index) => (
                    <span
                        className={cx('indicator', { active: currentIndex === index })}
                    ></span>
                )}
                autoplay={autoplay}
                infinite={infinite}
                duration={duration}
                pauseOnHover={pauseOnHover}
                easing={easing}
                transitionDuration={700}
            >
                {slidesToShow.map((slideImage) => (
                    <a href={slideImage.link} key={slideImage._id} target="_blank" rel="noopener noreferrer">
                        <img
                            src={slideImage.imageUrl}
                            className={cx("slide")}
                            alt={slideImage.title}
                        />
                    </a>
                ))}
            </Slide>
        </div>
    );
};

export default memo(Slideshow);