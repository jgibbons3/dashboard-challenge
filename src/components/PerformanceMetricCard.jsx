import Icon from "./icons.jsx";

// ── Performance Metric Card ───────────────────────────────────────────────────
// Renders a single stat tile: icon, label, value, and delta indicator.
export default function PerformanceMetricCard({ icon, label, value, delta, up }) {
  return (
    <div style={{
      background: "#fff",
      borderRadius: 10,
      padding: "14px 16px",
      border: "1px solid #f1f5f9",
    }}>
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        color: "#9ca3af",
        marginBottom: 6,
        fontSize: 12,
      }}>
        {icon}
        {label}
      </div>
      <div style={{ display: "flex", alignItems: "flex-end", gap: 8 }}>
        <span style={{ fontSize: 22, fontWeight: 700, color: "#111827" }}>{value}</span>
        <span style={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          fontSize: 11,
          fontWeight: 600,
          color: up ? "#10b981" : "#ef4444",
          marginBottom: 3,
        }}>
          {up
            ? <Icon.ArrowUp color="#10b981" />
            : <Icon.ArrowDown color="#ef4444" />
          }
          {delta}
        </span>
      </div>
    </div>
  );
}
