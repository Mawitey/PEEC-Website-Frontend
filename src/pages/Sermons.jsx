// // function Sermons() {
// //     return (
// //         <div className="page-container">
// //             <h1>Recent Sermons</h1>
// //             <div className="card">
// //                 <h3>Jesus is Lord</h3>
// //                 <small>Pastor Nega — 2025-12-24</small>
// //             </div>
// //             <div className="card">
// //                 <h3>Faith and Hope</h3>
// //                 <small>Pastor Mulgeta — 2025-12-17</small>
// //             </div>
// //         </div>
// //     );
// // }
// //
// // export default Sermons;
//
//
// // export default function Sermons() {
// //     return (
// //         <div className="page sermons-page">
// //             <h1>Sermons</h1>
// //
// //             <div className="sermon-video">
// //                 <iframe width="560" height="315" src="https://www.youtube.com/embed/_vdbDOWceEg?si=LofHWmsYP5eDsE-n"
// //                         title="YouTube video player" frameBorder="0"
// //                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
// //                         referrerPolicy="strict-origin-when-cross-origin"
// //                         allowFullScreen></iframe>
// //                 <iframe width="560" height="315" src="https://www.youtube.com/embed/TC3UFylbt4Q?si=JChvrSAoVaDcShu-"
// //                         title="YouTube video player" frameBorder="0"
// //                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
// //                         referrerPolicy="strict-origin-when-cross-origin"
// //                         allowFullScreen></iframe>
// //                 <iframe width="560" height="315" src="https://www.youtube.com/embed/_ubxnyQPMZ0?si=WcAWM9CIOj_aqB9k"
// //                         title="YouTube video player" frameBorder="0"
// //                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
// //                         referrerPolicy="strict-origin-when-cross-origin"
// //                         allowFullScreen></iframe>
// //                 <iframe width="560" height="315" src="https://www.youtube.com/embed/25DCjR89Oeo?si=Ea_wJ2HVcCN4gMek"
// //                         title="YouTube video player" frameBorder="0"
// //                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
// //                         referrerPolicy="strict-origin-when-cross-origin"
// //                         allowFullScreen></iframe>
// //                 <iframe width="560" height="315" src="https://www.youtube.com/embed/qHMXyyQ5rMg?si=tBfFUU3S9S83fVw2"
// //                         title="YouTube video player" frameBorder="0"
// //                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
// //                         referrerPolicy="strict-origin-when-cross-origin"
// //                         allowFullScreen></iframe>
// //                 <iframe width="560" height="315" src="https://www.youtube.com/embed/l8E5OvI6vv8?si=vYdUXTCLLY7ZuZBo"
// //                         title="YouTube video player" frameBorder="0"
// //                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
// //                         referrerPolicy="strict-origin-when-cross-origin"
// //                         allowFullScreen></iframe>
// //                 <iframe width="560" height="315" src="https://www.youtube.com/embed/7eK47iTw-oQ?si=zdNLszY1pU1R8TyY"
// //                         title="YouTube video player" frameBorder="0"
// //                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
// //                         referrerPolicy="strict-origin-when-cross-origin"
// //                         allowFullScreen></iframe>
// //             </div>
// //         </div>
// //     );
// // }

import { useEffect, useState } from "react";

export default function Sermons() {
    const [videos, setVideos] = useState([]);
    const [status, setStatus] = useState("Loading...");

    useEffect(() => {
        console.log("Sermons page mounted -> fetching videos...");

        fetch("http://18.223.121.64:8080/api/sermons/youtube")
            .then(async (res) => {
                console.log("Fetch status:", res.status);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                console.log("Full response:", data);
                console.log("Items:", data.items);
                setVideos(data.items || []);
                setStatus(`Loaded ${data.items?.length || 0} videos`);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setStatus("Failed to load videos");
            });
    }, []);

    return (
        <div className="sermons-page">
            <h1>Latest Sermons</h1>
            <p>{status}</p>

            <div className="youtube-videos">
                {videos.map((v) => (
                    <div className="video-card" key={v.id?.videoId}>
                        <h3>{v.snippet?.title}</h3>
                        <p>{new Date(v.snippet?.publishedAt).toLocaleString()}</p>
                        <a
                            href={`https://www.youtube.com/watch?v=${v.id?.videoId}`}
                            target="_blank"
                            rel="noreferrer"
                        >
                            Watch on YouTube
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
}

