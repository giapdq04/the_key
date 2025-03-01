import classNames from "classnames/bind";
import {useSelector} from "react-redux";

import Section from "../Section/Section";
import styles from "./Sidebar.module.scss";
import {memo} from "react";

const cx = classNames.bind(styles)

const Sidebar = () => {
    const SectionList = useSelector(state => state.section)

    return (
        <div className={cx('side-bar')}>
            <div className={cx('container')}>
                <header className={cx('sidebar-header')}>
                    <h1 className={cx('heading')}>Nội dung khóa học</h1>
                </header>
                <div className={cx('body')}>
                    {SectionList.map((section, index) => (
                        <Section
                            key={section.id}
                            index={index}
                            item={section}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default memo(Sidebar)