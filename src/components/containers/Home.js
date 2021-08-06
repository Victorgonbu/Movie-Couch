import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchContent, fetchMoreContent } from '../../actions/index';
import {imagesURL} from '../../API';
import ReactStars from "react-rating-stars-component";
import { list, listItem, title, poster, itemDetails, home, starRate, date, rating, moreDetails, noMatches } from '../../styles/Home.module.css';
import { formatDate } from '../utils/index';
import InfiniteScroll from 'react-infinite-scroller';

const Home = (props) => {
    const {currentFilter, fetchContent, content, fetchMoreContent, contentURL} = props;
    const [hasMore, setHasMore] = useState(true);
    const [page, setPage] = useState(2);
    useEffect(() => {
        fetchContent(currentFilter);
        
    }, [currentFilter, fetchContent]);

    useEffect(() => {
        return () => {
            setPage(2);
            setHasMore(true);
         }
    },[contentURL])
    
    const loadMoreContent = () => {
        fetchMoreContent(page, setHasMore, setPage);
    };

    return(
    <div className={home}>
        <InfiniteScroll
           loadMore={loadMoreContent}
           hasMore={hasMore}
           initialLoad={false}
        >
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
        </InfiniteScroll>
        {content && content.length === 0 && <p className={noMatches}>No matches found</p>}
    </div>
    )
};


const mapStateToProps = (state) => {
    return {
        currentFilter: state.filter.current,
        content: state.filter.content,
        contentURL: state.filter.contentURL
    }
};


const mapDispatchToProps = (dispatch) => {
    return {
        fetchContent: (filter) => {dispatch(fetchContent(filter))},
        fetchMoreContent: (page, setHasMore, setPage) => {dispatch(fetchMoreContent(page, setHasMore, setPage))},
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Home);