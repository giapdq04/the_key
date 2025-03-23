import React, { useState } from "react";
import classNames from "classnames/bind";
import styles from "./ReportIssueModal.module.scss";

const cx = classNames.bind(styles);

const ReportIssueModal = ({ isShow, onClose }) => {
  const [issueType, setIssueType] = useState("");
  const [issueDescription, setIssueDescription] = useState("");

  if (!isShow) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý gửi báo cáo (có thể gọi API ở đây)
    console.log("Báo cáo:", { issueType, issueDescription });
    onClose(); // Đóng modal sau khi gửi
  };

  return (
    <div className={cx("modal")}>
      <div className={cx("modal-header")}>
        <h3>Báo cáo sự cố</h3>
        <button onClick={onClose} className={cx("modal-close")}>
          <span>×</span>
        </button>
      </div>
      <div className={cx("modal-body")}>
        <form onSubmit={handleSubmit}>
          <div className={cx("form-group")}>
            <label>Loại sự cố</label>
            <select
              value={issueType}
              onChange={(e) => setIssueType(e.target.value)}
              required
            >
              <option value="">Chọn loại sự cố</option>
              <option value="technical">Sự cố kỹ thuật</option>
              <option value="content">Sự cố nội dung</option>
              <option value="other">Sự cố khác</option>
            </select>
          </div>
          <div className={cx("form-group")}>
            <label>Mô tả chi tiết</label>
            <textarea
              placeholder="Mô tả chi tiết sự cố bạn đang gặp phải..."
              value={issueDescription}
              onChange={(e) => setIssueDescription(e.target.value)}
              required
            />
          </div>
          <div className={cx("form-actions")}>
            <button type="button" onClick={onClose} className={cx("cancel-btn")}>
              Hủy
            </button>
            <button type="submit" className={cx("submit-btn")}>
              Gửi báo cáo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ReportIssueModal;