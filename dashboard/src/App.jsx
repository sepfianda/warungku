import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAuthStore } from "./store/useAuthStore"; 
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import ProductDetail from "./pages/ProductDetail";
import ProductCreate from "./pages/ProductCreate";
import ScanHistory from "./pages/ScanHistory";
import Settings from "./pages/Setting";

// ✅ Auth guard pakai Zustand
function RequireAuth({ children }) {
  const token = useAuthStore((s) => s.token);
  return token ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        {/* ✅ Semua route protected pakai RequireAuth */}
        <Route path="/" element={
          <RequireAuth>
            <Layout><Home /></Layout>
          </RequireAuth>
        } />
        <Route path="/inventory" element={
          <RequireAuth>
            <Layout><Inventory /></Layout>
          </RequireAuth>
        } />
        <Route path="/inventory/create" element={
          <RequireAuth>
            <Layout><ProductCreate /></Layout>
          </RequireAuth>
        } />
        <Route path="/inventory/:id" element={
          <RequireAuth>
            <Layout><ProductDetail /></Layout>
          </RequireAuth>
        } />
        <Route path="/history" element={
          <RequireAuth>
            <Layout><ScanHistory /></Layout>
          </RequireAuth>
        } />
        <Route path="/settings" element={
          <RequireAuth>
            <Layout><Settings /></Layout>
          </RequireAuth>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}