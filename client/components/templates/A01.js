import { HeartOutlined } from "@ant-design/icons";

import { formatDate, formatTime } from "utils/formatDate";
import Styles from "styles/templatesA.module.scss";

export default function TemplateA01({
  date,
  venue,
  venueAddress,
  reciever,
  content,
  imageUrl,
}) {
  return (
    <div className={Styles.A01}>
      <div className={Styles.info}>
        <div>
          <p>
            {formatDate(date)} <br />
            {formatTime(date)}
          </p>
          <p>{venue}</p>
          <p>{venueAddress}</p>
        </div>
        <div>
          <img src={imageUrl} alt="" />
        </div>
        <div>
          <img src={imageUrl} alt="" />
        </div>
        <div>
          <p>Welcome</p>
          <p>
            誠摯
            <br />
            邀請
          </p>
        </div>
      </div>
      <div className={Styles.content}>
        <p>Dear {reciever},</p>
        <p />
        <p>
          <HeartOutlined />
        </p>
        <p>{content}</p>
      </div>
    </div>
  );
}
