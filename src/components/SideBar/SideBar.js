
import styles from './SideBar.module.scss'
import classNames from 'classnames/bind'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHouse, faNewspaper, faRoad } from '@fortawesome/free-solid-svg-icons'
import { NavLink } from 'react-router'

const cx = classNames.bind(styles)

const listMenu = [
    {
        title: 'Trang chủ',
        icon: <FontAwesomeIcon icon={faHouse} className={cx('icon')} />,
        to: '/'
    },
    {
        title: 'Lộ trình',
        icon: <FontAwesomeIcon icon={faRoad} className={cx('icon')} />,
        to: '/learning-path'
    },
    {
        title: 'Bài viết',
        icon: <FontAwesomeIcon icon={faNewspaper} className={cx('icon')} />,
        to: '/blog'
    }
]

const SideBar = () => {

    const ListItem = ({ icon, title, to }) => {
        return (
            <NavLink to={to} className={(nav) =>
                cx('item', {
                    'active': nav.isActive
                })
            }>
                {icon}
                <span className={cx('item-title')}>{title}</span>
            </NavLink>
        )
    }
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