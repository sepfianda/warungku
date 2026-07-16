import { useState } from "react";
import { mockStore } from "../data/mockData";
import { Store, Phone, MapPin, Lock, RefreshCw, Bell, ChevronRight, Save } from "lucide-react";

export default function Settings() {
  const [form, setForm] = useState({ ...mockStore });
  const [saved, setSaved] = useState(false);
  const [activeTab, setActiveTab] = useState("store");

  const set = (key) => (e) => setForm(f => ({ ...f, [key]: e.target.value }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const tabs = [
    { id: "store", label: "Toko" },
    { id: "security", label: "Keamanan" },
    { id: "sync", label: "Sinkronisasi" },
  ];

  return (
    <div className="max-w-xl mx-auto space-y-5">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Pengaturan</h1>
        <p className="text-sm text-gray-400 mt-0.5">Konfigurasi toko Anda</p>
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-xl p-1 border border-gray-100">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTab(t.id)}
            className={`flex-1 text-sm py-2 rounded-lg font-medium transition-all ${
              activeTab === t.id
                ? "bg-primary text-white shadow-sm"
                : "text-gray-500 hover:text-gray-800"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Store Tab */}
      {activeTab === "store" && (
        <div className="card space-y-4">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <Store size={16} className="text-primary" /> Profil Toko
          </h2>
          {[
            { label: "Nama Toko", key: "name", icon: Store, placeholder: "Nama toko Anda" },
            { label: "Nama Pemilik", key: "owner", icon: Store, placeholder: "Nama pemilik" },
            { label: "No. Telepon", key: "phone", icon: Phone, placeholder: "08xxxxxxxxxx" },
          ].map(({ label, key, placeholder }) => (
            <div key={key}>
              <label className="label">{label}</label>
              <input
                className="input"
                placeholder={placeholder}
                value={form[key]}
                onChange={set(key)}
              />
            </div>
          ))}
          <div>
            <label className="label">Alamat Toko</label>
            <textarea
              className="input resize-none"
              rows={3}
              placeholder="Alamat lengkap"
              value={form.address}
              onChange={set("address")}
            />
          </div>
        </div>
      )}

      {/* Security Tab */}
      {activeTab === "security" && (
        <div className="card space-y-4">
          <h2 className="font-bold text-gray-800 flex items-center gap-2">
            <Lock size={16} className="text-primary" /> Keamanan
          </h2>
          <div>
            <label className="label">PIN Kasir</label>
            <input
              type="password"
              inputMode="numeric"
              maxLength={6}
              className="input tracking-widest"
              placeholder="PIN (4–6 digit)"
              value={form.pin}
              onChange={set("pin")}
            />
            <p className="text-xs text-gray-400 mt-1">
              PIN digunakan untuk login ke dashboard dan tablet kasir
            </p>
          </div>
          <div className="bg-yellow-50 rounded-xl p-3">
            <p className="text-xs text-yellow-700 font-medium">
              ⚠️ Jangan bagikan PIN kepada orang yang tidak dipercaya
            </p>
          </div>
        </div>
      )}

      {/* Sync Tab */}
      {activeTab === "sync" && (
        <div className="space-y-4">
          <div className="card space-y-4">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <RefreshCw size={16} className="text-primary" /> Sinkronisasi
            </h2>
            <div>
              <label className="label">Interval Sync (menit)</label>
              <select className="input" value={form.sync_interval} onChange={set("sync_interval")}>
                {[1, 2, 5, 10, 15, 30].map(n => (
                  <option key={n} value={n}>{n} menit</option>
                ))}
              </select>
            </div>
            <button className="btn-secondary w-full flex items-center justify-center gap-2">
              <RefreshCw size={15} /> Sinkronisasi Sekarang
            </button>
          </div>

          <div className="card space-y-4">
            <h2 className="font-bold text-gray-800 flex items-center gap-2">
              <Bell size={16} className="text-primary" /> Notifikasi Stok
            </h2>
            <div>
              <label className="label">Batas Stok Menipis</label>
              <input
                type="number"
                className="input"
                placeholder="10"
                value={form.low_stock_alert}
                onChange={set("low_stock_alert")}
              />
              <p className="text-xs text-gray-400 mt-1">
                Produk dengan stok ≤ angka ini dianggap "Menipis"
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        className={`btn-primary w-full flex items-center justify-center gap-2 py-3 pb-6 transition-all ${
          saved ? "bg-green-500" : ""
        }`}
      >
        <Save size={15} />
        {saved ? "✓ Tersimpan!" : "Simpan Pengaturan"}
      </button>
    </div>
  );
}