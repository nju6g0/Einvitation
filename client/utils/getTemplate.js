import TemplateA01 from "components/templates/A01";
import TemplateA02 from "components/templates/A02";
import TemplateB01 from "components/templates/B01";
import TemplateB02 from "components/templates/B02";

const getTemplate = (template, data) => {
  switch (template) {
    case "A02":
      return <TemplateA02 {...data} />;
    case "B01":
      return <TemplateB01 {...data} />;
    case "B02":
      return <TemplateB02 {...data} />;
    case "A01":
    default:
      return <TemplateA01 {...data} />;
  }
};

export default getTemplate;
