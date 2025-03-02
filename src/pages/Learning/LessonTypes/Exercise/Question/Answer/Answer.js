import classNames from "classnames/bind";
import styles from "./Answer.module.scss";

const cx = classNames.bind(styles)

const Answer = ({answer, userAnswer, onChooseOption, questionId}) => {
    return (
        <label className={cx('wrapper')}>
            <input
                className={cx('radio')}
                type="radio"
                name={questionId}
                value={answer}
                checked={userAnswer === answer}
                onChange={onChooseOption}
            />
            <p className={cx('answer')}>{answer}</p>
        </label>
    );
};

export default Answer;