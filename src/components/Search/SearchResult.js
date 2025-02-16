import React from 'react'
import styles from './Search.module.scss'
import classNames from 'classnames/bind'

const cx = classNames.bind(styles)

const SearchResult = () => {
  const haveResult = false
  return (
    <div className={cx('search-result')}>
      {
        haveResult ? 'Có kết quả tìm kiếm' : 'Không có kết quả tìm kiếm'
      }
    </div>
  )
}

export default SearchResult