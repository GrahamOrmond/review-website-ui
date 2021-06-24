import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';
import { closeAllDropDownMenus } from './helpers/generalHelper';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);


// close any dropdown if the user clicks outside of it
window.onclick = function(event) {
  closeAllDropDownMenus(event)
}
