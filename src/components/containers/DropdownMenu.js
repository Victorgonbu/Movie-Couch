import { dropdownMenu } from '../../styles/Dropdown.module.css';
import { useEffect} from 'react';
import { connect } from 'react-redux';
import { fetchGenresList } from '../../actions';

const DropdownMenu = (props) => {
    const { genres, fetchGenres } = props;
    useEffect(() => {
        fetchGenres();
    }, [fetchGenres])

    return(
        <ul className={dropdownMenu}>
           {genres 
           &&
           <>
            <li>Popular</li>
            <li>Top Rated</li>
            {genres.map((genre) => <li key={genre.id}>{genre.name}</li>)}
           </>
           }
            
        </ul>
    )
};

const mapStateToProps = (state) => {
    return {
        genres: state.genres.list
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        fetchGenres: () => {dispatch(fetchGenresList)}
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DropdownMenu);