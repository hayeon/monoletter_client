"use client";

import React, { useEffect, useState } from "react";
import getGoogleData from "./GoogleLogin";

interface GoogleLoginType {
  getUserInfo: (code: string) => Promise<void>;
}

const GoogleLogin: GoogleLoginType = {
  getUserInfo: async (code: string) => {},
};

const LoginComponents = () => {
  useEffect(() => {
    // 컴포넌트가 마운트된 후에 `currentUrl`을 설정
    const currentUrl = window.location.href;
    if (currentUrl.startsWith("http://localhost:3000/?code=")) {
      const urlParams = new URLSearchParams(window.location.search);
      const code = urlParams.get("code");
      if (code) {
        getGoogleData(code);
      }
    }
  }, []);

  const handleLogin = () => {
    window.location.href = '';
  };

  return <div onClick={handleLogin}>로그인하기</div>;
};

export default LoginComponents;
