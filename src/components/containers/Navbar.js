import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Outlet } from 'react-router-dom';
import PropTypes from 'prop-types';
import { flex } from '../../styles/App.module.css';
import {
  navbar, brand, searchIcon,
} from '../../styles/Navbar.module.css';
import DropdownMenu from './DropdownMenu';
import { setSearchActive } from '../../actions';
import SearchBox from './SearchBox';

const Navbar = (props) => {
  const { setSearchActive } = props;

  return (
    <>
      <nav className={`${flex} ${navbar}`}>

        <DropdownMenu />

        <div className={brand}>
          Movie Couch
        </div>

        <button type="button" onClick={setSearchActive} className={searchIcon}>
          <FontAwesomeIcon icon="search" />
        </button>
      </nav>
      <SearchBox />
      <Outlet />
    </>
  );
};

Navbar.propTypes = {
  setSearchActive: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  setSearchActive: () => { dispatch(setSearchActive()); },
});

export default connect(null, mapDispatchToProps)(Navbar);
