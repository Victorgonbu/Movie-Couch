import { searchBox, searchButton, searchBar, activeBox } from '../../styles/Navbar.module.css';
import { useRef,  useState } from 'react';
import useDidMountEffect from '../../hooks/useDidMountEffect';
import { fetchSearch } from '../../actions/index';
import { connect } from 'react-redux';

const SearchBox = (props) => {
    const { searchActive, fetchSearch } = props;
    const searchRef = useRef(null);
    const [inputValue, setInputValue] = useState('');

    useDidMountEffect(() => {
        searchRef.current.classList.toggle(activeBox);
    }, [searchActive]);
    

    const handleInputChange = (e) => {
        setInputValue(e.target.value);
    };

    return(
        <div ref={searchRef} className={searchBox}>
            <input 
            placeholder="Type movie title" 
            className={searchBar} 
            onChange={handleInputChange}
            value={inputValue}
            />
            <button onClick={() => {fetchSearch(inputValue)}} type="button" className={searchButton}>Search</button>
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
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchBox);