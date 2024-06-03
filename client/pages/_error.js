import Link from "next/link";

function Error(props) {
  return (
    <div>
      {/* <p>{statusCode}</p> */}
      {/* <p>error</p> */}
      <p>
        Oops! {props.statusCode} - {props.message}
      </p>
      <Link href="/">回到首頁</Link>
    </div>
  );
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  const messaga = res ? res.message : err ? err.message : "something wrong";

  return { statusCode, messaga, err };
};

export default Error;
