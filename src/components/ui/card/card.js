import classNames from "classnames/bind"
import styles from "./card.module.scss"

const cx = classNames.bind(styles)

export const Card = ({ children, className }) => {
  return <div className={cx("card", className)}>{children}</div>
}

export const CardContent = ({ children, className }) => {
  return <div className={cx("card-content", className)}>{children}</div>
}

