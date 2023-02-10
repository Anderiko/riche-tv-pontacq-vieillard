import React, {useEffect, useRef, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import '../style/Movie.css'

export function Movie(props) {
    const dispatch = useDispatch()
    const videoTime = useSelector((state) => state.videoTime)
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
            <video ref={videoRef} controls src={props.Film ? props.Film["file_url"] : null}/>
            <ul ref={ref => setChaptersElt(ref)} className="chapters">
                {
                    props.Chapters ? props.Chapters.map(chapter => (
                        <li key={`chapter_${chapter.pos}`} onClick={() => setVideoTimestamp(chapter.pos)}
                            className={`
                            ${props.Chapters
                                .filter(chapter => chapter.pos <= videoTime)
                                .slice(-1)[0].pos === chapter.pos ? "active" : "" }`}>
                            {chapter.title}
                        </li>
                    )) : "No chapters found."
                }
            </ul>

            <ul className="keywords">
                {
                    props.Keywords ? props.Keywords
                        .filter(keyword => keyword.pos <= videoTime)
                        .slice(-1)
                        .map(keyword => (
                            <li key={`keyword_${keyword.pos}`}
                                className={`${videoTime < keyword.pos ? "" : "active"}`}>
                                {
                                    keyword.data.map((data, index) => (
                                        <a href={data.url} key={`link_${index}`} target="_blank">{data.title}</a>
                                    ))
                                }
                            </li>
                        )) : "No keywords found"
                }
            </ul>
        </div>
    )
}
