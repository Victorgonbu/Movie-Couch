import { useEffect } from 'react';
import WebFont from 'webfontloader';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './containers/Home';
import Navbar from './containers/Navbar';
require('dotenv').config()

function AppRouter() {
  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Kanit:light, regular, bold']
      }
    });
  }, []);
  return (
    <Router>
      <Navbar/>
      <Switch>
        <Route exact path="/" component={Home}/>
      </Switch>
    </Router>
  );
}

export default AppRouter;
