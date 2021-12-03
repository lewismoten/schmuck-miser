import React from 'react';
import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import SpeedDial from '@mui/material/SpeedDial';
import SpeedDialIcon from '@mui/material/SpeedDialIcon';
import SpeedDialAction from '@mui/material/SpeedDialAction';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';

const LaunchAdd = () => {
  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        transform: 'translateZ(0px)',
        flexGrow: 1,
      }}
    >
      <SpeedDial
        direction="up"
        ariaLabel="Add"
        icon={<SpeedDialIcon />}
        sx={{ position: 'absolute', bottom: 16, right: 16 }}
      >
        <SpeedDialAction
          icon={<AddBusinessIcon />}
          tooltipTitle="Business"
          tooltipOpen
        />
      </SpeedDial>
    </Box>
  );
};

LaunchAdd.propTypes = {
  children: PropTypes.node,
};

export default LaunchAdd;
