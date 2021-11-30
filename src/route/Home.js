import React from 'react';
import Paper from '@mui/material/Paper';
import { useSelector } from 'react-redux';
import * as selectors from '../state/accounts/selectors';
import Page from '../components/Page';

const Home = () => {
  const isLoading = useSelector(selectors.isLoading);
  const hasError = useSelector(selectors.hasError);
  const hasLoaded = useSelector(selectors.hasLoaded);
  return (
    <Page title="Home">
      <Paper>
        This is an app.
        <p>HasLoaded: {hasLoaded.toString()}</p>
        <p>IsLoading: {isLoading.toString()}</p>
        <p>hasError: {hasError.toString()}</p>
      </Paper>
    </Page>
  );
};

export default Home;
