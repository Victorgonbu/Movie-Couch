import { dropdownMenu, dropdownItem } from '../../styles/Dropdown.module.css';
import React, { useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { fetchGenresList } from '../../actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { dropdownButton, active } from '../../styles/Dropdown.module.css'; 

const DropdownMenu = React.forwardRef((props, ref) => {
    const { genres, fetchGenres } = props;
    const dropdownRef = useRef(null);
    useEffect(() => {
        fetchGenres();
    }, [fetchGenres])

    const handleDropdown = () => {
        dropdownRef.current.classList.toggle(active);
    };


    return(
        <>
            <button className={dropdownButton} onClick={handleDropdown} type="button">
                <FontAwesomeIcon icon="bars"/>
            </button>
            <ul className={dropdownMenu} ref={dropdownRef} >
                {genres 
                &&
                <>
                    <li className={dropdownItem}>Popular</li>
                    <li className={dropdownItem}>Top Rated</li>
                    {genres.map((genre) => <li className={dropdownItem} key={genre.id}>{genre.name}</li>)}
                </>
                }
            
            </ul>
        </>
    )
})

const mapStateToProps = (state) => {
    return {
        genres: state.genres.list
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGenres: () => {dispatch(fetchGenresList)}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);