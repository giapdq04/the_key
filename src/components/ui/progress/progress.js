import classNames from "classnames/bind"
import styles from "./progress.module.scss"

const cx = classNames.bind(styles)

export const Progress = ({ value, className }) => {
  return (
    <div className={cx("progress-container", className)}>
      <div className={cx("progress-bar")} style={{ width: `${Math.min(Math.max(value, 0), 100)}%` }} />
    </div>
  )
}

