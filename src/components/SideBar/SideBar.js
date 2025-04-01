
import { faHouse, faRoad } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';
import config from "../../config";
import ListItem from "./ListItem";
import styles from './SideBar.module.scss';

const cx = classNames.bind(styles)

const listMenu = [
    {
        title: 'Trang chủ',
        icon: <FontAwesomeIcon icon={faHouse} className={cx('icon')} />,
        to: config.routes.home
    },
    {
        title: 'Lộ trình',
        icon: <FontAwesomeIcon icon={faRoad} className={cx('icon')} />,
        to: config.routes.learningPath
    },
    // {
    //     title: 'Học tập',
    //     icon: <FontAwesomeIcon icon={faGraduationCap} className={cx('icon')} />,
    //     to: config.routes.learningcenter
    // },
    // {
    //     title: 'Bài viết',
    //     icon: <FontAwesomeIcon icon={faNewspaper} className={cx('icon')}/>,
    //     to: config.routes.blog
    // }
]

const SideBar = () => {
    return (
        <div className={cx('wrapper')}>

            <div className={cx('menu')}>
                {listMenu.map((item, index) => (
                    <ListItem key={index} {...item} />
                ))}
            </div>
        </div>
    )
}

export default SideBar