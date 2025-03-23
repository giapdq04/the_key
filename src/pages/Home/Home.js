import classNames from "classnames/bind";
import React from "react";
import { useSelector } from "react-redux";
import Slideshow from "../../components/Slider/Slider";
import styles from "./Home.module.scss";
import List from "./List/List";
import config from "../../config";

const cx = classNames.bind(styles);

const slideImages = [
  {
    url: "https://res.cloudinary.com/dlmsjy3jd/image/upload/v1742716042/slides/dmfkc9xqkj3xs8eumx2j.png",
    caption: "Slide 1",
  },
  {
    url: "https://res.cloudinary.com/dlmsjy3jd/image/upload/v1742716041/slides/s0qqnxmhcxd8teyyr2gq.png",
    caption: "Slide 2",
  },
  {
    url: "https://res.cloudinary.com/dlmsjy3jd/image/upload/v1742716041/slides/zciript8vwdzzdt3nq6e.png",
    caption: "Slide 3",
  },
];

const Home = () => {
  // Lấy dữ liệu từ Redux store
  const courses = useSelector((state) => state.courses);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("slide-container")}>
          <Slideshow>
            {slideImages.map((slideImage, index) => (
              <div key={index}>
                <div
                  className={cx("slide")}
                  style={{ backgroundImage: `url(${slideImage.url})` }}
                />
              </div>
            ))}
          </Slideshow>
        </div>

        <div className={cx("content-wrapper")}>
          <List
            title="Khóa học miễn phí"
            list={courses}
            moreBtnTitle={"Xem lộ trình"}
            moreBtnTo={config.routes.learningPath}
            numPersonLearn={1000}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;