import { Button, DatePicker, Form, Input, message } from "antd";

import Layout from "components/Layout";
import BackButton from "components/BackButton";
import postData from "utils/postData";
import { DATE_FORMAT } from "constants/form";
import Styles from "styles/form.module.scss";

export default function CreateReception() {
  const [messageApi, contextHolder] = message.useMessage();

  const onFinish = async (values) => {
    const result = await postData("reception", {
      date: values.date.format(DATE_FORMAT),
      venue: values.venue,
      venueAddress: values.venueAddress,
    });
    if (result.error) {
      messageApi.warning(result.errorMessage);
      return;
    }
    messageApi.info("Success Create!");
  };
  return (
    <Layout>
      <BackButton href="/receptions" text="回到 我的婚宴列表" />
      <div className={Styles.container}>
        <h3>新增我的婚宴</h3>
        {contextHolder}
        <Form
          name="createReception"
          onFinish={onFinish}
          autoComplete="off"
          layout="vertical"
        >
          <Form.Item
            label="婚宴日期"
            name="date"
            rules={[
              {
                required: true,
                message: "Please input your username!",
              },
            ]}
          >
            <DatePicker showTime format={DATE_FORMAT} />
          </Form.Item>
          <Form.Item
            label="宴客地點"
            name="venue"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="宴客地址"
            name="venueAddress"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item>
            <Button className={Styles.formButton} block htmlType="submit">
              確認新增
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  );
}
