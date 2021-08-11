import { searchBox, searchButton, searchBar, activeBox, closeSearchButton } from '../../styles/Navbar.module.css';
import { useRef,  useState } from 'react';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { fetchSearch, setSearchActive } from '../../actions/index';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';

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
            navigate("/");
               
        }, 50)
    };

    return(
        <div ref={searchRef} className={searchBox}>
            <button onClick={setSearchActive}
            className={closeSearchButton} >
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
    )
};

const mapStateToProps = (state) => {
    return {
        searchActive: state.filter.searchActive
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchSearch: (query) => {dispatch(fetchSearch(query))},
        setSearchActive: () => {dispatch(setSearchActive())},
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);