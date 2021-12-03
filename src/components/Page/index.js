import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import TopBar from './TopBar';
import BottomBar from './BottomBar';
import Theme from '../Theme';
import LaunchAdd from '../LaunchAdd';

function Page({ title, children }) {
  return (
    <Theme>
      <TopBar title={title} />
      <Box className="App" sx={{ marginBottom: '60px' }}>
        {children}
      </Box>
      <LaunchAdd></LaunchAdd>
      <BottomBar />
    </Theme>
  );
}

Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Page;
