import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { container } from '../../styles/Error.module.css';

const Error = (props) => {
  const {
    text, handleErrorState, contentURL, filter,
  } = props;
  useEffect(() => () => {
    handleErrorState(false);
  }, [contentURL, filter]);
  return (
    <div className={container}>{text}</div>
  );
};

Error.propTypes = {
  text: PropTypes.string.isRequired,
  handleErrorState: PropTypes.func.isRequired,
  contentURL: PropTypes.string,
  filter: PropTypes.string,
};

Error.defaultProps = {
  contentURL: null,
  filter: null,
};

export default Error;
