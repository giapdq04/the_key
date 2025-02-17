import React from 'react';
import styles from './Home.module.scss';
import classNames from 'classnames/bind';
import Slideshow from "../../components/Slider/Slider";
import CourseItem from "./CourseItem";

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

const proList = [
    {
        id: 1,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/15/62f13d2424a47.png',
        title: 'HTML CSS Pro',
        price: 1000000,
        discount: 20,
        author: 'Nguyễn Văn A',
        avtAuthor: 'https://fullstack.edu.vn/images/founder.jpeg',
        view: 1000,
        minute: 130,
    },

    {
        id: 2,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/19/66aa28194b52b.png',
        title: 'JavaScript Pro',
        price: 1000000,
        discount: 20,
        author: 'Nguyễn Văn A',
        avtAuthor: 'https://fullstack.edu.vn/images/founder.jpeg',
        view: 1000,
        minute: 120,
    },

    {
        id: 3,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/27/64e184ee5d7a2.png',
        title: 'Ngôn ngữ Sass',
        price: 1000000,
        discount: 20,
        author: 'Nguyễn Văn A',
        avtAuthor: 'https://fullstack.edu.vn/images/founder.jpeg',
        view: 1000,
        minute: 120,
    },


]

const Home = () => {

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('slide-container')}>
                    <Slideshow>
                        {slideImages.map((slideImage, index) => (
                            <div key={index}>
                                <div className={cx('slide')} style={{'backgroundImage': `url(${slideImage.url})`}}>

                                </div>
                            </div>
                        ))}
                    </Slideshow>
                </div>

                <div className={cx('content-wrapper')}>
                    <span className={cx('section')}>Khóa học Pro</span>
                    <span className={cx('tag')}>MỚI</span>

                    <div className={cx('pro-list')}>
                        {proList.map(pro => (
                            <CourseItem key={pro.id} item={pro}/>
                        ))}
                    </div>
                </div>
            </div>


        </div>
    );
};

export default Home;