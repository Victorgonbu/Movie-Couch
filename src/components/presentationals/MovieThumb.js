import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Rating from './movie_show/Rating';
import {
  listItem, poster, itemDetails, title, date, moreDetails, starRate,
} from '../../styles/Home.module.css';
import { imagesURL } from '../../API';
import formatDate from '../utils/index';

const MovieThumb = (props) => {
  const { value } = props;

  return (
    <li data-testid="thumb" className={listItem}>
      <img className={poster} alt="poster" src={`${imagesURL}${value.poster_path}`} />
      <div className={itemDetails}>
        <p className={title}>{value.title}</p>
        <p className={date}>{formatDate(value.release_date)}</p>
        <Link to={`/movie/${value.id}`} className={moreDetails}>More Details</Link>
        <Rating
          className={starRate}
          average={value.vote_average}
        />
      </div>
    </li>
  );
};

MovieThumb.propTypes = {
  value: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.number])).isRequired,
};

export default MovieThumb;
