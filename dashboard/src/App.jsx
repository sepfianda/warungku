import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Inventory from "./pages/Inventory";
import ProductDetail from "./pages/ProductDetail";
import ProductCreate from "./pages/ProductCreate";
import ScanHistory from "./pages/ScanHistory";
import Settings from "./pages/Setting";

// Simple auth guard (demo)
const isLoggedIn = () => sessionStorage.getItem("warungku_auth") === "1";

function RequireAuth({ children }) {
  return isLoggedIn() ? children : <Navigate to="/login" replace />;
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={
          <Layout>
            <Home />
          </Layout>
        } />
        <Route path="/inventory" element={
          <Layout>
            <Inventory />
          </Layout>
        } />
        <Route path="/inventory/create" element={
          <Layout>
            <ProductCreate />
          </Layout>
        } />
        <Route path="/inventory/:id" element={
          <Layout>
            <ProductDetail />
          </Layout>
        } />
        <Route path="/history" element={
          <Layout>
            <ScanHistory />
          </Layout>
        } />
        <Route path="/settings" element={
          <Layout>
            <Settings />
          </Layout>
        } />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}