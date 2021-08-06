import { useEffect } from 'react';
import WebFont from 'webfontloader';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './containers/Home';
import Navbar from './containers/Navbar';
import SearchBox from './containers/SearchBox';
import { connect } from 'react-redux';

require('dotenv').config()

function AppRouter(props) {
  const { contentURL } = props;
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Manrope:light, medium, bold', 'Monoton']
      }
    });
  }, []);

  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [contentURL]);

  return (
    <Router>
      <Navbar />
      <SearchBox />
      <Switch>

        <Route exact path="/" component={Home}/>
      </Switch>
    </Router>
  );
}

const mapStateToProps = (state) => {
  return {
    contentURL: state.filter.contentURL,
  }
};

export default connect(mapStateToProps)(AppRouter);
