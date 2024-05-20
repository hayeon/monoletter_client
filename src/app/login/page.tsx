"use client";

import React from "react";

const LoginComponents = () => {
  const handleLogin = () => {
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${process.env.google_id}&scope=openid%20profile%20email&redirect_uri=http://localhost:3000`;
  };

  return <div onClick={handleLogin}>로그인하기</div>;
};

export default LoginComponents;
