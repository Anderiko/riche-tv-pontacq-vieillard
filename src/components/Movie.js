import React, {useEffect, useRef, useState} from "react";

export function Movie() {

    const [data, setData] = useState(null)
    const [videoHeight, setVideoHeight] = useState(0)
    const [videoPlayer, setVideoPlayer] = useState(null)
    const [chaptersElt, setChaptersElt] = useState(null)
    const [videoListener, setVideoListener] = useState(false)

    const handleLoad = () => {
        console.log("Set height : " + videoPlayer.offsetHeight)
        setVideoHeight(videoPlayer.offsetHeight);
    };

    useEffect(() => {

        fetch("https://imr3-react.herokuapp.com/backend")
            .then(res => res.json())
            .then(data => setData(data))

        return () => {
            if (videoPlayer) videoPlayer.removeEventListener('resize', handleLoad);
            window.removeEventListener('resize', handleLoad);
        };

    }, []);

    useEffect(() => {
        if (videoPlayer && !videoListener) {
            videoPlayer.addEventListener('resize', handleLoad);
            window.addEventListener('resize', handleLoad);
            setVideoListener(true)
        }
    }, [videoPlayer]);

    useEffect(() => {
        if (videoPlayer && chaptersElt) {
            const remainingHeight = window.innerHeight - videoHeight;
            chaptersElt.style.maxHeight = `${remainingHeight}px`;
        }
    }, [videoHeight])

    const chapterHandle = (timestamp) => {
        if (videoPlayer) videoPlayer.currentTime = timestamp
    }

    return (
        <div className="movie">
            <video ref={ref => setVideoPlayer(ref)} controls src={data ? data["Film"]["file_url"] : null} />
            <ul ref={ref => setChaptersElt(ref)}>
                {
                    data ? data["Chapters"].map(chapter => (
                        <li key={chapter.pos} onClick={() => chapterHandle(chapter.pos)}>
                            {chapter.title}
                        </li>
                    )) : ""
                }
            </ul>
        </div>
    )
}
