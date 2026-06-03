import { useState } from "react";
import SidebarNavigation from "./components/SidebarNavigation.jsx";
import PerformanceMetricCard from "./components/PerformanceMetricCard.jsx";
import AnalyticsDataVisualizer from "./components/AnalyticsDataVisualizer.jsx";
import Icon from "./components/icons.jsx";

// ── Learning Journey Dashboard ────────────────────────────────────────────────
// Orchestrator: composes sidebar, header, stats strip, and analytics visualizer.
export default function LearningJourneyDashboard() {
  const [bannerVisible, setBannerVisible] = useState(true);

  const stats = [
    { icon: <Icon.Clock />,     label: "Learning Time",    value: "20 min", delta: "3%",  up: true  },
    { icon: <Icon.Community />, label: "Community Posts",  value: "8",      delta: "8%",  up: true  },
    { icon: <Icon.Question />,  label: "Solved Questions", value: "12",     delta: "7%",  up: true  },
    { icon: <Icon.Skills />,    label: "Skills Started",   value: "15",     delta: "10%", up: false },
    { icon: <Icon.Sections />,  label: "Total Sections",   value: "25",     delta: "12%", up: false },
  ];

  return (
    <div style={{
      display: "flex",
      minHeight: "100vh",
      fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      background: "#F8FAFC",
      color: "#111827",
      padding: "10px",
      gap: "10px",
      alignItems: "stretch",
    }}>
      {/* ── Sidebar card ── */}
      <div style={{
        width: 230,
        minWidth: 230,
        borderRadius: 24,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        overflow: "hidden",
        flexShrink: 0,
        display: "flex",
        flexDirection: "column",
      }}>
        <SidebarNavigation />
      </div>

      {/* ── Main content card ── */}
      <main style={{
        flex: 1,
        borderRadius: 24,
        background: "rgba(255,255,255,0.85)",
        backdropFilter: "blur(8px)",
        border: "1px solid rgba(255,255,255,0.6)",
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        overflowY: "auto",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: 24,
      }}>

        {/* Page header */}
        <div style={{ paddingBottom: 20, borderBottom: "1px solid #F1F5F9" }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{
                width: 28, height: 28,
                border: "1.5px solid #e5e7eb",
                borderRadius: 6,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="14" height="14" fill="none" stroke="#6b7280" strokeWidth="1.5" viewBox="0 0 24 24">
                  <rect x="3"  y="3"  width="7" height="7" rx="1"/>
                  <rect x="14" y="3"  width="7" height="7" rx="1"/>
                  <rect x="3"  y="14" width="7" height="7" rx="1"/>
                  <rect x="14" y="14" width="7" height="7" rx="1"/>
                </svg>
              </div>
              <h1 style={{ fontSize: 20, fontWeight: 700, color: "#111827", margin: 0 }}>Learning Journey</h1>
            </div>
            <button style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "8px 16px", borderRadius: 8,
              border: "1.5px solid #e5e7eb",
              background: "#fff",
              fontSize: 13, fontWeight: 500, color: "#374151",
              cursor: "pointer",
            }}>
              Edit profile <Icon.Edit />
            </button>
          </div>
        </div>

        {/* Announcement banner */}
        {bannerVisible && (
          <div style={{
            background: "linear-gradient(90deg, #F4F9FF 0%, #F5F4FF 34.13%, #FBF4FF 70.19%, #FFF4F8 100%)",
            border: "1px solid #F1F5F9",
            borderRadius: 10,
            padding: "10px 18px",
            display: "flex", alignItems: "flex-start", gap: 12,
          }}>
            <span style={{ fontSize: 18 }}>🎯</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#7e22ce", marginBottom: 2 }}>
                Your personalized roadmap and learning insights.
              </div>
              <div style={{ fontSize: 13, color: "#9ca3af" }}>
                Scholé shows your learning journey with real insights, so you see progress and places of improvement.
              </div>
            </div>
            <button
              onClick={() => setBannerVisible(false)}
              style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af", padding: 0, marginTop: -2 }}
            >
              <Icon.Close />
            </button>
          </div>
        )}

        {/* Quick Statistics — outer card wrapping all metric tiles */}
        <div style={{
          background: "#fff",
          borderRadius: 12,
          padding: "10px 20px",
          border: "1px solid #f1f5f9",
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <h2 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>Quick Statistics</h2>
            <button style={{
              display: "flex", alignItems: "center", gap: 5,
              padding: "5px 12px", borderRadius: 8,
              border: "1px solid #e5e7eb", background: "#f8fafc",
              fontSize: 12, color: "#6b7280", cursor: "pointer",
            }}>
              <Icon.Calendar /> Last 30 days <Icon.ChevronRight />
            </button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12 }}>
            {stats.map(s => (
              <PerformanceMetricCard
                key={s.label}
                icon={s.icon}
                label={s.label}
                value={s.value}
                delta={s.delta}
                up={s.up}
              />
            ))}
          </div>
        </div>

        {/* Charts & data visualizations */}
        <AnalyticsDataVisualizer />
      </main>
    </div>
  );
}
