import { useRouter } from "next/router";
import Head from "next/head";
import { Button, Radio, Form, InputNumber, message } from "antd";

import Layout from "components/Layout";
import { TEMPLATE_NAMES } from "constants/templates";
import { API_URL } from "constants/domain";
import postData from "utils/postData";
import getTemplate from "utils/getTemplate";
import Styles from "styles/invitation.module.scss";
import FormStyles from "styles/form.module.scss";

export async function getServerSideProps({ params }) {
  const { id } = params;
  const result = await fetch(`${API_URL}invitation/${id}`);
  const data = await result.json();

  if (data.error) {
    return {
      notFound: true,
    };
  }
  return { props: data };
}

export default function Invitation(props) {
  const [messageApi, contextHolder] = message.useMessage();
  const router = useRouter();
  const { id } = router.query;

  const { invitationData, receptionData } = props;
  const { isAttend, attendantCount, template, reciever, imageUrl } =
    invitationData;

  const handleSubmit = async (values) => {
    const { isAttend, attendantCount } = values;
    if (typeof isAttend !== "boolean") {
      messageApi.warning("請選擇是否出席");
      return;
    }
    if (!isAttend && typeof attendantCount === "number") {
      messageApi.warning("不克出席，請勿填寫出席人數");
      return;
    }
    if (isAttend && typeof attendantCount !== "number") {
      messageApi.warning("請填寫出席人數");
      return;
    }

    const res = await postData(`invitation/updateAttendant/${id}`, {
      isAttend,
      attendantCount,
    });
    if (res.error) {
      messageApi.error(res.errorMessage);
      return;
    }
    messageApi.info("Updated!");
  };

  return (
    <Layout full={template === TEMPLATE_NAMES.B02}>
      {contextHolder}
      <Head>
        <meta property="og:image" content={imageUrl} />
        <title>誠摯邀請{reciever}參與我們的重要時刻</title>
      </Head>
      <div className={Styles.container}>
        {getTemplate(template, { ...receptionData, ...invitationData })}
      </div>
      {typeof isAttend === "boolean" ? (
        <div className={Styles.reply}>
          你已提交出席回覆：
          {isAttend ? `準時前往，出席人數： ${attendantCount} 人` : "不克出席"}
        </div>
      ) : (
        <Form
          className={Styles.form}
          name="basic"
          onFinish={handleSubmit}
          autoComplete="off"
        >
          <p>出席回覆：</p>
          <Form.Item name="isAttend" label="" initialValue={isAttend}>
            <Radio.Group>
              <Radio value={true}>當然！排除萬難，一定到。</Radio>
              <br />
              <Radio value={false}>不克前往，誠摯祝福。</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            label="出席人數"
            name="attendantCount"
            initialValue={attendantCount}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item>
            <Button htmlType="submit" className={FormStyles.formButton}>
              確認送出
            </Button>
          </Form.Item>
        </Form>
      )}
    </Layout>
  );
}
