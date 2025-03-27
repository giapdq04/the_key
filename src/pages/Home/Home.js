import classNames from "classnames/bind";
import React, {lazy, Suspense} from "react";
import {useSelector} from "react-redux";
import styles from "./Home.module.scss";
import List from "./List/List";
import config from "../../config";

const cx = classNames.bind(styles)

const SlideShow = lazy(() => import("../../components/Slider/Slider"));

const Home = () => {
    // Lấy dữ liệu từ Redux store
    const courses = useSelector((state) => state.courses);

    return (
        <div className={cx("wrapper")}>
            <div className={cx("container")}>
                <div className={cx("slide-container")}>
                    <Suspense>
                        <SlideShow/>
                    </Suspense>
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