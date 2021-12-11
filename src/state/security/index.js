import { handleActions } from 'redux-actions';
import produce from 'immer';
import * as actions from './actions';

const initialState = {
  has2FA: false,
};

const onSetup2fa = produce((draft) => {
  draft.has2FA = !draft.has2FA;
});

export default handleActions(
  {
    [actions.setup2FA.TRIGGER]: onSetup2fa,
  },
  initialState
);
