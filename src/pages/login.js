export default function Login() {
    return (
        <main className="login-page">
            <div className="login-form">
                <img src="/img/logo.png" alt="logo" width={150} height={150} />
                <div className="login-input">
                    <input type="text" placeholder="아이디" />
                </div>
                <div className="login-input">
                    <input type="password" placeholder="비밀번호" />
                </div>
                <div className="login-button">로그인</div>
            </div>
        </main>
    );
}
