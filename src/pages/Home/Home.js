import React from 'react';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Slideshow from "../../components/Slider/Slider";

const cx = classNames.bind(styles);
const slideImages = [
    {
        url: 'https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        caption: 'Slide 1'
    },
    {
        url: 'https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80',
        caption: 'Slide 2'
    },
    {
        url: 'https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80',
        caption: 'Slide 3'
    },
];

const Home = () => {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('slide-container')}>
                <Slideshow>
                    {slideImages.map((slideImage, index) => (
                        <div key={index}>
                            <div className={cx('slide')} style={{ 'backgroundImage': `url(${slideImage.url})` }}>
                                
                            </div>
                        </div>
                    ))}
                </Slideshow>
            </div>
        </div>
    );
};

export default Home;