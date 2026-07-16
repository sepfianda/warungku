import { useMutation } from "@tanstack/react-query";
import api from "../lib/axios";
import { useAuthStore } from "../store/useAuthStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ← tambah ini

export function useLogin() {
  const setAuth = useAuthStore((s) => s.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: ({ email, password, remember }) =>
      api.post("/login", { email, password, remember }).then((r) => r.data),

    onSuccess: (data) => {
      setAuth(data.token, data.user);
      toast.success("Login berhasil! Selamat datang 👋"); // ← tambah ini
      navigate("/");
    },

    onError: (err) => { // ← tambah ini
      const message =
        err?.response?.data?.errors?.email?.[0] ||
        err?.response?.data?.message ||
        "Login gagal, periksa email & password!";
      toast.error(message);
    },
  });
}