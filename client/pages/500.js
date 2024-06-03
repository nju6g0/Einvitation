import Link from "next/link";

export default function Custom500() {
  return (
    <div>
      <p>Oops! 500 - Something goes wrong, try later...</p>
      <Link href="/">回到首頁</Link>
    </div>
  );
}
