import React from 'react'
import classNames from 'classnames/bind'
import styles from './LearningCenter.module.scss';
const cx = classNames.bind(styles)

const LearningCenter = () => {
  return (
    <div className={cx("wrapper")}>
  <h1 className="text-3xl font-bold underline text-red-500">
    Hello world!
</h1>
      </div>
  )
}

export default LearningCenter