import Head from "next/head";
import { HeartOutlined } from "@ant-design/icons";

import Header from "./Header";
import Styles from "styles/layout.module.scss";

export default function Layout({ children, full }) {
  return (
    <>
      <Head>
        <meta name="description" content="custom your E-invitation" />
        <meta property="og:title" content="E-invitation" />
        <meta
          property="og:image"
          content="https://firebasestorage.googleapis.com/v0/b/einvitation-421803.appspot.com/o/images%2Fbe5281b6-74da-4749-89b0-bf6e59cb2e6f.png?alt=media&token=5eabba12-ae97-48b0-b8dd-81eeba28116f"
        />
        <meta property="og:description" content="custom your E-invitation" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&family=Josefin+Slab:ital,wght@0,100..700;1,100..700&family=Noto+Sans+TC:wght@100..900&family=Dancing+Script:wght@400..700&family=Ma+Shan+Zheng&family=Playfair+Display:ital,wght@0,400..900;1,400..900&display=swap"
          rel="stylesheet"
        />
        <link
          rel="icon"
          href="https://firebasestorage.googleapis.com/v0/b/einvitation-421803.appspot.com/o/staticImage%2Ffavicon.webp?alt=media&token=b18030af-1b9c-4a0e-b788-0b4021ff65d9"
          type="image/x-icon"
        />
        <link
          rel="shortcut icon"
          href="https://firebasestorage.googleapis.com/v0/b/einvitation-421803.appspot.com/o/staticImage%2Ffavicon.webp?alt=media&token=b18030af-1b9c-4a0e-b788-0b4021ff65d9"
          type="image/x-icon"
        />
        <title>E-invitation</title>
      </Head>
      <div className={Styles.wrap}>
        <Header />
        {full ? (
          <main className={Styles.fullbody}>{children}</main>
        ) : (
          <div className={Styles.container}>
            <main className={Styles.body}>{children}</main>
          </div>
        )}
        <div className={Styles.footer}>
          <HeartOutlined />
          &nbsp;
          {new Date().getFullYear()}&nbsp;/ Thanks for coming.
        </div>
      </div>
    </>
  );
}
