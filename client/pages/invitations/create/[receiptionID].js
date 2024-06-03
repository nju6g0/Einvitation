import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Form, Input, Select, message, Flex, Drawer } from "antd";
import { PictureOutlined, UploadOutlined } from "@ant-design/icons";

import Layout from "components/Layout";
import BackButton from "components/BackButton";
import Loading from "components/Loading";
import { MAX_INVITATION_CONTENT } from "constants/form";
import TEMPLATES from "constants/templates";
import { API_URL } from "constants/domain";
import useImage from "utils/useImage";
import postData from "utils/postData";
import fetchData from "utils/fetchData";
import getTemplate from "utils/getTemplate";
import Styles from "styles/form.module.scss";

export default function CreateInvitation() {
  const router = useRouter();
  const { receiptionID } = router.query;
  const { image, handleUpload, inputRef, handleRemove } = useImage();
  const [messageApi, contextHolder] = message.useMessage();

  const [reception, setReception] = useState({});
  const [avaliableTemplates, setAvaliableTemplates] = useState([]);
  const [uploadImgUrl, setUploadImgUrl] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [formValues, serFormValues] = useState({});

  // TODO: 檢查檔案大小
  // TODO: 檢查檔案類型
  // https://codepen.io/lun0223/pen/vYrrNqv
  const uploadImage = async () => {
    setUploading(true);

    const formData = new FormData();
    formData.append("uploadedImage", image.file, image.name);
    try {
      const response = await fetch(`${API_URL}invitations/uploadImage`, {
        method: "POST",
        headers: {
          Authorization: JSON.parse(localStorage.getItem("token")),
        },
        body: formData,
      });
      const { imgUrl } = await response.json();
      setUploadImgUrl(imgUrl);
    } catch (error) {
      // 錯誤處理 ...
      messageApi.open({
        type: "error",
        content: "Something wrong, try later...",
      });
    } finally {
      setUploading(false);
    }
  };

  const handlePreView = () => {
    if (!formValues.template) {
      messageApi.warning("請先選擇樣版");
      return;
    }
    setOpenDrawer(true);
  };

  const handleSubmit = async (values) => {
    if (isLoading || uploading) return;
    if (!uploadImgUrl) {
      messageApi.warning("你還沒有上傳圖片");
      return;
    }
    const result = await postData(`invitations/create/${receiptionID}`, {
      reciever: values.reciever,
      content: values.content,
      imageUrl: uploadImgUrl,
    });
    if (result.error) {
      messageApi.error(result.errorMessage);
      return;
    }
    messageApi.info("Success Create!");
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/");
      return;
    }
    return () => {
      handleRemove();
    };
  }, []);

  useEffect(() => {
    if (receiptionID) {
      async function getTemplatePlan() {
        const result = await fetchData(`reception/${receiptionID}`);
        setIsLoading(false);
        if (result.error) {
          messageApi.warning(result.message);
          return;
        }
        const templates = result.plan.reduce(
          (acc, curr) => [...acc, ...TEMPLATES[curr]],
          []
        );
        setReception(result);
        setAvaliableTemplates(templates);
      }
      getTemplatePlan();
    }
  }, [receiptionID]);

  if (isLoading) return <Loading />;
  return (
    <Layout>
      {contextHolder}
      <BackButton
        href={`/invitations/${receiptionID}`}
        text="回到 我的喜帖列表"
      />
      <div className={Styles.container}>
        <h3>新增喜帖</h3>
        <div className={Styles.upload}>
          {image && (
            <img
              className={Styles.thumbnail}
              src={image.url}
              alt="upload image"
            />
          )}
          <div>
            <label htmlFor="file-input">
              <input
                className={Styles.hideInput}
                ref={inputRef}
                type="file"
                id="file-input"
                accept="image/*"
                onChange={handleUpload}
              />
              <span className={Styles.uploadInput}>
                <PictureOutlined />
                <p>選擇圖片</p>
              </span>
            </label>
            <Button
              className={Styles.uploadBtn}
              block
              onClick={uploadImage}
              disabled={uploading || !image}
            >
              <UploadOutlined />
              <p>上傳圖片</p>
            </Button>
          </div>
        </div>
        <Form
          name="createInvitation"
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
            rules={[{ max: 10, message: "最多10字" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="想跟他/她說…"
            name="content"
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
          <Form.Item label="選擇樣版" name="template">
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
                onClick={handlePreView}
              >
                預覽
              </Button>
              <Button
                block
                className={Styles.formButton}
                htmlType="submit"
                disabled={!receiptionID || uploading || isLoading}
              >
                確定新增
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
          {getTemplate(formValues.template, {
            ...formValues,
            ...reception,
            imageUrl: image?.url,
          })}
        </div>
      </Drawer>
    </Layout>
  );
}
