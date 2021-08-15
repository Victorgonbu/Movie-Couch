import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import { mainDetails } from '../../styles/Movie.module.css';

const MainDetail = (props) => {
  const {
    iconClass, icon, text, boldText,
  } = props;
  return (
    <p className={mainDetails}>
      <FontAwesomeIcon className={iconClass} icon={icon} />
      <span>{text}</span>
      {boldText
      && <b>{boldText}</b>}
    </p>
  );
};



export default MainDetail;
