import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Button, Form, Input, Space, Typography } from "antd";
import { LoginOutlined, ExclamationCircleOutlined } from "@ant-design/icons";

import Layout from "components/Layout";
import postData from "utils/postData";
import Styles from "styles/signup.module.scss";

const { Text } = Typography;

export default function Signup() {
  const router = useRouter();
  const [postError, setPostError] = useState(null);

  const onFinish = async (values) => {
    const { email, password, username } = values;
    const result = await postData("auth/register", {
      username,
      email,
      password,
    });
    if (result.error) {
      setPostError(result.errorMessage);
      return;
    }

    router.replace("/login");
  };
  return (
    <Layout>
      <div className={Styles.container}>
        <div>
          <h1>SIGNUP</h1>
          <p>
            已經有帳號？前往
            <Link href={`/login`} className={Styles.registerBtn}>
              登入
            </Link>
          </p>
          {postError && (
            <Space>
              <ExclamationCircleOutlined style={{ color: "red" }} />
              <Text type="danger">{postError}</Text>
            </Space>
          )}
          <br />
          <div className={Styles.form}>
            <Form
              name="register"
              onFinish={onFinish}
              autoComplete="off"
              layout="vertical"
            >
              <Form.Item
                label="Username"
                name="username"
                rules={[
                  {
                    required: true,
                    message: "Please input your username!",
                  },
                  { max: 60, message: "使用者名稱不可超過60個字" },
                  { min: 2 },
                  { whitespace: true },
                ]}
                autoComplete="off"
              >
                <Input autoComplete="off" />
              </Form.Item>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    required: true,
                    message: "Please input your email!",
                  },
                  {
                    type: "email",
                    message: "請輸入有效 email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="Password"
                name="password"
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  { min: 6, message: "密碼長度必須大於 6 碼" },
                  {
                    validator: (_, value) =>
                      !value.includes(" ")
                        ? Promise.resolve()
                        : Promise.reject(new Error("No spaces allowed")),
                  },
                ]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item>
                <Button block htmlType="submit" icon={<LoginOutlined />}>
                  Sign Up
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </div>
    </Layout>
  );
}
