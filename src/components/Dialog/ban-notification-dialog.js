"use client"

import { useState } from "react"
import { AlertTriangle, HelpCircle, Clock, Mail, X } from "lucide-react"
import styles from "./ban-notification-dialog.module.scss"

export default function BanNotificationDialog() {
  const [open, setOpen] = useState(true)
  const [activeAccordion, setActiveAccordion] = useState(null)

  if (!open) return null

  const toggleAccordion = (section) => {
    if (activeAccordion === section) {
      setActiveAccordion(null)
    } else {
      setActiveAccordion(section)
    }
  }

  return (
    <div className={styles.dialogOverlay}>
      <div className={styles.dialogContent}>
        <div className={styles.dialogHeader}>
          <div className={styles.titleContainer}>
            <AlertTriangle className={styles.alertIcon} />
            <h2 className={styles.dialogTitle}>Thông báo: Bạn đã bị cấm truy cập</h2>
          </div>
          <button className={styles.closeButton} onClick={() => setOpen(false)} aria-label="Đóng">
            <X size={18} />
          </button>
        </div>

        <div className={styles.dialogDescription}>🔒 Tài khoản của bạn đã bị tạm khóa</div>

        <div className={styles.separator}></div>

        <div className={styles.dialogBody}>
          <p className={styles.mainMessage}>Xin lỗi, tài khoản của bạn đã bị cấm do vi phạm các điều khoản sử dụng.</p>

          <div className={styles.accordionContainer}>
            {/* Reasons Accordion */}
            <div className={styles.accordionItem}>
              <button
                className={styles.accordionTrigger}
                onClick={() => toggleAccordion("reasons")}
                aria-expanded={activeAccordion === "reasons"}
              >
                <div className={styles.triggerContent}>
                  <HelpCircle size={20} />
                  <span>Lý do có thể dẫn đến việc bị cấm</span>
                </div>
                <span className={`${styles.chevron} ${activeAccordion === "reasons" ? styles.expanded : ""}`}>▼</span>
              </button>

              {activeAccordion === "reasons" && (
                <div className={styles.accordionContent}>
                  <ul className={styles.reasonsList}>
                    <li>Vi phạm quy tắc cộng đồng hoặc chính sách sử dụng.</li>
                    <li>Sử dụng ngôn từ không phù hợp hoặc nội dung không được phép.</li>
                    <li>Có hành vi spam hoặc lạm dụng hệ thống.</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Appeal Accordion */}
            <div className={styles.accordionItem}>
              <button
                className={styles.accordionTrigger}
                onClick={() => toggleAccordion("appeal")}
                aria-expanded={activeAccordion === "appeal"}
              >
                <div className={styles.triggerContent}>
                  <Mail size={20} />
                  <span>Cách khiếu nại</span>
                </div>
                <span className={`${styles.chevron} ${activeAccordion === "appeal" ? styles.expanded : ""}`}>▼</span>
              </button>

              {activeAccordion === "appeal" && (
                <div className={styles.accordionContent}>
                  <p>
                    Nếu bạn nghĩ rằng đây là nhầm lẫn, vui lòng liên hệ với bộ phận hỗ trợ qua email{" "}
                    <a href="mailto:support@example.com" className={styles.link}>
                      support@example.com
                    </a>{" "}
                    hoặc điền vào mẫu đơn khiếu nại tại{" "}
                    <a
                      href="http://www.example.com/ban-appeal"
                      target="_blank"
                      rel="noopener noreferrer"
                      className={styles.link}
                    >
                      www.example.com/ban-appeal
                    </a>
                    .
                  </p>
                </div>
              )}
            </div>

            {/* Timeline Accordion */}
            <div className={styles.accordionItem}>
              <button
                className={styles.accordionTrigger}
                onClick={() => toggleAccordion("timeline")}
                aria-expanded={activeAccordion === "timeline"}
              >
                <div className={styles.triggerContent}>
                  <Clock size={20} />
                  <span>Thời gian xử lý</span>
                </div>
                <span className={`${styles.chevron} ${activeAccordion === "timeline" ? styles.expanded : ""}`}>▼</span>
              </button>

              {activeAccordion === "timeline" && (
                <div className={styles.accordionContent}>
                  <p>
                    Việc xem xét có thể mất từ 24-72 giờ. Nếu tài khoản bị cấm vĩnh viễn, bạn sẽ nhận được thông báo qua
                    email.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        <div className={styles.dialogFooter}>
          <button className={styles.buttonOutline} onClick={() => setOpen(false)}>
            Đóng
          </button>
          <button className={styles.buttonPrimary}>Gửi khiếu nại</button>
        </div>
      </div>
    </div>
  )
}

