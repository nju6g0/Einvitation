import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { Row, Col, Flex } from "antd";
import {
  PlusOutlined,
  CalendarOutlined,
  EnvironmentOutlined,
  LinkOutlined,
  EditOutlined,
} from "@ant-design/icons";

import Layout from "components/Layout";
import Loading from "components/Loading";
import fetchData from "utils/fetchData";
import Error from "components/Error";
import { formatDate, formatTime } from "utils/formatDate";
import Styles from "styles/reception.module.scss";
import FormStyles from "styles/form.module.scss";

export default function Receptions() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(true);
  const [availableQuantity, setAvailableQuantity] = useState(2);
  const [receptionList, setReceptionList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      router.replace("/");
      return;
    }
    async function getData() {
      const result = await fetchData("reception");
      setIsLoading(false);
      if (result.error) {
        setError(result);
        return;
      }
      setReceptionList(result.receptionList);
      setAvailableQuantity(result.availableQuantity);
    }
    getData();
  }, []);

  if (isLoading) return <Loading />;
  if (error)
    return <Error statusCode={error.statusCode} message={error.errorMessage} />;

  return (
    <Layout>
      <div className={Styles.wrap}>
        <div className={FormStyles.head}>
          <h1>我的婚宴</h1>
          {receptionList.length < availableQuantity && (
            <Link href={`/receptions/create`}>
              <PlusOutlined />
              新增
            </Link>
          )}
        </div>
        <div className={Styles.container}>
          <div>
            {receptionList.map(({ _id, date, venue, venueAddress }) => (
              <div key={_id} className={Styles.card}>
                <Row>
                  <Col className={Styles.icon} span={3}>
                    <CalendarOutlined />
                  </Col>
                  <Col className={Styles.date}>{formatDate(date)}</Col>
                </Row>
                <Row>
                  <Col span={3} />
                  <Col className={Styles.date}>{formatTime(date)}</Col>
                </Row>
                <Row>
                  <Col className={Styles.icon} span={3}>
                    <EnvironmentOutlined />
                  </Col>
                  <Col className={Styles.text}>{venue}</Col>
                </Row>
                <Row>
                  <Col span={3} />
                  <Col>{venueAddress}</Col>
                </Row>
                <Flex className={Styles.footer} justify="space-between">
                  <Link href={`/invitations/${_id}`} className={Styles.link}>
                    <LinkOutlined />
                    看看我的喜帖
                  </Link>
                  <Link
                    href={`/receptions/update/${_id}`}
                    className={Styles.edit}
                  >
                    <EditOutlined />
                    修改
                  </Link>
                </Flex>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
