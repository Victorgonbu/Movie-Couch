import { Outlet } from 'react-router-dom';
import { flex } from '../../styles/App.module.css';
import {
  navbar, brand,
} from '../../styles/Navbar.module.css';
import DropdownMenu from './DropdownMenu';
import SearchBox from './SearchBox';

const Navbar = () => (
  <>
    <nav className={`${flex} ${navbar}`}>

      <DropdownMenu />

      <div className={brand}>
        Movie Couch
      </div>

      <SearchBox />
    </nav>
    <Outlet />
  </>
);

export default Navbar;
