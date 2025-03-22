import React, { memo, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import { Link } from "react-router-dom";
import { Tooltip } from "react-tooltip";
import ButtonSocial from "../../components/Button/ButtonSocial";
import config from "../../config";
import styles from "./LearningPath.module.scss";

// Constants
const LEARNING_PATHS = [
  {
    id: 1,
    title: "Lộ trình học Front-end",
    description:
      "Lập trình viên Front-end là người xây dựng ra giao diện websites. Trong phần này F8 sẽ chia sẻ cho bạn lộ trình để trở thành lập trình viên Front-end nhé.",
    image: "https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png",
    skills: [
      { name: "Kiến thức nhập môn", icon: "https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png", progress: 43 },
      { name: "Html Css Pro", icon: "https://files.fullstack.edu.vn/f8-prod/courses/15/62385d6c63dfa.png", progress: 0 },
      { name: "Responsive với Grid System", icon: "https://files.fullstack.edu.vn/f8-prod/courses/3/6200afe1240bb.png", progress: 10 },
    ],
  },
  {
    id: 2,
    title: "Lộ trình học Back-end",
    description:
      "Trái với Front-end thì lập trình viên Back-end là người làm việc với dữ liệu, công việc thường nặng tính logic hơn. Chúng ta sẽ cùng tìm hiểu thêm về lộ trình học Back-end nhé.",
    image: "https://files.fullstack.edu.vn/f8-prod/learning-paths/2/63b4642136f3e.png",
    skills: [
      { name: "Kiến thức nhập môn", icon: "https://files.fullstack.edu.vn/f8-prod/courses/7/6200b81f52d83.png", progress: 43 },
      { name: "Html Css Pro", icon: "https://files.fullstack.edu.vn/f8-prod/courses/15/62385d6c63dfa.png", progress: 0 },
      { name: "Responsive với Grid System", icon: "https://files.fullstack.edu.vn/f8-prod/courses/3/6200afe1240bb.png", progress: 10 },
    ],
  },
];

const SOCIAL_DATA = {
  title: "Tham gia cộng đồng học viên F8 trên Facebook",
  description:
    "Hàng nghìn người khác đang học lộ trình giống như bạn. Hãy tham gia hỏi đáp, chia sẻ và hỗ trợ nhau trong quá trình học nhé.",
  image: "https://fullstack.edu.vn/assets/fb-group-cards-CAn_kGMe.png",
  href: "https://www.facebook.com/groups/f8official",
  buttonText: "Tham gia ngay",
};

const cx = classNames.bind(styles);

// Component con cho Skill Item - Memo hóa
const SkillItem = memo(({ skill }) => (
  <div
    className={cx("skill-item")}
    data-tooltip-id="tooltip"
    data-tooltip-content={`${skill.progress}% - ${skill.name}`}
  >
    <div className={cx("progress-circle")}>
      <svg width="10" height="10" viewBox="0 0 40 40">
        <circle cx="20" cy="20" r="16" stroke="#ddd" strokeWidth="3" fill="none" />
        <circle
          cx="20"
          cy="20"
          r="16"
          stroke={skill.progress > 0 ? "#f05123" : "#ddd"}
          strokeWidth="2"
          fill="none"
          strokeDasharray="100"
          strokeDashoffset={100 - (skill.progress / 100) * 100}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.5s ease-in-out" }}
        />
      </svg>
      <img
        loading="lazy"
        src={skill.icon}
        alt={skill.name}
        className={cx("skill-icon", { "gray-icon": skill.progress === 0 })}
      />
    </div>
  </div>
));

// Component con cho Learning Path Item - Memo hóa
const LearningPathItem = memo(({ path }) => (
  <div className={cx("learning-path-item")}>
    <div className={cx("body-learning")}>
      <div className={cx("nav-content")}>
        <h3 className={cx("learning-path-title")}>{path.title}</h3>
        <p className={cx("learning-path-desc")}>{path.description}</p>
      </div>
      <a className={cx("thum-round")} href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
        <img loading="lazy" src={path.image} className={cx("learning-path-image")} alt={path.title} />
      </a>
    </div>

    <div className={cx("skill-list")}>
      {path.skills.map((skill, index) => (
        <SkillItem key={index} skill={skill} />
      ))}
    </div>

    <Link to={config.routes.deiltaLearningPath}>
      <button className={cx("detail-button")}>XEM CHI TIẾT</button>
    </Link>
  </div>
));

// Component con cho phần Social - Memo hóa
const SocialSection = memo(() => (
  <div className={cx("wrapper-social")}>
    <div className={cx("info-social")}>
      <h2 className={cx("title")}>{SOCIAL_DATA.title}</h2>
      <p className={cx("description")}>{SOCIAL_DATA.description}</p>
      <ButtonSocial text={SOCIAL_DATA.buttonText} href={SOCIAL_DATA.href} />
    </div>
    <div className={cx("image-social")}>
      <img
        loading="lazy"
        style={{ width: 420, height: 420 }}
        src={SOCIAL_DATA.image}
        alt="Cộng đồng F8"
      />
    </div>
  </div>
));

// Component chính - Memo hóa
const LearningPath = memo(() => {
  const containerRef = useRef();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <div className={cx("wrapper")} ref={containerRef}>
      <div className={cx("container-top_content_1")}>
        <h2 className={cx("title")}>Lộ trình học</h2>
        <div className={cx("_desc_juuyp_1")}>
          <p className={cx("description")}>
            Để bắt đầu một cách thuận lợi, bạn nên tập trung vào một lộ trình học. Ví dụ: Để đi làm với vị trí "Lập trình viên Front-end" bạn nên tập trung vào lộ trình "Front-end".
          </p>
        </div>
      </div>

      <div className={cx("learning-path-list")}>
        {LEARNING_PATHS.map((path) => (
          <LearningPathItem key={path.id} path={path} />
        ))}
      </div>

      <Tooltip id="tooltip" />
      <SocialSection />
    </div>
  );
});

export default LearningPath;