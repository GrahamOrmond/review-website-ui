import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { store } from './store/store';
import { Provider } from 'react-redux';

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

  let target = event.target.closest(".app-dropdown");
  if(target != null)
    return;

  var dropdowns = document.getElementsByClassName("dropdown-content");
  for (let i = 0; i < dropdowns.length; i++) {
    var openDropdown = dropdowns[i];
    if (openDropdown.classList.contains('active')) {
      openDropdown.classList.remove('active');
    }
  }
}
