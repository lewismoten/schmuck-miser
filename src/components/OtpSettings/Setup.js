import { useSelector } from 'react-redux';
import * as selectors from '../../state/otp/selectors';

const Setup = ({ children }) => {
  const isSettingUp = useSelector(selectors.isSettingUp);
  return isSettingUp ? children : null;
};

export default Setup;
