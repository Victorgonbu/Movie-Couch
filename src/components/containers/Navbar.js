import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { flex } from '../../styles/App.module.css';
import { navbar} from '../../styles/Navbar.module.css';
import DropdownMenu from "./DropdownMenu";

const Navbar = () => {
    
   
    return(
        <nav className={`${flex} ${navbar}`}>
           
            <DropdownMenu />

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