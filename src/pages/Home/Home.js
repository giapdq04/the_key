import { memo } from "react"
import classNames from "classnames/bind"
import { useSelector } from "react-redux"
import Slideshow from "../../components/Slider/Slider"
import List from "./List/List"
import config from "../../config"
import styles from "./Home.module.scss"

const cx = classNames.bind(styles)

const Home = memo(() => {
  const courses = useSelector((state) => state.courses)
  const slides = useSelector((state) => state.slides.slides) // Lấy slides từ store
  console.log("Slides in Home:", slides) // Kiểm tra slides trong Home

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("slide-wrapper")}>
          <Slideshow />
        </div>

        <div className={cx("content-wrapper")}>
          <List
            title="Khóa học miễn phí"
            list={courses}
            moreBtnTitle="Xem lộ trình"
            moreBtnTo={config.routes.learningPath}
            numPersonLearn={1000}
          />
        </div>
      </div>
    </div>
  )
})

export default Home

