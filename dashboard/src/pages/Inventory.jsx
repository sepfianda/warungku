import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockProducts, formatCurrency, getStockStatus } from "../data/mockData";
import StockBadge from "../components/StockBadge";
import { Plus, Search, Filter, Package } from "lucide-react";

const CATEGORIES = ["Semua", ...new Set(mockProducts.map(p => p.category))];
const STATUS_FILTERS = ["Semua", "Aman", "Menipis", "Habis"];
const STATUS_MAP = { "Aman": "safe", "Menipis": "low", "Habis": "empty" };

export default function Inventory() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [statusFilter, setStatusFilter] = useState("Semua");

  const filtered = mockProducts.filter(p => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.barcode.includes(search);
    const matchCat = category === "Semua" || p.category === category;
    const matchStatus =
      statusFilter === "Semua" || getStockStatus(p) === STATUS_MAP[statusFilter];
    return matchSearch && matchCat && matchStatus;
  });

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-800">Inventori</h1>
          <p className="text-sm text-gray-400 mt-0.5">{mockProducts.length} produk terdaftar</p>
        </div>
        <button
          onClick={() => navigate("/inventory/create")}
          className="btn-primary flex items-center gap-2"
        >
          <Plus size={16} /> Tambah
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          className="input pl-9"
          placeholder="Cari nama produk atau barcode..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
      </div>

      {/* Filters */}
      <div className="space-y-2">
        <div className="flex gap-2 flex-wrap">
          {CATEGORIES.map(c => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-all ${
                category === c
                  ? "bg-primary text-white border-primary"
                  : "bg-white text-gray-500 border-gray-200 hover:border-primary hover:text-primary"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="flex gap-2 flex-wrap">
          {STATUS_FILTERS.map(s => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-all ${
                statusFilter === s
                  ? "bg-gray-800 text-white border-gray-800"
                  : "bg-white text-gray-500 border-gray-200 hover:border-gray-400"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* List */}
      {filtered.length === 0 ? (
        <div className="card text-center py-12">
          <Package size={40} className="text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400 text-sm">Produk tidak ditemukan</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map(product => (
            <div
              key={product.id}
              className="card cursor-pointer hover:shadow-md transition-shadow duration-150 active:scale-[0.99]"
              onClick={() => navigate(`/inventory/${product.id}`)}
            >
              <div className="flex items-center gap-4">
                {/* Thumb */}
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                  <Package size={20} className="text-gray-400" />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-semibold text-gray-800 text-sm truncate">{product.name}</p>
                    <StockBadge product={product} />
                  </div>
                  <p className="text-xs text-gray-400 mt-0.5">{product.category} · {product.barcode}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <p className="text-sm font-bold text-primary">{formatCurrency(product.price)}</p>
                    <p className="text-xs text-gray-400">Stok: <strong className="text-gray-700">{product.stock} {product.unit}</strong></p>
                  </div>
                </div>

                {/* Arrow */}
                <div className="text-gray-300 shrink-0">›</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}