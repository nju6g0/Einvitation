import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Button,
  Form,
  Input,
  DatePicker,
  message,
  InputNumber,
  Checkbox,
} from "antd";
import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";

import Layout from "components/Layout";
import Loading from "components/Loading";
import { DATE_FORMAT } from "constants/form";
import fetchData from "utils/fetchData";
import postData from "utils/postData";
import Styles from "styles/form.module.scss";

dayjs.extend(utc);
dayjs.extend(timezone);

export default function UpdateReception() {
  const router = useRouter();
  const { id } = router.query;
  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setIsLoading] = useState(true);
  const [userReception, setUserReception] = useState({});

  const onFinish = async (values) => {
    const result = await postData(`admin/updateUserReception/${id}`, {
      date: values.date.format("YYYY-MM-DD HH:mm:ss"),
      venue: values.venue,
      venueAddress: values.venueAddress,
      availableQuantity: values.availableQuantity,
      plan: values.plan,
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
  }, []);

  useEffect(() => {
    if (id) {
      async function getUserReception() {
        const result = await fetchData(`admin/userReception/${id}`);
        setIsLoading(false);
        if (result.error) {
          messageApi.warning(result.message);
          return;
        }
        setUserReception(result);
      }
      getUserReception();
    }
  }, [id]);

  if (isLoading) return <Loading />;
  return (
    <Layout>
      {contextHolder}
      <div className={Styles.container}>
        <h1>Update User Reception</h1>
        <p>Reception id: {id}</p>
        <Form
          name="updateUserReception"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label="婚宴日期"
            name="date"
            initialValue={dayjs
              .utc(userReception.date, DATE_FORMAT)
              .tz("Asia/Taipei")}
          >
            <DatePicker showTime format={DATE_FORMAT} />
          </Form.Item>

          <Form.Item
            label="宴客地點"
            name="venue"
            initialValue={userReception.venue}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="宴客地址"
            name="venueAddress"
            initialValue={userReception.venueAddress}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="可建立喜帖數量"
            name="availableQuantity"
            initialValue={userReception.availableQuantity}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="plan"
            label="擁有的樣版"
            initialValue={userReception.plan}
          >
            <Checkbox.Group>
              <Checkbox value="A" style={{ lineHeight: "32px" }}>
                A
              </Checkbox>
              <Checkbox value="B" style={{ lineHeight: "32px" }}>
                B
              </Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <Form.Item className={Styles.formButton}>
            <Button block htmlType="submit">
              確認修改
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}
