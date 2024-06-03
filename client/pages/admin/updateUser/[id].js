import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, message, InputNumber } from "antd";

import Layout from "components/Layout";
import Loading from "components/Loading";
import fetchData from "utils/fetchData";
import postData from "utils/postData";
import Styles from "styles/form.module.scss";

export default function UpdateUser() {
  const router = useRouter();
  const { id } = router.query;
  const [messageApi, contextHolder] = message.useMessage();

  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const onFinish = async (values) => {
    const result = await postData(`admin/updateUser/${id}`, {
      role: values.role,
      password: values.password,
      availableQuantity: values.availableQuantity,
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
      async function getUser() {
        const result = await fetchData(`admin/user/${id}`);
        setIsLoading(false);
        if (result.error) {
          messageApi.warning(result.message);
          return;
        }
        setUser(result);
      }
      getUser();
    }
  }, [id]);

  if (isLoading) return <Loading />;
  return (
    <Layout>
      {contextHolder}
      <div className={Styles.container}>
        <h1>Update User</h1>
        <p>user id: {id}</p>
        <p>user name: {user.username}</p>
        <Form
          name="updateUserReception"
          layout="vertical"
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item label="role" name="role" initialValue={user.role}>
            <Input />
          </Form.Item>
          <Form.Item label="password" name="password">
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="可建立喜宴數量"
            name="availableQuantity"
            initialValue={user.availableQuantity}
          >
            <InputNumber />
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
