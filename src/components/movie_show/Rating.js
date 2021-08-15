import PropTypes from 'prop-types';
import ReactStars from 'react-rating-stars-component';
import { votesDetails } from '../../style/Movie.module.css';

const Rating = (props) => {
  const { className, average, count } = props;

  return (
    <div className={className}>
      <ReactStars
        classNames="stars"
        value={average / 2}
        isHalf
        edit={false}
        count={5}
        onChange={() => {}}
        size={24}
        activeColor="var(--white)"
      />

      <p className={votesDetails}>
        <b>
          {average}
          /10
          {' '}
        </b>
        {count
        && (
        <span>
          -
          {' '}
          <b>{count}</b>
          {' '}
          votes
        </span>
        )}

      </p>
    </div>
  );
};

Rating.propTypes = {
  className: PropTypes.string.isRequired,
  average: PropTypes.number.isRequired,
  count: PropTypes.number,
};

Rating.defaultProps = {
  count: null,
};

export default Rating;
