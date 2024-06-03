import Link from "next/link";
import { LeftOutlined } from "@ant-design/icons";

import Styles from "styles/components.module.scss";

export default function BackButton({ href, text }) {
  return (
    <Link href={href} className={Styles.linkButton}>
      <LeftOutlined />
      {text}
    </Link>
  );
}
