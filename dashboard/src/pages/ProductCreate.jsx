import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Camera, Barcode } from "lucide-react";

const CATEGORIES = ["Mie Instan", "Minuman", "Kebersihan", "Rokok", "Sembako", "Snack", "Lainnya"];
const UNITS = ["pcs", "botol", "kg", "gram", "liter", "bungkus", "dus", "lusin"];

export default function ProductCreate() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "", barcode: "", category: "Minuman",
    price: "", cost: "", stock: "", min_stock: "",
    unit: "pcs", description: "",
  });
  const [errors, setErrors] = useState({});

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const validate = () => {
    const e = {};
    if (!form.name.trim())      e.name      = "Nama produk wajib diisi";
    if (!form.price)            e.price     = "Harga jual wajib diisi";
    if (!form.stock)            e.stock     = "Stok wajib diisi";
    if (!form.min_stock)        e.min_stock = "Min. stok wajib diisi";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;
    alert("Produk berhasil disimpan! (Demo)");
    navigate("/inventory");
  };

  const Field = ({ label, name, type = "text", placeholder, ...rest }) => (
    <div>
      <label className="label">{label}</label>
      <input
        type={type}
        className={`input ${errors[name] ? "border-danger ring-1 ring-danger" : ""}`}
        placeholder={placeholder}
        value={form[name]}
        onChange={set(name)}
        {...rest}
      />
      {errors[name] && <p className="text-xs text-danger mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-800"
      >
        <ArrowLeft size={16} /> Kembali
      </button>

      <div>
        <h1 className="text-xl font-bold text-gray-800">Tambah Produk</h1>
        <p className="text-sm text-gray-400 mt-0.5">Isi informasi produk baru</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Foto */}
        <div className="card">
          <label className="label">Foto Produk</label>
          <div className="w-full h-32 border-2 border-dashed border-gray-200 rounded-xl flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-primary transition-colors">
            <Camera size={24} className="text-gray-300" />
            <p className="text-xs text-gray-400">Tap untuk upload foto</p>
          </div>
        </div>

        {/* Info Dasar */}
        <div className="card space-y-4">
          <h2 className="font-bold text-gray-800">📝 Informasi Produk</h2>
          <Field label="Nama Produk *" name="name" placeholder="cth: Indomie Goreng" />

          {/* Barcode */}
          <div>
            <label className="label">Barcode</label>
            <div className="relative">
              <input
                className="input pr-10"
                placeholder="Scan atau ketik barcode"
                value={form.barcode}
                onChange={set("barcode")}
              />
              <Barcode size={16} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>
          </div>

          {/* Kategori */}
          <div>
            <label className="label">Kategori</label>
            <select className="input" value={form.category} onChange={set("category")}>
              {CATEGORIES.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>

          {/* Satuan */}
          <div>
            <label className="label">Satuan</label>
            <select className="input" value={form.unit} onChange={set("unit")}>
              {UNITS.map(u => <option key={u}>{u}</option>)}
            </select>
          </div>

          <div>
            <label className="label">Deskripsi</label>
            <textarea
              className="input resize-none"
              rows={3}
              placeholder="Deskripsi singkat produk..."
              value={form.description}
              onChange={set("description")}
            />
          </div>
        </div>

        {/* Harga */}
        <div className="card space-y-4">
          <h2 className="font-bold text-gray-800">💰 Harga</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Harga Jual *" name="price" type="number" placeholder="0" />
            <Field label="Harga Modal" name="cost" type="number" placeholder="0" />
          </div>
        </div>

        {/* Stok */}
        <div className="card space-y-4">
          <h2 className="font-bold text-gray-800">📦 Stok</h2>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Stok Awal *" name="stock" type="number" placeholder="0" />
            <Field label="Min. Stok *" name="min_stock" type="number" placeholder="0" />
          </div>
        </div>

        {/* Submit */}
        <div className="flex gap-3 pb-6">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="btn-secondary flex-1"
          >
            Batal
          </button>
          <button type="submit" className="btn-primary flex-1">
            Simpan Produk
          </button>
        </div>
      </form>
    </div>
  );
}