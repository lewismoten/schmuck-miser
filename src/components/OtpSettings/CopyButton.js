import React from 'react';
import PropTypes from 'prop-types';

import ContentCopyIcon from '@mui/icons-material/ContentCopy';

const CopyButton = ({ text }) => {
  const onClick = () => {};

  return <ContentCopyIcon onClick={onClick} />;
};

CopyButton.propTypes = {
  text: PropTypes.string,
};

export default CopyButton;
