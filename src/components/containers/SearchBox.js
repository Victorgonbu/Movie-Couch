import { useRef, useState } from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  searchBox, searchButton, searchBar, activeBox, closeSearchButton,
} from '../../styles/Navbar.module.css';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { fetchSearch, setSearchActive } from '../../actions/index';

const SearchBox = (props) => {
  const { searchActive, fetchSearch, setSearchActive } = props;
  const searchRef = useRef(null);
  const [inputValue, setInputValue] = useState('');
  const navigate = useNavigate();

  useDidMountEffect(() => {
    searchRef.current.classList.toggle(activeBox);
  }, [searchActive]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSearch = () => {
    fetchSearch(inputValue);
    setTimeout(() => {
      navigate('/');
    }, 50);
  };

  const handleClose = () => {
    setSearchActive();
    setInputValue('');
  };

  return (
    <div ref={searchRef} className={searchBox}>
      <button
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
  );
};

const mapStateToProps = (state) => ({
  searchActive: state.filter.searchActive,
});

const mapDispatchToProps = (dispatch) => ({
  fetchSearch: (query) => { dispatch(fetchSearch(query)); },
  setSearchActive: () => { dispatch(setSearchActive()); },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);
