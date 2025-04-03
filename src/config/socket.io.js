import { io } from "socket.io-client";
import Cookies from 'js-cookie';

// Thiết lập kết nối socket với fallback URL nếu biến môi trường không tồn tại
const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:8080', {
    withCredentials: true,
    autoConnect: true, // Kết nối tự động khi khởi tạo
    reconnection: true, // Tự động kết nối lại khi mất kết nối
});

// Emit sự kiện đăng nhập khi có userID
const userID = Cookies.get('userID');
if (userID) {
    socket.emit('user:login', userID);
    console.log('Socket login emitted with userID:', userID);
}

export default socket;