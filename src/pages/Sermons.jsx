// export default function Sermons() {
//     return (
//         <div className="page sermons-page">
//             <h1>Sermons</h1>
//
//             <div className="sermon-video">
//                 <iframe width="560" height="315" src="https://www.youtube.com/embed/_vdbDOWceEg?si=LofHWmsYP5eDsE-n"
//                         title="YouTube video player" frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                         referrerPolicy="strict-origin-when-cross-origin"
//                         allowFullScreen></iframe>
//                 <iframe width="560" height="315" src="https://www.youtube.com/embed/TC3UFylbt4Q?si=JChvrSAoVaDcShu-"
//                         title="YouTube video player" frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                         referrerPolicy="strict-origin-when-cross-origin"
//                         allowFullScreen></iframe>
//                 <iframe width="560" height="315" src="https://www.youtube.com/embed/_ubxnyQPMZ0?si=WcAWM9CIOj_aqB9k"
//                         title="YouTube video player" frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                         referrerPolicy="strict-origin-when-cross-origin"
//                         allowFullScreen></iframe>
//                 <iframe width="560" height="315" src="https://www.youtube.com/embed/25DCjR89Oeo?si=Ea_wJ2HVcCN4gMek"
//                         title="YouTube video player" frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                         referrerPolicy="strict-origin-when-cross-origin"
//                         allowFullScreen></iframe>
//                 <iframe width="560" height="315" src="https://www.youtube.com/embed/qHMXyyQ5rMg?si=tBfFUU3S9S83fVw2"
//                         title="YouTube video player" frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                         referrerPolicy="strict-origin-when-cross-origin"
//                         allowFullScreen></iframe>
//                 <iframe width="560" height="315" src="https://www.youtube.com/embed/l8E5OvI6vv8?si=vYdUXTCLLY7ZuZBo"
//                         title="YouTube video player" frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                         referrerPolicy="strict-origin-when-cross-origin"
//                         allowFullScreen></iframe>
//                 <iframe width="560" height="315" src="https://www.youtube.com/embed/7eK47iTw-oQ?si=zdNLszY1pU1R8TyY"
//                         title="YouTube video player" frameBorder="0"
//                         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
//                         referrerPolicy="strict-origin-when-cross-origin"
//                         allowFullScreen></iframe>
//             </div>
//         </div>
//     );
// }




//includes search button and live broadcast button and loads latest youtube videos dynamically
import { useEffect, useMemo, useState } from "react";

export default function Sermons() {
    const [videos, setVideos] = useState([]);
    const [status, setStatus] = useState("Loading...");

    // Search states
    const [query, setQuery] = useState("");
    const [submittedQuery, setSubmittedQuery] = useState("");


    const channelId = "UCHuklWj-wXBqOhvHgKygbwg";

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
                setVideos(data.items || []);
                setStatus(`Loaded ${data.items?.length || 0} videos`);
            })
            .catch((err) => {
                console.error("Fetch error:", err);
                setStatus("Failed to load videos");
            });
    }, []);

    // Filter videos by search query (title + description)
    const filteredVideos = useMemo(() => {
        const q = submittedQuery.trim().toLowerCase();
        if (!q) return videos;

        return videos.filter((v) => {
            const title = v.snippet?.title?.toLowerCase() || "";
            const desc = v.snippet?.description?.toLowerCase() || "";
            return title.includes(q) || desc.includes(q);
        });
    }, [videos, submittedQuery]);

    function handleSearch(e) {
        e.preventDefault();
        setSubmittedQuery(query);
    }

    function clearSearch() {
        setQuery("");
        setSubmittedQuery("");
    }

    return (
        <div className="sermons-page">
            <div className="sermons-header">
                <h1>Latest Sermons</h1>

                <div className="sermons-actions">
                    {/* Live button */}
                    <a
                        className="live-btn"
                        href={`https://www.youtube.com/channel/${channelId}/live`}
                        target="_blank"
                        rel="noreferrer"
                        title="Open our current live broadcast"
                    >
                        🔴 Live
                    </a>

                    {/* Search */}
                    <form className="sermons-search" onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            placeholder="Search sermons..."
                        />
                        <button type="submit">Search</button>
                        <button type="button" onClick={clearSearch}>
                            Clear
                        </button>
                    </form>
                </div>
            </div>

            <p>{status}</p>

            {submittedQuery && (
                <p className="search-result-text">
                    Showing results for: <b>{submittedQuery}</b> ({filteredVideos.length})
                </p>
            )}

            <div className="youtube-videos">
                {filteredVideos.map((v) => (
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


