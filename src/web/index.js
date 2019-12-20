import React from 'react';
import ReactDOM from 'react-dom';
// import * as reactRedux from 'react-redux';
import { Provider } from 'react-redux';
import store from './store';
import App from './App';
// import bundle from './0.bundle';

// console.log(bundle);
// bundle(file => {
//   const file =
// })

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
