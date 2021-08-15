import PropTypes from 'prop-types';
import { FormatMoney } from 'format-money-js';
import MainDetail from './MainDetail';
import {
  detailsContainer, topDetails, greenIcon, icon,
} from '../../styles/Movie.module.css';
import { flex } from '../../styles/App.module.css';
import { formatDate } from '../utils/index';

const Details = (props) => {
  const { movie } = props;
  const fm = new FormatMoney();

  return (
    <div className={detailsContainer}>
      <div className={topDetails}>
        <div className={flex}>
          <MainDetail
            iconClass={icon}
            icon="clock"
            text={`${movie.runtime} min`}
          />
          <MainDetail
            iconClass={icon}
            icon="calendar-alt"
            text={formatDate(movie.release_date)}
          />
        </div>
      </div>

      <MainDetail
        iconClass={greenIcon}
        icon="money-check-alt"
        text="Budget: "
        boldText={fm.from(movie.budget, { symbol: '$' })}
      />

      <MainDetail
        iconClass={greenIcon}
        icon="dollar-sign"
        text="Revenue: "
        boldText={fm.from(movie.revenue, { symbol: '$' })}
      />
    </div>
  );
};

Details.propTypes = {

};

export default Details;
