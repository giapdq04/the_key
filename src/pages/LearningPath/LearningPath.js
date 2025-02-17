import classNames from 'classnames/bind'

import styles from './LearningPath.module.scss'

const cx = classNames.bind(styles)

const LearningPath = () => {
    return (
        <div className={cx('wrapper')}>
            LearningPath
        </div>
    )
}

export default LearningPath