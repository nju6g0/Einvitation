import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";

import { formatDate, formatTime } from "utils/formatDate";
import Styles from "styles/templatesB.module.scss";

export default function TemplateB01({
  date,
  venue,
  venueAddress,
  reciever,
  content,
  imageUrl,
}) {
  return (
    <div className={Styles.B01}>
      <div
        className={Styles.thumbnail}
        style={{ backgroundImage: `url('${imageUrl}')` }}
      >
        <div className={Styles.content}>
          <p>Dear {reciever}</p>
          <p>{content}</p>
        </div>
        <p className={Styles.slogan}>誠摯邀請</p>
      </div>
      <div className={Styles.info}>
        <p>
          <CalendarOutlined />
          {formatDate(date)}&nbsp; {formatTime(date)}
        </p>
        <p>
          <EnvironmentOutlined />
          {venue}
        </p>
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{venueAddress}</p>
        <p></p>
        <p></p>
      </div>
    </div>
  );
}
