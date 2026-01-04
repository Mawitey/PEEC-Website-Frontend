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

    // Selected video
    const [selectedVideoId, setSelectedVideoId] = useState(null);

    const channelId = "UCHuklWj-wXBqOhvHgKygbwg";

    // const API_URL = "/api/sermons/youtube"; // production
    const API_URL = "http://18.223.121.64:8080/api/sermons/youtube";

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

                    // Auto-select first video
                    const firstId = items?.[0]?.id?.videoId || null;
                    setSelectedVideoId(firstId);

                    if (items.length === 0) {
                        setMessage("No sermons are available right now.");
                    }
                }
            } catch (err) {
                console.error("Failed to load sermons:", err);
                if (!cancelled) {
                    setVideos([]);
                    setSelectedVideoId(null);
                    setMessage("Sermons are temporarily unavailable. Please check back later.");
                    setLoadFailed(true);
                }
            } finally {
                if (!cancelled) setLoading(false);
            }
        }

        loadSermons();
        return () => {
            cancelled = true;
        };
    }, []);

    /* =========================
       AUTO-RESTORE WHEN INPUT CLEARED ✅
    ========================= */
    useEffect(() => {
        if (query.trim() === "") {
            setSubmittedQuery("");
        }
    }, [query]);

    /* =========================
       FILTERED VIDEOS
    ========================= */
    const filteredVideos = useMemo(() => {
        const q = submittedQuery.trim().toLowerCase();
        if (!q) return videos;

        return videos.filter((v) => {
            const title = v.snippet?.title?.toLowerCase() || "";
            const desc = v.snippet?.description?.toLowerCase() || "";
            return title.includes(q) || desc.includes(q);
        });
    }, [videos, submittedQuery]);

    // Keep selected video valid after filtering
    useEffect(() => {
        if (!filteredVideos.length) return;

        const stillExists = filteredVideos.some(
            (v) => v?.id?.videoId === selectedVideoId
        );

        if (!stillExists) {
            setSelectedVideoId(filteredVideos[0]?.id?.videoId || null);
        }
    }, [filteredVideos, selectedVideoId]);

    function handleSearch(e) {
        e.preventDefault();
        setSubmittedQuery(query);
    }

    function clearSearch() {
        setQuery("");
        setSubmittedQuery("");
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

                    <button
                        type="button"
                        className="btn btn-icon"
                        onClick={clearSearch}
                        aria-label="Clear search"
                    >
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
                        <div style={{ marginTop: "14px", textAlign: "center" }}>
                            <a
                                href={`https://www.youtube.com/channel/${channelId}`}
                                target="_blank"
                                rel="noreferrer"
                                className="btn btn-youtube"
                                style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "10px",
                                }}
                            >
                                <FaYoutube />
                                Visit YouTube Channel
                            </a>
                        </div>
                    )}
                </div>
            )}

            {/* PLAYER */}
            {!message && selectedVideoId && (
                <section className="sermons-player">
                    <div className="video-wrapper">
                        <iframe
                            src={`https://www.youtube.com/embed/${selectedVideoId}`}
                            title="Sermon Video Player"
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                        ></iframe>
                    </div>
                </section>
            )}

            {/* THUMBNAILS */}
            {!message && (
                <div className="sermon-thumbs">
                    {filteredVideos.map((v, idx) => {
                        const vid = v?.id?.videoId;
                        const title = v?.snippet?.title || "Sermon";
                        const date = v?.snippet?.publishedAt
                            ? new Date(v.snippet.publishedAt).toLocaleDateString()
                            : "";
                        const thumb = bestThumbUrl(v?.snippet);
                        const active = vid === selectedVideoId;

                        return (
                            <button
                                key={vid ?? idx}
                                className={`thumb-card ${active ? "active" : ""}`}
                                onClick={() => vid && setSelectedVideoId(vid)}
                            >
                                <div className="thumb-image">
                                    {thumb && (
                                        <img src={thumb} alt={title} loading="lazy" />
                                    )}
                                    <div className="thumb-play">
                                        <FaPlay />
                                    </div>
                                </div>

                                <div className="thumb-meta">
                                    <h3>{title}</h3>
                                    {date && <p className="thumb-date">{date}</p>}
                                </div>
                            </button>
                        );
                    })}
                </div>
            )}
        </div>
    );
}


