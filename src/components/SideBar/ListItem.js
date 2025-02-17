import React from 'react';
import {NavLink} from "react-router";
import classNames from "classnames/bind";
import styles from "./SideBar.module.scss";

const cx = classNames.bind(styles)

const ListItem = ({icon, title, to}) => {
    return (
        <NavLink to={to} className={(nav) =>
            cx('item', {
                'active': nav.isActive
            })
        }>
            {icon}
            <span className={cx('item-title')}>{title}</span>
        </NavLink>
    );
};

export default ListItem;