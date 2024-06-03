import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Space, Table, message } from "antd";

import Layout from "components/Layout";
import fetchData from "utils/fetchData";

const columns = [
  {
    title: "_id",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "username",
    dataIndex: "username",
    key: "username",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "availableQuantity",
    dataIndex: "availableQuantity",
    key: "availableQuantity",
  },
  {
    title: "Action",
    key: "action",
    render: (_, item) => (
      <Space size="middle">
        <Link href={`admin/updateUser/${item._id}`}>edit</Link>
        <Link href={`admin/userReception/${item._id}`}>receptions</Link>
      </Space>
    ),
  },
];

export default function Admin() {
  const router = useRouter();
  const [messageApi, contextHolder] = message.useMessage();

  const [users, setUsers] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      async function getUserList() {
        const result = await fetchData(`admin`);
        if (result.error) {
          router.replace("/");
          return;
        }
        setUsers(result);
      }
      getUserList();
    }
  }, []);

  return (
    <Layout>
      {contextHolder}
      <h1>admin 頁面</h1>
      <h2>user 列表</h2>
      <Table columns={columns} dataSource={users} />
    </Layout>
  );
}
