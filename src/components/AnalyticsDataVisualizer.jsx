import { useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip,
  PieChart, Pie, Cell,
} from "recharts";
import Icon from "./icons.jsx";

// ── Static data ───────────────────────────────────────────────────────────────
const engagementData = [
  { day: "Mon", js: 90, react: 60 },
  { day: "Tue", js: 70, react: 110 },
  { day: "Wed", js: 80, react: 80 },
  { day: "Thu", js: 65, react: 65 },
  { day: "Fri", js: 25, react: 20 },
  { day: "Sat", js: 30, react: 25 },
  { day: "Sun", js: 15, react: 15 },
];

const pieData = [
  { name: "Text", value: 55, color: "#C026D3" },
  { name: "MCQ Questions", value: 25, color: "#EAB308" },
  { name: "Tasks", value: 20, color: "#3B82F6" },
];

// ── Learning Path ─────────────────────────────────────────────────────────────
function LearningPath() {
  const [activeTab, setActiveTab] = useState("All skills");
  const tabs = ["All skills", "Previous weeks", "This week", "Upcoming"];

  const nodes = [
    { id: 1,  x: 60,  y: 200, size: 54, color: "#e5e7eb", borderColor: "#d1d5db", emoji: "📚", opacity: 0.5 },
    { id: 2,  x: 160, y: 190, size: 64, color: "#f3f0ff", borderColor: "#a78bfa", emoji: "🌐" },
    { id: 3,  x: 230, y: 120, size: 44, color: "#f3f4f6", borderColor: "#d1d5db", emoji: "🎓", opacity: 0.5 },
    { id: 4,  x: 230, y: 270, size: 44, color: "#f3f4f6", borderColor: "#d1d5db", emoji: "🎓", opacity: 0.5 },
    { id: 5,  x: 330, y: 110, size: 64, color: "#fffbeb", borderColor: "#f59e0b", emoji: "🏆" },
    { id: 6,  x: 350, y: 250, size: 56, color: "#f3f4f6", borderColor: "#d1d5db", emoji: "📖" },
    { id: 7,  x: 470, y: 180, size: 76, color: "#e0f2fe", borderColor: "url(#currentGrad)", emoji: "🤖", label: "You are currently here!", current: true },
    { id: 8,  x: 580, y: 130, size: 54, color: "#f9fafb", borderColor: "#d1d5db", emoji: "📚", opacity: 0.4 },
    { id: 9,  x: 620, y: 240, size: 44, color: "#f9fafb", borderColor: "#d1d5db", emoji: "📚", opacity: 0.3 },
    { id: 10, x: 690, y: 180, size: 44, color: "#f9fafb", borderColor: "#d1d5db", emoji: "📚", opacity: 0.25 },
  ];

  const edges = [
    { from: 1, to: 2,  color: "#6366f1" },
    { from: 2, to: 3,  color: "#6366f1" },
    { from: 2, to: 4,  color: "#6366f1" },
    { from: 3, to: 5,  color: "#a78bfa" },
    { from: 4, to: 6,  color: "#a78bfa" },
    { from: 5, to: 7,  color: "#f59e0b" },
    { from: 6, to: 7,  color: "#a78bfa" },
    { from: 7, to: 8,  color: "#f87171" },
    { from: 8, to: 9,  color: "#d1d5db" },
    { from: 9, to: 10, color: "#d1d5db" },
  ];

  const getNode = (id) => nodes.find(n => n.id === id);

  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "20px", marginBottom: 20, border: "1px solid #f1f5f9" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <h2 style={{ fontSize: 16, fontWeight: 600, color: "#111827", margin: 0 }}>Learning Path</h2>
        <div style={{ display: "flex", gap: 4 }}>
          {tabs.map(t => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              style={{
                padding: "6px 14px", borderRadius: 20, border: "none", cursor: "pointer",
                fontSize: 13, fontWeight: 500,
                background: activeTab === t ? "#F1F5F9" : "transparent",
                transition: "all 0.15s",
              }}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      <div style={{ background: "#f8fafc", borderRadius: 10, overflow: "hidden", height: 340, position: "relative" }}>
        <svg width="780" height="340" viewBox="0 0 780 340" style={{ position: "absolute", inset: 0 }}>
          <defs>
            <linearGradient id="currentGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#f87171" />
              <stop offset="100%" stopColor="#c026d3" />
            </linearGradient>
          </defs>

          {edges.map((e, i) => {
            const f = getNode(e.from), t = getNode(e.to);
            if (!f || !t) return null;
            const fx = f.x + f.size / 2, fy = f.y + f.size / 2;
            const tx = t.x + t.size / 2, ty = t.y + t.size / 2;
            return (
              <g key={i}>
                <line
                  x1={fx} y1={fy} x2={tx} y2={ty}
                  stroke={e.color} strokeWidth={1.5}
                  strokeDasharray={e.color === "#d1d5db" ? "4 3" : "none"}
                  opacity={e.color === "#d1d5db" ? 0.5 : 1}
                />
                <circle cx={tx} cy={ty} r={3} fill={e.color} opacity={e.color === "#d1d5db" ? 0.4 : 0.8} />
              </g>
            );
          })}

          {nodes.map(n => {
            const cx = n.x + n.size / 2, cy = n.y + n.size / 2, r = n.size / 2;
            return (
              <g key={n.id} opacity={n.opacity || 1}>
                <circle cx={cx} cy={cy} r={r} fill={n.color} />
                <circle cx={cx} cy={cy} r={r} fill="none" stroke={n.current ? "url(#currentGrad)" : n.borderColor} strokeWidth={n.current ? 3 : 1.5} />
                <text x={cx} y={cy + 6} textAnchor="middle" fontSize={n.current ? 28 : 22}>{n.emoji}</text>
                {n.label && (
                  <text x={cx} y={cy + r + 18} textAnchor="middle" fontSize={12} fontWeight={600} fill="#111827">{n.label}</text>
                )}
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ── Skill Mastery Chart ───────────────────────────────────────────────────────
function SkillMastery() {
  const [activeSkill, setActiveSkill] = useState("Data Science");

  const skills = [
    { label: "All Skills",      color: null },
    { label: "Data Science",    color: "#EAB308" },
    { label: "Responsible AI",  color: "#C026D3" },
    { label: "Gen AI + Agents", color: "#6366F1" },
  ];

  const points = [
    { xLabel: "Fundamentals", yLabel: "Theoretical", offsetX: 0,  offsetY: 0,  skill: "Data Science",    color: "#EAB308", emoji: "📚" },
    { xLabel: "Fundamentals", yLabel: "Theoretical", offsetX: 30, offsetY: 30, skill: "Responsible AI",  color: "#C026D3", emoji: "🌐" },
    { xLabel: "Proficient",   yLabel: "Applied",     offsetX: 0,  offsetY: 0,  skill: "Responsible AI",  color: "#C026D3", emoji: "🌐" },
    { xLabel: "Proficient",   yLabel: "Applied",     offsetX: 30, offsetY: 30, skill: "Data Science",    color: "#EAB308", emoji: "📚" },
    { xLabel: "Expert",       yLabel: "Mastery",     offsetX: 0,  offsetY: 0,  skill: "Gen AI + Agents", color: "#6366F1", emoji: "🤖" },
  ];

  const xCols   = { Fundamentals: 130, Proficient: 290, Expert: 450 };
  const yRows   = { Mastery: 50, Applied: 150, Theoretical: 250 };
  const yLabels = ["Mastery", "Applied", "Theoretical"];
  const xLabels = ["Fundamentals", "Proficient", "Expert"];

  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "20px", border: "1px solid #f1f5f9" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>Skill Mastery</h3>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}><Icon.Dots /></button>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 16, flexWrap: "wrap" }}>
        {skills.map(s => (
          <button
            key={s.label}
            onClick={() => setActiveSkill(s.label)}
            style={{
              padding: "4px 12px", borderRadius: 20,
              border: `1.5px solid ${s.color || (activeSkill === s.label ? "#6366f1" : "#e5e7eb")}`,
              background: activeSkill === s.label ? (s.color ? s.color + "15" : "#f3f4f6") : "transparent",
              color: s.color || "#374151", fontSize: 12, fontWeight: 500, cursor: "pointer",
              display: "flex", alignItems: "center", gap: 6,
            }}
          >
            {s.color && <span style={{ width: 8, height: 8, borderRadius: "50%", background: s.color, display: "inline-block" }} />}
            {s.label}
          </button>
        ))}
      </div>

      <div style={{ position: "relative", height: 310 }}>
        <svg width="100%" height="310" viewBox="0 0 520 310">
          {yLabels.map(y => (
            <g key={y}>
              <line x1={80} y1={yRows[y] + 20} x2={500} y2={yRows[y] + 20} stroke="#f1f5f9" strokeWidth={1} />
            </g>
          ))}

          {["Mastery", "Applied", "Theoretical"].map(y => (
            <text key={y} x={18} y={yRows[y] + 24} textAnchor="middle" fontSize={11} fill="#6b7280"
              transform={`rotate(-90, 18, ${yRows[y] + 24})`}>{y}</text>
          ))}

          {xLabels.map(x => (
            <text key={x} x={xCols[x]} y={295} textAnchor="middle" fontSize={11} fill="#6b7280">{x}</text>
          ))}

          {points.map((p, i) => {
            const cx = xCols[p.xLabel] + p.offsetX - 15;
            const cy = yRows[p.yLabel] + p.offsetY;
            const show = activeSkill === "All Skills" || activeSkill === p.skill;
            return (
              <g key={i} opacity={show ? 1 : 0.15} style={{ transition: "opacity 0.2s" }}>
                <circle cx={cx + 20} cy={cy + 20} r={26} fill={p.color + "20"} stroke={p.color} strokeWidth={2} />
                <text x={cx + 20} y={cy + 26} textAnchor="middle" fontSize={18}>{p.emoji}</text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
}

// ── Learning Engagement Bar Chart ─────────────────────────────────────────────
function LearningEngagement() {
  const [engagementTab, setEngagementTab] = useState("JavaScript");

  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "20px", marginBottom: 20, border: "1px solid #f1f5f9" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <h3 style={{ fontSize: 15, fontWeight: 600, color: "#111827", margin: 0 }}>Learning engagement</h3>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}><Icon.Dots /></button>
      </div>
      <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 14px" }}>Time spent learning by skill (past 7 days)</p>

      <div style={{ display: "flex", gap: 6, marginBottom: 16 }}>
        {["All Skills", "JavaScript", "React", "TypeScript", "System Design"].map(t => (
          <button
            key={t}
            onClick={() => setEngagementTab(t)}
            style={{
              padding: "5px 12px", borderRadius: 20, border: "1.5px solid",
              borderColor: engagementTab === t ? "#6366f1" : "#e5e7eb",
              background: engagementTab === t ? "#eef2ff" : "transparent",
              color: engagementTab === t ? "#4f46e5" : "#6b7280",
              fontSize: 12, fontWeight: 500, cursor: "pointer",
            }}
          >
            {t}
          </button>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={engagementData} barSize={28} barGap={2}>
          <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} />
          <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: "#9ca3af" }} tickFormatter={v => `${v}m`} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: "1px solid #e5e7eb", fontSize: 12 }}
            formatter={(v, name) => [`${v}m`, name]}
          />
          <Bar dataKey="js"    name="JavaScript" stackId="a" fill="#C026D3" radius={[0, 0, 4, 4]} />
          <Bar dataKey="react" name="React"      stackId="a" fill="#EAB308" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>

      <div style={{ display: "flex", gap: 20, marginTop: 8 }}>
        {[{ color: "#C026D3", label: "JavaScript" }, { color: "#EAB308", label: "React" }].map(l => (
          <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "#6b7280" }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: l.color, display: "inline-block" }} />
            {l.label}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Lesson Composition Donut Chart ────────────────────────────────────────────
function LessonComposition() {
  return (
    <div style={{ background: "#fff", borderRadius: 12, padding: "20px", border: "1px solid #f1f5f9" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
        <h3 style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: 0 }}>Lesson Composition</h3>
        <button style={{ background: "none", border: "none", cursor: "pointer", color: "#9ca3af" }}><Icon.Dots /></button>
      </div>
      <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 16px" }}>Breakdown of content types within your lessons</p>

      <PieChart width={200} height={160} style={{ margin: "0 auto" }}>
        <Pie
          data={pieData}
          cx={95} cy={75}
          innerRadius={48} outerRadius={78}
          paddingAngle={2}
          dataKey="value"
          startAngle={90}
          endAngle={-270}
        >
          {pieData.map((entry, i) => (
            <Cell key={i} fill={entry.color} />
          ))}
        </Pie>
      </PieChart>

      <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 8 }}>
        {pieData.map(d => (
          <div key={d.name} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "#6b7280" }}>
            <span style={{ width: 10, height: 10, borderRadius: 2, background: d.color, display: "inline-block", flexShrink: 0 }} />
            {d.name}
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Analytics Data Visualizer (public export) ─────────────────────────────────
// Composes all chart and data-visualization sub-sections.
export default function AnalyticsDataVisualizer() {
  return (
    <>
      {/* Full-width learning path graph */}
      <LearningPath />

      {/* Two-column: charts left, insights right */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 20 }}>
        {/* Left column — engagement + skill mastery */}
        <div>
          <LearningEngagement />
          <SkillMastery />
        </div>

        {/* Right column — greeting, insights, preferences, composition */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* Greeting + Insights + Lesson Preferences (single combined card) */}
          <div style={{ background: "#fff", borderRadius: 12, padding: "20px", border: "1px solid #f1f5f9" }}>

            {/* Greeting section */}
            <div style={{ textAlign: "center", marginBottom: 18 }}>
              <div style={{
                width: 56, height: 56,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #e0f2fe, #f3e8ff)",
                border: "2px solid #e0e7ff",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 28,
                margin: "0 auto 10px",
              }}>
                🤖
              </div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#111827", marginBottom: 4 }}>You're doing great, John 🚀</div>
              <div style={{ fontSize: 12, color: "#9ca3af" }}>Keep on learning to achieve great results</div>
            </div>

            {/* Insights section */}
            <h3 style={{ fontSize: 14, fontWeight: 600, color: "#111827", margin: "0 0 12px" }}>Insights</h3>

            <div style={{ background: "#f0fdf4", borderRadius: 8, padding: "12px 14px", marginBottom: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#166534", marginBottom: 4 }}>
                <span>💪</span> Your Strengths
              </div>
              <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>Quick grasp of syntax and structure concepts.</p>
            </div>

            <div style={{ background: "#fff7ed", borderRadius: 8, padding: "12px 14px", marginBottom: 14 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, fontWeight: 600, color: "#9a3412", marginBottom: 4 }}>
                <span>🎯</span> Area of Opportunity
              </div>
              <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>
                Performance optimization patterns still challenge you — revisit the "Advanced React Patterns" skill to improve.
              </p>
            </div>

            {/* Lesson Preferences — light gray sub-section */}
            <div style={{ background: "#f3f4f6", borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#111827" }}>Lesson preferences</span>
                <Icon.Edit />
              </div>
              <p style={{ fontSize: 12, color: "#6b7280", margin: 0 }}>
                You like challenging lessons with audio whenever possible and your preferred tone is formal
              </p>
            </div>
          </div>

          {/* Lesson Composition donut */}
          <LessonComposition />
        </div>
      </div>
    </>
  );
}
