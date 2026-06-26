import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import About from './pages/About';
import Updates from './pages/Updates';
import Sermons from './pages/Sermons';
import Giving from './pages/Giving';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import AdminAnnouncements from './pages/AdminAnnouncements';
import AdminEvents from './pages/AdminEvents';
import AdminPictures from './pages/AdminPictures';
import AdminGiving from './pages/AdminGiving';

function App() {
  return (
    <Router>
      <div className="app-root">
        <Navbar />

        <main className="app-main">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/updates" element={<Updates />} />
            <Route path="/sermons" element={<Sermons />} />
            <Route path="/giving" element={<Giving />} />
            <Route path="/contact" element={<Contact />} />

            <Route path="/admin" element={<AdminLogin />} />

            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/announcements"
              element={
                <ProtectedRoute>
                  <AdminAnnouncements />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/events"
              element={
                <ProtectedRoute>
                  <AdminEvents />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/pictures"
              element={
                <ProtectedRoute>
                  <AdminPictures />
                </ProtectedRoute>
              }
            />

            <Route
              path="/admin/giving"
              element={
                <ProtectedRoute>
                  <AdminGiving />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
