import { useEffect, useMemo, useState } from "react";
import { FaSearch, FaTimes, FaYoutube, FaPlay } from "react-icons/fa";

export default function Sermons() {
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [loadFailed, setLoadFailed] = useState(false);

    // Search
    const [query, setQuery] = useState("");
    const [submittedQuery, setSubmittedQuery] = useState("");

    const channelId = "UCHuklWj-wXBqOhvHgKygbwg";
    // const API_URL = "http://18.223.121.64:8080/api/sermons/youtube";
    const API_URL = "https://daw5ljmjvhmmu.cloudfront.net/api/sermons/youtube";


    // Inline player
    const [inlineVideoId, setInlineVideoId] = useState(null);

    // Forces iframe to remount
    const [playerNonce, setPlayerNonce] = useState(0);

    // Track if the video was opened by a user click (so we can autoplay w/ sound)
    const [userInitiatedPlay, setUserInitiatedPlay] = useState(false);

    /* =========================
       HELPERS
    ========================= */
    function isVideoId(s) {
        return typeof s === "string" && /^[a-zA-Z0-9_-]{11}$/.test(s);
    }

    function getVideoId(item) {
        if (isVideoId(item?.id?.videoId)) return item.id.videoId;
        if (isVideoId(item?.snippet?.resourceId?.videoId)) return item.snippet.resourceId.videoId;
        if (isVideoId(item?.contentDetails?.videoId)) return item.contentDetails.videoId;
        if (isVideoId(item?.videoId)) return item.videoId;
        if (isVideoId(item?.id)) return item.id;
        return null;
    }

    function bestThumbUrl(snippet) {
        const t = snippet?.thumbnails;
        return (
            t?.maxres?.url ||
            t?.standard?.url ||
            t?.high?.url ||
            t?.medium?.url ||
            t?.default?.url ||
            ""
        );
    }

    function buildEmbedUrl(videoId, { autoplay }) {
        // ✅ On page load: autoplay=0 (no sound, no mute needed)
        // ✅ On click: autoplay=1 (sound is allowed because user interacted)
        const params = new URLSearchParams();
        params.set("rel", "0");
        params.set("playsinline", "1");
        params.set("autoplay", autoplay ? "1" : "0");

        return `https://www.youtube.com/embed/${videoId}?${params.toString()}`;
    }

    /* =========================
       LOAD SERMONS
    ========================= */
    useEffect(() => {
        let cancelled = false;

        async function loadSermons() {
            setLoading(true);
            setMessage("");
            setLoadFailed(false);

            try {
                const res = await fetch(API_URL, { cache: "no-store" });
                if (!res.ok) throw new Error(`HTTP ${res.status}`);

                const data = await res.json();
                const items = Array.isArray(data?.items) ? data.items : [];

                if (!cancelled) {
                    setVideos(items);

                    // Open first playable video, but DO NOT autoplay (so no sound)
                    const firstPlayable = items.find((it) => getVideoId(it));
                    const firstId = firstPlayable ? getVideoId(firstPlayable) : null;

                    setInlineVideoId(firstId);
                    setUserInitiatedPlay(false); // ✅ page load behavior
                    setPlayerNonce((n) => n + 1);

                    if (items.length === 0) {
                        setMessage("No sermons are available right now.");
                    } else if (!firstId) {
                        setMessage("Sermons loaded, but no playable videos were found.");
                    }
                }
            } catch (err) {
                console.error("Failed to load sermons:", err);
                if (!cancelled) {
                    setVideos([]);
                    setInlineVideoId(null);
                    setMessage("Sermons are temporarily unavailable. Please check back later.");
                    setLoadFailed(true);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadSermons();
        return () => (cancelled = true);
    }, []);

    /* =========================
       AUTO-RESTORE WHEN INPUT CLEARED ✅
    ========================= */
    useEffect(() => {
        if (query.trim() === "") setSubmittedQuery("");
    }, [query]);

    /* =========================
       FILTERED VIDEOS
    ========================= */
    const filteredVideos = useMemo(() => {
        const q = submittedQuery.trim().toLowerCase();
        if (!q) return videos;

        return videos.filter((v) => {
            const title = v?.snippet?.title?.toLowerCase() || "";
            const desc = v?.snippet?.description?.toLowerCase() || "";
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

    function toggleInline(vid) {
        if (!vid) return;

        // Clicking a video = user initiated (allow autoplay with sound)
        if (inlineVideoId === vid) {
            // close
            setInlineVideoId(null);
            setUserInitiatedPlay(false);
            return;
        }

        setInlineVideoId(vid);
        setUserInitiatedPlay(true); // ✅ clicked
        setPlayerNonce((n) => n + 1);
    }

    return (
        <div className="page sermons-page">
            {/* HEADER */}
            <div className="sermons-header">
                <h1>Sermons</h1>

                <div className="sermons-buttons">
                    <a
                        href={`https://www.youtube.com/channel/${channelId}/live`}
                        target="_blank"
                        rel="noreferrer"
                        className="btn btn-live"
                    >
                        🔴 Watch Live
                    </a>
                </div>

                {/* SEARCH */}
                <form className="sermons-search" onSubmit={handleSearch}>
                    <input
                        type="text"
                        placeholder="Search sermons..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    <button type="submit" className="btn btn-icon" aria-label="Search">
                        <FaSearch />
                    </button>
                    <button type="button" className="btn btn-icon" onClick={clearSearch} aria-label="Clear">
                        <FaTimes />
                    </button>
                </form>
            </div>

            {/* STATUS */}
            {loading && <p className="status-text">Loading sermons…</p>}

            {!loading && message && (
                <div className="notice">
                    <p>{message}</p>

                    {loadFailed && (
                        <div style={{ marginTop: 14, textAlign: "center" }}>
                            <a
                                href={`https://www.youtube.com/channel/${channelId}`}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-youtube"
                                style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
                            >
                                <FaYoutube />
                                Visit YouTube Channel
                            </a>
                        </div>
                    )}
                </div>
            )}

            {/* THUMBNAILS GRID WITH INLINE PLAYER */}
            {!message && (
                <div className="sermon-thumbs">
                    {filteredVideos.map((v, idx) => {
                        const vid = getVideoId(v);
                        const title = v?.snippet?.title || "Sermon";
                        const date = v?.snippet?.publishedAt
                            ? new Date(v.snippet.publishedAt).toLocaleDateString()
                            : "";
                        const thumb = bestThumbUrl(v?.snippet);
                        const isOpen = vid && vid === inlineVideoId;

                        return (
                            <div key={vid ?? idx} className={`thumb-slot ${isOpen ? "open" : ""}`}>
                                <button
                                    type="button"
                                    className={`thumb-card ${isOpen ? "active" : ""}`}
                                    onClick={() => toggleInline(vid)}
                                    style={{ cursor: "pointer" }}
                                    title={isOpen ? "Close video" : "Play here"}
                                >
                                    <div className="thumb-image" style={{ pointerEvents: "none" }}>
                                        {thumb && <img src={thumb} alt={title} loading="lazy" />}
                                        <div className="thumb-play" style={{ pointerEvents: "none" }}>
                                            <FaPlay />
                                        </div>
                                    </div>

                                    <div className="thumb-meta" style={{ pointerEvents: "none" }}>
                                        <h3>{title}</h3>
                                        {date && <p className="thumb-date">{date}</p>}
                                    </div>
                                </button>

                                {isOpen && (
                                    <div className="inline-player">
                                        <div className="inline-video-wrapper">
                                            <iframe
                                                key={`${vid}-${playerNonce}`}
                                                src={buildEmbedUrl(vid, { autoplay: userInitiatedPlay })}
                                                title={`Sermon: ${title}`}
                                                frameBorder="0"
                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                allowFullScreen
                                            />
                                        </div>

                                        <div className="inline-actions">
                                            <a
                                                className="btn btn-youtube"
                                                href={`https://www.youtube.com/watch?v=${vid}`}
                                                target="_blank"
                                                rel="noreferrer"
                                                style={{ display: "inline-flex", alignItems: "center", gap: 10 }}
                                            >
                                                <FaYoutube />
                                                Open on YouTube
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}

