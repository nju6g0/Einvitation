import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Space, Table, message } from "antd";

import Layout from "components/Layout";
import { formatDate, formatTime } from "utils/formatDate";
import fetchData from "utils/fetchData";

const columns = [
  {
    title: "_id",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "date",
    dataIndex: "date",
    key: "date",
    render: (date) => (
      <span>
        {formatDate(date)}&nbsp;{formatTime(date)}
      </span>
    ),
  },
  {
    title: "Venue",
    dataIndex: "venue",
    key: "venue",
  },
  {
    title: "Venue Address",
    dataIndex: "venueAddress",
    key: "venueAddress",
  },
  {
    title: "availableQuantity",
    dataIndex: "availableQuantity",
    key: "availableQuantity",
  },
  {
    title: "Plan",
    dataIndex: "plan",
    key: "plan",
  },
  {
    title: "Action",
    key: "action",
    render: (_, item) => (
      <Space size="middle">
        <Link href={`/admin/updateReception/${item._id}`}>edit</Link>
      </Space>
    ),
  },
];

export default function UserReceptions() {
  const router = useRouter();
  const { id } = router.query;

  const [receptions, setReceptions] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined" && id) {
      async function getUserList() {
        const result = await fetchData(`admin/userReceptions/${id}`);
        if (result.error) {
          router.replace("/");
          return;
        }
        setReceptions(result);
      }
      getUserList();
    }
  }, [id]);

  return (
    <Layout>
      <h1>admin 頁面</h1>
      <h2>User Receptions 列表</h2>
      <p>user id: {id}</p>
      <Table columns={columns} dataSource={receptions} />
    </Layout>
  );
}
