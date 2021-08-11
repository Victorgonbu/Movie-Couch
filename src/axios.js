import axios from 'axios';

axios.defaults.baseURL = 'https://api.themoviedb.org/3';
axios.defaults.headers.common = { Authorization: `Bearer ${process.env.REACT_APP_ACCESS_TOKEN}` };
export default axios;
