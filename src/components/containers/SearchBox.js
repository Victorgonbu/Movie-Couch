import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  searchBox, searchButton, searchBar, activeBox, closeSearchButton,
  searchIcon,
} from '../../styles/Navbar.module.css';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { fetchSearch, setSearchActive, setDidNavigate } from '../../actions/index';

const SearchBox = (props) => {
  const {
    searchActive, fetchSearch, setSearchActive,
    contentURL, setDidNavigate,
  } = props;
  const searchRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  useDidMountEffect(() => {
    searchRef.current.classList.toggle(activeBox);
  }, [searchActive]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  useDidMountEffect(() => {
    navigate('/');
  }, [contentURL]);

  const handleSearch = () => {
    fetchSearch(inputValue);
    setDidNavigate(false);
  };

  const handleClose = () => {
    setSearchActive();
    setInputValue('');
  };

  return (

    <>
      <button data-testid="search-icon" type="button" onClick={setSearchActive} className={searchIcon}>
        <FontAwesomeIcon icon="search" />
      </button>

      <div data-testid="search" ref={searchRef} className={searchBox}>
        <button
          type="button"
          onClick={handleClose}
          className={closeSearchButton}
        >
          &times;
        </button>
        <input
          placeholder="Type movie title"
          className={searchBar}
          onChange={handleInputChange}
          value={inputValue}
        />
        <button onClick={handleSearch} type="button" className={searchButton}>Search</button>
      </div>
    </>
  );
};

SearchBox.propTypes = {
  searchActive: PropTypes.bool.isRequired,
  fetchSearch: PropTypes.func.isRequired,
  setSearchActive: PropTypes.func.isRequired,
  contentURL: PropTypes.string,
  setDidNavigate: PropTypes.func.isRequired,
};

SearchBox.defaultProps = {
  contentURL: null,
};

const mapStateToProps = (state) => ({
  searchActive: state.filter.searchActive,
  contentURL: state.filter.contentURL,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSearch: (query) => { dispatch(fetchSearch(query)); },
  setSearchActive: () => { dispatch(setSearchActive()); },
  setDidNavigate: (bool) => { dispatch(setDidNavigate(bool)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
