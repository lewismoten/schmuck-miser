import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import TopBar from './TopBar';
import BottomBar from './BottomBar';
import Theme from '../Theme';

function Page({ title, children }) {
  return (
    <Theme>
      <Box className="App">
        <TopBar title={title} />
        <BottomBar />
        {children}
      </Box>
    </Theme>
  );
}

Page.propTypes = {
  title: PropTypes.string,
  children: PropTypes.node,
};

export default Page;
