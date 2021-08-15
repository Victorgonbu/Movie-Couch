import { useEffect, useState } from 'react';
import { FormatMoney } from 'format-money-js';
import ReactStars from 'react-rating-stars-component';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Carousel } from 'react-responsive-carousel';
import { useLocation } from 'react-router-dom';
import { movieURL, imagesURL } from '../../API';
import axios from '../../axios';
import {
  movieContainer, detailsContainer, topLeft,
  ratingDetails, votesDetails, mainDetails, icon, topDetails,
  greenIcon, synopsis, synopsisText, synopsisTitle, watchDetails,
  producerList, producerItem, producerLogo, producerName, videoFrame,
  videosCarousel,
} from '../../styles/Movie.module.css';
import Backdrop from '../movie_show/Backdrop';
import { flex } from '../../styles/App.module.css';
import formatDate from '../utils/index';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

const MovieShow = () => {
  const location = useLocation();
  const movieID = location.pathname.split('/')[2];
  const url = `${movieURL + movieID}?append_to_response=videos`;
  const [movie, setMovie] = useState(null);
  const fm = new FormatMoney();

  useEffect(() => {
    async function makeRequest() {
      const request = await axios.get(url);
      setMovie(request.data);
    }
    makeRequest();
  }, [url]);

  const mapProducers = (list) => {
    const filteredList = list.filter((producer) => producer.logo_path);

    return filteredList.map((producer) => (
      <p key={producer.name} className={producerItem}>
        <img className={producerLogo} alt="Producer Logo" src={imagesURL + producer.logo_path} />
        <span className={producerName}>{producer.name}</span>
      </p>
    ));
  };

  const mapVideos = (list) => {
    const filteredVideos = list.filter((video) => video.official).slice(0, 8);

    return filteredVideos.map((video) => (
      <iframe
        key={video.id}
        className={videoFrame}
        title={video.name}
        src={`https://www.youtube.com/embed/${video.key}`}
      />
    ));
  };

  return (
    <div className={movieContainer}>
      {movie
            && (
            <>
              <Backdrop
                title={movie.title}
                tagline={movie.tagline}
                backdropPath={movie.backdrop_path}
                genres={movie.genres}
              />

              <div className={detailsContainer}>

                <div className={topDetails}>

                  <div className={topLeft}>

                    <div className={flex}>
                      <p className={mainDetails}>
                        <FontAwesomeIcon className={icon} icon="clock" />
                        <span>
                          {movie.runtime}
                          {' '}
                          min
                        </span>
                      </p>

                      <p className={mainDetails}>
                        <FontAwesomeIcon className={icon} icon="calendar-alt" />
                        <span>{formatDate(movie.release_date)}</span>
                      </p>
                    </div>

                    <p>
                      <FontAwesomeIcon className={greenIcon} icon="money-check-alt" />
                      <span>Budget: </span>
                      <b>
                        {' '}
                        {fm.from(movie.budget, { symbol: '$' })}
                      </b>
                    </p>

                    <p>
                      <FontAwesomeIcon className={greenIcon} icon="dollar-sign" />
                      <span>Revenue: </span>
                      <b>{fm.from(movie.revenue, { symbol: '$' })}</b>
                    </p>

                  </div>

                  <div className={ratingDetails}>
                    <ReactStars
                      classNames="stars"
                      value={movie.vote_average / 2}
                      isHalf
                      edit={false}
                      count={5}
                      onChange={() => {}}
                      size={24}
                      activeColor="var(--white)"
                    />
                    <p className={votesDetails}>
                      <b>
                        {movie.vote_average}
                        /10
                        {' '}
                      </b>
                      -
                      <span>
                        {' '}
                        <b>{movie.vote_count}</b>
                        {' '}
                        votes
                      </span>
                    </p>
                  </div>
                </div>

                <div className={synopsis}>
                  <h2 className={synopsisTitle}>Synopsis</h2>
                  <p className={synopsisText}>
                    {movie.overview}
                    <a className={watchDetails} href={movie.homepage}> Watch</a>
                  </p>

                </div>

              </div>

              <Carousel
                className={videosCarousel}
                showThumbs={false}
              >
                {mapVideos(movie.videos.results)}
              </Carousel>

              <div className={producerList}>
                {mapProducers(movie.production_companies)}
              </div>

            </>
            )}
    </div>
  );
};

export default MovieShow;
