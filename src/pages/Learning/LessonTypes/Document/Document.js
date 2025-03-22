import React, { memo, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDownload, faHeart } from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";
import { useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axiosClient from "../../../../apis/axiosClient";
import styles from "./Document.module.scss";

// Constants
const SOCIAL_LINKS = {
  facebook: {
    url: "https://www.facebook.com/groups/f8official/",
    text: "Học lập trình tại F8",
  },
  youtube: {
    url: "https://url.mycv.vn/f8_youtube?ref=lesson_desc",
    text: "F8 Official",
  },
};

const cx = classNames.bind(styles);

// Component con cho Document Viewer - Memo hóa
const DocumentViewer = memo(({ docID }) => (
  <iframe
    title="document-viewer"
    className={cx("doc-view")}
    src={`https://docs.google.com/document/d/${docID}/preview`}
  />
));

// Component chính
const Document = memo(({ currentLesson }) => {
  const userID = Cookies.get("userID");
  const { slug } = useParams();

  // Gửi yêu cầu hoàn thành bài học sau 10 giây nếu chưa hoàn thành
  useEffect(() => {
    const finishLesson = async () => {
      try {
        await axiosClient.post("/lesson/finish-lesson", {
          userID,
          slug,
          lessonID: currentLesson._id,
        });
      } catch (error) {
        console.error("Error finishing lesson:", error);
      }
    };

    let timer;
    if (!currentLesson.isCompleted) {
      timer = setTimeout(finishLesson, 10000);
    }

    return () => clearTimeout(timer);
  }, [currentLesson._id, currentLesson.isCompleted, slug, userID]);

  return (
    <div className={cx("main-content")}>
      <DocumentViewer docID={currentLesson.docID} />

      <div className={cx("content")}>
        <div className={cx("content-top")}>
          <header className={cx("description-wrapper")}>
            <h1 className={cx("heading")}>{currentLesson?.title}</h1>
            {/* <p className={cx("update-at")}>Cập nhật gần nhất: {currentLesson?.updatedAt}</p> */}
          </header>

          <a
            className={cx("download")}
            href={`https://drive.google.com/file/d/${currentLesson.docID}/view`}
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon icon={faDownload} /> Tải xuống
          </a>
        </div>

        <div className={cx("content-wrapper")}>
          <p>
            Tham gia nhóm{" "}
            <a
              href={SOCIAL_LINKS.facebook.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {SOCIAL_LINKS.facebook.text}
            </a>{" "}
            trên Facebook để cùng nhau trao đổi trong quá trình học tập ❤️
          </p>
          <p>
            Các bạn subscribe kênh Youtube{" "}
            <a
              href={SOCIAL_LINKS.youtube.url}
              target="_blank"
              rel="noopener noreferrer nofollow"
            >
              {SOCIAL_LINKS.youtube.text}
            </a>{" "}
            để nhận thông báo khi có các bài học mới nhé ❤️
          </p>
        </div>
      </div>

      <div className={cx("content-footer")}>
        Made with <FontAwesomeIcon icon={faHeart} />{" "}
        <span className={cx("dot")}>·</span> Powered by TheKey
      </div>
    </div>
  );
});

export default Document;