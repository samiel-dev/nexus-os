"use client";

import { useState } from "react";
import {
  Users, Plus, Search, Mail, Phone, Star, Target, Clock, X, BarChart3, Award, Shield, MessageSquare, Edit
} from "lucide-react";
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Cell, Tooltip } from "recharts";

const MEMBERS = [
  {
    id: 1, name: "Youssef Amrani", role: "CEO & Lead Dev", dept: "Direction",
    avatar: "YA", color: "linear-gradient(135deg,#6366F1,#EC4899)",
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
    avatar: "FZ", color: "linear-gradient(135deg,#06B6D4,#6366F1)",
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
    avatar: "KT", color: "linear-gradient(135deg,#10B981,#06B6D4)",
    email: "k.tazi@techflow.ma", phone: "+212 663 456 789",
    score: 82, tasks: 3, projects: 3, status: "away",
    joined: "Jun 2024", skills: ["Figma", "Tailwind", "Motion"],
    radar: [
      { skill: "Code", value: 60 }, { skill: "Design", value: 99 }, { skill: "Gestion", value: 70 },
      { skill: "Client", value: 88 }, { skill: "Analyse", value: 72 },
    ],
  },
];

const DEPT_STATS = [
  { dept: "Tech", count: 2, color: "var(--accent)" },
  { dept: "Direction", count: 1, color: "var(--blue)" },
  { dept: "Design", count: 1, color: "var(--green)" },
];

const STATUS_COLORS: Record<string, { dot: string; label: string }> = {
  online:  { dot: "var(--green)", label: "En ligne" },
  away:    { dot: "var(--amber)", label: "Absent" },
  offline: { dot: "var(--text-4)", label: "Hors ligne" },
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
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", fontWeight: 900, letterSpacing: "-.025em", marginBottom: 4, color: "var(--text-1)" }}>Équipes</h1>
          <p style={{ color: "var(--text-3)", fontSize: ".875rem" }}>
            {MEMBERS.length} membres · Score moyen: <span style={{ color: "var(--green)", fontWeight: 700 }}>{avgScore}%</span>
          </p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary btn-sm" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <BarChart3 size={13} /> Rapport équipe
          </button>
          <button className="btn btn-primary btn-sm" style={{ display: "flex", alignItems: "center", gap: 6 }} id="invite-btn">
            <Plus size={13} /> Inviter
          </button>
        </div>
      </div>

      {/* Stats summary */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {[
          { label: "Actifs", value: MEMBERS.filter(m => m.status === "online").length, suffix: `/${MEMBERS.length}`, color: "var(--green)", bg: "var(--green-subtle)", border: "var(--green-border)", icon: <Users size={18} /> },
          { label: "Tâches", value: MEMBERS.reduce((a, m) => a + m.tasks, 0), suffix: " t.", color: "var(--accent)", bg: "var(--accent-subtle)", border: "var(--accent-border)", icon: <Target size={18} /> },
          { label: "Score", value: avgScore, suffix: "%", color: "var(--blue)", bg: "var(--blue-subtle)", border: "var(--blue-border)", icon: <Star size={18} /> },
          { label: "Projets", value: 12, suffix: " actifs", color: "var(--amber)", bg: "var(--amber-subtle)", border: "var(--amber-border)", icon: <BarChart3 size={18} /> },
        ].map((s, i) => (
          <div key={i} className="stat-card" style={{ padding: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: s.bg, border: `1px solid ${s.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: s.color }}>
                {s.icon}
              </div>
              <span style={{ fontSize: ".72rem", fontWeight: 700, color: "var(--text-3)", textTransform: "uppercase", letterSpacing: ".04em" }}>{s.label}</span>
            </div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 900, color: "var(--text-1)" }}>
              {s.value}<span style={{ fontSize: ".85rem", color: "var(--text-4)", fontWeight: 600 }}>{s.suffix}</span>
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
              background: "var(--glass-2)", border: "1px solid var(--border)",
              borderRadius: "var(--r-md)", padding: "0 14px", height: 40,
            }}>
              <Search size={14} color="var(--text-4)" />
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Rechercher un membre..." id="team-search"
                style={{ background: "transparent", border: "none", outline: "none", color: "var(--text-1)", fontSize: ".85rem", flex: 1, fontFamily: "inherit" }} />
            </div>
            <div style={{ display: "flex", gap: 2, background: "var(--glass-2)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", padding: 4 }}>
              {["Tous", ...DEPT_STATS.map(d => d.dept)].map(d => (
                <button key={d} onClick={() => setDept(d)} style={{
                  padding: "5px 12px", borderRadius: 7, border: "none", cursor: "pointer",
                  fontSize: ".75rem", fontWeight: 700, fontFamily: "inherit", transition: "all .15s",
                  background: dept === d ? "var(--glass-0)" : "transparent",
                  color: dept === d ? "var(--accent)" : "var(--text-3)",
                  boxShadow: dept === d ? "var(--shadow-sm)" : "none",
                }}>{d}</button>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {filtered.map((m) => {
              const st = STATUS_COLORS[m.status];
              const isActive = selected?.id === m.id;
              return (
                <div key={m.id} id={`member-${m.id}`}
                  onClick={() => setSelected(isActive ? null : m)}
                  className="card"
                  style={{
                    background: isActive ? "var(--glass-0)" : "var(--glass-1)",
                    borderColor: isActive ? "var(--accent-border)" : "var(--border)",
                    padding: "18px 20px", cursor: "pointer",
                  }}
                >
                  <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                    {/* Avatar */}
                    <div style={{ position: "relative", flexShrink: 0 }}>
                      <div className="avatar avatar-lg" style={{ background: m.color, color: "white", borderRadius: 14 }}>{m.avatar}</div>
                      <div style={{ position: "absolute", bottom: 0, right: 0, width: 11, height: 11, borderRadius: "50%", background: st.dot, border: "2px solid var(--glass-0)", boxShadow: `0 0 6px ${st.dot}` }} />
                    </div>

                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                        <div>
                          <div style={{ fontWeight: 800, fontSize: ".95rem", marginBottom: 2, color: "var(--text-1)" }}>{m.name}</div>
                          <div style={{ fontSize: ".78rem", color: "var(--text-3)" }}>{m.role} · <span style={{ color: "var(--accent)" }}>{m.dept}</span></div>
                        </div>
                        <div style={{ textAlign: "right" }}>
                           <div style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 900, color: m.score >= 90 ? "var(--green)" : m.score >= 80 ? "var(--amber)" : "var(--red)" }}>{m.score}%</div>
                           <div style={{ fontSize: ".65rem", color: "var(--text-4)" }}>Performance</div>
                        </div>
                      </div>

                      {/* Skills */}
                      <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap", alignItems: "center" }}>
                        {m.skills.map((sk, j) => (
                           <span key={j} className="badge badge-accent" style={{ padding: "0 8px", fontSize: ".65rem" }}>
                             {sk}
                           </span>
                        ))}
                        <span style={{ fontSize: ".72rem", color: "var(--text-4)", marginLeft: 4, display: "flex", alignItems: "center", gap: 4 }}>
                          <Target size={11} />{m.tasks} tâches · <Clock size={11} />Depuis {m.joined}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: "flex", gap: 8, marginTop: 14, paddingTop: 14, borderTop: "1px solid var(--border-strong)" }}>
                    <button className="btn btn-secondary btn-sm" onClick={e => e.stopPropagation()}><MessageSquare size={11} /> Message</button>
                    <button className="btn btn-secondary btn-sm" onClick={e => e.stopPropagation()}><Mail size={11} /> Email</button>
                    <button className="btn btn-secondary btn-sm" onClick={e => e.stopPropagation()}><Edit size={11} /> Modifier</button>
                    <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 4, fontSize: ".72rem", color: st.dot, fontWeight: 600 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: st.dot }} /> {st.label}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {selected ? (
            <div className="card" style={{ position: "sticky", top: 80, padding: 24 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text-1)" }}>Profil détaillé</h3>
                <button onClick={() => setSelected(null)} className="btn-icon btn-icon-sm">
                  <X size={13} />
                </button>
              </div>
              <div style={{ textAlign: "center", marginBottom: 20 }}>
                <div className="avatar avatar-xl" style={{ background: selected.color, color: "white", borderRadius: 18, margin: "0 auto 12px", fontSize: "1.2rem" }}>{selected.avatar}</div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.05rem", color: "var(--text-1)" }}>{selected.name}</div>
                <div style={{ fontSize: ".8rem", color: "var(--text-3)", marginBottom: 8 }}>{selected.role}</div>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16, padding: "12px 0", borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}>
                {[
                  { icon: <Mail size={13} />, val: selected.email },
                  { icon: <Phone size={13} />, val: selected.phone },
                  { icon: <Clock size={13} />, val: `Rejoint en ${selected.joined}` },
                ].map((c, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: ".78rem" }}>
                    <span style={{ color: "var(--text-4)" }}>{c.icon}</span>
                    <span style={{ color: "var(--text-2)", fontWeight: 500 }}>{c.val}</span>
                  </div>
                ))}
              </div>

              <p style={{ fontSize: ".72rem", fontWeight: 700, color: "var(--text-4)", textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 8 }}>Compétences</p>
              <ResponsiveContainer width="100%" height={160}>
                <RadarChart data={selected.radar}>
                  <PolarGrid stroke="var(--border)" />
                  <PolarAngleAxis dataKey="skill" tick={{ fill: "var(--text-3)", fontSize: 11 }} />
                  <Radar dataKey="value" stroke="var(--accent)" fill="var(--accent)" fillOpacity={0.2} strokeWidth={2} />
                </RadarChart>
              </ResponsiveContainer>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 12 }}>
                {[
                  { label: "Performance", val: `${selected.score}%`, color: selected.score >= 90 ? "var(--green)" : "var(--amber)" },
                  { label: "Tâches", val: selected.tasks, color: "var(--accent)" },
                  { label: "Projets", val: selected.projects, color: "var(--blue)" },
                  { label: "Dépt", val: selected.dept, color: "var(--amber)" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "var(--glass-2)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", padding: "10px 12px" }}>
                    <div style={{ fontSize: ".65rem", color: "var(--text-4)", marginBottom: 4, textTransform: "uppercase", letterSpacing: ".04em", fontWeight: 600 }}>{s.label}</div>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1rem", color: s.color }}>{s.val}</div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <>
              <div className="card" style={{ padding: 24 }}>
                 <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 16, color: "var(--text-1)" }}>Par département</h3>
                 <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                   {DEPT_STATS.map((d, i) => (
                     <div key={i} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                       <div style={{ width: 10, height: 10, borderRadius: 3, background: d.color, flexShrink: 0 }} />
                       <span style={{ fontSize: ".82rem", flex: 1, color: "var(--text-2)", fontWeight: 500 }}>{d.dept}</span>
                       <span style={{ fontWeight: 800, color: d.color, fontSize: ".85rem" }}>{d.count}</span>
                     </div>
                   ))}
                 </div>
              </div>

              <div className="card" style={{ padding: 24 }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 14, color: "var(--text-1)" }}>Actions rapides</h3>
                {[
                  { icon: <Plus size={14} />, label: "Inviter un membre", color: "var(--accent)", bg: "var(--accent-subtle)" },
                  { icon: <BarChart3 size={14} />, label: "Rapport d'équipe", color: "var(--blue)", bg: "var(--blue-subtle)" },
                  { icon: <Award size={14} />, label: "Récompenses", color: "var(--amber)", bg: "var(--amber-subtle)" },
                ].map((a, i) => (
                  <div key={i} style={{
                    display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: "var(--r-md)",
                    cursor: "pointer", transition: "all var(--t-base)", marginBottom: 4,
                  }}
                    onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = "var(--glass-0)"}
                    onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = "transparent"}
                  >
                    <div style={{ width: 30, height: 30, borderRadius: 8, background: a.bg, border: `1px solid ${a.bg}`, display: "flex", alignItems: "center", justifyContent: "center", color: a.color }}>
                      {a.icon}
                    </div>
                    <span style={{ fontSize: ".82rem", fontWeight: 600, color: "var(--text-2)" }}>{a.label}</span>
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
