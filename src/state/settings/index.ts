import { handleActions } from 'redux-actions';
import produce from 'immer';
import * as actions from './actions';

const initialState = {
  language: 'en',
};

const onChangeLanguage = produce((draft, action) => {
  draft.language = action.payload;
});

export default handleActions(
  {
    [actions.changeLanguage.TRIGGER]: onChangeLanguage,
  },
  initialState
);
