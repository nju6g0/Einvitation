import { useEffect } from "react";
import { useRouter } from "next/router";

import Loading from "components/Loading";
import fetchData from "utils/fetchData";

export default function AuthGoogle() {
  const router = useRouter();
  const { token } = router.query;

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", JSON.stringify(token));
      async function getUserInfo() {
        const user = await fetchData("user", token);
        localStorage.setItem("user", JSON.stringify(user));
      }
      getUserInfo();
      router.replace("/receptions");
    }
  }, [token]);
  return (
    <div>
      <Loading />
      <p style={{ textAlign: "center" }}>loading...</p>
    </div>
  );
}
