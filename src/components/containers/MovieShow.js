import { useEffect, useState } from 'react';
import { movieURL } from '../../API';
import axios from '../../axios';
import { movieContainer, detailsContainer, topLeft, 
    ratingDetails, votesDetails, mainDetails, icon, topDetails, greenIcon } from '../../styles/Movie.module.css';
import { FormatMoney } from 'format-money-js';
import ReactStars from 'react-rating-stars-component';
import Backdrop from '../movie/Backdrop';
import { flex } from '../../styles/App.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { formatDate } from '../utils/index';
 
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
                    genres={movie.genres}
                     />

                    <div className={detailsContainer}>

                        <div className={topDetails}>
                            

                            <div className={topLeft}>
                            
                            <div className={flex}>
                                <p className={mainDetails}>
                                    <FontAwesomeIcon className={icon} icon="clock"/>
                                    <span>{movie.runtime} min</span>
                                </p>

                                <p className={mainDetails}>
                                    <FontAwesomeIcon className={icon} icon="calendar-alt" />
                                    <span>{formatDate(movie.release_date)}</span>
                                </p>
                            </div>

                            <p>
                                <FontAwesomeIcon className={greenIcon} icon="money-check-alt"/>
                                <span>Budget: </span>
                                <b> {fm.from(movie.budget, { symbol: '$' })}</b>
                            </p>

                            <p>
                                <FontAwesomeIcon className={greenIcon} icon="dollar-sign"/>
                                <span>Revenue: </span>
                                <b>{fm.from(movie.revenue, { symbol: '$' })}</b>
                            </p>

                            </div>

                            <div className={ratingDetails}>
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
                                <p className={votesDetails}>
                                    <b>{movie.vote_average}/10 </b>
                                    -
                                    <span> <b>{movie.vote_count}</b> votes</span>
                                </p>
                            </div>
                        </div>
        

                        <a href={movie.homepage}>Home page</a>

                        <p>{movie.overview}</p>

                        <p> <span>Produced by:</span>
                        {movie.production_companies.map((comp) => {
                            return <span>{comp.name}</span>
                        })}</p>

                        
                        <p><span>Status:</span>
                            <span>{movie.status}</span>
                        </p>

                        

                    </div>
                </>
            }
        </div>
    );
};

export default MovieShow;