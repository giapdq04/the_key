import classNames from "classnames/bind"
import Cookies from "js-cookie"
import {useEffect, useState} from "react"
import axiosClient from "../../../apis/axiosClient"
import {auth, provider, signInWithPopup} from "../../../config/firebase"
import styles from "./LoginModal.module.scss"
import {setShowLoginModal} from "../../../store/showLoginModal";
import {useDispatch, useSelector} from "react-redux";

const cx = classNames.bind(styles)

const LoginModal = () => {
    const [currentSlogan, setCurrentSlogan] = useState(0)
    const dispatch = useDispatch();
    const showLoginModal = useSelector(state => state.showLoginModal)
    const slogans = [
        " Better language, Better Life",
        "Giỏi ngôn ngữ, sáng tương lai",
        "Học sinh nỗ lực, phụ huynh đồng hành, giáo viên tận tâm",
        "TheKey_ Chìa khóa vàng mở thành công",
    ]

    useEffect(() => {
        if (!showLoginModal) return

        const interval = setInterval(() => {
            setCurrentSlogan((prev) => (prev + 1) % slogans.length)
        }, 3000)

        return () => clearInterval(interval)
    }, [showLoginModal, slogans.length])

    if (!showLoginModal) return null

    const onClose = () => {
        dispatch(setShowLoginModal(false));
    }

    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider)
            const user = result.user

            const signInResult = await axiosClient.post(`/auth/login`, {
                username: user.displayName,
                avatar: user.photoURL,
                email: user.email,
            })

            if (signInResult.status === 200) {
                const {userID, accessToken, refreshToken} = signInResult.data
                Cookies.set("userID", userID, {expires: 7})
                Cookies.set("accessToken", accessToken, {expires: 7})
                Cookies.set("refreshToken", refreshToken, {expires: 7})
            }

            onClose()
            window.location.reload()
        } catch (error) {
            console.error("Lỗi đăng nhập Google:", error)
        }
    }

    return (
        <div className={cx("overlay")} onClick={onClose}>
            <div className={cx("modal")} onClick={(e) => e.stopPropagation()}>
                <button className={cx("close-icon")} onClick={onClose}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>
                <div className={cx("modal-container")}>
                    <div className={cx("illustration-side")}>
                        <div className={cx("logo-container")}>
                            <img
                                loading="lazy"
                                src={require('../../../assets/images/thekey_logo.webp')}
                                alt="F8"
                                className={cx("logo")}
                            />
                        </div>
                        <div className={cx("slogan-container")}>
                            <div className={cx("slogan-animation")}>
                                {slogans.map((slogan, index) => (
                                    <div key={index} className={cx("slogan", {active: index === currentSlogan})}>
                                        {slogan}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <img
                            src={require('../../../assets/images/Cover website.webp')}
                            alt="Study illustration"
                            className={cx("study-image")}
                        />
                    </div>
                    <div className={cx("content-side")}>
                        <div className={cx("login-content")}>
                            <h1 className={cx("title")}>Đăng nhập</h1>
                            <p className={cx("subtitle")}>Đăng nhập với tài khoản</p>

                            <div className={cx("auth-buttons")}>
                                <button className={cx("google-btn")} onClick={handleGoogleLogin}>
                                    <img
                                        src="https://cdn3.iconfinder.com/data/icons/logos-brands-3/24/logo_brand_brands_logos_google-1024.png"
                                        alt="Google"
                                    />
                                    <span>Google</span>
                                </button>
                            </div>

                            <p className={cx("modal-desc")}>
                                Mỗi người nên sử dụng riêng một tài khoản, tài khoản nhiều người sử dụng chung sẽ bị
                                khóa.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginModal

