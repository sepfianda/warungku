import { mockProducts, mockScanHistory, formatCurrency, formatDate, getStockStatus } from "../data/mockData";
import StockBadge from "../components/StockBadge";
import { Package, AlertTriangle, XCircle, TrendingUp, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  const total   = mockProducts.length;
  const low     = mockProducts.filter(p => getStockStatus(p) === "low").length;
  const empty   = mockProducts.filter(p => getStockStatus(p) === "empty").length;
  const todaySales = mockScanHistory
    .filter(h => h.type === "sell")
    .reduce((sum, h) => sum + h.total, 0);

  const alertProducts = mockProducts
    .filter(p => getStockStatus(p) !== "safe")
    .sort((a, b) => a.stock - b.stock);

  const recentHistory = [...mockScanHistory]
    .sort((a, b) => new Date(b.scanned_at) - new Date(a.scanned_at))
    .slice(0, 5);

  const stats = [
    { label: "Total Produk",   value: total,                icon: Package,       color: "text-secondary", bg: "bg-blue-50"   },
    { label: "Stok Menipis",   value: low,                  icon: AlertTriangle,  color: "text-warning",   bg: "bg-yellow-50" },
    { label: "Stok Habis",     value: empty,                icon: XCircle,        color: "text-danger",    bg: "bg-red-50"    },
    { label: "Penjualan Hari Ini", value: formatCurrency(todaySales), icon: TrendingUp, color: "text-primary", bg: "bg-green-50" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-sm text-gray-400 mt-0.5">Ringkasan stok & aktivitas toko</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(({ label, value, icon: Icon, color, bg }) => (
          <div key={label} className="card">
            <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
              <Icon size={18} className={color} />
            </div>
            <p className="text-2xl font-bold text-gray-800">{value}</p>
            <p className="text-xs text-gray-400 mt-0.5">{label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Alert Stok */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">⚠️ Perlu Perhatian</h2>
            <button
              onClick={() => navigate("/inventory")}
              className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline"
            >
              Lihat Semua <ArrowRight size={12} />
            </button>
          </div>
          {alertProducts.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-6">
              🎉 Semua stok dalam kondisi aman!
            </p>
          ) : (
            <div className="space-y-3">
              {alertProducts.map(p => (
                <div
                  key={p.id}
                  className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0 cursor-pointer hover:bg-gray-50 rounded-lg px-2 -mx-2"
                  onClick={() => navigate(`/inventory/${p.id}`)}
                >
                  <div>
                    <p className="text-sm font-medium text-gray-800">{p.name}</p>
                    <p className="text-xs text-gray-400">{p.stock} {p.unit} tersisa</p>
                  </div>
                  <StockBadge product={p} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Riwayat Terbaru */}
        <div className="card">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-bold text-gray-800">🕐 Aktivitas Terbaru</h2>
            <button
              onClick={() => navigate("/history")}
              className="text-xs text-primary font-semibold flex items-center gap-1 hover:underline"
            >
              Lihat Semua <ArrowRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {recentHistory.map(h => (
              <div key={h.id} className="flex items-start justify-between py-2 border-b border-gray-50 last:border-0">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                      h.type === "sell"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {h.type === "sell" ? "Jual" : "Restock"}
                    </span>
                    <p className="text-sm font-medium text-gray-800 truncate max-w-[140px]">
                      {h.product_name}
                    </p>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(h.scanned_at)}</p>
                </div>
                <p className="text-sm font-bold text-gray-800">{formatCurrency(h.total)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}