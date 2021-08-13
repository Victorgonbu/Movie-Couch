import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { fetchGenresList, setCurrentFilter } from '../../actions';
import {
  dropdownButton, active, activeFilter, dropdownMenu,
} from '../../styles/Dropdown.module.css';
import DropdownItem from '../DropdownItem';

const DropdownMenu = (props) => {
  const {
    genres, fetchGenres, currentFilter, setCurrentFilter,
  } = props;
  const dropdownRef = useRef(null);
  const filterRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  useEffect(() => {
    const popularRef = document.querySelectorAll('button')[1];
    const filterActive = filterRef.current ? filterRef.current : popularRef;
    filterActive.classList.add(activeFilter);

    return () => {
      if (filterActive) filterActive.classList.remove(activeFilter);
    };
  }, [genres, currentFilter]);

  const handleDropdown = () => {
    dropdownRef.current.classList.toggle(active);
  };

  const handleFilterChange = (e) => {
    setCurrentFilter(e.target.value);
    filterRef.current = e.target;
    handleDropdown();
    navigate('/');
  };

  return (
    <>
      <button className={dropdownButton} onClick={handleDropdown} type="button">
        <FontAwesomeIcon icon="bars" />
      </button>
      <ul className={dropdownMenu} ref={dropdownRef}>
        {genres
                && (
                <>
                  <DropdownItem onChange={handleFilterChange} value="Popular" text="Popular" />
                  <DropdownItem onChange={handleFilterChange} value="Top Rated" text="Top Rated" />
                    {genres.map((genre) => (
                      <DropdownItem
                        key={genre.id}
                        onChange={handleFilterChange}
                        value={genre.id}
                        text={genre.name}
                      />
                    ))}
                </>
                )}

      </ul>
    </>
  );
};

DropdownMenu.propTypes = {
  genres: PropTypes.arrayOf(PropTypes.object),
  fetchGenres: PropTypes.func.isRequired,
  currentFilter: PropTypes.string,
  setCurrentFilter: PropTypes.func.isRequired,
};

DropdownMenu.defaultProps = {
  genres: null,
  currentFilter: null,
};

const mapStateToProps = (state) => ({
  genres: state.genres.list,
  currentFilter: state.filter.current,
});

const mapDispatchToProps = (dispatch) => ({
  fetchGenres: () => { dispatch(fetchGenresList); },
  setCurrentFilter: (filter) => { dispatch(setCurrentFilter(filter)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);
