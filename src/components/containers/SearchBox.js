import { searchBox, searchButton, searchBar } from '../../styles/Navbar.module.css';

const SearchBox = () => {
    return(
        <div className={searchBox}>
            <input placeholder="Type movie title" className={searchBar} />
            <button type="button" className={searchButton}>Search</button>
        </div> 
    )
};

export default SearchBox;