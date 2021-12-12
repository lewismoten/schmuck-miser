import { handleActions } from 'redux-actions';
import produce from 'immer';
import * as actions from './actions';

const initialState = {
  has2FA: false,
  tfaNewSecret: undefined,
};

const onSetup2fa = produce((draft) => {
  draft.has2FA = !draft.has2FA;
});
const onSetup2faRequest = produce((draft, action) => {
  const { secret, qr } = action.payload;
  draft.tfaNewSecret = secret;
  draft.tfaNewQr = qr;
});

export default handleActions(
  {
    [actions.setup2FA.TRIGGER]: onSetup2fa,
    [actions.setup2FA.REQUEST]: onSetup2faRequest,
  },
  initialState
);
