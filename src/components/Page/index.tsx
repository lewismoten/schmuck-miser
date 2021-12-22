import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import TopBar from './TopBar';
import BottomBar from './BottomBar';
import LaunchAdd from '../LaunchAdd';

function Page({ title, children }) {
  return (
    <Fragment>
      <TopBar title={title} />
      <Box className="App" sx={{ marginBottom: '60px', marginTop: '10px' }}>
        {children}
      </Box>
      <LaunchAdd></LaunchAdd>
      <BottomBar />
    </Fragment>
  );
}

Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Page;
