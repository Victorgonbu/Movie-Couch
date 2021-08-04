import { searchBox, searchButton, searchBar, activeBox } from '../../styles/Navbar.module.css';
import { useRef } from 'react';
import useDidMountEffect from '../../hooks/useDidMountEffect';

import { connect } from 'react-redux';

const SearchBox = (props) => {
    const { searchActive } = props;
    const searchRef = useRef(null);

    useDidMountEffect(() => {
        searchRef.current.classList.toggle(activeBox);
    }, [searchActive])

    return(
        <div ref={searchRef} className={searchBox}>
            <input placeholder="Type movie title" className={searchBar} />
            <button type="button" className={searchButton}>Search</button>
        </div> 
    )
};

const mapStateToProps = (state) => {
    return {
        searchActive: state.filter.searchActive
    }
};


export default connect(mapStateToProps)(SearchBox);