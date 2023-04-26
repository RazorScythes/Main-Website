import React, { useEffect, useState } from 'react'
import styles from "../../style";
import VideoThumbnail from '../VideoThumbnail';

const getVideoId = (url) => {
    let videoId;
    const youtubeMatch = /^(?:https?:\/\/)?(?:www\.)?(?:m\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=))([\w-]{11})(?:\S+)?$/;
    const dropboxMatch = /^(?:https?:\/\/)?(?:www\.)?dropbox\.com\/(?:s|sh)\/([\w\d]+)(?:\/.*)?$/;
    const megaMatch = /^(?:https?:\/\/)?mega\.(?:co\.nz|nz|io)\/(?:#!\/)?(?:file|enc|f)!([a-zA-Z0-9!_-]{8,})(?:\S+)?$/;
    const googleDriveMatch = /^(?:https?:\/\/)?drive.google.com\/(?:file\/d\/|open\?id=)([^/&?#]+)/;
  
    if (youtubeMatch.test(url)) {
      videoId = url.match(youtubeMatch)[1];
    } else if (dropboxMatch.test(url)) {
      videoId = url.match(dropboxMatch)[1];
    } else if (megaMatch.test(url)) {
      videoId = url.match(megaMatch)[1];
    } else if (googleDriveMatch.test(url)) {
      videoId = url.match(googleDriveMatch)[1];
    } else {
      videoId = null;
    }
    return videoId;
};

const Videos = () => {
    const [active, setActive] = useState(0)
    return (
        <div
            className="relative bg-cover bg-center py-8"
            style={{ backgroundColor: "#111827" }}
        >   
            <div className={`${styles.flexCenter}`}>
                <div className='grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 grid-cols-1 gap-5 place-content-start sm:px-16 py-8'>
                    <VideoThumbnail index={0} setActive={setActive} active={active} embedLink={getVideoId('https://drive.google.com/file/d/1fGNqeCMLV6oz4Kzk6KaFOygjXrYO-J_R/preview')}/>
                    <VideoThumbnail index={1} setActive={setActive} active={active} embedLink={getVideoId('https://drive.google.com/file/d/1fGNqeCMLV6oz4Kzk6KaFOygjXrYO-J_R/preview')}/>
                    <VideoThumbnail index={2} setActive={setActive} active={active} embedLink={getVideoId('https://drive.google.com/file/d/1fGNqeCMLV6oz4Kzk6KaFOygjXrYO-J_R/preview')}/>
                    <VideoThumbnail index={3} setActive={setActive} active={active} embedLink={getVideoId('https://drive.google.com/file/d/1fGNqeCMLV6oz4Kzk6KaFOygjXrYO-J_R/preview')}/>
                    <VideoThumbnail index={4} setActive={setActive} active={active} embedLink={getVideoId('https://drive.google.com/file/d/1fGNqeCMLV6oz4Kzk6KaFOygjXrYO-J_R/preview')}/>
                </div>
            </div>
        </div>
    )
}

export default Videos