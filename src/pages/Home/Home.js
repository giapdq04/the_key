import classNames from 'classnames/bind';
import React from 'react';
import Slideshow from "../../components/Slider/Slider";
import styles from './Home.module.scss';
import List from "./List";

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
        video: 100,
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
        video: 40,
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
        video: 50,
        minute: 120,
    },


]
const freeList = [
    {
        id: 1,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/7.png',
        title: 'Kiến thức nhập môn IT',
        view: 1000,
        minute: 130,
        video: 130,

    },

    {
        id: 2,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png',
        title: 'Lập trình C++ cơ bản, nâng cao',
        view: 1000,
        minute: 120,
        video: 130,

    },

    {
        id: 3,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/2.png',
        title: 'HTML CSS từ Zero đến Hero',
        view: 1000,
        minute: 120,
        video: 130,

    },

    {
        id: 4,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/3.png',
        title: 'Responsive Với Grid System',
        view: 1000,
        minute: 130,
        video: 130,

    },

    {
        id: 5,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/1.png',
        title: 'Lập Trình JavaScript Cơ Bản',
        view: 1000,
        minute: 120,
        video: 130,

    },

    {
        id: 6,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/12.png',
        title: 'Lập Trình JavaScript Nâng Cao',
        view: 1000,
        minute: 120,
        video: 130,

    },

    {
        id: 7,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/14/624faac11d109.png',
        title: 'Làm việc với Terminal & Ubuntu',
        view: 1000,
        minute: 130,
        video: 130,

    },

    {
        id: 8,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/13/13.png',
        title: 'Xây Dựng Website với ReactJS',
        view: 1000,
        minute: 120,
        video: 130,

    },

    {
        id: 9,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/6.png',
        title: 'Node & ExpressJS',
        view: 1000,
        minute: 120,
        video: 130,

    },

    {
        id: 10,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/4/61a9e9e701506.png',
        title: 'App "Đừng Chạm Tay Lên Mặt"',
        view: 1000,
        minute: 120,
        video: 130,

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
                                <div className={cx('slide')} style={{ 'backgroundImage': `url(${slideImage.url})` }}>

                                </div>
                            </div>
                        ))}
                    </Slideshow>
                </div>

                <div className={cx('content-wrapper')}>
                    {/* <div className={cx('list-title')}>
                        <span className={cx('section')}>Khóa học Pro</span>
                        <span className={cx('tag')}>MỚI</span>
                    </div>

                    <div className={cx('course-list')}>
                        {proList.map(pro => (
                            <CourseItem key={pro.id} item={pro} isPro={true} />
                        ))}
                    </div> */}

                    <List title='Khóa học Pro' list={proList} tag={'MỚI'} isPro={true} />

                    <p className={cx('learned-users')}>
                        <strong className={cx('user-number')}>431.477+</strong> người khác đã học
                    </p>

                    <List title='Khóa học miễn phí' list={freeList} />
                </div>
            </div>


        </div>
    );
};

export default Home;