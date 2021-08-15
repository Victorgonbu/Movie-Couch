import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useLocation } from 'react-router-dom';
import Details from '../movie_show/Details';
import { movieURL, imagesURL } from '../../API';
import axios from '../../axios';
import {
  movieContainer, producerList, producerItem, producerLogo,
  producerName, videoFrame, videosCarousel,
} from '../../styles/Movie.module.css';
import Backdrop from '../movie_show/Backdrop';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

const MovieShow = () => {
  const location = useLocation();
  const movieID = location.pathname.split('/')[2];
  const url = `${movieURL + movieID}?append_to_response=videos`;
  const [movie, setMovie] = useState(null);

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
              <Details movie={movie} />
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
