import React from 'react'
import classNames from 'classnames/bind'
import styles from "./DetailLearningPath.module.scss";
import NotFound from '../../components/404/Notfound';
import BanNotificationDialog from '../../components/Dialog/ban-notification-dialog';
const cx = classNames.bind(styles)

const DetailLearningPath = () => {
  return (
    <div className={cx("wrapper")}>
     <BanNotificationDialog />
      </div>
  )
}

export default DetailLearningPath