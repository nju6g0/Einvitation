import { useState } from "react";
import { CrownOutlined } from "@ant-design/icons";

import Layout from "components/Layout";
import getTemplate from "utils/getTemplate";
import { TEMPLATE_NAMES } from "constants/templates";
import SAMPLE_DATA from "constants/sampleData";
import Styles from "styles/templates.module.scss";

export default function Templates() {
  const [template, setTemplate] = useState(TEMPLATE_NAMES.A01);

  const handleChange = (e) => {
    setTemplate(e.target.value);
  };
  return (
    <Layout full={template === TEMPLATE_NAMES.B02}>
      <div className={Styles.wrap}>
        <div style={{ maxWidth: "1280px", margin: "0 auto" }}>
          <div className={Styles.radioGroup}>
            {Object.keys(TEMPLATE_NAMES).map((key) => (
              <label key={key} className={key === template && Styles.checked}>
                <input
                  type="radio"
                  name="template"
                  value={TEMPLATE_NAMES[key]}
                  onChange={handleChange}
                />
                {key[0] !== "A" && <CrownOutlined />}
                {TEMPLATE_NAMES[key]}
              </label>
            ))}
          </div>
        </div>
        {getTemplate(template, {
          ...SAMPLE_DATA.receptionData,
          ...SAMPLE_DATA.invitationData,
        })}
      </div>
    </Layout>
  );
}
