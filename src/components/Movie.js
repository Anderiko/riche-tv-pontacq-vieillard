import React, {useEffect, useRef, useState} from "react";
import {useDispatch} from "react-redux";

export function Movie(props) {
    const dispatch = useDispatch()
    const [videoHeight, setVideoHeight] = useState(0)
    const [chaptersElt, setChaptersElt] = useState(null)
    const [videoListener, setVideoListener] = useState(false)

    const videoRef = useRef()

    const handleLoad = () => {
        // console.log("Set height : " + videoRef.current.offsetHeight)
        setVideoHeight(videoRef.current.offsetHeight);
    };

    const handleTimeChange = () => {
        // if (videoRef.current) setTime(videoRef.current.currentTime)
        dispatch({type: 'SET_VIDEO_TIME', time: videoRef.current.currentTime})
    }

    useEffect(() => {

        return () => {
            if (videoRef.current) {
                videoRef.current.removeEventListener('resize', handleLoad);
                videoRef.current.removeEventListener('timeupdate', handleTimeChange);
            }
            window.removeEventListener('resize', handleLoad);
        };

    }, []);

    useEffect(() => {
        let ref = videoRef.current
        if (ref && !videoListener) {
            ref.addEventListener('resize', handleLoad);
            ref.addEventListener('timeupdate', handleTimeChange);
            window.addEventListener('resize', handleLoad);
            setVideoListener(true)
        }
    }, [videoRef]);

    useEffect(() => {
        if (videoRef.current && chaptersElt) {
            const remainingHeight = window.innerHeight - videoHeight;
            chaptersElt.style.maxHeight = `${remainingHeight}px`;
        }
    }, [videoHeight])

    useEffect(() => {
        if (props.onMomentClicked !== -1) {
            setVideoTimestamp(props.onMomentClicked)
            props.momentCallback(-1)
        }
    }, [props.onMomentClicked])

    const setVideoTimestamp = (timestamp) => {
        if (videoRef.current) videoRef.current.currentTime = timestamp
    }

    return (
        <div className="movie">
            <video ref={videoRef} controls src={props.Film ? props.Film["file_url"] : null} />
            <ul ref={ref => setChaptersElt(ref)}>
                {
                    props.Chapters ? props.Chapters.map(chapter => (
                        <li key={chapter.pos} onClick={() => setVideoTimestamp(chapter.pos)}>
                            {chapter.title}
                        </li>
                    )) : "No chapters found."
                }
            </ul>
        </div>
    )
}
