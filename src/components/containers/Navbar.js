import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { flex } from '../../styles/App.module.css';
import { navbar, brand, searchIcon, backButton } from '../../styles/Navbar.module.css';
import DropdownMenu from "./DropdownMenu";
import { connect } from 'react-redux';
import { setSearchActive } from "../../actions";
import { Outlet} from 'react-router-dom';
import SearchBox from "./SearchBox";

const Navbar = (props) => {
    const {setSearchActive } = props;
    
    return(
        <>
            <nav className={`${flex} ${navbar}`}>
                
                <DropdownMenu /> 

                <div className={brand}>
                    Movie Couch
                </div>

                <button onClick={setSearchActive} className={searchIcon}>
                    <FontAwesomeIcon icon="search"/>
                </button>
           </nav>
            <SearchBox/>
           <Outlet/>
        </>
    )
};

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchActive: () => {dispatch(setSearchActive())}
    }
};

export default connect(null, mapDispatchToProps)(Navbar);