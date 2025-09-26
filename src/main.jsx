import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./assets/Home.jsx";
import Log_in from "./assets/Log_in.jsx";
import Nav from "./assets/Navigations.jsx";
import SpotDetails from "./assets/spotdetails.jsx";
import Bookings from "./assets/MyBooking.jsx";

import { AuthProvider } from "./assets/sec&storage/AuthContext";
import ProtectedRoute from "./assets/sec&storage/ProtectedRoute";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/" element={<Log_in />} />
          <Route path="/home" element={<Home />} />
          <Route path="/book_spots/:id" element={<SpotDetails />} />
          <Route
            path="/dashboard/my-bookings"
            element={
              <ProtectedRoute>
                <Bookings />
              </ProtectedRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
