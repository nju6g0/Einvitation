import { useEffect } from "react";
import { useRouter } from "next/router";

export default function Custom404() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.replace("/");
    }, 2 * 1000);
  }, []);
  return (
    <div>
      <p>Oops! 404 - Page Not Found</p>
    </div>
  );
}
