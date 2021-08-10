import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { flex } from '../../styles/App.module.css';
import { navbar, brand, searchIcon } from '../../styles/Navbar.module.css';
import DropdownMenu from "./DropdownMenu";
import { connect } from 'react-redux';
import { setSearchActive } from "../../actions";
import { useNavigate, Outlet, useLocation} from 'react-router-dom';
import SearchBox from "./SearchBox";

const Navbar = (props) => {
    const {setSearchActive } = props;
    const navigate = useNavigate();
    const location = useLocation();
    const pathLength = location.pathname.length;


    return(
        <>
            <nav className={`${flex} ${navbar}`}>
                
                {pathLength > 1 ? 
                <button 
                onClick={() => navigate(-1)}>
                    <FontAwesomeIcon icon="arrow-left"/>
                </button> 
                : 
               <DropdownMenu /> }

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