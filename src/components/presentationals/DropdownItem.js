import PropTypes from 'prop-types';
import { dropdownItem } from '../../styles/Dropdown.module.css';

const DropdownItem = (props) => {
  const {
    handleClick, value, text, initialRef,
  } = props;

  return (
    <li>
      <button
        ref={initialRef}
        type="button"
        className={dropdownItem}
        onClick={handleClick}
        value={value}
      >
        {text}
      </button>
    </li>
  );
};

DropdownItem.propTypes = {
  handleClick: PropTypes.func.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  text: PropTypes.string.isRequired,
  initialRef: PropTypes.objectOf(PropTypes.object),
};

DropdownItem.defaultProps = {
  initialRef: null,
};

export default DropdownItem;
