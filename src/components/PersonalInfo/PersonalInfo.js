import React from "react";
import classNames from "classnames/bind";
import styles from "./PersonalInfo.module.scss";
import {useSelector} from "react-redux";

const cx = classNames.bind(styles);


const PersonalInfo = () => {
    // const [activeModal, setActiveModal] = useState(null);
    const user = useSelector((state) => state.user);
    // const [modalData, setModalData] = useState({title: "", value: ""});

    const userInfo = [
        {label: "Email", value: user.email, modal: "name"},
        {label: "Tên người dùng", value: user.username, modal: "username"},
        // {label: "Giới thiệu", value: "Chưa cập nhật", modal: "introduce"},
        {label: "Ảnh đại diện", value: <img loading="lazy" src={user.avatar} alt=""/>, modal: "image"},
    ];

    // const openModal = (modalType, title, value) => {
    //     setActiveModal(modalType);
    //     setModalData({title, value});
    // };
    //
    // const closeModal = () => {
    //     setActiveModal(null);
    // };

    return (
        <div className={cx("content")}>
            <h2>Thông tin cá nhân</h2>
            <p>Quản lý thông tin cá nhân của bạn.</p>

            <div className={cx("wrapper_info")}>
                <h3>Thông tin cơ bản</h3>
                <p>Quản lý tên hiển thị, tên người dùng, bio và avatar của bạn.</p>
                <div className={cx("info-container")}>
                    <div className={cx("info-list")}>
                        {userInfo.map((item, index) => (
                            <div
                                key={index}
                                className={cx("info-item")}
                                // onClick={() => openModal(item.modal, `Chỉnh sửa ${item.label}`, item.value)}
                            >
                                <div className={cx("info-text")}>
                                    <span className={cx("info-label")}>{item.label}</span>
                                    <span className={cx("info-value")}>{item.value}</span>
                                </div>
                                <span className={cx("icon")}>
                                    <svg
                                        aria-hidden="true"
                                        focusable="false"
                                        data-prefix="fas"
                                        data-icon="chevron-right"
                                        className="svg-inline--fa fa-chevron-right"
                                        role="img"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 320 512"
                                        width="16"
                                        height="16"
                                    >
                                        <path
                                            fill="currentColor"
                                            d="M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"
                                        ></path>
                                    </svg>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Hiển thị modal tương ứng */}
            {/*{activeModal === "name" && (*/}
            {/*    <ReusableModal*/}
            {/*        isOpen={true}*/}
            {/*        // onClose={closeModal}*/}
            {/*        title={modalData.title}*/}
            {/*        value={modalData.value}*/}
            {/*        // onSave={(val) => {*/}
            {/*        //     closeModal();*/}
            {/*        // }}*/}
            {/*    />*/}
            {/*)}*/}
            {/*{activeModal === "username" && (*/}
            {/*    <UserNameModal*/}
            {/*        isOpen={true}*/}
            {/*        // onClose={closeModal}*/}
            {/*        title={modalData.title}*/}
            {/*        value={modalData.value}*/}
            {/*        // onSave={(val) => {*/}
            {/*        //     closeModal();*/}
            {/*        // }}*/}
            {/*    />*/}
            {/*)}*/}
            {/*{activeModal === "introduce" && (*/}
            {/*    <IntroduceModal*/}
            {/*        isOpen={true}*/}
            {/*        // onClose={closeModal}*/}
            {/*        title={modalData.title}*/}
            {/*        value={modalData.value}*/}
            {/*        // onSave={(val) => {*/}
            {/*        //     closeModal();*/}
            {/*        // }}*/}
            {/*    />*/}
            {/*)}*/}
            {/*{activeModal === "image" && (*/}
            {/*    <ImageModal*/}
            {/*        isOpen={true}*/}
            {/*        // onClose={closeModal}*/}
            {/*        title={modalData.title}*/}
            {/*        value={modalData.value}*/}
            {/*        // onSave={(val) => {*/}
            {/*        //     closeModal();*/}
            {/*        // }}*/}
            {/*    />*/}
            {/*)}*/}
        </div>
    );
};

export default PersonalInfo;
