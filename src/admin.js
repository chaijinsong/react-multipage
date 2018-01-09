import React from 'react';
import ReactDOM from 'react-dom';
import Nav from './publicComponents/Nav';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Nav />, document.getElementById('root'));
registerServiceWorker();
