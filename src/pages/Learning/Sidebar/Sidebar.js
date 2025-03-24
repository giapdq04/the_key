import classNames from "classnames/bind";
import { memo } from "react";
import { useSelector } from "react-redux";

import Section from "./Section/Section";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

const Sidebar = () => {
    const currentCourse = useSelector(state => state.currentCourse)

    return (
        <div className={cx('side-bar')}>
            <div className={cx('container')}>
                <header className={cx('sidebar-header')}>
                    <h1 className={cx('heading')}>Nội dung khóa học</h1>
                </header>
                <div className={cx('body')}>
                    {currentCourse?.sections?.map((section, index) => (
                        <div
                            key={section._id}
                        >
                            <Section
                                index={index}
                                item={section}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(Sidebar);