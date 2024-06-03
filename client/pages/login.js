import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Image from "next/image";
import { Input, Button, Typography, Space } from "antd";
import { LoginOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import Layout from "components/Layout";
import postData from "utils/postData";
import { validateEmail, validatePassword } from "utils/validations";
import GoogleImg from "public/google_color.svg";
import Styles from "styles/login.module.scss";

const { Text } = Typography;

function Login() {
  const router = useRouter();

  const [email, setEmail] = useState({
    value: "",
    errMessage: null,
  });
  const [password, setPassword] = useState({
    value: "",
    errMessage: null,
  });
  const [postError, setPostError] = useState(null);

  const handleEmail = (e) => {
    const value = e.target.value.trim();
    setEmail(() => ({
      value,
      errMessage: !validateEmail(value) && "請輸入有效 email",
    }));
    setPostError(null);
  };
  const handlePassword = (e) => {
    const value = e.target.value.trim();
    setPassword(() => ({
      value,
      errMessage: !validatePassword(value) && "密碼長度需大於8碼",
    }));
    setPostError(null);
  };

  const handleSubmit = async () => {
    if (!validateEmail(email.value)) {
      setEmail((preState) => ({
        ...preState,
        errMessage: "請輸入有效 email",
      }));
      return;
    }
    if (!validatePassword(password.value)) {
      setPassword((preState) => ({
        ...preState,
        errMessage: "密碼長度需大於6碼",
      }));
      return;
    }

    const result = await postData("auth/login", {
      email: email.value,
      password: password.value,
    });

    if (result.error) {
      setPostError(result.errorMessage);
      return;
    }

    localStorage.setItem("token", JSON.stringify(result.token));
    localStorage.setItem("user", JSON.stringify(result.userData));
    router.replace("/receptions");
  };

  return (
    <Layout>
      <div className={Styles.container}>
        <div>
          <div className={Styles.cover}>
            <img
              src="https://firebasestorage.googleapis.com/v0/b/einvitation-421803.appspot.com/o/images%2Flogin_cover.webp?alt=media&token=f9eae177-1f81-4874-a15f-6d2c14ecdf6a"
              alt=""
            />
          </div>
          <div className={Styles.form}>
            <div>
              <h1 className={Styles.title}>LOGIN</h1>
              <p>
                還沒有帳號？前往
                <Link href={`/signup`} className={Styles.registerBtn}>
                  註冊
                </Link>
              </p>
              <Space direction="vertical">
                {postError && (
                  <Space>
                    <ExclamationCircleOutlined style={{ color: "red" }} />
                    <Text type="danger">{postError}</Text>
                  </Space>
                )}
                <Text type="danger">{email.errMessage}</Text>
                <Input
                  placeholder="email"
                  value={email.value}
                  status={email.errMessage ? "error" : null}
                  prefix={
                    email.errMessage ? <ExclamationCircleOutlined /> : <span />
                  }
                  onChange={handleEmail}
                  autoComplete="off"
                />
                <Text type="danger">{password.errMessage}</Text>
                <Input.Password
                  placeholder="password"
                  value={password.value}
                  status={password.errMessage ? "error" : null}
                  prefix={
                    password.errMessage ? (
                      <ExclamationCircleOutlined />
                    ) : (
                      <span />
                    )
                  }
                  onChange={handlePassword}
                />
                <Button
                  block
                  disabled={email.errMessage || password.errMessage}
                  icon={<LoginOutlined />}
                  onClick={handleSubmit}
                >
                  登入
                </Button>
              </Space>
              <a
                href={`${process.env.NEXT_PUBLIC_API_HOST}auth/google`}
                className={Styles.googleBtn}
              >
                <Image src={GoogleImg} alt="google login" />
                <p>使用 google 登入</p>
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default Login;
