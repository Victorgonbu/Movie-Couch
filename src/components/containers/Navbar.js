import { Outlet } from 'react-router-dom';
import { flex } from '../../styles/App.module.css';
import {
  navbar, brand,
} from '../../styles/Navbar.module.css';
import DropdownMenu from './DropdownMenu';
import SearchBox from './SearchBox';
import Error from '../presentationals/Error';

const Navbar = () => (
  <>
    <nav className={`${flex} ${navbar}`}>

      <DropdownMenu />

      <div className={brand}>
        Movie Couch
      </div>
      <SearchBox />
    </nav>
    <Error text="Sorry, it seems we are unable to reach the API. Please try again later." />
    <Outlet />
  </>
);

export default Navbar;
