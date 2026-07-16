import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff, ArrowRight } from "lucide-react";
import loginImage from "../assets/login.jpeg";
import logo from "../assets/logo.jpeg";
import { useLogin } from "../hooks/useLogin";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [show, setShow] = useState(false);

  // ✅ React Query mutation
  const { mutate: login, isPending, error } = useLogin();

  const handleLogin = (e) => {
    e.preventDefault();

    // Validasi lokal pakai toast
    if (!email || !password) {
      toast.warn("Email dan password wajib diisi! ⚠️"); // ← ganti setLocalError
      return;
    }

    login({ email, password, remember });
  };

  return (
    <div className="relative h-screen w-full flex items-center justify-center p-4 overflow-hidden">
      {/* Satu-satunya gambar — jadi latar penuh layar, tajam, TIDAK di-blur/transparan */}
      <img
        src={loginImage}
        alt=""
        aria-hidden="true"
        className="fixed inset-0 w-full h-full object-cover"
      />

      {/* Card login mengambang di atas — panel kanan putih solid, panel kiri transparan (jendela ke gambar latar) */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] rounded-[28px] overflow-hidden shadow-2xl flex flex-col md:flex-row">
        {/* Left panel — TRANSPARAN, cuma nampilin teks di atas gambar latar yang sama */}
        <div className="relative w-full md:w-1/2 h-[220px] md:h-auto p-6 md:p-8 flex flex-col justify-between shrink-0 bg-transparent">
          {/* overlay gradasi tipis biar teks di bawah tetap kebaca */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/50" />

          {/* headline */}
          <div className="relative mt-auto">
            <h1 className="text-white font-extrabold text-4xl md:text-5xl leading-[1.05] mb-4">
              Digitalisasi
              <br />
              Warung.
            </h1>
            <p className="text-white/80 text-sm max-w-xs">
              Kelola stok, transaksi, dan laporan keuangan dalam satu genggaman
              modern.
            </p>
          </div>
        </div>

        {/* Right panel — form, putih solid supaya nutupin gambar latar di sisi ini */}
        <div className="w-full md:w-1/2 bg-white p-6 md:p-8 flex flex-col justify-center">
          {/* logo + judul sejajar horizontal */}
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 rounded-xl bg-teal-50 border border-teal-100 flex flex-col items-center justify-center shrink-0">
              <img
                src={logo}
                alt="Logo Warungku"
                className="w-9 h-9 rounded-xl object-cover"
              />
              <span className="text-[6px] font-bold text-teal-700 leading-none mt-0.5">
                Warungku
              </span>
            </div>
            <div>
              <h2 className="text-xl md:text-2xl font-extrabold text-gray-900 leading-tight">
                Selamat Datang
              </h2>
              <p className="text-xs text-gray-500">
                Silakan masuk ke akun Anda
              </p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-3">
            <div>
              <label className="label block text-sm font-medium text-gray-700 mb-1.5">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email@contoh.com"
                className="input w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="label text-sm font-medium text-gray-700">
                  Password
                </label>
                <button
                  type="button"
                  className="text-xs font-semibold text-teal-600 hover:text-teal-700"
                >
                  Lupa Password?
                </button>
              </div>
              <div className="relative">
                <input
                  type={show ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input w-full border border-gray-200 rounded-xl px-4 py-2.5 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-teal-500/40 focus:border-teal-500"
                />
                <button
                  type="button"
                  onClick={() => setShow(!show)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {show ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
              <input
                type="checkbox"
                checked={remember}
                onChange={(e) => setRemember(e.target.checked)}
                className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
              />
              Ingat saya
            </label>

            <button
              type="submit"
              disabled={isPending}
              className="w-full flex items-center justify-center gap-2 bg-teal-600 hover:bg-teal-700 text-white font-semibold rounded-full py-2.5 transition-colors disabled:opacity-60"
            >
              {isPending ? "Memproses..." : "Masuk Sekarang"}
              {!isPending && <ArrowRight size={18} />}
            </button>
          </form>

          <div className="mt-4 pt-3 border-t border-gray-100 text-center">
            <p className="text-[11px] text-gray-300">© 2026 WARUNGKU</p>
          </div>
        </div>
      </div>
    </div>
  );
}
