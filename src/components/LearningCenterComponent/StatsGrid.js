"use client"

import { useRef, useEffect } from "react"
import { BookOpenIcon, ActivityIcon, AwardIcon } from "../../components/icon"
import { Card, CardContent } from "../../components/ui/card/card"
import classNames from "classnames/bind"
import styles from "./StatsGrid.module.scss"
import Lottie from "lottie-web"
import flameStreakData from "../../assets/lottie/flamestrek.json"; // Đường dẫn đến file của bạn
const cx = classNames.bind(styles)

const StatsGrid = ({ stats }) => {
  const flameRef = useRef(null)

  useEffect(() => {
    // Khởi tạo animation Lottie khi component được mount
    if (flameRef.current) {
      const animation = Lottie.loadAnimation({
        container: flameRef.current,
        renderer: "svg",
        loop: true,
        autoplay: true,
      animationData:flameStreakData, // Đường dẫn đến file Lottie
        // Nếu bạn đã import file trực tiếp, thay thế bằng:
        // animationData: flameStreakData,
      })

      // Cleanup khi component unmount
      return () => animation.destroy()
    }
  }, [])

  return (
    <div className={cx("stats-grid")}>
      {/* Words Learned Card */}
      <Card className={cx("stat-card", "words-card")}>
        <CardContent className={cx("stat-content")}>
          <div className={cx("stat-visual")}>
            <div className={cx("stat-icon-wrapper", "words-icon")}>
              <BookOpenIcon className={cx("stat-icon")} />
            </div>
            <div className={cx("stat-progress-circle")}>
              <svg viewBox="0 0 100 100" className={cx("progress-ring")}>
                <circle cx="50" cy="50" r="40" className={cx("progress-ring-circle-bg")} />
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  className={cx("progress-ring-circle", "words-progress")}
                  style={{
                    strokeDashoffset: 251.2 - 251.2 * Math.min(stats.wordsLearned / 200, 1),
                  }}
                />
              </svg>
              <div className={cx("stat-value-container")}>
                <p className={cx("stat-value")}>{stats.wordsLearned}</p>
                <p className={cx("stat-max")}>/ 200</p>
              </div>
            </div>
          </div>
          <div className={cx("stat-info")}>
            <p className={cx("stat-label")}>Từ vựng đã học</p>
            <div className={cx("stat-details")}>
              <span className={cx("stat-detail")}>Mục tiêu: 200 từ</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Day Streak Card with Lottie Animation */}
      <Card className={cx("stat-card", "streak-card")}>
        <CardContent className={cx("stat-content")}>
          <div className={cx("stat-visual")}>
            <div className={cx("stat-icon-wrapper", "streak-icon")}>
              <ActivityIcon className={cx("stat-icon")} />
            </div>
            <div className={cx("streak-animation-container")}>
              {/* Container cho Lottie animation */}
              <div ref={flameRef} className={cx("lottie-container")}></div>
              {/* Hiển thị số ngày streak ở trên animation */}
              <div className={cx("streak-value-container")}>
                <p className={cx("stat-value", "streak-value")}>{stats.streak}</p>
              </div>
            </div>
          </div>
          <div className={cx("stat-info")}>
            <p className={cx("stat-label")}>Ngày liên tiếp</p>
            <div className={cx("stat-details")}>
              <span className={cx("stat-detail")}>Kỷ lục: 14 ngày</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Total Points Card */}
      <Card className={cx("stat-card", "points-card")}>
        <CardContent className={cx("stat-content")}>
          <div className={cx("stat-visual")}>
            <div className={cx("stat-icon-wrapper", "points-icon")}>
              <AwardIcon className={cx("stat-icon")} />
            </div>
            <div className={cx("points-stars")}>
              <div className={cx("star-container")}>
                <div className={cx("star", "star-main")} />
                <p className={cx("stat-value", "points-value")}>{stats.totalPoints}</p>
              </div>
              <div className={cx("star", "star-small", "star-1")} />
              <div className={cx("star", "star-small", "star-2")} />
              <div className={cx("star", "star-small", "star-3")} />
            </div>
          </div>
          <div className={cx("stat-info")}>
            <p className={cx("stat-label")}>Tổng điểm</p>
            <div className={cx("stat-details")}>
              <span className={cx("stat-detail")}>Cấp độ: {Math.floor(stats.totalPoints / 500) + 1}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default StatsGrid

