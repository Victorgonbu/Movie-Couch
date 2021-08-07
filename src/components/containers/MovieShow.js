import { useEffect, useState } from 'react';
import { movieURL,backdropURL } from '../../API';
import axios from '../../axios';
import { movieContainer, backdrop, backdropContainer, detailsContainer } from '../../styles/Movie.module.css';
import { FormatMoney } from 'format-money-js';
import ReactStars from 'react-rating-stars-component';
import Backdrop from '../movie/Backdrop';

const MovieShow = (props) => {
    const {location} = props;
    const movieID = location.pathname.split('/')[2];
    const url = movieURL + movieID + '?append_to_response=videos';
    const [movie, setMovie] = useState(null);
    const fm = new FormatMoney();

    useEffect(() => {
        async function makeRequest () {
            console.log(url)
            const request = await axios.get(url); 
            console.log(request)
            setMovie(request.data);
        }
        makeRequest();
        
    }, [url]);
    return(
        <div className={movieContainer}>
            {movie 
            &&
                <>
                    <Backdrop 
                    title={movie.title} 
                    tagline={movie.tagline}
                    backdropPath={movie.backdrop_path}
                     />

                    <div className={detailsContainer}>
                        <p><span>Budget:</span>
                        {fm.from(movie.budget, { symbol: '$' })}
                        </p>
                        <p><span>Genres:</span>
                        {movie.genres.map((genre) => <span>{genre.name} </span>)}
                        </p>

                        <a href={movie.homepage}>Home page</a>

                        <p>{movie.overview}</p>

                        <p> <span>Produced by:</span>
                        {movie.production_companies.map((comp) => {
                            return <span>{comp.name}</span>
                        })}</p>

                        <p>{movie.release_date}</p>

                        <p>{fm.from(movie.revenue, { symbol: '$' })}</p>

                        <p>
                            <span>Duration:</span>
                            <span>{movie.runtime} min</span>
                        </p>

                        <p><span>Status:</span>
                            <span>{movie.status}</span>
                        </p>

                        <div>
                            <ReactStars
                            classNames="stars"
                            value={movie.vote_average/2}
                            isHalf
                            edit={false}
                            count={5}
                            onChange={() => {}}
                            size={24}
                            activeColor="var(--white)"
                                    />
                            <span>{movie.vote_average}</span>
                        </div>

                    </div>
                </>
            }
        </div>
    );
};

export default MovieShow;