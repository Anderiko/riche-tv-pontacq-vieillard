import React from 'react';
import ReactDOM from 'react-dom/client';
import {Movie} from './components/Movie';
import {Map} from './components/Map';
import {Chat} from './components/Chat';
import './style/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Map position={[37.763027, -122.487701]}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
