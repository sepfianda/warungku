import { useParams, useNavigate } from "react-router-dom";
import { mockProducts, formatCurrency, formatDate } from "../data/mockData";
import StockBadge from "../components/StockBadge";
import { ArrowLeft, Package, Edit, Trash2, Barcode, Tag, Box } from "lucide-react";

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = mockProducts.find(p => p.id === Number(id));

  if (!product) return (
    <div className="text-center py-20">
      <p className="text-gray-400">Produk tidak ditemukan</p>
      <button onClick={() => navigate("/inventory")} className="btn-primary mt-4">
        Kembali
      </button>
    </div>
  );

  const margin = product.price - product.cost;
  const marginPct = ((margin / product.price) * 100).toFixed(1);

  const infoRows = [
    { icon: Barcode, label: "Barcode",    value: product.barcode },
    { icon: Tag,     label: "Kategori",   value: product.category },
    { icon: Box,     label: "Satuan",     value: product.unit },
    { icon: Package, label: "Min. Stok",  value: `${product.min_stock} ${product.unit}` },
  ];

  return (
    <div className="max-w-xl mx-auto space-y-5">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800 transition-colors"
      >
        <ArrowLeft size={16} /> Kembali
      </button>

      {/* Foto & Badge */}
      <div className="card">
        <div className="w-full h-40 rounded-xl bg-gray-100 flex items-center justify-center mb-4">
          <Package size={48} className="text-gray-300" />
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-lg font-bold text-gray-800">{product.name}</h1>
            {product.description && (
              <p className="text-sm text-gray-400 mt-1">{product.description}</p>
            )}
          </div>
          <StockBadge product={product} />
        </div>
      </div>

      {/* Stok */}
      <div className="card">
        <h2 className="font-bold text-gray-800 mb-3">📦 Stok</h2>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: "Stok Saat Ini", value: `${product.stock} ${product.unit}`, highlight: true },
            { label: "Min. Stok",     value: `${product.min_stock} ${product.unit}` },
            { label: "Update",        value: formatDate(product.last_updated).split(",")[0] },
          ].map(({ label, value, highlight }) => (
            <div key={label} className="bg-gray-50 rounded-xl p-3 text-center">
              <p className={`text-lg font-bold ${highlight ? "text-primary" : "text-gray-800"}`}>
                {value}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Harga */}
      <div className="card">
        <h2 className="font-bold text-gray-800 mb-3">💰 Harga</h2>
        <div className="space-y-2">
          {[
            { label: "Harga Jual", value: formatCurrency(product.price), bold: true },
            { label: "Harga Modal", value: formatCurrency(product.cost) },
            { label: "Margin", value: `${formatCurrency(margin)} (${marginPct}%)`, green: true },
          ].map(({ label, value, bold, green }) => (
            <div key={label} className="flex justify-between items-center py-1.5 border-b border-gray-50 last:border-0">
              <span className="text-sm text-gray-500">{label}</span>
              <span className={`text-sm font-semibold ${green ? "text-primary" : "text-gray-800"}`}>
                {value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Info */}
      <div className="card">
        <h2 className="font-bold text-gray-800 mb-3">ℹ️ Informasi</h2>
        <div className="space-y-2">
          {infoRows.map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3 py-1.5 border-b border-gray-50 last:border-0">
              <Icon size={14} className="text-gray-400 shrink-0" />
              <span className="text-sm text-gray-500 w-24">{label}</span>
              <span className="text-sm font-medium text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={() => navigate(`/inventory/${id}/edit`)}
          className="btn-secondary flex-1 flex items-center justify-center gap-2"
        >
          <Edit size={15} /> Edit Produk
        </button>
        <button
          onClick={() => { if (confirm("Hapus produk ini?")) navigate("/inventory"); }}
          className="btn-danger flex-1 flex items-center justify-center gap-2"
        >
          <Trash2 size={15} /> Hapus
        </button>
      </div>
    </div>
  );
}