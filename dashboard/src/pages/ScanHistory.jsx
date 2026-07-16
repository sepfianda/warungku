import { useState } from "react";
import { mockScanHistory, formatCurrency, formatDate } from "../data/mockData";
import SyncBadge from "../components/SyncBadge";
import { Search, ShoppingCart, RefreshCw, TrendingUp } from "lucide-react";

export default function ScanHistory() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("Semua");

  const filtered = mockScanHistory
    .filter(h => {
      const matchSearch = h.product_name.toLowerCase().includes(search.toLowerCase()) ||
        h.barcode.includes(search);
      const matchType = typeFilter === "Semua" ||
        (typeFilter === "Jual" && h.type === "sell") ||
        (typeFilter === "Restock" && h.type === "restock");
      return matchSearch && matchType;
    })
    .sort((a, b) => new Date(b.scanned_at) - new Date(a.scanned_at));

  const totalSell    = mockScanHistory.filter(h => h.type === "sell").reduce((s, h) => s + h.total, 0);
  const totalRestock = mockScanHistory.filter(h => h.type === "restock").reduce((s, h) => s + h.total, 0);
  const unsyncCount  = mockScanHistory.filter(h => !h.synced).length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Riwayat Scan</h1>
        <p className="text-sm text-gray-400 mt-0.5">Log semua transaksi tablet</p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3">
        <div className="card text-center">
          <ShoppingCart size={18} className="text-secondary mx-auto mb-1" />
          <p className="text-base font-bold text-gray-800">{formatCurrency(totalSell)}</p>
          <p className="text-xs text-gray-400">Total Penjualan</p>
        </div>
        <div className="card text-center">
          <RefreshCw size={18} className="text-primary mx-auto mb-1" />
          <p className="text-base font-bold text-gray-800">{formatCurrency(totalRestock)}</p>
          <p className="text-xs text-gray-400">Total Restock</p>
        </div>
        <div className="card text-center">
          <TrendingUp size={18} className="text-warning mx-auto mb-1" />
          <p className="text-base font-bold text-gray-800">{unsyncCount}</p>
          <p className="text-xs text-gray-400">Belum Sync</p>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          className="input pl-9"
          placeholder="Cari produk atau barcode..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Type Filter */}
      <div className="flex gap-2">
        {["Semua", "Jual", "Restock"].map(t => (
          <button
            key={t}
            onClick={() => setTypeFilter(t)}
            className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-all ${
              typeFilter === t
                ? "bg-gray-800 text-white border-gray-800"
                : "bg-white text-gray-500 border-gray-200"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* List */}
      <div className="space-y-3">
        {filtered.map(h => (
          <div key={h.id} className="card">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                    h.type === "sell"
                      ? "bg-blue-100 text-blue-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {h.type === "sell" ? "🛒 Jual" : "📦 Restock"}
                  </span>
                  <SyncBadge synced={h.synced} />
                </div>
                <p className="font-semibold text-gray-800 text-sm mt-1.5 truncate">
                  {h.product_name}
                </p>
                <div className="flex flex-wrap gap-x-4 gap-y-0.5 mt-1">
                  <p className="text-xs text-gray-400">Qty: <strong className="text-gray-700">{h.qty}</strong></p>
                  <p className="text-xs text-gray-400">{h.device}</p>
                  <p className="text-xs text-gray-400">{formatDate(h.scanned_at)}</p>
                </div>
              </div>
              <p className="font-bold text-gray-800 shrink-0">{formatCurrency(h.total)}</p>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="card text-center py-12">
            <p className="text-gray-400 text-sm">Tidak ada riwayat ditemukan</p>
          </div>
        )}
      </div>
    </div>
  );
}