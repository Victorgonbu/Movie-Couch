import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import {
  listItem, poster, itemDetails, title, date, moreDetails, starRate, rating,
} from '../styles/Home.module.css';
import { imagesURL } from '../API';
import formatDate from './utils/index';

const Movie = (props) => {
  const { value } = props;

  return (
    <li className={listItem}>
      <img className={poster} alt="poster" src={`${imagesURL}${value.poster_path}`} />
      <div className={itemDetails}>
        <p className={title}>{value.title}</p>
        <p className={date}>{formatDate(value.release_date)}</p>
        <Link to={`/movie/${value.id}`} className={moreDetails}>More Details</Link>
        <ReactStars
          classNames={starRate}
          value={value.vote_average / 2}
          isHalf
          edit={false}
          count={5}
          onChange={() => {}}
          size={24}
          activeColor="var(--white)"
        />
        <span className={rating}>
          {value.vote_average}
          /10
        </span>
      </div>
    </li>
  );
};

Movie.propTypes = {
  value: PropTypes.objectOf(PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
    PropTypes.array,
    PropTypes.number])).isRequired,
};

export default Movie;
