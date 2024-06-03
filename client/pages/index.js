import { useRouter } from "next/router";
import Link from "next/link";
import { SwapRightOutlined } from "@ant-design/icons";

import Layout from "components/Layout";
import Styles from "styles/home.module.scss";

export default function Home() {
  const router = useRouter();

  const handleClick = () => {
    if (!localStorage.getItem("token")) {
      router.push("/login");
    } else {
      router.push("/receptions");
    }
  };
  return (
    <Layout full>
      <div className={Styles.wrap}>
        <div>
          <div className={Styles.cover}>
            <h1>
              Custom Your <br />
              Wedding Einvitation
            </h1>
            <p onClick={handleClick}>
              try now <SwapRightOutlined />
            </p>
            <Link href="/templates">去看看 樣版</Link>
          </div>
        </div>
      </div>
    </Layout>
  );
}
