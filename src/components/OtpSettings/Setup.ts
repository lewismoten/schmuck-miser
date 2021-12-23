import { useSelector } from "react-redux";
import * as selectors from "../../state/otp/selectors";
import { IHasChildren } from "../../types/IHasChildren";
import { NullableElement } from "../../types/NullableElement";

const Setup = ({ children }: IHasChildren): NullableElement => {
  const isSettingUp = useSelector(selectors.isSettingUp);
  return isSettingUp ? children : null;
};

export default Setup;
