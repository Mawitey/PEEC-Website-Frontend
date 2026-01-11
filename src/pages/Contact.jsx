// import { useState } from "react";
//
// export default function Contact() {
//     const [form, setForm] = useState({
//         name: "",
//         email: "",
//         message: "",
//     });
//
//     const [status, setStatus] = useState("");
//
//     function handleChange(e) {
//         setForm({ ...form, [e.target.name]: e.target.value });
//     }
//
//     async function handleSubmit(e) {
//         e.preventDefault();
//         setStatus("Sending...");
//
//         try {
//             const res = await fetch(
//                 "https://xvhnx82dx5.execute-api.us-east-1.amazonaws.com/contact",
//                 {
//                     method: "POST",
//                     headers: { "Content-Type": "application/json" },
//                     body: JSON.stringify({
//                         name: form.name,
//                         email: form.email,
//                         message: form.message,
//                     }),
//                 }
//             );
//
//             const data = await res.json().catch(() => ({}));
//
//             if (!res.ok) {
//                 throw new Error(data.error || `HTTP ${res.status}`);
//             }
//
//             setStatus("Message sent successfully 🙏");
//             setForm({ name: "", email: "", message: "" });
//         } catch (err) {
//             console.error(err);
//             setStatus("Failed to send message. Please try again.");
//         }
//     }
//
//     return (
//         <section className="contact-section">
//             <h1>Contact Us</h1>
//             <form onSubmit={handleSubmit} className="contact-form">
//                 <input
//                     name="name"
//                     placeholder="Your Name"
//                     value={form.name}
//                     onChange={handleChange}
//                     required
//                 />
//
//                 <input
//                     name="email"
//                     type="email"
//                     placeholder="Your Email"
//                     value={form.email}
//                     onChange={handleChange}
//                     required
//                 />
//
//                 <textarea
//                     name="message"
//                     placeholder="Your Message"
//                     rows="5"
//                     value={form.message}
//                     onChange={handleChange}
//                     required
//                 />
//
//                 {/*<button type="submit">Send Message</button>*/}
//                 <button type="submit" disabled={status === "Sending..."}>
//                     {status === "Sending..." ? "Sending..." : "Send Message"}
//                 </button>
//
//
//                 {status && <p className="contact-status">{status}</p>}
//
//                             <div className="contact-info">
//                                           <div className="contact-info-item">
//                                             <span className="contact-icon">📞</span>
//                                             <a className="contact-link" href="tel:+16145963132">(614) 596-3132</a>
//                                           </div>
//
//                                           <div className="contact-info-item">
//                                             <span className="contact-icon">📍</span>
//                                             <div className="contact-address">
//                                               <div>751 Rosehill Road</div>
//                                               <div>Reynoldsburg, Ohio 43068</div>
//                                               <div>United States</div>
//                                             </div>
//                                           </div>
//
//                                           <a
//                                             className="maps-button"
//                                             href="https://maps.google.com/?q=751 Rosehill Rd, Reynoldsburg, OH 43068"
//                                             target="_blank"
//                                             rel="noopener noreferrer"
//                                           >
//                                             Open in Google Maps
//                                           </a>
//                                         </div>
//             </form>
//         </section>
//     );
// }



import { useState } from "react";

/* Google Maps style location pin */
const MapPinIcon = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="22"
        height="22"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
    >
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 1 1 18 0z"></path>
        <circle cx="12" cy="10" r="3"></circle>
    </svg>
);

export default function Contact() {
    const [form, setForm] = useState({
        name: "",
        email: "",
        message: "",
    });

    const [status, setStatus] = useState("");

    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setStatus("Sending...");

        try {
            const res = await fetch(
                "https://xvhnx82dx5.execute-api.us-east-1.amazonaws.com/contact",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(form),
                }
            );

            const data = await res.json().catch(() => ({}));
            if (!res.ok) throw new Error(data.error || "Failed");

            setStatus("Message sent successfully 🙏");
            setForm({ name: "", email: "", message: "" });
        } catch (err) {
            console.error(err);
            setStatus("Failed to send message. Please try again.");
        }
    }

    return (
        <section className="contact-section">
            <h1>Contact Us</h1>

            <form onSubmit={handleSubmit} className="contact-form">
                <input
                    name="name"
                    placeholder="Your Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                />

                <input
                    name="email"
                    type="email"
                    placeholder="Your Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                />

                <textarea
                    name="message"
                    placeholder="Your Message"
                    rows="5"
                    value={form.message}
                    onChange={handleChange}
                    required
                />

                <button type="submit" disabled={status === "Sending..."}>
                    {status === "Sending..." ? "Sending..." : "Send Message"}
                </button>

                {status && <p className="contact-status">{status}</p>}

                {/* CONTACT INFO */}
                <div className="contact-info">

                    {/* Phone */}
                    <div className="contact-info-item">
                        <span className="contact-icon">📞</span>
                        <a className="contact-link" href="tel:+16145963132">
                            (614) 596-3132
                        </a>
                    </div>

                    {/* Address (clickable Google Maps) */}
                    <div className="contact-info-item">
                        <span className="contact-icon">
                            <MapPinIcon />
                        </span>

                        <a
                            className="contact-link address-link"
                            href="https://maps.google.com/?q=751 Rosehill Rd, Reynoldsburg, OH 43068"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <div>751 Rosehill Road</div>
                            <div>Reynoldsburg, Ohio 43068</div>
                            <div>United States</div>
                        </a>
                    </div>

                </div>
            </form>
        </section>
    );
}
