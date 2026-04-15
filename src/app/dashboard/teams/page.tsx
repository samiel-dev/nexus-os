"use client";

import { useState } from "react";
import {
  Users, Plus, Search, Mail, Phone, Star, TrendingUp,
  BarChart3, Shield, Award, Clock, ChevronDown, MoreHorizontal,
  Edit, Trash2, MessageSquare, Target, Check, X
} from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip } from "recharts";

const MEMBERS = [
  {
    id: 1, name: "Youssef Amrani", role: "CEO & Lead Dev", dept: "Direction",
    avatar: "YA", color: "linear-gradient(135deg,#7C3AED,#4F46E5)",
    email: "y.amrani@techflow.ma", phone: "+212 661 234 567",
    score: 96, tasks: 5, projects: 4, status: "online",
    joined: "Jan 2024", skills: ["Next.js", "SaaS", "Leadership"],
    radar: [
      { skill: "Code", value: 95 }, { skill: "Design", value: 70 }, { skill: "Gestion", value: 98 },
      { skill: "Client", value: 92 }, { skill: "Analyse", value: 88 },
    ],
  },
  {
    id: 2, name: "Fatima El Idrissi", role: "Lead Developer", dept: "Tech",
    avatar: "FZ", color: "linear-gradient(135deg,#0891B2,#7C3AED)",
    email: "f.elidrissi@techflow.ma", phone: "+212 662 345 678",
    score: 98, tasks: 8, projects: 5, status: "online",
    joined: "Mar 2024", skills: ["React", "TypeScript", "Node.js"],
    radar: [
      { skill: "Code", value: 99 }, { skill: "Design", value: 85 }, { skill: "Gestion", value: 80 },
      { skill: "Client", value: 75 }, { skill: "Analyse", value: 94 },
    ],
  },
  {
    id: 3, name: "Karim Tazi", role: "UI/UX Designer", dept: "Design",
    avatar: "KT", color: "linear-gradient(135deg,#059669,#0891B2)",
    email: "k.tazi@techflow.ma", phone: "+212 663 456 789",
    score: 82, tasks: 3, projects: 3, status: "away",
    joined: "Jun 2024", skills: ["Figma", "Tailwind", "Motion"],
    radar: [
      { skill: "Code", value: 60 }, { skill: "Design", value: 99 }, { skill: "Gestion", value: 70 },
      { skill: "Client", value: 88 }, { skill: "Analyse", value: 72 },
    ],
  },
  {
    id: 4, name: "Amal Karimi", role: "Full Stack Dev", dept: "Tech",
    avatar: "AK", color: "linear-gradient(135deg,#D97706,#DC2626)",
    email: "a.karimi@techflow.ma", phone: "+212 664 567 890",
    score: 90, tasks: 6, projects: 3, status: "online",
    joined: "Sep 2024", skills: ["Vue.js", "Django", "PostgreSQL"],
    radar: [
      { skill: "Code", value: 90 }, { skill: "Design", value: 75 }, { skill: "Gestion", value: 82 },
      { skill: "Client", value: 80 }, { skill: "Analyse", value: 88 },
    ],
  },
  {
    id: 5, name: "Said Ouhabi", role: "DevOps Engineer", dept: "Infra",
    avatar: "SO", color: "linear-gradient(135deg,#6D28D9,#BE185D)",
    email: "s.ouhabi@techflow.ma", phone: "+212 665 678 901",
    score: 88, tasks: 2, projects: 4, status: "offline",
    joined: "Nov 2024", skills: ["Docker", "AWS", "K8s"],
    radar: [
      { skill: "Code", value: 84 }, { skill: "Design", value: 50 }, { skill: "Gestion", value: 78 },
      { skill: "Client", value: 65 }, { skill: "Analyse", value: 92 },
    ],
  },
];

const DEPT_STATS = [
  { dept: "Tech", count: 2, color: "#8B5CF6" },
  { dept: "Direction", count: 1, color: "#06B6D4" },
  { dept: "Design", count: 1, color: "#10B981" },
  { dept: "Infra", count: 1, color: "#F59E0B" },
];

const STATUS_COLORS: Record<string, { dot: string; label: string }> = {
  online:  { dot: "#10B981", label: "En ligne" },
  away:    { dot: "#F59E0B", label: "Absent" },
  offline: { dot: "#4B5563", label: "Hors ligne" },
};

export default function TeamsPage() {
  const [selected, setSelected] = useState<(typeof MEMBERS)[0] | null>(null);
  const [search, setSearch] = useState("");
  const [dept, setDept] = useState("Tous");

  const filtered = MEMBERS.filter(m =>
    (dept === "Tous" || m.dept === dept) &&
    (m.name.toLowerCase().includes(search.toLowerCase()) || m.role.toLowerCase().includes(search.toLowerCase()))
  );

  const avgScore = Math.round(MEMBERS.reduce((a, m) => a + m.score, 0) / MEMBERS.length);

  return (
    <div style={{ padding: 28 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", fontWeight: 900, letterSpacing: "-.025em", marginBottom: 4 }}>Équipes</h1>
          <p style={{ color: "rgba(148,163,184,.75)", fontSize: ".875rem" }}>
            {MEMBERS.length} membres · Score moyen: <span style={{ color: "#10B981", fontWeight: 700 }}>{avgScore}%</span>
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline btn-sm" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <BarChart3 size={13} /> Rapport équipe
          </button>
          <button className="btn btn-primary btn-sm" style={{ display: "flex", alignItems: "center", gap: 6 }} id="invite-btn">
            <Plus size={13} /> Inviter un membre
          </button>
        </div>
      </div>

      {/* Stats summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Membres actifs", value: MEMBERS.filter(m => m.status === "online").length, suffix: `/${MEMBERS.length}`, color: "#10B981", icon: <Users size={18} /> },
          { label: "Tâches en cours", value: MEMBERS.reduce((a, m) => a + m.tasks, 0), suffix: " tâches", color: "#8B5CF6", icon: <Target size={18} /> },
          { label: "Score moyen", value: avgScore, suffix: "%", color: "#06B6D4", icon: <Star size={18} /> },
          { label: "Projets actifs", value: 12, suffix: " projets", color: "#F59E0B", icon: <BarChart3 size={18} /> },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: `${s.color}18`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>
                {s.icon}
              </div>
              <span style={{ fontSize: ".72rem", fontWeight: 700, color: "rgba(100,116,139,.8)", textTransform: "uppercase", letterSpacing: ".04em" }}>{s.label}</span>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 900, color: "white" }}>
              {s.value}<span style={{ fontSize: ".85rem", color: "rgba(148,163,184,.6)", fontWeight: 600 }}>{s.suffix}</span>
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
        {/* Team list */}
        <div>
          {/* Search & filter */}
          <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
            <div style={{
              flex: 1, display: "flex", alignItems: "center", gap: 8,
              background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
              borderRadius: 10, padding: "0 14px", height: 40,
            }}>
              <Search size={14} color="rgba(100,116,139,.6)" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un membre..." id="team-search"
                style={{ background: "transparent", border: "none", outline: "none", color: "white", fontSize: ".85rem", flex: 1, fontFamily: "inherit" }} />
            </div>
            <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 10, padding: 3 }}>
              {["Tous", ...DEPT_STATS.map(d => d.dept)].map(d => (
                <button key={d} onClick={() => setDept(d)} style={{
                  padding: "5px 12px", borderRadius: 7, border: "none", cursor: "pointer",
                  fontSize: ".73rem", fontWeight: 700, fontFamily: "inherit", transition: "all .15s",
                  background: dept === d ? "rgba(139,92,246,.2)" : "transparent",
                  color: dept === d ? "rgb(167,139,250)" : "rgba(148,163,184,.7)",
                }}>{d}</button>
              ))}
            </div>
          </div>

          {/* Member cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((m) => {
              const st = STATUS_COLORS[m.status];
              const isActive = selected?.id === m.id;
              return (
                <div key={m.id} id={`member-${m.id}`}
                  onClick={() => setSelected(isActive ? null : m)}
                  style={{
                    background: isActive ? "rgba(139,92,246,.08)" : "rgba(14,14,32,.8)",
                    border: isActive ? "1px solid rgba(139,92,246,.35)" : "1px solid rgba(255,255,255,.06)",
                    borderRadius: 14, padding: "18px 20px", cursor: "pointer",
                    transition: "all .2s ease",
                  }}
                  onMouseEnter={e => { if (!isActive) (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,.2)"; }}
                  onMouseLeave={e => { if (!isActive) (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.06)"; }}
                >
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    {/* Avatar */}
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <div className="avatar avatar-lg" style={{ background: m.color, borderRadius: 14 }}>{m.avatar}</div>
                      <div style={{ position: "absolute", bottom: 0, right: 0, width: 11, height: 11, borderRadius: "50%", background: st.dot, border: "2px solid rgba(14,14,32,.9)", boxShadow: `0 0 6px ${st.dot}` }} />
                    </div>

                    {/* Info */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: ".95rem", marginBottom: 2 }}>{m.name}</div>
                          <div style={{ fontSize: ".78rem", color: "rgba(100,116,139,.8)" }}>{m.role} · <span style={{ color: "rgba(139,92,246,.7)" }}>{m.dept}</span></div>
                        </div>
                        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                          <div style={{ textAlign: "right" }}>
                            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 900, color: m.score >= 90 ? "#10B981" : m.score >= 80 ? "#F59E0B" : "#EF4444" }}>{m.score}%</div>
                            <div style={{ fontSize: ".65rem", color: "rgba(100,116,139,.6)" }}>Performance</div>
                          </div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                        {m.skills.map((sk, j) => (
                          <span key={j} style={{
                            padding: "2px 8px", borderRadius: 100, fontSize: ".67rem", fontWeight: 700,
                            background: "rgba(139,92,246,.1)", color: "rgba(167,139,250,.85)",
                            border: "1px solid rgba(139,92,246,.2)",
                          }}>{sk}</span>
                        ))}
                        <span style={{ fontSize: ".72rem", color: "rgba(100,116,139,.7)", marginLeft: 4, display: "flex", alignItems: "center", gap: 4 }}>
                          <Target size={11} />{m.tasks} tâches · <Clock size={11} />Depuis {m.joined}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Actions row */}
                  <div style={{ display: "flex", gap: 8, marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.05)" }}>
                    <button className="btn btn-sm" style={{ gap: 5, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", color: "rgba(203,213,225,.9)", fontSize: ".73rem", padding: "5px 12px" }}
                      onClick={e => e.stopPropagation()}>
                      <MessageSquare size={11} /> Message
                    </button>
                    <button className="btn btn-sm" style={{ gap: 5, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", color: "rgba(203,213,225,.9)", fontSize: ".73rem", padding: "5px 12px" }}
                      onClick={e => e.stopPropagation()}>
                      <Mail size={11} /> Email
                    </button>
                    <button className="btn btn-sm" style={{ gap: 5, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.08)", color: "rgba(203,213,225,.9)", fontSize: ".73rem", padding: "5px 12px" }}
                      onClick={e => e.stopPropagation()}>
                      <Edit size={11} /> Modifier
                    </button>
                    <div style={{ marginLeft: "auto" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: ".72rem", color: st.dot }}>
                        <div style={{ width: 6, height: 6, borderRadius: "50%", background: st.dot }} />
                        {st.label}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar — selected member detail OR stats */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {selected ? (
            // Member detail panel
            <div className="chart-card" style={{ position: "sticky", top: 80 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Profil détaillé</h3>
                <button onClick={() => setSelected(null)} className="btn btn-icon" style={{ width: 28, height: 28 }}>
                  <X size={13} />
                </button>
              </div>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div className="avatar avatar-xl" style={{ background: selected.color, borderRadius: 18, margin: "0 auto 12px", fontSize: "1.2rem" }}>{selected.avatar}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.05rem" }}>{selected.name}</div>
                <div style={{ fontSize: ".8rem", color: "rgba(100,116,139,.8)", marginBottom: 8 }}>{selected.role}</div>
                <div className={`badge ${selected.status === "online" ? "badge-green" : selected.status === "away" ? "badge-yellow" : "badge-gray"}`} style={{ fontSize: ".65rem" }}>
                  {STATUS_COLORS[selected.status].label}
                </div>
              </div>

              {/* Contact */}
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16, padding: "12px 0", borderTop: "1px solid rgba(255,255,255,.06)", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                {[
                  { icon: <Mail size={13} />, val: selected.email },
                  { icon: <Phone size={13} />, val: selected.phone },
                  { icon: <Clock size={13} />, val: `Rejoint en ${selected.joined}` },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".78rem" }}>
                    <span style={{ color: "rgba(100,116,139,.6)" }}>{c.icon}</span>
                    <span style={{ color: "rgba(203,213,225,.85)" }}>{c.val}</span>
                  </div>
                ))}
              </div>

              {/* Radar chart */}
              <p style={{ fontSize: ".72rem", fontWeight: 700, color: "rgba(100,116,139,.7)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>Compétences</p>
              <ResponsiveContainer width="100%" height={160}>
                <RadarChart data={selected.radar}>
                  <PolarGrid stroke="rgba(255,255,255,.06)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "rgba(100,116,139,.7)", fontSize: 11 }} />
                  <Radar dataKey="value" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>

              {/* Stats */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
                {[
                  { label: "Performance", val: `${selected.score}%`, color: selected.score >= 90 ? "#10B981" : "#F59E0B" },
                  { label: "Tâches actives", val: selected.tasks, color: "#8B5CF6" },
                  { label: "Projets", val: selected.projects, color: "#06B6D4" },
                  { label: "Département", val: selected.dept, color: "#F59E0B" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "rgba(0,0,0,.3)", borderRadius: 10, padding: "10px 12px" }}>
                    <div style={{ fontSize: ".65rem", color: "rgba(71,85,105,.8)", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".04em" }}>{s.label}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", color: s.color }}>{s.val}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              {/* Department breakdown */}
              <div className="chart-card">
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 16 }}>Par département</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {DEPT_STATS.map((d, i) => (
                    <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flexShrink: 0 }} />
                      <span style={{ fontSize: ".82rem", flex: 1 }}>{d.dept}</span>
                      <span style={{ fontWeight: 800, color: d.color, fontSize: ".85rem" }}>{d.count}</span>
                      <div className="progress" style={{ width: 80 }}>
                        <div className="progress-fill" style={{ width: `${(d.count / MEMBERS.length) * 100}%`, background: d.color }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Performance bar chart */}
              <div className="chart-card">
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 4 }}>Performance individuelle</h3>
                <p style={{ fontSize: ".72rem", color: "rgba(100,116,139,.7)", marginBottom: 16 }}>Score ce mois-ci</p>
                <ResponsiveContainer width="100%" height={160}>
                  <BarChart data={MEMBERS.map(m => ({ name: m.avatar, score: m.score, fill: m.score >= 90 ? "#10B981" : m.score >= 80 ? "#F59E0B" : "#EF4444" }))} margin={{ top: 0, right: 0, left: -30, bottom: 0 }}>
                    <XAxis dataKey="name" tick={{ fill: "rgba(100,116,139,.7)", fontSize: 11 }} axisLine={false} tickLine={false} />
                    <YAxis domain={[70, 100]} tick={{ fill: "rgba(100,116,139,.7)", fontSize: 10 }} axisLine={false} tickLine={false} />
                    <Tooltip formatter={(v: unknown) => [`${Number(v)}%`, "Score"]} contentStyle={{ background: "rgba(10,10,26,.97)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10 }} />
                    <Bar dataKey="score" radius={[6, 6, 0, 0]}>
                      {MEMBERS.map((m, i) => <Cell key={i} fill={m.score >= 90 ? "#10B981" : m.score >= 80 ? "#F59E0B" : "#EF4444"} />)}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Quick actions */}
              <div className="chart-card">
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 14 }}>Actions rapides</h3>
                {[
                  { icon: <Plus size={14} />, label: "Inviter un membre", color: "#8B5CF6" },
                  { icon: <BarChart3 size={14} />, label: "Rapport de performance", color: "#06B6D4" },
                  { icon: <Award size={14} />, label: "Récompenser l'équipe", color: "#F59E0B" },
                  { icon: <Shield size={14} />, label: "Gérer les permissions", color: "#10B981" },
                ].map((a, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10,
                    cursor: "pointer", transition: "background .15s ease", marginBottom: 4,
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.04)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                  >
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: `${a.color}15`, display: "flex", alignItems: "center", justifyContent: "center", color: a.color }}>
                      {a.icon}
                    </div>
                    <span style={{ fontSize: ".82rem", fontWeight: 600 }}>{a.label}</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
