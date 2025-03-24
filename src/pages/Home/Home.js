import classNames from "classnames/bind";
import React from "react";
import {useSelector} from "react-redux";
import Slideshow from "../../components/Slider/Slider";
import styles from "./Home.module.scss";
import List from "./List/List";
import config from "../../config";

const cx = classNames.bind(styles)

const Home = () => {
    // Lấy dữ liệu từ Redux store
    const courses = useSelector((state) => state.courses);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("slide-container")}>
                    <Slideshow/>
                </div>

                <div className={cx("content-wrapper")}>
                    <List
                        title="Khóa học miễn phí"
                        list={courses}
                        moreBtnTitle={"Xem lộ trình"}
                        moreBtnTo={config.routes.learningPath}
                        numPersonLearn={1000}
                    />
                </div>
            </div>
        </div>
    );
};

export default Home;