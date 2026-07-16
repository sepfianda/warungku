import { getStockStatus } from "../data/mockData";

const config = {
  safe:  { label: "Aman",    className: "bg-green-100 text-green-700" },
  low:   { label: "Menipis", className: "bg-yellow-100 text-yellow-700" },
  empty: { label: "Habis",   className: "bg-red-100 text-red-700" },
};

export default function StockBadge({ product }) {
  const status = getStockStatus(product);
  const { label, className } = config[status];
  return (
    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${className}`}>
      {label}
    </span>
  );
}