import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Giving from "./pages/Giving";
import Sermons from "./pages/Sermons";
import Contact from "./pages/Contact";
import Updates from "./pages/Updates";


function App() {
    return (
        <BrowserRouter>
            <div className="page">
                <Navbar />
                <main className="content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/sermons" element={<Sermons />} />
                        <Route path="/updates" element={<Updates />} />
                        <Route path="/giving" element={<Giving />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>

                </main>
                <Footer />
            </div>
        </BrowserRouter>
    );
}

export default App;
