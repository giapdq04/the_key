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
    url: "https://images.unsplash.com/photo-1509721434272-b79147e0e708?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
    caption: "Slide 1",
  },
  {
    url: "https://images.unsplash.com/photo-1506710507565-203b9f24669b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1536&q=80",
    caption: "Slide 2",
  },
  {
    url: "https://images.unsplash.com/photo-1536987333706-fc9adfb10d91?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80",
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