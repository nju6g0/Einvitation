import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, Select, message, Drawer, Flex } from "antd";

import Layout from "components/Layout";
import BackButton from "components/BackButton";
import Loading from "components/Loading";
import TEMPLATES from "constants/templates";
import { MAX_INVITATION_CONTENT } from "constants/form";
import fetchData from "utils/fetchData";
import postData from "utils/postData";
import getTemplate from "utils/getTemplate";
import Styles from "styles/form.module.scss";

export default function UpdateInvitation() {
  const router = useRouter();
  const { id } = router.query;
  const [messageApi, contextHolder] = message.useMessage();

  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [avaliableTemplates, setAvaliableTemplates] = useState([]);
  const [reception, setReception] = useState({});
  const [openDrawer, setOpenDrawer] = useState(false);
  const [formValues, serFormValues] = useState({});

  const handlePreview = () => {
    if (!formValues.template && !data.template) {
      messageApi.warning("請先選擇樣版");
      return;
    }
    setOpenDrawer(true);
  };

  const handleSubmit = async (values) => {
    if (isLoading) return;

    const result = await postData(`invitations/update/${id}`, {
      reciever: values.reciever,
      content: values.content,
      template: values.template,
    });
    if (result.error) {
      messageApi.error(result.errorMessage);
      return;
    }
    messageApi.info("Updated!");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/");
      return;
    }
  }, []);

  useEffect(() => {
    if (id) {
      async function getData() {
        const result = await fetchData(`invitation/${id}`);
        setIsLoading(false);
        if (result.error) {
          messageApi.warning(result.message);
          return;
        }
        const templates = result.receptionData.plan.reduce(
          (acc, curr) => [...acc, ...TEMPLATES[curr]],
          []
        );
        setData(result.invitationData);
        setReception(result.receptionData);
        setAvaliableTemplates(templates);
      }
      getData();
    }
  }, [id]);

  if (isLoading) return <Loading />;
  return (
    <Layout>
      {contextHolder}
      <BackButton
        href={`/invitations/${data.receptionID}`}
        text="回到 我的喜帖列表"
      />
      <div className={Styles.container}>
        <h1>修改喜帖內容</h1>
        <img className={Styles.thumbnail} src={data.imageUrl} alt="image" />
        <Form
          name="updateInvitation"
          onFinish={handleSubmit}
          autoComplete="off"
          layout="vertical"
          onValuesChange={(values) => {
            serFormValues((prev) => ({
              ...prev,
              ...values,
            }));
          }}
        >
          <Form.Item
            label="這個喜帖是給："
            name="reciever"
            initialValue={data.reciever}
            rules={[{ max: 10, message: "最多10字" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="想跟他/她說…"
            name="content"
            initialValue={data.content}
            rules={[
              {
                max: MAX_INVITATION_CONTENT,
                message: `字數最多${MAX_INVITATION_CONTENT}字`,
              },
            ]}
          >
            <Input.TextArea
              showCount
              maxLength={MAX_INVITATION_CONTENT}
              rows="5"
            />
          </Form.Item>
          <Form.Item
            label="選擇樣版"
            name="template"
            initialValue={data.template}
          >
            <Select>
              {avaliableTemplates.map(({ key, value }) => (
                <Select.Option key={key} value={value}>
                  {value}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item>
            <Flex>
              <Button
                block
                className={Styles.formButtonScondary}
                onClick={handlePreview}
              >
                預覽
              </Button>
              <Button
                block
                className={Styles.formButton}
                htmlType="submit"
                disabled={isLoading}
              >
                確認修改
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </div>
      <Drawer
        title="預覽喜帖"
        width={"95%"}
        onClose={() => {
          setOpenDrawer(false);
        }}
        open={openDrawer}
      >
        <div className={Styles.preView}>
          {getTemplate(formValues.template || data.template, {
            ...reception,
            ...data,
            ...formValues,
          })}
        </div>
      </Drawer>
    </Layout>
  );
}
