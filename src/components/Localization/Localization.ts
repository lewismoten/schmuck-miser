import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import * as selectors from "../../state/settings/selectors";

interface Props {
  children: JSX.Element;
}

const Localization = ({ children }: Props): JSX.Element => {
  const language = useSelector(selectors.language);
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language]);

  return children;
};

export default Localization;
