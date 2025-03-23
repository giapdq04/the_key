import React, { useState, useEffect, useRef } from "react";
import classNames from "classnames/bind";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeadset } from "@fortawesome/free-solid-svg-icons";
import { GoogleGenerativeAI } from "@google/generative-ai";
import styles from "./ChatContent.module.scss";

const cx = classNames.bind(styles);

// Khởi tạo Gemini API (Lưu ý: Không an toàn khi để API key ở đây)
const genAI = new GoogleGenerativeAI("AIzaSyDzFdkF-qTS_s-EiqeOgtKq_VfC0RsRBJs"); // API key của bạn
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Hoặc "gemini-pro" nếu cần

const ChatContent = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Chào bạn! Mình là trợ lý học tập trực tuyến. Mình có thể giúp gì cho bạn hôm nay?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const chatBodyRef = useRef(null);

  // Lưu lịch sử trò chuyện vào localStorage
  useEffect(() => {
    const savedMessages = localStorage.getItem("chatMessages");
    if (savedMessages) {
      setMessages(JSON.parse(savedMessages));
    } else {
      setMessages([
        {
          sender: "bot",
          text: "Chào bạn! Mình là trợ lý học tập trực tuyến. Mình có thể giúp gì cho bạn hôm nay?",
        },
      ]);
    }
  }, []);

  // Cập nhật localStorage khi messages thay đổi
  useEffect(() => {
    localStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // Tự động cuộn xuống tin nhắn mới
  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  // Gọi Gemini API trực tiếp
  const getBotResponse = async (userMessage) => {
    try {
      setIsLoading(true);

      // Chuẩn bị lịch sử trò chuyện
      const chatHistory = messages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "model",
        parts: [{ text: msg.text }],
      }));

      // Khởi tạo chat với Gemini API
      const chat = model.startChat({
        history: chatHistory,
        generationConfig: {
          maxOutputTokens: 500,
        },
      });

      // Gửi tin nhắn đến Gemini API
      const result = await chat.sendMessage(userMessage);
      const response = await result.response;
      const text = response.text();
      return text;
    } catch (error) {
      console.error("Chi tiết lỗi Gemini API:", error);
      let errorMessage = "Đã có lỗi xảy ra khi gọi Gemini API. Vui lòng thử lại sau.";

      // Kiểm tra loại lỗi cụ thể
      if (error.message.includes("API key not valid")) {
        errorMessage = "API key không hợp lệ. Vui lòng kiểm tra lại API key.";
      } else if (error.message.includes("Quota exceeded")) {
        errorMessage = "Đã vượt quá quota của Gemini API. Vui lòng thử lại sau hoặc kiểm tra quota trong Google Cloud Console.";
      } else if (error.message.includes("CORS")) {
        errorMessage = "Lỗi CORS: Không thể gọi Gemini API trực tiếp từ trình duyệt. Vui lòng sử dụng backend để gọi API.";
      }

      return errorMessage;
    } finally {
      setIsLoading(false);
    }
  };

  // Xử lý gửi tin nhắn
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    // Thêm tin nhắn của người dùng vào danh sách
    const userMessage = { sender: "user", text: message };
    setMessages((prev) => [...prev, userMessage]);

    // Gọi Gemini API để lấy phản hồi
    const botResponse = await getBotResponse(message);
    const botMessage = { sender: "bot", text: botResponse };
    setMessages((prev) => [...prev, botMessage]);

    // Xóa input sau khi gửi
    setMessage("");
  };

  // Xóa lịch sử trò chuyện
  const clearChatHistory = () => {
    setMessages([
      {
        sender: "bot",
        text: "Chào bạn! Mình là trợ lý học tập trực tuyến. Mình có thể giúp gì cho bạn hôm nay?",
      },
    ]);
    localStorage.removeItem("chatMessages");
  };

  return (
    <div className={cx("chat-content")}>
      <div className={cx("chat-header")}>
        <button onClick={clearChatHistory} className={cx("clear-chat-button")}>
          Xóa lịch sử
        </button>
      </div>
      <div className={cx("chat-body")} ref={chatBodyRef}>
        {messages.map((msg, index) => (
          <div
            key={index}
            className={cx("chat-message", {
              "bot-message": msg.sender === "bot",
              "user-message": msg.sender === "user",
            })}
          >
            {msg.sender === "bot" && (
              <span className={cx("bot-icon")}>
                <FontAwesomeIcon icon={faHeadset} />
              </span>
            )}
            <p>{msg.text}</p>
          </div>
        ))}
        {isLoading && (
          <div className={cx("chat-message", "bot-message")}>
            <span className={cx("bot-icon")}>
              <FontAwesomeIcon icon={faHeadset} />
            </span>
            <p>Đang suy nghĩ...</p>
          </div>
        )}
      </div>
      <form className={cx("chat-input")} onSubmit={handleSendMessage}>
        <input
          type="text"
          placeholder="Nhập câu hỏi của bạn..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
        />
        <button type="submit" className={cx("chat-send")} disabled={isLoading}>
          <span>➤</span>
        </button>
      </form>
    </div>
  );
};

export default ChatContent;