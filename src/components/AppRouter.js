import { useEffect } from 'react';
import WebFont from 'webfontloader';
import { useRoutes } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home';
import Navbar from './containers/Navbar';
import MovieShow from './containers/MovieShow';

require('dotenv').config();

function AppRouter(props) {
  const { contentURL } = props;
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Manrope:light, medium, bold', 'Monoton'],
      },
    });
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [contentURL]);

  const routes = useRoutes([
    {
      path: '/',
      element: <Navbar />,
      children: [
        { element: <Home /> },
        { path: 'movie/:id', element: <MovieShow /> },
      ],
    },

  ]);

  return routes;
}

const mapStateToProps = (state) => ({
  contentURL: state.filter.contentURL,
});

export default connect(mapStateToProps)(AppRouter);
