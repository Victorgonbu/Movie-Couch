import PropTypes from 'prop-types';
import { FormatMoney } from 'format-money-js';
import MainDetail from './MainDetail';
import Rating from './Rating';
import {
  detailsContainer, topDetails, topLeft,
  greenIcon, icon, ratingDetails, synopsis,
  synopsisTitle, synopsisText, watchDetails,
} from '../../styles/Movie.module.css';
import { flex } from '../../styles/App.module.css';
import formatDate from '../utils/index';

const Details = (props) => {
  const { movie } = props;
  const fm = new FormatMoney();

  return (
    <div className={detailsContainer}>
      <div className={topDetails}>
        <div className={topLeft}>
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
        <Rating
          className={ratingDetails}
          average={movie.vote_average}
          count={movie.vote_count}
        />
      </div>

      <div className={synopsis}>
        <h2 className={synopsisTitle}>Synopsis</h2>
        <p className={synopsisText}>
          {movie.overview}
          <a className={watchDetails} href={movie.homepage}> Watch</a>
        </p>
      </div>
    </div>
  );
};

Details.propTypes = {
  movie: PropTypes.objectOf(PropTypes.oneOf([
    PropTypes.string,
    PropTypes.number,
  ])).isRequired,
};

export default Details;
