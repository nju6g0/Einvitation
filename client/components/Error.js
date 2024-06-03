import React from "react";

import Layout from "./Layout";

export default function Error(props) {
  const { statusCode, message } = props;
  return (
    <Layout>
      <h3>error page</h3>
      <p>{statusCode}</p>
      <p>{message}</p>
    </Layout>
  );
}
