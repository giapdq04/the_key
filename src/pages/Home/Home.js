import React, { memo } from "react";
import classNames from "classnames/bind";
import { useSelector } from "react-redux";
import Slideshow from "../../components/Slider/Slider";
import List from "./List/List";
import config from "../../config";
import styles from "./Home.module.scss";

// Constants
const SLIDE_IMAGES = [
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

const LIST_CONFIG = {
  title: "Khóa học miễn phí",
  moreBtnTitle: "Xem lộ trình",
  moreBtnTo: config.routes.learningPath,
  numPersonLearn: 1000,
};

const cx = classNames.bind(styles);

// Component con cho Slide Item - Memo hóa
const SlideItem = memo(({ slideImage }) => (
  <div>
    <div
      className={cx("slide")}
      style={{ backgroundImage: `url(${slideImage.url})` }}
    />
  </div>
));

// Component chính - Memo hóa
const Home = memo(() => {
  const courses = useSelector((state) => state.courses);

  return (
    <div className={cx("wrapper")}>
      <div className={cx("container")}>
        <div className={cx("slide-container")}>
          <Slideshow>
            {SLIDE_IMAGES.map((slideImage, index) => (
              <SlideItem key={index} slideImage={slideImage} />
            ))}
          </Slideshow>
        </div>

        <div className={cx("content-wrapper")}>
          <List
            title={LIST_CONFIG.title}
            list={courses}
            moreBtnTitle={LIST_CONFIG.moreBtnTitle}
            moreBtnTo={LIST_CONFIG.moreBtnTo}
            numPersonLearn={LIST_CONFIG.numPersonLearn}
          />
        </div>
      </div>
    </div>
  );
});

export default Home;