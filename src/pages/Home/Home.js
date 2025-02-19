import classNames from 'classnames/bind';
import React from 'react';
import Slideshow from "../../components/Slider/Slider";
import styles from './Home.module.scss';
import List from "./List/List";

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
        student: 1000,
        minute: 130,
        video: 130,

    },

    {
        id: 2,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/21/63e1bcbaed1dd.png',
        title: 'Lập trình C++ cơ bản, nâng cao',
        student: 1000,
        minute: 120,
        video: 130,

    },

    {
        id: 3,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/2.png',
        title: 'HTML CSS từ Zero đến Hero',
        student: 1000,
        minute: 120,
        video: 130,

    },

    {
        id: 4,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/3.png',
        title: 'Responsive Với Grid System',
        student: 1000,
        minute: 130,
        video: 130,

    },

    {
        id: 5,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/1.png',
        title: 'Lập Trình JavaScript Cơ Bản',
        student: 1000,
        minute: 120,
        video: 130,

    },

    {
        id: 6,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/12.png',
        title: 'Lập Trình JavaScript Nâng Cao',
        student: 1000,
        minute: 120,
        video: 130,

    },

    {
        id: 7,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/14/624faac11d109.png',
        title: 'Làm việc với Terminal & Ubuntu',
        student: 1000,
        minute: 130,
        video: 130,

    },

    {
        id: 8,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/13/13.png',
        title: 'Xây Dựng Website với ReactJS',
        student: 1000,
        minute: 120,
        video: 130,

    },

    {
        id: 9,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/6.png',
        title: 'Node & ExpressJS',
        student: 1000,
        minute: 120,
        video: 130,

    },

    {
        id: 10,
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/courses/4/61a9e9e701506.png',
        title: 'App "Đừng Chạm Tay Lên Mặt"',
        student: 1000,
        minute: 120,
        video: 130,

    },
]

const postList = [
    {
        id: 1,
        title: 'Tổng hợp các sản phẩm của học viên tại F8',
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/blog_posts/65/6139fe28a9844.png',
        author: 'Sơn Đặng',
        avtAuthor: 'https://fullstack.edu.vn/images/founder.jpeg',
        verified: true,
        learnedPro: true,
        spendTime: 6,
    },

    {
        id: 2,
        title: '[Phần 1] Tạo dự án ReactJS với Webpack và Babel',
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/blog_posts/279/6153f692d366e.jpg',
        author: 'Sơn Đặng',
        avtAuthor: 'https://fullstack.edu.vn/images/founder.jpeg',
        verified: true,
        learnedPro: true,
        spendTime: 6,
    },

    {
        id: 3,
        title: 'Cách đưa code lên GitHub và tạo GitHub Pages',
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/blog_posts/677/615436b218d0a.png',
        author: 'Vo Minh Kha',
        avtAuthor: 'https://files.fullstack.edu.vn/f8-prod/user_avatars/18159/6466353972973.jpg',
        verified: false,
        spendTime: 6,
    },

    {
        id: 4,
        title: 'Ký sự ngày thứ 25 học ở F8',
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/blog_posts/51/6139c6453456e.png',
        author: 'Sơn Sơn',
        avtAuthor: 'https://fullstack.edu.vn/assets/feedback-0-BFb1fhaR.jpg',
        verified: true,
        spendTime: 6,
    },

    {
        id: 5,
        title: 'Các nguồn tài nguyên hữu ích cho 1 front-end developer',
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/blog_posts/107/613a1f3685814.png',
        author: 'Dương Vương',
        avtAuthor: 'https://fullstack.edu.vn/assets/feedback-0-BFb1fhaR.jpg',
        verified: true,
        learnedPro: true,
        spendTime: 6,
    },

    {
        id: 6,
        title: 'Thời gian và Động lực',
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/blog_posts/1671/61b6368983c16.jpg',
        author: 'Dong Ngo',
        avtAuthor: 'https://files.fullstack.edu.vn/f8-prod/user_avatars/9143/6263caafdf588.jpg',
        verified: true,
        spendTime: 6,
    },

    {
        id: 7,
        title: 'Tổng hợp tài liệu tự học tiếng anh cơ bản.',
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/blog_posts/273/614043e523ad9.png',
        author: 'Trung Lê Thành',
        avtAuthor: 'https://files.fullstack.edu.vn/f8-prod/user_avatars/74901/626aa252cdb22.jpg',
        verified: true,
        spendTime: 6,
    },

    {
        id: 8,
        title: 'Học như thế nào là phù hợp ?',
        thumbnail: 'https://files.fullstack.edu.vn/f8-prod/blog_posts/791/615de64de7e8f.jpg',
        author: 'Ngoc Tien Pham',
        avtAuthor: 'https://fullstack.edu.vn/assets/feedback-0-BFb1fhaR.jpg',
        verified: true,
        spendTime: 6,
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
                                    {/*nội dung bên trong slide*/}
                                </div>
                            </div>
                        ))}
                    </Slideshow>
                </div>

                <div className={cx('content-wrapper')}>

                    <List title='Khóa học Pro' list={proList} tag={'MỚI'} isPro={true}/>

                    <p className={cx('learned-users')}>
                        <strong className={cx('user-number')}>431.477+</strong> người khác đã học
                    </p>

                    <List title='Khóa học miễn phí' list={freeList}/>
                    <List title='Bài viết nổi bật' list={postList} isCourse={false}/>
                </div>
            </div>


        </div>
    );
};

export default Home;