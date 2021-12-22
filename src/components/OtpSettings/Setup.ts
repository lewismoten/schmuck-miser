import { useSelector } from 'react-redux';
import * as selectors from '../../state/otp/selectors';

interface Props {
  children: JSX.Element;
}

const Setup = ({ children }: Props): JSX.Element | null => {
  const isSettingUp = useSelector(selectors.isSettingUp);
  return isSettingUp ? children : null;
};

export default Setup;
