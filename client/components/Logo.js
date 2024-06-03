import Styles from "styles/logo.module.scss";

export default function Logo() {
  return (
    <div className={Styles.container}>
      <p className={Styles.name}>We&apos;re getting Married</p>
      <span className={Styles.divider} />
      <p>custom e-invitation</p>
    </div>
  );
}
