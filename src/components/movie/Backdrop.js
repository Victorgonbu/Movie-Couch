import { backdropContainer, backdrop, 
    movieTitle, movieTagline, movieHeader,
    genresList, genreSpan } from '../../styles/Movie.module.css';
import {backButton} from '../../styles/Navbar.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {useNavigate} from 'react-router-dom';

import { backdropURL } from '../../API';

const Backdrop = (props) => {
    const {backdropPath, title, tagline, genres} = props;
    const navigate = useNavigate();

    return(
        <div className={backdropContainer}>
            <img 
            className={backdrop} 
            alt="backdrop" 
            src={`${backdropURL}${backdropPath}`}/>
            <button className={backButton}
            onClick={() => navigate(-1)}
            >
                <FontAwesomeIcon icon='arrow-left' />
            </button>
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