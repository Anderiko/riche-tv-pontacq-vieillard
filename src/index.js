import React from 'react';
import ReactDOM from 'react-dom/client';
import './style/index.css';
import App from './components/App';

const labels = [
    { name: 'San Francisco', lat: 37.7749, lng: -122.4194 },
    { name: 'Los Angeles', lat: 34.0522, lng: -118.2437 },
    { name: 'New York', lat: 40.7128, lng: -74.0060 },
];

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Map labels={labels}/>
);
