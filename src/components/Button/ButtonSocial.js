// components/.js
import React, { useState } from "react";

const ButtonSocial = ({ text, href }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "inline-block",
        color: isHovered ? "white" : "#292929",
        border: "2px solid #292929",
        padding: "10px 16px",
        fontSize: "1.5rem",
        fontWeight: "600",
        borderRadius: "999px", // Làm nút bo tròn
        marginTop: "8px",
        transition: "all 0.2s ease-in-out",
        textAlign: "center",
        background: isHovered ? "#292929" : "white", // Đổi màu nền khi hover
        textDecoration: "none",
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {text}
    </a>
  );
};

export default ButtonSocial;
