import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";

import { formatDate, formatTime } from "utils/formatDate";
import Styles from "styles/templatesB.module.scss";

export default function TemplateB02({
  date,
  venue,
  venueAddress,
  reciever,
  content,
  imageUrl,
}) {
  return (
    <div className={Styles.B02}>
      <div>
        <div className={Styles.content}>
          <p>Dear {reciever}</p>
          <p>{content}</p>
        </div>
        <div className={Styles.info}>
          <p>
            <CalendarOutlined />
            &nbsp;
            {formatDate(date)}&nbsp;{formatTime(date)}
          </p>
          <p>
            <EnvironmentOutlined />
            &nbsp;
            {venue}
          </p>
          <p>{venueAddress}</p>
        </div>
      </div>
      <div>
        <div className={Styles.imageBox}>
          <img src={imageUrl} alt="" />
        </div>
        <div className={Styles.welcome}>
          <p>Welcome</p>
          <p>誠摯邀請</p>
        </div>
      </div>
    </div>
  );
}
