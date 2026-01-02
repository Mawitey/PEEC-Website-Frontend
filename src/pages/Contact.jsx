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
//             const res = await fetch("http://18.223.121.64:8080/api/contact", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify(form),
//             });
//
//             if (!res.ok) throw new Error("Failed");
//
//             setStatus("Message sent successfully 🙏");
//             setForm({ name: "", email: "", message: "" });
//         } catch {
//             setStatus("Failed to send message. Please try again.");
//         }
//     }
//
//     return (
//         <section className="contact-section">
//             <h1>Contact Us</h1>
//
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
//                 <button type="submit">Send Message</button>
//                 <p>{status}</p>
//             </form>
//         </section>
//     );
// }


import { useState } from "react";

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
                    body: JSON.stringify({
                        name: form.name,
                        email: form.email,
                        message: form.message,
                    }),
                }
            );

            const data = await res.json().catch(() => ({}));

            if (!res.ok) {
                throw new Error(data.error || `HTTP ${res.status}`);
            }

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

                {/*<button type="submit">Send Message</button>*/}
                <button type="submit" disabled={status === "Sending..."}>
                    {status === "Sending..." ? "Sending..." : "Send Message"}
                </button>


                {status && <p className="contact-status">{status}</p>}
            </form>
        </section>
    );
}
