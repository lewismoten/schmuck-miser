import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import * as actions from './state/accounts/actions';
import * as selectors from './state/accounts/selectors';

import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import SettingsIcon from '@mui/icons-material/Settings';
import SaveIcon from '@mui/icons-material/Save';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectors.isLoading);
  const hasError = useSelector(selectors.hasError);
  const hasLoaded = useSelector(selectors.hasLoaded);

  const [bottomNavigationValue, setBottomNavigationValue] = useState('a');

  const onChangeBottomNavigation = (e, value) => {
    setBottomNavigationValue(value);
  };

  useEffect(() => {
    dispatch(actions.load());
    return () => dispatch(actions.unload());
  }, []);

  return (
    <div className="App">
      This is an app.
      <p>HasLoaded: {hasLoaded.toString()}</p>
      <p>IsLoading: {isLoading.toString()}</p>
      <p>hasError: {hasError.toString()}</p>
      <BottomNavigation
        value={bottomNavigationValue}
        onChange={onChangeBottomNavigation}
      >
        <BottomNavigationAction label="Home" value="a" icon={<HomeIcon />} />
        <BottomNavigationAction
          label="Settings"
          value="b"
          icon={<SettingsIcon />}
        />
        <BottomNavigationAction label="I/O" value="c" icon={<SaveIcon />} />
      </BottomNavigation>
    </div>
  );
}

export default App;
