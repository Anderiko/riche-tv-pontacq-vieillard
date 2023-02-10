import '../style/App.css';
import React, {useState, useEffect, useRef} from 'react';
import {Map} from './Map';
import {Chat} from './Chat';
import {Movie} from './Movie';

export function App () {
    const [tabShown, setTabShown] = useState(0)

    return (
        <div className="App">
            <div className="movie-container">
                <Movie/>
            </div>

            <div className="tabs-container">
                <ul className="tab-header">
                    <li
                        className={`tab-item ${tabShown === 0 ? "active" : ""}`}
                        onClick={() => setTabShown(0)}>
                        Chat
                    </li>

                    <li
                        className={`tab-item ${tabShown === 1 ? "active" : ""}`}
                        onClick={() => setTabShown(1)}>
                        Map
                    </li>
                </ul>

                <div className="tab-content">
                    <div className={`chat-container ${tabShown === 0 ? "active" : ""}`}>
                        <Chat/>
                    </div>

                    <div className={`map-container ${tabShown === 1 ? "active" : ""}`}>
                        <Map position={[37.33462649252493, -122.00897348937217]}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
