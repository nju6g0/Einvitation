import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { message } from "antd";
import {
  PlusOutlined,
  InfoCircleOutlined,
  EditOutlined,
} from "@ant-design/icons";

import BackButton from "components/BackButton";
import Layout from "components/Layout";
import Error from "components/Error";
import Loading from "components/Loading";
import fetchData from "utils/fetchData";
import { formatDate, formatTime } from "utils/formatDate";
import Styles from "styles/invitations.module.scss";
import FormStyles from "styles/form.module.scss";

export default function Ivitations() {
  const router = useRouter();
  const { receptionID } = router.query;
  const [messageApi, contextHolder] = message.useMessage();

  const [loading, setIsLoading] = useState(true);
  const [invitationList, setInvitationList] = useState([]);
  const [receptionInfo, setReceptionInfo] = useState({});
  const [error, setError] = useState(null);

  const handleCopy = (url) => {
    navigator.clipboard.writeText(url);
    messageApi.info("Copied!");
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/");
      return;
    }
    if (receptionID) {
      async function getData() {
        const result = await fetchData(`invitations/${receptionID}`);
        setIsLoading(false);
        if (result.error) {
          setError(result);
          return;
        }
        setInvitationList(result.invitationList);
        setReceptionInfo(result.receptionInfo);
      }
      getData();
    }
  }, [receptionID]);

  if (loading) return <Loading />;
  if (error)
    return <Error statusCode={error.statusCode} message={error.errorMessage} />;
  return (
    <Layout>
      {contextHolder}
      <BackButton href="/receptions" text="回到 我的婚宴列表" />
      <div className={FormStyles.head}>
        <h1>我的喜帖</h1>
        {invitationList.length < receptionInfo.availableQuantity ? (
          <Link href={`/invitations/create/${receptionID}`}>
            <PlusOutlined />
            新增
          </Link>
        ) : (
          <p className={FormStyles.hint}>
            <InfoCircleOutlined />
            你的喜帖已達到上限，如需建立更多的喜帖請
            <a href="mailto:nju6g0@gmail.com">與我們聯絡</a>
          </p>
        )}
      </div>
      <div className={Styles.container}>
        <div className={Styles.list}>
          {invitationList.map(
            ({
              _id,
              content,
              imageUrl,
              reciever,
              isAttend,
              attendantCount,
            }) => (
              <div key={_id} className={Styles.card}>
                <Link className={Styles.thumbnail} href={`/invitation/${_id}`}>
                  <img src={imageUrl} />
                  <span>去看看</span>
                </Link>
                <div>
                  <p className={Styles.reciever}>{reciever}</p>
                  <p className={Styles.content}>{content}</p>
                  <p className={Styles.footer}>
                    <div>
                      <span>
                        是否出席：
                        {typeof isAttend === "boolean"
                          ? isAttend
                            ? "是"
                            : "否"
                          : "未回覆"}
                      </span>
                      <br />
                      <span>出席人數:{attendantCount}</span>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          handleCopy(
                            `${process.env.NEXT_PUBLIC_HOST}invitation/${_id}`
                          );
                        }}
                      >
                        複製網址
                      </button>
                      <Link href={`/invitations/update/${_id}`}>
                        <EditOutlined />
                        &nbsp;修改
                      </Link>
                    </div>
                  </p>
                </div>
              </div>
            )
          )}
        </div>
        <div className={Styles.info}>
          <div>
            <p>{formatDate(receptionInfo.date)}</p>
            <p>{formatTime(receptionInfo.date)}</p>
            <p>{receptionInfo.venue}</p>
            <p>{receptionInfo.venueAddress}</p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
