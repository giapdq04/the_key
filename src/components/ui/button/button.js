import classNames from "classnames/bind"
import styles from "./button.module.scss"

const cx = classNames.bind(styles)

export const Button = ({ variant = "default", size = "md", children, className, ...props }) => {
  return (
    <button className={cx("button", `variant-${variant}`, `size-${size}`, className)} {...props}>
      {children}
    </button>
  )
}

