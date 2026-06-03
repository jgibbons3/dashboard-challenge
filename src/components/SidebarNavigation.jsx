import { useState } from "react";
import Icon from "./icons.jsx";

// ── Sidebar Navigation ────────────────────────────────────────────────────────
export default function SidebarNavigation() {
  const [hrOpen, setHrOpen] = useState(true);
  const [activeItem, setActiveItem] = useState("Learning Journey");

  const navItems = [
    { icon: <Icon.Home />, label: "Home" },
    { icon: <Icon.Coffee />, label: "Coffee Break" },
    { icon: <Icon.Library />, label: "Library" },
    { icon: <Icon.Journey />, label: "Learning Journey" },
    { icon: <Icon.Creations />, label: "My Creations", chevron: true },
  ];

  return (
    <aside style={{
      width: "100%",
      background: "transparent",
      display: "flex",
      flexDirection: "column",
      flex: 1,
      overflow: "hidden",
    }}>
      {/* Logo */}
      <div style={{ padding: "20px 20px 16px" }}>
        <span style={{ fontSize: 20, fontWeight: 700, letterSpacing: -0.5, color: "#111827" }}>
          Scho<span style={{ color: "#f59e0b" }}>●</span>lé
        </span>
      </div>

      {/* Nav */}
      <nav style={{ flex: 1, overflowY: "auto", padding: "12px 0" }}>
        {navItems.map(item => {
          const isActive = activeItem === item.label;
          return (
            <div
              key={item.label}
              onClick={() => setActiveItem(item.label)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 20px",
                cursor: "pointer",
                borderRadius: 8,
                margin: "1px 8px",
                background: isActive ? "#F1F5F9" : "transparent",
                color: isActive ? "#111827" : "#6b7280",
                fontWeight: isActive ? 600 : 400,
                fontSize: 14,
                textAlign: "left",
                transition: "background 0.15s",
              }}
            >
              {item.icon}
              <span style={{ flex: 1, textAlign: "left" }}>{item.label}</span>
              {item.chevron && <Icon.ChevronRight />}
            </div>
          );
        })}

        {/* HR collapsible section */}
        <div
          onClick={() => setHrOpen(!hrOpen)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "9px 20px",
            cursor: "pointer",
            fontSize: 14,
            color: "#6b7280",
            margin: "1px 8px",
            borderRadius: 8,
            textAlign: "left",
          }}
        >
          <Icon.User />
          <span style={{ flex: 1, textAlign: "left" }}>HR</span>
          {hrOpen ? <Icon.ChevronUp /> : <Icon.ChevronRight />}
        </div>

        {hrOpen && (
          <div style={{ paddingLeft: 32 }}>
            {["Dashboard", "Skills", "Team Settings"].map(sub => (
              <div
                key={sub}
                style={{
                  padding: "7px 20px",
                  fontSize: 13,
                  color: "#6b7280",
                  cursor: "pointer",
                  textAlign: "left",
                }}
              >
                {sub}
              </div>
            ))}
          </div>
        )}

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "9px 20px",
            cursor: "pointer",
            fontSize: 14,
            color: "#6b7280",
            margin: "1px 8px",
            borderRadius: 8,
            textAlign: "left",
          }}
        >
          <Icon.Help />
          <span style={{ textAlign: "left" }}>Help</span>
        </div>
      </nav>

      {/* User profile footer */}
      <div style={{
        padding: "14px 20px",
        display: "flex",
        alignItems: "center",
        gap: 10,
      }}>
        <div style={{
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: "linear-gradient(135deg,#6366f1,#c026d3)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          fontSize: 13,
          fontWeight: 700,
          flexShrink: 0,
        }}>
          JS
        </div>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>John Smith</div>
          <div style={{ fontSize: 11, color: "#9ca3af" }}>john@example.com</div>
        </div>
      </div>
    </aside>
  );
}
