import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faDownload, faHeart} from "@fortawesome/free-solid-svg-icons";
import classNames from "classnames/bind";

import styles from "./Document.module.scss";
import React, {memo} from "react";

const cx = classNames.bind(styles)

const Document = ({currentLesson}) => {

    const DocumentViewer = () => (
        <iframe
            title={'document-viewer'}
            className={cx('doc-view')}
            src={`https://docs.google.com/document/d/${currentLesson.fileID}/preview`}
        />
    )

    return (
        <div className={cx('main-content')}>
            <DocumentViewer/>

            <div className={cx('content')}>
                <div className={cx('content-top')}>
                    <header className={cx('description-wrapper')}>
                        <h1 className={cx('heading')}>{currentLesson?.title}</h1>
                        <p className={cx('update-at')}>Cập nhật gần nhất: {currentLesson?.updatedAt}</p>

                    </header>

                    <a
                        className={cx('download')}
                        href={`https://drive.google.com/file/d/${currentLesson.fileID}/view`}
                        target={'_blank'}
                        rel="noreferrer">
                        <FontAwesomeIcon icon={faDownload}/>Tải xuống
                    </a>
                    {/*<button className={cx('notes')}>Ghi chú</button>*/}
                </div>

                <div className={cx('content-wrapper')}>
                    <p>Tham gia nhóm <a rel="noopener noreferrer nofollow" target="_blank"
                                        href="https://www.facebook.com/groups/f8official/">Học lập trình tại
                        F8</a> trên Facebook để cùng nhau trao đổi trong quá trình học tập ❤️
                    </p>
                    <p>Các bạn subscribe kênh Youtube <a rel="noopener noreferrer nofollow" target="_blank"
                                                         href="https://url.mycv.vn/f8_youtube?ref=lesson_desc">F8
                        Official</a> để nhận thông báo khi có các bài học mới nhé ❤️</p>
                </div>
            </div>

            <div className={cx('content-footer')}>
                Made with <FontAwesomeIcon icon={faHeart}/> <span className={cx('dot')}>·</span> Powered by TheKey
            </div>
        </div>
    );
};

export default memo(Document);