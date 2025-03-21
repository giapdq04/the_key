import classNames from "classnames/bind";
import React from 'react';
import protectedImage from '../../assets/images/protected.png';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);
const Footer = () => {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('top-row')}>
                    <div className={cx('col')}>
                        <div className={cx('column-top')}>
                            <img loading="lazy" className={cx('logo')} src='https://fullstack.edu.vn/assets/f8-icon-lV2rGpF0.png' alt='logo' />
                            <h2 className={cx('slogan')}>Học Lập Trình Để Đi Làm</h2>
                        </div>
                        <div className={cx('contact-list')}>
                            <b>Điện thoại: </b><a href='tel:0346220536'>0387.956.345</a>
                            <br />
                            <b>Email: </b><a href="mailto:thekey.edu.vn@gmail.com">thekey.edu.vn@gmail.com</a>
                            <br />
                            <b>Địa chỉ: </b>Lớp Học Thầy Nam, Cống Sông Bùng, Phùng Xá, Thạch Thất, Hà Nội
                        </div>
                        {/* <a href='https://thekey.edu.vn/'>
                            <img loading="lazy" className={cx('protected')} src={protectedImage} alt='' />
                        </a> */}
                    </div>
                    <div className={cx('col', 'col_bw')}>
                        <div className={cx('column-top')}>
                            <h2 className={cx('slogan')}>VỀ F8</h2>
                        </div>
                        <div className={cx('contact-list')}>
                            <ul className={cx('introduct-list')}>
                                <li><a href='https://www.youtube.com/watch?v=KKc_RMln5UY'>Giới thiệu</a></li>
                                <li><a href='https://www.youtube.com/watch?v=KKc_RMln5UY'>Liên hệ</a></li>
                                <li><a href='https://www.youtube.com/watch?v=KKc_RMln5UY'>Điều khoản</a></li>
                                <li><a href='https://www.youtube.com/watch?v=KKc_RMln5UY'>Bảo mật</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('col', 'col_bw')}>
                        <div className={cx('column-top')}>
                            <h2 className={cx('slogan')}>SẢN PHẨM</h2>
                        </div>
                        <div className={cx('contact-list')}>
                            <ul className={cx('introduct-list')}>
                                <li><a href='https://www.youtube.com/watch?v=KKc_RMln5UY'>Game Nester</a></li>
                                <li><a href='https://www.youtube.com/watch?v=KKc_RMln5UY'>Game CSS Diner</a></li>
                                <li><a href='https://www.youtube.com/watch?v=KKc_RMln5UY'>Game CSS Selectors</a></li>
                                <li><a href='https://www.youtube.com/watch?v=KKc_RMln5UY'>Game Froggy</a></li>
                                <li><a href='https://www.youtube.com/watch?v=KKc_RMln5UY'>Game Froggy Pro</a></li>
                                <li><a href='https://www.youtube.com/watch?v=KKc_RMln5UY'>Game Scoops</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('col', 'col_bw')}>
                        <div className={cx('column-top')}>
                            <h2 className={cx('slogan')}>CÔNG CỤ</h2>
                        </div>
                        <div className={cx('contact-list')}>
                            <ul className={cx('introduct-list')}>
                                <li><a href='https://www.youtube.com/watch?v=KKc_RMln5UY'>Tạo CV xin việc</a></li>
                                <li><a href='https://www.youtube.com/watch?v=KKc_RMln5UY'>Rút gọn liên kết</a></li>
                                <li><a href='https://www.youtube.com/watch?v=KKc_RMln5UY'>Clip-path maker</a></li>
                                <li><a href='https://www.youtube.com/watch?v=KKc_RMln5UY'>Snippet generator</a></li>
                                <li><a href='https://www.youtube.com/watch?v=KKc_RMln5UY'>CSS Grid generator</a></li>
                                <li><a href='https://www.youtube.com/watch?v=KKc_RMln5UY'>Cảnh báo sờ tay lên mặt</a></li>
                            </ul>
                        </div>
                    </div>
                    <div className={cx('col')}>
                        <div className={cx('column-top')}>
                            <h2 className={cx('slogan')}>CÔNG TY CỔ PHẦN CÔNG NGHỆ GIÁO DỤC F8</h2>
                        </div>
                        <div className={cx('contact-list')}>
                            <div className={cx('company-info')}><b>Mã số thuế: </b>0109922901</div>
                            <div className={cx('company-info')}><b>Ngày thành lập: </b>04/03/2022</div>
                            <div className={cx('company-info')}><b>Lĩnh vực hoạt động: </b>Giáo dục, công nghệ - lập trình. Chúng tôi tập trung xây dựng
                                và phát triển các sản phẩm mang lại giá trị cho cộng đồng lập trình viên Việt Nam.</div>
                        </div>
                    </div>
                </div>
                <div className={cx('bottom-row')}>
                    <p className={cx('copyright')}>© 2025  Made by TheKey</p>
                    <div className={cx('social-list')}>
                        <a className={cx('social-icon')} target="_blank" href='https://www.youtube.com/'>
                            <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png" alt="youtube" />
                        </a>

                        <a className={cx('social-icon')} target="_blank" href='https://www.facebook.com/thekey.edu.vn'>
                            <img loading="lazy" src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/768px-Facebook_Logo_%282019%29.png" alt="youtube" />
                        </a>

                        <a className={cx('social-icon')} target="_blank" href='https://www.tiktok.com/@thekeytienganh'>
                            <img loading="lazy" src="https://cdn.pixabay.com/photo/2021/06/15/12/28/tiktok-6338432_960_720.png" alt="youtube" />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;