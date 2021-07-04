import React from 'react';
import ReactDOM from 'react-dom';
import CRUD from './CRUD';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<CRUD />, document.getElementById('root'));
registerServiceWorker();
