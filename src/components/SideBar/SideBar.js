import styles from './SideBar.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faNewspaper, faRoad } from '@fortawesome/free-solid-svg-icons'
import ListItem from "./ListItem";
import config from "../../config";

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