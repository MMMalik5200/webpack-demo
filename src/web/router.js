import Loadable from 'react-loadable';
import Loading from './components/Loading';

const Home = Loadable({
  loader: () => import('./pages/Home'),
  loading: Loading
});

const Me = Loadable({
  loader: () => import('./pages/Me'),
  loading: Loading,
  delay: 20000
});

const routes = [
  {
    path: '/',
    exact: true,
    component: Home,
    name: 'home'
  },
  {
    path: '/me',
    exact: true,
    component: Me,
    name: 'me'
  }
];

export default routes;
