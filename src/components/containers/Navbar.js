import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { flex } from '../../styles/App.module.css';
import { navbar, dropdownButton } from '../../styles/Navbar.module.css';

const Navbar = () => {
    return(
        <nav className={`${flex} ${navbar}`}>
            <button className={dropdownButton} type="button">
                <FontAwesomeIcon icon="bars"/>
            </button>

            <div className="brand">
                Movie Couch
            </div>

            <div className="search">
                <FontAwesomeIcon icon="search"/>
            </div>
        </nav>
    )
};

export default Navbar;