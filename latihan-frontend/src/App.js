import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Menetapkan halaman Login sebagai rute utama aplikasi */}
        <Route path="/" element={<Login />} />

        {/* Rute publik untuk autentikasi pengguna (Login dan Register) */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Rute privat yang hanya dapat diakses jika pengguna memiliki token valid */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        {/* Menampilkan halaman 404 jika rute tidak ditemukan */}
        <Route
          path="*"
          element={<h3 className="text-center mt-5">404 Not Found</h3>}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
