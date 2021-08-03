import { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchContent } from '../../actions/index';
import {imagesURL} from '../../API';
import ReactStars from "react-rating-stars-component";
import { list, listItem, title, poster, itemDetails, home } from '../../styles/Home.module.css';

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
                            <span className={title}>{item.title}</span>
                            <ReactStars
                                value={item.vote_average/2}
                                isHalf
                                count={5}
                                onChange={() => {}}
                                size={24}
                                activeColor="#ffd700"
                            />
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