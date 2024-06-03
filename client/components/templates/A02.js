import { CalendarOutlined, EnvironmentOutlined } from "@ant-design/icons";

import { formatDate, formatTime } from "utils/formatDate";
import Styles from "styles/templatesA.module.scss";

export default function TemplateA02({
  date,
  venue,
  venueAddress,
  reciever,
  content,
  imageUrl,
}) {
  return (
    <div className={Styles.A02}>
      <div className={Styles.content}>
        <p>Dear {reciever}</p>
        <p>{content}</p>
      </div>
      <div className={Styles.info}>
        <p>
          <CalendarOutlined />
          &nbsp;&nbsp;
          {formatDate(date)}
          &nbsp;&nbsp;
          {formatTime(date)}
        </p>
        <br />
        <p>
          <EnvironmentOutlined />
          &nbsp;&nbsp;
          {venue}
        </p>
        <br />
        <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{venueAddress}</p>
        {/* <a
          href={`https://www.google.com/maps/place/${venueAddress}`}
          target="_blank"
        >
          <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{venueAddress}</p>
        </a> */}
      </div>
      <div className={Styles.thumbnail}>
        <img src={imageUrl} alt="" />
      </div>
    </div>
  );
}
