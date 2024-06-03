import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, DatePicker, Form, Input, message } from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import Layout from "components/Layout";
import BackButton from "components/BackButton";
import Loading from "components/Loading";
import fetchData from "utils/fetchData";
import postData from "utils/postData";
import { DATE_FORMAT } from "constants/form";
import Styles from "styles/form.module.scss";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function EditReception() {
  const router = useRouter();
  const { id } = router.query;
  const [messageApi, contextHolder] = message.useMessage();
  const [loading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const onFinish = async (values) => {
    const result = await postData(`reception/update/${data._id}`, {
      date: values.date.format("YYYY-MM-DD HH:mm:ss"),
      venue: values.venue,
      venueAddress: values.venueAddress,
    });
    if (result.error) {
      messageApi.warning(result.errorMessage);
      return;
    }
    messageApi.info("Updated!!");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/");
      return;
    }
    if (id) {
      async function getData() {
        const result = await fetchData(`reception/${id}`);
        setIsLoading(false);
        if (result.error) {
          setError(result);
          return;
        }
        setData(result);
      }
      getData();
    }
  }, [id]);

  if (loading) return <Loading />;
  return (
    <Layout>
      <BackButton href="/receptions" text="回到 我的婚宴列表" />
      <div className={Styles.container}>
        <h3>修改婚宴資訊</h3>
        {contextHolder}
        <Form
          name="updateReception"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="婚宴日期"
            name="date"
            initialValue={dayjs.utc(data.date, DATE_FORMAT).tz("Asia/Taipei")}
            rules={[
              {
                required: true,
                message: "請選擇婚宴日期!",
              },
            ]}
          >
            <DatePicker showTime format={DATE_FORMAT} />
          </Form.Item>

          <Form.Item
            label="宴客地點"
            name="venue"
            initialValue={data.venue}
            rules={[
              {
                required: true,
                message: "請輸入宴客地點!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="宴客地址"
            name="venueAddress"
            initialValue={data.venueAddress}
            rules={[
              {
                required: true,
                message: "請輸入宴客地址!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button
              className={Styles.formButton}
              block
              htmlType="submit"
              disabled={error?.error}
            >
              確認修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}
