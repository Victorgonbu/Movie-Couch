import { backdropContainer, backdrop, 
    movieTitle, movieTagline, movieHeader,
    genresList, genreSpan } from '../../styles/Movie.module.css';
import { backdropURL } from '../../API';

const Backdrop = (props) => {
    const {backdropPath, title, tagline, genres} = props;
    return(
        <div className={backdropContainer}>
            <img 
            className={backdrop} 
            alt="backdrop" 
            src={`${backdropURL}${backdropPath}`}/>
            <div className={movieHeader}>
                <p className={movieTitle}>{title}</p>
                <span className={movieTagline} >{tagline}</span>
            </div>
            <p className={genresList}>
                {genres.map((genre) => <span className={genreSpan}>{genre.name} </span>)}
            </p>
        </div>
    );
};

export default Backdrop;