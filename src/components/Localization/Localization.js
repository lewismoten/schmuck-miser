import { useTranslation } from 'react-i18next';

const Localization = ({ children }) => {
  const { i18n } = useTranslation();
  document.body.dir = i18n.dir();
  return children;
};

export default Localization;
