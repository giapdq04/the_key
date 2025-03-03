import classNames from "classnames/bind";
import {useSelector} from "react-redux";
import {useEffect, useRef, memo} from "react";

import Section from "./Section/Section";
import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);

const Sidebar = () => {
    const SectionList = useSelector(state => state.section);
    const sectionRefs = useRef([]);

    useEffect(() => {
        const activeSectionIndex = SectionList.findIndex(section =>
            section.lessons.some(lesson => lesson.status === 2)
        );

        if (activeSectionIndex !== -1 && sectionRefs.current[activeSectionIndex]) {
            sectionRefs.current[activeSectionIndex].scrollIntoView({behavior: 'smooth'});
        }
    }, [SectionList]);

    return (
        <div className={cx('side-bar')}>
            <div className={cx('container')}>
                <header className={cx('sidebar-header')}>
                    <h1 className={cx('heading')}>Nội dung khóa học</h1>
                </header>
                <div className={cx('body')}>
                    {SectionList.map((section, index) => (
                        <div
                            key={section.id}
                            ref={el => sectionRefs.current[index] = el}
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