"use client"

import { faCrown } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import classNames from "classnames/bind"
import Cookies from "js-cookie"
import { Link, useNavigate } from "react-router"
import axiosClient from "../../../../apis/axiosClient"
import config from "../../../../config"
import styles from "./CourseItem.module.scss"
import { useDispatch } from "react-redux"
import { setShowLoginModal } from "../../../../store/showLoginModal"

const cx = classNames.bind(styles)

const CourseItem = ({ item, isPro = false, isMobile, isSmallMobile }) => {
  const isEnrolled = true
  const dispatch = useDispatch()

  const navigate = useNavigate()

  const converToNumberFormat = (price) => {
    return price?.toLocaleString("vi-VN")
  }

  const handleCourseClick = async (e) => {
    e.preventDefault() // Ngăn chặn hành vi chuyển trang mặc định của Link

    try {
      const userID = Cookies.get("userID")
      if (!userID) {
        dispatch(setShowLoginModal(true))
        return
      }

      // Gọi API để kiểm tra hoặc xử lý trước khi chuyển trang
      await axiosClient.post("/course/enroll", {
        courseID: item._id,
        userID,
      })

      const targetRoute = isEnrolled
        ? config.routes.learning.replace(":slug", item.slug)
        : config.routes.courses.replace(":slug", item.slug)

      navigate(targetRoute)
    } catch (error) {
      console.error("Error viewing course:", error)
      // Xử lý lỗi - ví dụ: hiển thị thông báo lỗi
    }
  }

  return (
    <Link to="#" onClick={handleCourseClick}>
      <div className={cx("item")}>
        <div className={cx("thumbnail")}>
          <img loading="lazy" src={item.thumbnail || "/placeholder.svg"} alt={item.title} />
          {isPro && <FontAwesomeIcon icon={faCrown} className={cx("crown")} />}
        </div>

        <div className={cx("item-content")}>
          <span className={cx("item-title")}>{item.title}</span>
          <div className={cx("item-price")}>
            {isPro && <span className={cx("price")}>{converToNumberFormat(item.price)}đ</span>}
            <span className={cx("newPrice")}>
              {isPro ? converToNumberFormat((item.price * item.discount) / 100) + "đ" : "Miễn phí"}
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default CourseItem

