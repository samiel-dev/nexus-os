"use client";

import { useState, useEffect } from "react";
import {
  TrendingUp, TrendingDown, Users, FileText, Zap, ArrowUpRight,
  ArrowDownRight, Brain, AlertTriangle, Check, Clock, Star,
  BarChart3, Activity, Target, Rocket, ChevronRight, Sparkles,
  DollarSign, FolderOpen, Eye
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell
} from "recharts";
import Link from "next/link";

/* ─ data ─ */
const revenueData = [
  { month: "Jul", rev: 78000, exp: 52000, proj: 85000 },
  { month: "Aoû", rev: 95000, exp: 60000, proj: 100000 },
  { month: "Sep", rev: 89000, exp: 58000, proj: 92000 },
  { month: "Oct", rev: 112000, exp: 65000, proj: 115000 },
  { month: "Nov", rev: 108000, exp: 62000, proj: 112000 },
  { month: "Déc", rev: 131000, exp: 71000, proj: 135000 },
  { month: "Jan", rev: 98000, exp: 64000, proj: 105000 },
  { month: "Fév", rev: 134000, exp: 75000, proj: 140000 },
  { month: "Mar", rev: 121000, exp: 70000, proj: 128000 },
  { month: "Avr", rev: 148000, exp: 80000, proj: 165000 },
];

const projectStatus = [
  { name: "En cours", value: 7, color: "#8B5CF6" },
  { name: "Terminé", value: 5, color: "#10B981" },
  { name: "En retard", value: 2, color: "#EF4444" },
  { name: "En attente", value: 3, color: "#F59E0B" },
];

const teamPerf = [
  { name: "Youssef", score: 96, tasks: 5, color: "#8B5CF6" },
  { name: "Fatima", score: 98, tasks: 8, color: "#06B6D4" },
  { name: "Karim", score: 82, tasks: 3, color: "#10B981" },
  { name: "Amal", score: 90, tasks: 6, color: "#F59E0B" },
  { name: "Said", score: 88, tasks: 2, color: "#EF4444" },
];

const RECENT_PROJECTS = [
  { name: "App Mobile Banking", client: "BAM Tech", progress: 45, status: "En retard", statusC: "#EF4444", dueDate: "25 Avr", priority: "Critique", team: ["YA", "FZ", "KT"] },
  { name: "E-Commerce Platform v2", client: "MarketPlus SA", progress: 78, status: "En cours", statusC: "#8B5CF6", dueDate: "10 Mai", priority: "Haute", team: ["AK", "SO"] },
  { name: "ERP Intégration OCP", client: "OCP Digital", progress: 92, status: "Finalisation", statusC: "#10B981", dueDate: "2 Mai", priority: "Normal", team: ["FZ", "YA"] },
  { name: "Dashboard Analytics BI", client: "InnovaData", progress: 30, status: "En cours", statusC: "#8B5CF6", dueDate: "1 Jun", priority: "Normal", team: ["KT", "AK"] },
];

const AI_INSIGHTS = [
  { icon: <TrendingUp size={16} />, color: "#10B981", bg: "rgba(16,185,129,.1)", border: "rgba(16,185,129,.25)", title: "Opportunité +180K MAD", desc: "Proposer maintenance annuelle aux 12 clients actifs. Probabilité d'acceptation: 73%.", conf: 73 },
  { icon: <AlertTriangle size={16} />, color: "#F59E0B", bg: "rgba(245,158,11,.1)", border: "rgba(245,158,11,.25)", title: "Risque budget Banking App", desc: "62% budget consommé pour 45% d'avancement. Révision scope requise avant 18 Avr.", conf: 89 },
  { icon: <Zap size={16} />, color: "#8B5CF6", bg: "rgba(139,92,246,.1)", border: "rgba(139,92,246,.25)", title: "Prévision Mai: +18% revenus", desc: "165-180K MAD attendus. 3 nouveaux projets dans le pipeline confirmé.", conf: 81 },
];

const ACTIVITY = [
  { icon: "💰", text: "Facture INV-089 payée", sub: "Bank Al-Maghrib Tech — 58,500 MAD", time: "Il y a 5 min", color: "#10B981" },
  { icon: "🤖", text: "IA: Insight généré", sub: "Opportunité MaintenancePlus détectée", time: "Il y a 20 min", color: "#8B5CF6" },
  { icon: "✅", text: "Sprint 3 terminé", sub: "App Mobile Banking — 12 tâches clôturées", time: "Il y a 1h", color: "#06B6D4" },
  { icon: "👤", text: "Nouveau lead", sub: "InnovaData Maroc — Score IA: 67/100", time: "Il y a 2h", color: "#F59E0B" },
  { icon: "📊", text: "Rapport mensuel prêt", sub: "Mars 2026 — Exporter en PDF", time: "Il y a 3h", color: "#EF4444" },
];

function Tooltip2({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{
      background: "rgba(10,10,26,.97)", border: "1px solid rgba(255,255,255,.12)",
      borderRadius: 12, padding: "12px 16px", backdropFilter: "blur(20px)",
      boxShadow: "0 20px 40px rgba(0,0,0,.7)",
    }}>
      <div style={{ fontSize: ".78rem", fontWeight: 700, color: "rgba(148,163,184,.8)", marginBottom: 8 }}>{label}</div>
      {payload.map((e, i) => (
        <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 20, fontSize: ".8rem", color: e.color, marginBottom: 4 }}>
          <span style={{ color: "rgba(148,163,184,.7)" }}>{e.name}</span>
          <span style={{ fontWeight: 800, fontFamily: "var(--font-display)" }}>
            {typeof e.value === "number" && e.value > 999 ? `${(e.value / 1000).toFixed(0)}K MAD` : e.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function AnimCounter({ to, prefix = "", suffix = "" }: { to: number; prefix?: string; suffix?: string }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    const dur = 1600, step = 16, inc = to / (dur / step);
    let cur = 0;
    const t = setInterval(() => {
      cur = Math.min(cur + inc, to);
      setV(Math.round(cur));
      if (cur >= to) clearInterval(t);
    }, step);
    return () => clearInterval(t);
  }, [to]);
  return <>{prefix}{v.toLocaleString("fr-MA")}{suffix}</>;
}

export default function DashboardPage() {
  const [period, setPeriod] = useState<"3m" | "6m" | "1y">("1y");

  const kpis = [
    {
      id: "revenue",
      label: "Revenus Avril",
      value: 148000,
      suffix: " MAD",
      delta: "+18%",
      positive: true,
      icon: <DollarSign size={20} />,
      color: "#8B5CF6",
      bg: "rgba(139,92,246,.1)",
      sub: "vs 125,400 MAD en Mars",
    },
    {
      id: "clients",
      label: "Clients actifs",
      value: 47,
      suffix: "",
      delta: "+5 ce mois",
      positive: true,
      icon: <Users size={20} />,
      color: "#06B6D4",
      bg: "rgba(6,182,212,.1)",
      sub: "Pipeline: 1.5M MAD",
    },
    {
      id: "projects",
      label: "Projets actifs",
      value: 12,
      suffix: "",
      delta: "2 en retard",
      positive: false,
      icon: <FolderOpen size={20} />,
      color: "#F59E0B",
      bg: "rgba(245,158,11,.1)",
      sub: "Livraison: 83% dans les délais",
    },
    {
      id: "invoices",
      label: "Factures en attente",
      value: 77200,
      suffix: " MAD",
      delta: "3 factures",
      positive: null,
      icon: <FileText size={20} />,
      color: "#EF4444",
      bg: "rgba(239,68,68,.1)",
      sub: "Échéance proche: 25 Avr",
    },
  ];

  return (
    <div style={{ padding: "28px" }}>
      {/* ─── Header ─── */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", fontWeight: 900, letterSpacing: "-.025em", marginBottom: 4 }}>
            Bonjour, Youssef 👋
          </h1>
          <p style={{ color: "rgba(148,163,184,.75)", fontSize: ".875rem" }}>
            {new Date().toLocaleDateString("fr-MA", { weekday: "long", day: "numeric", month: "long", year: "numeric" })} •
            Score de santé: <span style={{ color: "#10B981", fontWeight: 700 }}>92/100 🟢</span>
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Period selector */}
          <div style={{
            display: "flex", gap: 2,
            background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)",
            borderRadius: 10, padding: 3,
          }}>
            {(["3m", "6m", "1y"] as const).map(p => (
              <button key={p} id={`period-${p}`} onClick={() => setPeriod(p)} style={{
                padding: "6px 14px", borderRadius: 8, border: "none", cursor: "pointer",
                fontSize: ".78rem", fontWeight: 700, transition: "all .2s ease",
                background: period === p ? "rgba(139,92,246,.2)" : "transparent",
                color: period === p ? "rgb(167,139,250)" : "rgba(148,163,184,.7)",
              }}>{p}</button>
            ))}
          </div>
          <Link href="/dashboard/ai" style={{ textDecoration: "none" }}>
            <button className="btn btn-primary" style={{
              gap: 6, fontSize: ".8rem", padding: "9px 16px",
              boxShadow: "0 4px 16px rgba(124,58,237,.4)",
            }} id="ask-ai-btn">
              <Brain size={14} /> Demander à l&apos;IA
            </button>
          </Link>
        </div>
      </div>

      {/* ─── KPI Cards ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {kpis.map((kpi) => (
          <div key={kpi.id} id={`kpi-${kpi.id}`} className="stat-card">
            {/* glow bg */}
            <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: `radial-gradient(circle at top right, ${kpi.color}12, transparent)`, borderRadius: "0 16px 16px 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14, position: "relative" }}>
              <div style={{
                width: 42, height: 42, borderRadius: 11,
                background: kpi.bg, display: "flex", alignItems: "center", justifyContent: "center",
                color: kpi.color, border: `1px solid ${kpi.color}20`,
              }}>
                {kpi.icon}
              </div>
              <div style={{
                display: "flex", alignItems: "center", gap: 4, fontSize: ".75rem", fontWeight: 700,
                color: kpi.positive === true ? "#10B981" : kpi.positive === false ? "#EF4444" : "#F59E0B",
                background: kpi.positive === true ? "rgba(16,185,129,.1)" : kpi.positive === false ? "rgba(239,68,68,.1)" : "rgba(245,158,11,.1)",
                border: `1px solid ${kpi.positive === true ? "rgba(16,185,129,.25)" : kpi.positive === false ? "rgba(239,68,68,.25)" : "rgba(245,158,11,.25)"}`,
                borderRadius: 100, padding: "2px 8px",
              }}>
                {kpi.positive === true ? <ArrowUpRight size={12} /> : kpi.positive === false ? <ArrowDownRight size={12} /> : <Activity size={12} />}
                {kpi.delta}
              </div>
            </div>

            <div style={{ position: "relative" }}>
              <div style={{ fontSize: ".75rem", color: "rgba(100,116,139,.8)", marginBottom: 4, fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em" }}>
                {kpi.label}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.8rem", fontWeight: 900, color: "white", lineHeight: 1.1 }}>
                <AnimCounter to={kpi.value} suffix={kpi.suffix} />
              </div>
              <div style={{ fontSize: ".72rem", color: "rgba(100,116,139,.7)", marginTop: 6 }}>{kpi.sub}</div>
            </div>
          </div>
        ))}
      </div>

      {/* ─── Main charts row ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Revenue Chart */}
        <div className="chart-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 2 }}>Revenus & Dépenses</h3>
              <p style={{ fontSize: ".78rem", color: "rgba(100,116,139,.7)" }}>Historique + prévisions IA (pointillés)</p>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 800, color: "white" }}>501K</div>
              <div style={{ fontSize: ".72rem", color: "#10B981", fontWeight: 700 }}>MAD YTD • +24% vs N-1</div>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
              <defs>
                {[
                  { id: "rev", color: "#8B5CF6" },
                  { id: "exp", color: "#EF4444" },
                  { id: "proj", color: "#06B6D4" },
                ].map(g => (
                  <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={g.color} stopOpacity={0.35} />
                    <stop offset="95%" stopColor={g.color} stopOpacity={0.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "rgba(100,116,139,.7)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(100,116,139,.7)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip content={<Tooltip2 />} />
              <Area type="monotone" dataKey="rev" name="Revenus" stroke="#8B5CF6" strokeWidth={2.5} fill="url(#rev)" />
              <Area type="monotone" dataKey="exp" name="Dépenses" stroke="#EF4444" strokeWidth={2} fill="url(#exp)" />
              <Area type="monotone" dataKey="proj" name="Prévision IA" stroke="#06B6D4" strokeWidth={2} strokeDasharray="6 4" fill="url(#proj)" />
            </AreaChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", gap: 16, marginTop: 12, justifyContent: "center" }}>
            {[
              { color: "#8B5CF6", label: "Revenus" },
              { color: "#EF4444", label: "Dépenses" },
              { color: "#06B6D4", label: "Prévision IA" },
            ].map(l => (
              <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".72rem", color: "rgba(100,116,139,.8)" }}>
                <div style={{ width: 18, height: 2, background: l.color, borderRadius: 2 }} />
                {l.label}
              </div>
            ))}
          </div>
        </div>

        {/* Project Status Donut */}
        <div className="chart-card">
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 4 }}>Statut Projets</h3>
          <p style={{ fontSize: ".78rem", color: "rgba(100,116,139,.7)", marginBottom: 12 }}>17 projets total</p>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={projectStatus} cx="50%" cy="50%" innerRadius={45} outerRadius={72} paddingAngle={3} dataKey="value">
                {projectStatus.map((entry, i) => <Cell key={i} fill={entry.color} strokeWidth={0} />)}
              </Pie>
              <Tooltip formatter={(v) => [`${v} projets`, ""]} contentStyle={{ background: "rgba(10,10,26,.97)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {projectStatus.map((s, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <div style={{ width: 8, height: 8, borderRadius: 2, background: s.color, flexShrink: 0 }} />
                <span style={{ fontSize: ".78rem", color: "rgba(148,163,184,.8)", flex: 1 }}>{s.name}</span>
                <span style={{ fontSize: ".8rem", fontWeight: 800, color: s.color }}>{s.value}</span>
                <div className="progress" style={{ width: 60 }}>
                  <div className="progress-fill" style={{ width: `${(s.value / 17) * 100}%`, background: s.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Row 3: Projects + AI + Activity ─── */}
      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: 20, marginBottom: 20 }}>
        {/* Recent projects */}
        <div className="chart-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Projets récents</h3>
            <Link href="/dashboard/projects" style={{ textDecoration: "none" }}>
              <button style={{
                display: "flex", alignItems: "center", gap: 4,
                background: "transparent", border: "none", cursor: "pointer",
                fontSize: ".78rem", color: "rgba(139,92,246,.8)", fontWeight: 600,
              }}>
                Voir tout <ChevronRight size={13} />
              </button>
            </Link>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {RECENT_PROJECTS.map((p, i) => (
              <div key={i} style={{
                padding: "14px 16px",
                background: "rgba(0,0,0,.2)", border: "1px solid rgba(255,255,255,.05)",
                borderRadius: 12, transition: "all .2s ease", cursor: "pointer",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(139,92,246,.25)"; (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,.04)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.05)"; (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,.2)"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: ".875rem", marginBottom: 2 }}>{p.name}</div>
                    <div style={{ fontSize: ".73rem", color: "rgba(100,116,139,.7)" }}>{p.client}</div>
                  </div>
                  <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                    <span style={{
                      fontSize: ".68rem", fontWeight: 700, color: p.statusC,
                      background: `${p.statusC}12`,
                      border: `1px solid ${p.statusC}25`,
                      padding: "2px 8px", borderRadius: 100,
                    }}>{p.status}</span>
                    <span style={{
                      fontSize: ".68rem", color: p.priority === "Critique" ? "#EF4444" : p.priority === "Haute" ? "#F59E0B" : "rgba(100,116,139,.7)",
                      fontWeight: 600,
                    }}>{p.priority}</span>
                  </div>
                </div>

                <div style={{ marginBottom: 8 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: ".7rem", color: "rgba(100,116,139,.7)" }}>Avancement</span>
                    <span style={{ fontSize: ".7rem", fontWeight: 700, color: p.progress >= 70 ? "#10B981" : p.progress >= 40 ? "#F59E0B" : "#EF4444" }}>{p.progress}%</span>
                  </div>
                  <div className="progress">
                    <div className="progress-fill" style={{ width: `${p.progress}%`, background: p.progress >= 70 ? "#10B981" : p.progress >= 40 ? "#F59E0B" : "#EF4444" }} />
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ display: "flex", gap: -4 }}>
                    {p.team.map((m, j) => (
                      <div key={j} className="avatar avatar-sm" style={{
                        background: ["linear-gradient(135deg,#7C3AED,#4F46E5)", "linear-gradient(135deg,#0891B2,#1D4ED8)", "linear-gradient(135deg,#059669,#0D9488)", "linear-gradient(135deg,#DC2626,#9333EA)", "linear-gradient(135deg,#D97706,#EA580C)"][j % 5],
                        marginLeft: j > 0 ? -6 : 0, border: "1.5px solid rgba(12,12,28,.8)", borderRadius: 8,
                      }}>{m}</div>
                    ))}
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: ".7rem", color: "rgba(100,116,139,.6)" }}>
                    <Clock size={11} /> {p.dueDate}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* AI + Activity */}
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {/* AI Insights */}
          <div className="chart-card">
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
              <div style={{ width: 28, height: 28, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Sparkles size={13} color="white" />
              </div>
              <div>
                <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: ".9rem" }}>Insights IA</h3>
                <p style={{ fontSize: ".65rem", color: "rgba(100,116,139,.7)" }}>Mis à jour il y a 12 min</p>
              </div>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {AI_INSIGHTS.map((ins, i) => (
                <div key={i} style={{
                  padding: "12px 14px",
                  background: ins.bg, border: `1px solid ${ins.border}`,
                  borderRadius: 12, cursor: "pointer",
                  transition: "transform .2s ease",
                }}
                  onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)"}
                  onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = "translateY(0)"}
                >
                  <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                    <span style={{ color: ins.color, flexShrink: 0, marginTop: 1 }}>{ins.icon}</span>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontWeight: 700, fontSize: ".8rem", color: "white", marginBottom: 3 }}>{ins.title}</div>
                      <div style={{ fontSize: ".73rem", color: "rgba(148,163,184,.75)", lineHeight: 1.5 }}>{ins.desc}</div>
                      <div style={{ marginTop: 8 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                          <span style={{ fontSize: ".65rem", color: "rgba(100,116,139,.6)" }}>Confiance IA</span>
                          <span style={{ fontSize: ".65rem", fontWeight: 700, color: ins.color }}>{ins.conf}%</span>
                        </div>
                        <div className="progress progress-thin">
                          <div className="progress-fill" style={{ width: `${ins.conf}%`, background: ins.color }} />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <Link href="/dashboard/ai" style={{ textDecoration: "none", display: "block", marginTop: 12 }}>
              <button className="btn" style={{
                width: "100%", justifyContent: "center", padding: "10px",
                background: "rgba(139,92,246,.1)", border: "1px solid rgba(139,92,246,.25)",
                color: "rgba(167,139,250,.9)", fontSize: ".8rem", fontWeight: 700,
              }}>
                <Brain size={13} /> Ouvrir NexusAI Chat
              </button>
            </Link>
          </div>

          {/* Activity feed */}
          <div className="chart-card" style={{ flex: 1 }}>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: ".9rem", marginBottom: 14 }}>Activité récente</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: 1 }}>
              {ACTIVITY.map((a, i) => (
                <div key={i} style={{
                  display: "flex", gap: 10, padding: "9px 0",
                  borderBottom: i < ACTIVITY.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none",
                  cursor: "pointer",
                }}>
                  <div style={{ fontSize: ".95rem", width: 24, textAlign: "center", flexShrink: 0 }}>{a.icon}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: ".8rem", fontWeight: 600, color: "rgba(226,232,240,.9)", marginBottom: 1 }}>{a.text}</div>
                    <div style={{ fontSize: ".7rem", color: "rgba(100,116,139,.7)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{a.sub}</div>
                  </div>
                  <div style={{ fontSize: ".65rem", color: "rgba(71,85,105,.7)", flexShrink: 0, marginTop: 2 }}>{a.time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── Team performance bar chart ─── */}
      <div className="chart-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <div>
            <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Performance de l&apos;équipe</h3>
            <p style={{ fontSize: ".78rem", color: "rgba(100,116,139,.7)" }}>Score de performance individuel ce mois</p>
          </div>
          <Link href="/dashboard/hr" style={{ textDecoration: "none" }}>
            <button style={{
              display: "flex", alignItems: "center", gap: 4, background: "transparent", border: "none",
              cursor: "pointer", fontSize: ".78rem", color: "rgba(139,92,246,.8)", fontWeight: 600,
            }}>
              Voir RH complet <ChevronRight size={13} />
            </button>
          </Link>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16 }}>
          {teamPerf.map((m, i) => (
            <div key={i} style={{ textAlign: "center" }}>
              <div className="avatar avatar-lg" style={{
                background: m.color.startsWith("#") ? `${m.color}20` : m.color,
                border: `2px solid ${m.color}50`,
                borderRadius: 14, margin: "0 auto 10px",
                color: m.color,
                fontFamily: "var(--font-display)", fontWeight: 900, fontSize: "1rem",
              }}>
                {m.name.slice(0, 2).toUpperCase()}
              </div>
              <div style={{ fontWeight: 700, fontSize: ".8rem", marginBottom: 2 }}>{m.name}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.4rem", fontWeight: 900, color: m.color }}>{m.score}%</div>
              <div style={{ margin: "6px auto", maxWidth: 100 }}>
                <div className="progress">
                  <div className="progress-fill" style={{ width: `${m.score}%`, background: m.color }} />
                </div>
              </div>
              <div style={{ fontSize: ".68rem", color: "rgba(100,116,139,.6)" }}>{m.tasks} tâches actives</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
