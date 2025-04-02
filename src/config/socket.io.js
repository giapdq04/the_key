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
    
    
    // Thiết lập hàm lắng nghe sự kiện khi kết nối
    // socket.on('connect', () => {
    //     console.log('Socket connected, re-emitting login');
    //     socket.emit('user:login', userID);
    // });
}

// Listener sự kiện user:status để nhận trạng thái người dùng từ server
socket.on('user:status', (data) => {
    console.log('User status update:', data);
    // Bạn có thể dispatch một action Redux ở đây nếu cần
});

// Xử lý đăng xuất
export const emitLogout = () => {
    const userID = Cookies.get('userID');
    if (userID && socket.connected) {
        socket.emit('user:logout', userID);
    }
};

export default socket;