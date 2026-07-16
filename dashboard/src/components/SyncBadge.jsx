export default function SyncBadge({ synced }) {
  return synced ? (
    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-green-100 text-green-700">
      ✓ Tersinkron
    </span>
  ) : (
    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-orange-100 text-orange-700">
      ⏳ Pending
    </span>
  );
}