import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';

import Theme from './Theme';
import PageTitle from './PageTitle';
import PageNavigation from './PageNavigation';

function Page({ title, children }) {
  return (
    <Theme>
      <Box className="App">
        <PageTitle title={title} />
        <PageNavigation />
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
