import { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import { useLocation } from 'react-router-dom';
import Details from '../presentationals/movie_show/Details';
import Backdrop from '../presentationals/movie_show/Backdrop';
import Producers from '../presentationals/movie_show/Producers';
import { movieURL } from '../../API';
import axios from '../../axios';
import {
  movieContainer, videoFrame, videosCarousel,
} from '../../styles/Movie.module.css';
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

              <Producers list={movie.production_companies} />

            </>
            )}
    </div>
  );
};

export default MovieShow;
