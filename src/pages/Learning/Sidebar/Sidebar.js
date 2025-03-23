import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import { lazy, memo, Suspense } from "react";

import styles from "./Sidebar.module.scss";

const cx = classNames.bind(styles);
const Section = lazy(() => import('./Section/Section'));

const Sidebar = () => {
    const currentCourse = useSelector(state => state.currentCourse)
    // const sectionRefs = useRef([]);

    // useEffect(() => {
    //     const activeSectionIndex = SectionList.findIndex(section =>
    //         section.lessons.some(lesson => lesson.status === 2)
    //     );
    //
    //     if (activeSectionIndex !== -1 && sectionRefs.current[activeSectionIndex]) {
    //         sectionRefs.current[activeSectionIndex].scrollIntoView({behavior: 'smooth'});
    //     }
    // }, [SectionList]);

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
                        // ref={el => sectionRefs.current[index] = el}
                        >
                            <Suspense>
                                <Section
                                    index={index}
                                    item={section}
                                />
                            </Suspense>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default memo(Sidebar);