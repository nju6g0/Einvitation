import Styles from "styles/components.module.scss";

export default function Loading() {
  return (
    <div className={Styles.loaderContainer}>
      <div className={Styles.loader} />
    </div>
  );
}
