import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';
import { fetchGenresList, setCurrentFilter } from '../../actions';
import {
  dropdownButton, active, activeFilter, dropdownMenu, dropdownItem,
} from '../../styles/Dropdown.module.css';

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
    let filterActive;
    const popularRef = document.querySelectorAll('button')[1];
    filterActive = filterRef.current ? filterRef.current : popularRef;
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
                  <li>
                    <button
                      className={dropdownItem}
                      onClick={handleFilterChange}
                      value="Popular"
                    >
                      Popular
                    </button>
                  </li>
                  <li>
                    <button
                      className={dropdownItem}
                      onClick={handleFilterChange}
                      value="Top Rated"
                    >
                      Top Rated
                    </button>
                  </li>
                    {genres.map((genre) => (
                      <li key={genre.id}>
                        <button
                          className={dropdownItem}
                          onClick={handleFilterChange}
                          value={genre.id}
                        >
                          {genre.name}
                        </button>
                      </li>
                    ))}
                </>
                )}

      </ul>
    </>
  );
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
