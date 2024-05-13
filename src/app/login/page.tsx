"use client";

function loginComponents() {
  const handleLogin = () => {
    // 구글 로그인 화면으로 이동시키기
    window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=zz&scope=openid%20profile%20email&redirect_uri=${process.env.REACT_APP_GOOGLE_REDIRECT_URI }   
    `;
  };
  return <div onClick={handleLogin}>로그인하기</div>;
}
export default loginComponents;
