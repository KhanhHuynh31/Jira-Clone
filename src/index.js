import React from 'react'
import ReactDOM from 'react-dom/client';
import './index.css'
import App from './App'
import reportWebVitals from './reportWebVitals';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'
import { history } from './util/history'
import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom";
//Setup redux
import { Provider } from 'react-redux'
import store from './redux/configStore'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HistoryRouter history={history}>
    <Provider store={store}>
      <App />
    </Provider>
  </HistoryRouter>,
);
reportWebVitals();