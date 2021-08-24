import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { flex } from '../../styles/App.module.css';
import {
  navbar, brand,
} from '../../styles/Navbar.module.css';
import DropdownMenu from './DropdownMenu';
import SearchBox from './SearchBox';
import Error from '../presentationals/Error';
import { setErrorState } from '../../actions/index';

const Navbar = (props) => {
  const {
    errorActive, setErrorState, contentURL, currentFilter,
  } = props;
  return (
    <>
      <nav className={`${flex} ${navbar}`}>

        <DropdownMenu />

        <div className={brand}>
          Movie Couch
        </div>
        <SearchBox />
      </nav>
      { errorActive
        ? (
          <Error
            handleErrorState={setErrorState}
            text="Sorry, it seems we are unable to reach API data. Please try again later."
            contentURL={contentURL}
            filter={currentFilter}
          />
        )
        : <Outlet /> }

    </>
  );
};

Navbar.propTypes = {
  errorActive: PropTypes.bool.isRequired,
  setErrorState: PropTypes.func.isRequired,
  contentURL: PropTypes.string,
  currentFilter: PropTypes.string,
};

Navbar.defaultProps = {
  contentURL: null,
  currentFilter: null,
};

const mapStateToProps = (state) => ({
  errorActive: state.filter.error,
  contentURL: state.filter.contentURL,
  currentFilter: state.filter.current,
});

const mapDispatchToProps = (dispatch) => ({
  setErrorState: (bool) => { dispatch(setErrorState(bool)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
