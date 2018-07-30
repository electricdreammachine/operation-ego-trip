import React from 'react';
import ReactDOM from 'react-dom';
import './common/styles/index.css';
import Portfolio from './components';

ReactDOM.render(<Portfolio boundingElement={document.documentElement} />, document.getElementById('root'));
