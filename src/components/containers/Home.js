import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroller';
import PropTypes from 'prop-types';
import {
  fetchContent, fetchMoreContent, setCurrentPage,
  setDidNavigate,
} from '../../actions/index';
import { list, home, noMatches } from '../../styles/Home.module.css';
import MovieThumb from '../presentationals/MovieThumb';

const Home = (props) => {
  const {
    currentFilter, fetchContent, content, fetchMoreContent,
    contentURL, setPage, didNavigate, setDidNavigate,
  } = props;

  let mounted = true;
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => () => {
    mounted = false;
  }, []);

  useEffect(() => {
    if (currentFilter && mounted && !didNavigate)fetchContent(currentFilter);
    setDidNavigate(false);
  }, [currentFilter, fetchContent]);

  useEffect(() => {
    if (mounted && !didNavigate) {
      setPage(2);
      setHasMore(true);
    }
  }, [contentURL]);

  const loadMoreContent = () => {
    fetchMoreContent(setHasMore);
  };

  return (
    <div className={home}>
      <InfiniteScroll
        loadMore={loadMoreContent}
        hasMore={hasMore}
        initialLoad={false}
      >
        <ul className={list}>

          {content
           && content.map((item, index) => {
             const key = item.id + index;
             return <MovieThumb key={key} value={item} />;
           })}
        </ul>
      </InfiniteScroll>
      {content && content.length === 0 && <p className={noMatches}>No matches found</p>}
    </div>
  );
};

Home.propTypes = {
  currentFilter: PropTypes.string,
  fetchContent: PropTypes.func.isRequired,
  content: PropTypes.arrayOf(PropTypes.object),
  fetchMoreContent: PropTypes.func.isRequired,
  contentURL: PropTypes.string,
  setPage: PropTypes.func.isRequired,
  didNavigate: PropTypes.bool.isRequired,
  setDidNavigate: PropTypes.func.isRequired,
};

Home.defaultProps = {
  currentFilter: null,
  content: null,
  contentURL: null,
};

const mapStateToProps = (state) => ({
  currentFilter: state.filter.current,
  content: state.filter.content,
  contentURL: state.filter.contentURL,
  didNavigate: state.filter.didNavigate,
});

const mapDispatchToProps = (dispatch) => ({
  fetchContent: (filter) => { dispatch(fetchContent(filter)); },
  fetchMoreContent: (setHasMore) => {
    dispatch(fetchMoreContent(setHasMore));
  },
  setPage: (page) => { dispatch(setCurrentPage(page)); },
  setDidNavigate: (bool) => { dispatch(setDidNavigate(bool)); },
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
