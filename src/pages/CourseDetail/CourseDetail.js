import React, {useState} from 'react';
import classNames from "classnames/bind";

import styles from './CourseDetail.module.scss'
import {faBatteryFull, faCheck, faCirclePlay, faClock, faFilm, faGaugeHigh} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Panel from './Panel/Panel';
import Modal from "../../components/Modal/Modal";

const cx = classNames.bind(styles)

const CourseDetail = ({thumbnail, numOfLesson, duration, courseName, courseDesc, achievement,}) => {

    const [isShowModal, setIsShowModal] = useState(false)
    const [showAllLessons, setShowAllLessons] = useState(false)

    const videoId = 'r6GWbQL-qwA'

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('content-wrapper')}>
                    <div className={cx('description-col')}>
                        <article className={cx('description')}>
                            <div>
                                <h1 className={cx('course-name')}>App "Đừng Chạm Tay Lên Mặt"</h1>
                                <p className={cx('text-content')}>Xây dựng ứng dụng đưa ra cảnh báo
                                    khi người dùng sờ tay lên mặt. Chúng ta sẽ sử dụng thư viện ReactJS & Tensoflow
                                    để hoàn thiện ứng dụng này.</p>
                            </div>

                            <div className={cx('topic-list')}>
                                <h2 className={cx('topic-heading')}>Bạn sẽ học được gì?</h2>
                                <section className={cx('index-module-row')}>
                                    <section className={cx('index-module-col')}>
                                        <ul className={cx('list')}>
                                            <li>
                                                <FontAwesomeIcon className={cx('check-icon')} icon={faCheck}/>
                                                <span>Làm được tool cảnh báo khi sờ tay lên mặt</span>
                                            </li>

                                            <li>
                                                <FontAwesomeIcon className={cx('check-icon')} icon={faCheck}/>
                                                <span>Biết áp dụng làm tool có concept tương tự</span>
                                            </li>

                                            <li>
                                                <FontAwesomeIcon className={cx('check-icon')} icon={faCheck}/>
                                                <span>Làm quen với tư tưởng "Máy học"</span>
                                            </li>

                                            <li>
                                                <FontAwesomeIcon className={cx('check-icon')} icon={faCheck}/>
                                                <span>Biết thêm một số kỹ thuật với Javascript</span>
                                            </li>
                                        </ul>
                                    </section>
                                </section>
                            </div>

                            <div className={cx('curriculum-of-course')}>
                                <div className={cx('header-sticky')}>
                                    <div className={cx('header-block')}>
                                        <h2>Nội dung khóa học</h2>
                                    </div>
                                    <div className={cx('sub-head-wrapper')}>
                                        <ul>
                                            <li className={cx('num-chapter')}><strong>3 </strong> chương</li>
                                            <li className={cx('dot')}>•</li>
                                            <li className={cx('num-chapter')}><strong>13 </strong> bài học</li>
                                            <li className={cx('dot')}>•</li>
                                            <li className={cx('num-chapter')}>Thời lượng video <strong>01 giờ 34
                                                phút</strong></li>

                                        </ul>
                                        <div className={cx('toggle-Btn')}
                                             onClick={() => setShowAllLessons(!showAllLessons)}>
                                            {showAllLessons ? 'Thu nhỏ tất cả' : 'Mở rộng tất cả'}
                                        </div>
                                    </div>
                                </div>

                                <div className={cx('curriculum-panel')}>
                                    <div className={cx('panel-group')}>
                                        <Panel title={'1. Giới thiệu'} numberOfSection={2} onCollapse={showAllLessons}/>
                                        <Panel title={'2. Xây dựng'} numberOfSection={6} onCollapse={showAllLessons}/>
                                        <Panel title={'3. Trainning function'} numberOfSection={5} onCollapse={showAllLessons}/>
                                    </div>
                                </div>
                            </div>
                        </article>
                    </div>

                    <div className={cx('video-col')}>
                        <div className={cx('purchase-badge')}>
                            <div className={cx('image-preview')} onClick={() => setIsShowModal(true)}>
                                <div className={cx('background')} style={{
                                    backgroundImage: 'url(https://files.fullstack.edu.vn/f8-prod/courses/4/61a9e9e701506.png)'
                                }}></div>
                                <FontAwesomeIcon className={cx('play-icon')} icon={faCirclePlay}/>
                                <p>Xem giới thiệu khóa học</p>
                            </div>
                            <h5>Miễn phí</h5>
                            <button className={cx('enroll-btn')}>
                                <span className={cx('inner-btn')}>
                                    <span className={cx('btn-title')}>đăng ký học</span>
                                </span>
                            </button>

                            <ul className={cx('stat-list')}>
                                <li>
                                    <FontAwesomeIcon className={cx('stat-icon')} icon={faGaugeHigh}/>
                                    <span>Trình độ cơ bản</span>
                                </li>
                                <li>
                                    <FontAwesomeIcon className={cx('stat-icon')} icon={faFilm}/>
                                    <span>Tổng số <strong>13</strong> bài học</span>
                                </li>
                                <li>
                                    <FontAwesomeIcon className={cx('stat-icon')} icon={faClock}/>
                                    <span>Thời lượng <strong>01 giờ 34 phút</strong></span>
                                </li>
                                <li>
                                    <FontAwesomeIcon className={cx('stat-icon')} icon={faBatteryFull}/>
                                    <span>Học mọi lúc, mọi nơi</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isShow={isShowModal} onClose={() => setIsShowModal(false)} width={900}>
                <div className={cx('modal-content')}>
                    <h3>Giới thiệu khóa học</h3>
                    <h2>App "Đừng Chạm Tay Lên Mặt"</h2>
                    <div className={cx('intro-video-wrapper')}>
                        <iframe
                            className={cx('intro-video')}
                            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
                            title="YouTube video player"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default CourseDetail;