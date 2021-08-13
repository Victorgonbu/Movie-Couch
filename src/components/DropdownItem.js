import PropTypes from 'prop-types';
import { dropdownItem } from '../styles/Dropdown.module.css';

const DropdownItem = (props) => {
  const { handleFilterChange, value, text } = props;

  return (
    <li>
      <button
        type="button"
        className={dropdownItem}
        onClick={handleFilterChange}
        value={value}
      >
        {text}
      </button>
    </li>
  );
};

DropdownItem.propTypes = {
  handleFilterChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default DropdownItem;
