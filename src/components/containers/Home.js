import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchContent } from '../../actions/index';
import {imagesURL} from '../../API';
import ReactStars from "react-rating-stars-component";
import { list, listItem, title, poster, itemDetails, home, starRate, date, rating, moreDetails } from '../../styles/Home.module.css';
import { formatDate } from '../utils/index';

const Home = (props) => {
    const {currentFilter, fetchContent, content} = props;

    useEffect(() => {
        fetchContent(currentFilter);    
    }, [currentFilter, fetchContent]);

    return(
    <div className={home}>
        <ul className={list}>
            {content 
            &&
                content.map((item) => {
                    return (
                    <li className={listItem} key={item.id}>
                        
                        <img className={poster} alt="poster" src={`${imagesURL}${item.poster_path}`} />
                        <div className={itemDetails}>
                            <p className={title}>{item.title}</p>
                            <p className={date}>{formatDate(item.release_date)}</p>
                            <button className={moreDetails}>More Details</button>
                            <ReactStars
                                classNames={starRate}
                                value={item.vote_average/2}
                                isHalf
                                edit={false}
                                count={5}
                                onChange={() => {}}
                                size={24}
                                activeColor="var(--white)"
                            />
                            <span className={rating}>{item.vote_average}/10</span>
                        </div>
                    </li>)
                })
            }
        </ul>
    </div>
    )
};


const mapStateToProps = (state) => {
    return {
        currentFilter: state.filter.current,
        content: state.filter.content,
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        fetchContent: (filter) => {dispatch(fetchContent(filter))}      
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);