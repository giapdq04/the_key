import React from 'react';
import classNames from 'classnames/bind';
import styles from './Answer.module.scss';

const cx = classNames.bind(styles);

const Answer = ({ questionId, answer, onChooseOption, userAnswer }) => {
    return (
        <label className={cx('answer-item')}>
            <input
                type="radio"
                name={`question-${questionId}`} // Đảm bảo các radio trong cùng câu hỏi không xung đột
                value={answer} // Truyền text của đáp án tạm thời
                onChange={onChooseOption}
                checked={userAnswer === answer} // So sánh với text
            />
            <span>{answer}</span> {/* Hiển thị text của đáp án */}
        </label>
    );
};

export default Answer;