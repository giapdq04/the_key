import React, { useState } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import styles from "./CustomModal.module.scss";
import ReportIssueModal from "../../components/ReportIssueModal/ReportIssueModal.js"; // Import modal báo cáo

const cx = classNames.bind(styles);

const CustomModal = ({ isShow, onClose, children, title }) => {
  const [isShowReportModal, setIsShowReportModal] = useState(false); // State để điều khiển modal báo cáo

  if (!isShow) return null;

  return (
    <>
      <div className={cx("modal")}>
        {title && (
          <div className={cx("modal-header")}>
            <div className={cx("wrap_title")}>
              <FontAwesomeIcon icon={faHeadset} style={{ marginRight: 3 }} />
              <h3>{title}</h3>
            </div>
            <div className={cx("wrap_title")}>
              <FontAwesomeIcon
                icon={faTriangleExclamation}
                style={{ marginRight: 25, cursor: "pointer" }}
                onClick={() => setIsShowReportModal(true)} // Mở modal báo cáo
              />
              <button onClick={onClose} className={cx("modal-close")}>
                <span>×</span>
              </button>
            </div>
          </div>
        )}
        <div className={cx("modal-body")}>{children}</div>
      </div>
      <ReportIssueModal
        isShow={isShowReportModal}
        onClose={() => setIsShowReportModal(false)}
      />
    </>
  );
};

export default CustomModal;