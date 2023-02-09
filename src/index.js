import React from 'react';
import ReactDOM from 'react-dom/client';
import {Movie} from './components/Movie';
import {Map} from './components/Map';
import {Chat} from './components/Chat';
import './style/index.css';
import App from './components/App';
import reportWebVitals from './reportWebVitals';

const labels = [
    { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
    { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Map labels={labels}/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
