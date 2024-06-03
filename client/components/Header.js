import Link from "next/link";
import { useRouter } from "next/router";
import { Flex, Space, Tooltip } from "antd";
import { LogoutOutlined, UserOutlined } from "@ant-design/icons";

import Logo from "./Logo";
import Styles from "styles/header.module.scss";

export default function Header() {
  const router = useRouter();

  const handleLogout = () => {
    if (typeof window !== "undefined") {
      localStorage?.removeItem("token");
      localStorage?.removeItem("user");
      router.replace("/");
    }
  };

  const isLogin =
    typeof window !== "undefined" && localStorage.getItem("token");
  return (
    <div className={Styles.wrap}>
      <div className={Styles.container}>
        <span />
        <Link href="/">
          <Logo />
        </Link>
        {isLogin ? (
          <div className={Styles.logout}>
            <Link className={Styles.user} href="/receptions">
              <UserOutlined className={Styles.icon} />
            </Link>
            <div onClick={handleLogout}>
              <Tooltip placement="bottom" title="log out">
                <LogoutOutlined className={Styles.icon} />
              </Tooltip>
            </div>
          </div>
        ) : (
          <Space>
            <Link href="/login">LOGIN</Link>
            <span>/</span>
            <Link href="/signup">SIGNUP</Link>
          </Space>
        )}
      </div>
    </div>
  );
}
