import { backdropContainer, backdrop } from '../../styles/Movie.module.css';
import { backdropURL } from '../../API';

const Backdrop = (props) => {
    const {backdropPath, title, tagline} = props;
    return(
        <div className={backdropContainer}>
        <img 
        className={backdrop} 
        alt="backdrop" 
        src={`${backdropURL}${backdropPath}`}/>
        <p>{title}</p>
        <p >{tagline}</p>
        </div>
    );
};

export default Backdrop;