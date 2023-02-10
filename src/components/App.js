import '../style/App.css';
import React, {useEffect, useState} from 'react';
import {Map} from './Map';
import {Chat} from './Chat';
import {Movie} from './Movie';

export function App() {
    const [tabShown, setTabShown] = useState(0)
    const [data, setData] = useState(null)
    const [moment, setMoment] = useState(-1)
    const [time, setTime] = useState(0)

    useEffect(() => {
        fetch("https://imr3-react.herokuapp.com/backend")
            .then(res => res.json())
            .then(data => setData(data))
    }, [])

    const onMomentCallback = (moment) => {
        setMoment(moment)
    }

    const onVideoTimestampCallback = (time) => {
        console.log("Time changed : ", time)
        // setTime(time)
    }

    return (
        <div className="App">
            <div className="movie-container">
                <Movie Film={data ? data["Film"] : null}
                       Chapters={data ? data["Chapters"] : null}
                       Keywords={data ? data["Keywords"] : null}
                       onMomentClicked={moment}
                       momentCallback={onMomentCallback}
                       onVideoTimestampCallback={onVideoTimestampCallback}
                />
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
                        <Chat momentCallback={onMomentCallback}/>
                    </div>

                    <div className={`map-container ${tabShown === 1 ? "active" : ""}`}>
                        <Map position={[37.33462649252493, -122.00897348937217]}
                             Waypoints={data ? data["Waypoints"] : null}
                             momentCallback={onMomentCallback}/>
                    </div>
                </div>
            </div>
        </div>
    )
}
