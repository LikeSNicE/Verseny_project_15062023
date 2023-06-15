import React, { useEffect, useState } from 'react'
import ConcursService from '../../../services/concursService';
import LoadingCustom from '../../../Components/LoadingCustom/LoadingCustom';


export const image = ["png","jpg","jpeg"];
export const video = ["mp4"];
export const music = ["mp3"];


export default function FileModal({path}) {
    const [url,setUrl] = useState("");
    const [isLoading,setIsLoading] = useState(true);
    const pathType = path.split(".").pop();
    useEffect(() => {
        ConcursService.GetFileContest(path).then(res => {
            setUrl(res.data[0].link);
            setIsLoading(false);
        });
    },[]);

    if(isLoading){
        return <LoadingCustom/>
    }
    if(image.includes(pathType)){
        return <img src={url} alt="img" style={{width:"100%"}} />
    }
    if(video.includes(pathType)){
        return <video src={url} style={{width:"100%"}} controls></video>
    }
    if(music.includes(pathType)){
        return <audio src={url} style={{width:"100%"}} controls></audio>
    }
}
