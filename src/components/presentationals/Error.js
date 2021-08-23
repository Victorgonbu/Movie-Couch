import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useEffect } from 'react';
import { setErrorState } from '../../actions/index';
import { container } from '../../styles/Error.module.css';

const Error = (props) => {
  const { text, errorActive } = props;
  console.log(errorActive);
  useEffect(() => {
    console.log('im here');
    const timer = setTimeout(() => {
      setErrorState(false);
    }, 5000);

    return () => {
      clearTimeout(timer);
    };
  }, [errorActive]);
  return (
    <>
      {errorActive
      && <div className={container}>{text}</div>}
    </>
  );
};

Error.propTypes = {
  text: PropTypes.string,
  errorActive: PropTypes.bool.isRequired,
};

Error.defaultProps = {
  text: null,
};

const mapStateToProps = (state) => ({
  errorActive: state.filter.error,
});

const mapDispatchToProps = (dispatch) => ({
  setErrorState: (bool) => { dispatch(setErrorState(bool)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Error);
