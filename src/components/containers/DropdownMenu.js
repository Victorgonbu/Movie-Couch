import { dropdownMenu } from '../../styles/Dropdown.module.css';
import axios from '../../axios';
import { useEffect, useState } from 'react';
import { genresURL } from '../../API';

const DropdownMenu = () => {
    const [genres, setGenres] = useState(null);

    useEffect(() => {
        if(!genres) {
            const request = axios.get(genresURL);
            request
            .then((response) => {
                console.log(response)
                setGenres(response.data.genres)
            })
            .catch((error) => {
                console.log(error)
            })
        }

        console.log(genres)

    }, [genres])

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

export default DropdownMenu;