import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Home from './containers/Home';
import Navbar from './containers/Navbar';
require('dotenv').config()

function AppRouter() {
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
