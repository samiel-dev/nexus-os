"use client";

import { useState } from "react";
import {
  TrendingUp, TrendingDown, ArrowUpRight, ArrowDownRight,
  DollarSign, CreditCard, PieChart, FileText, Filter,
  Download, Plus, ChevronRight, Wallet, BarChart3,
  ArrowRight, Receipt, Building2, ShoppingCart, Coffee,
  Laptop, Users, Zap, Activity
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar, Cell, PieChart as RechartsPie, Pie
} from "recharts";

/* ─ data ─ */
const cashFlowData = [
  { month: "Jan", income: 98000, expenses: 64000, net: 34000 },
  { month: "Fév", income: 134000, expenses: 75000, net: 59000 },
  { month: "Mar", income: 121000, expenses: 70000, net: 51000 },
  { month: "Avr", income: 148000, expenses: 80000, net: 68000 },
  { month: "Mai", income: 162000, expenses: 85000, net: 77000 },
  { month: "Jun", income: 175000, expenses: 90000, net: 85000 },
];

const expenseBreakdown = [
  { name: "Salaires", value: 48000, color: "#8B5CF6", icon: "👥" },
  { name: "Hébergement", value: 12000, color: "#06B6D4", icon: "☁️" },
  { name: "Marketing", value: 9500, color: "#10B981", icon: "📣" },
  { name: "Logiciels", value: 6200, color: "#F59E0B", icon: "💻" },
  { name: "Bureaux", value: 3800, color: "#EF4444", icon: "🏢" },
  { name: "Autres", value: 500, color: "#6B7280", icon: "📦" },
];

const TRANSACTIONS = [
  { id: "TXN-2847", date: "15 Avr", label: "Bank Al-Maghrib Tech", type: "Entrée", category: "Facturation", amount: 58500, status: "Complété", icon: <Building2 size={14} /> },
  { id: "TXN-2846", date: "14 Avr", label: "AWS Cloud Services", type: "Sortie", category: "Hébergement", amount: -4200, status: "Complété", icon: <Laptop size={14} /> },
  { id: "TXN-2845", date: "14 Avr", label: "OCP Digital", type: "Entrée", category: "Facturation", amount: 45200, status: "Complété", icon: <Building2 size={14} /> },
  { id: "TXN-2844", date: "13 Avr", label: "Google Workspace", type: "Sortie", category: "Logiciels", amount: -1850, status: "Complété", icon: <Zap size={14} /> },
  { id: "TXN-2843", date: "12 Avr", label: "MarketPlus SA", type: "Entrée", category: "Facturation", amount: 32000, status: "En attente", icon: <Building2 size={14} /> },
  { id: "TXN-2842", date: "11 Avr", label: "Salaires Mars", type: "Sortie", category: "RH", amount: -48000, status: "Complété", icon: <Users size={14} /> },
  { id: "TXN-2841", date: "10 Avr", label: "Fiverr — Freelance", type: "Sortie", category: "Freelance", amount: -8500, status: "Complété", icon: <ShoppingCart size={14} /> },
  { id: "TXN-2840", date: "09 Avr", label: "InnovaData (Acompte)", type: "Entrée", category: "Facturation", amount: 15000, status: "Complété", icon: <Building2 size={14} /> },
];

const KPI = [
  { label: "Solde actuel", value: "248,500", suffix: " MAD", delta: "+12%", positive: true, icon: <Wallet size={20} />, color: "#8B5CF6", sub: "Mise à jour il y a 2h" },
  { label: "Revenus Avril", value: "148,000", suffix: " MAD", delta: "+18%", positive: true, icon: <TrendingUp size={20} />, color: "#10B981", sub: "Objectif: 150K MAD" },
  { label: "Dépenses Avril", value: "80,000", suffix: " MAD", delta: "+6%", positive: false, icon: <CreditCard size={20} />, color: "#EF4444", sub: "Budget: 90K MAD" },
  { label: "Bénéfice net", value: "68,000", suffix: " MAD", delta: "+28%", positive: true, icon: <BarChart3 size={20} />, color: "#06B6D4", sub: "Marge: 45.9%" },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "rgba(10,10,26,.97)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12, padding: "12px 16px", backdropFilter: "blur(20px)" }}>
      <div style={{ fontSize: ".78rem", color: "rgba(148,163,184,.8)", marginBottom: 8, fontWeight: 700 }}>{label}</div>
      {payload.map((e, i) => (
        <div key={i} style={{ display: "flex", gap: 16, justifyContent: "space-between", fontSize: ".8rem", marginBottom: 4 }}>
          <span style={{ color: "rgba(148,163,184,.7)" }}>{e.name}</span>
          <span style={{ fontWeight: 800, color: e.color }}>{e.value > 0 ? "+" : ""}{(e.value / 1000).toFixed(0)}K MAD</span>
        </div>
      ))}
    </div>
  );
}

export default function FinancePage() {
  const [txFilter, setTxFilter] = useState("Tous");
  const totalExpense = expenseBreakdown.reduce((a, b) => a + b.value, 0);

  const filtered = txFilter === "Tous" ? TRANSACTIONS : TRANSACTIONS.filter(t => t.type === txFilter || t.category === txFilter);

  return (
    <div style={{ padding: 28 }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", fontWeight: 900, letterSpacing: "-.025em", marginBottom: 4 }}>Finance</h1>
          <p style={{ color: "rgba(148,163,184,.75)", fontSize: ".875rem" }}>Gestion financière — Avril 2026 • MAD</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-outline btn-sm" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Download size={13} /> Exporter
          </button>
          <button className="btn btn-primary btn-sm" style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <Plus size={13} /> Nouvelle transaction
          </button>
        </div>
      </div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {KPI.map((k, i) => (
          <div key={i} className="stat-card" id={`finance-kpi-${i}`}>
            <div style={{ position: "absolute", top: 0, right: 0, width: "50%", height: "100%", background: `radial-gradient(circle at top right, ${k.color}12, transparent)`, borderRadius: "0 16px 16px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, background: `${k.color}18`, border: `1px solid ${k.color}25`, display: "flex", alignItems: "center", justifyContent: "center", color: k.color }}>
                {k.icon}
              </div>
              <span style={{
                display: "flex", alignItems: "center", gap: 3, fontSize: ".72rem", fontWeight: 700,
                color: k.positive ? "#10B981" : "#EF4444",
                background: k.positive ? "rgba(16,185,129,.1)" : "rgba(239,68,68,.1)",
                border: `1px solid ${k.positive ? "rgba(16,185,129,.25)" : "rgba(239,68,68,.25)"}`,
                borderRadius: 100, padding: "2px 8px",
              }}>
                {k.positive ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />} {k.delta}
              </span>
            </div>
            <div style={{ fontSize: ".72rem", color: "rgba(100,116,139,.8)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 4 }}>{k.label}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 900, lineHeight: 1.1 }}>
              {k.value}<span style={{ fontSize: ".9rem", color: "rgba(148,163,184,.7)", fontWeight: 600 }}>{k.suffix}</span>
            </div>
            <div style={{ fontSize: ".72rem", color: "rgba(100,116,139,.7)", marginTop: 6 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* Cash flow chart */}
        <div className="chart-card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Flux de trésorerie</h3>
              <p style={{ fontSize: ".75rem", color: "rgba(100,116,139,.7)" }}>Entrées vs Sorties vs Bénéfice net</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "4px 10px", background: "rgba(16,185,129,.1)", border: "1px solid rgba(16,185,129,.25)", borderRadius: 8, fontSize: ".75rem", fontWeight: 700, color: "#34D399" }}>
              <Activity size={12} /> Tendance positive
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={cashFlowData} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
              <defs>
                {[{ id: "inc", c: "#10B981" }, { id: "exp", c: "#EF4444" }, { id: "net", c: "#8B5CF6" }].map(g => (
                  <linearGradient key={g.id} id={g.id} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={g.c} stopOpacity={.3} />
                    <stop offset="95%" stopColor={g.c} stopOpacity={.02} />
                  </linearGradient>
                ))}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "rgba(100,116,139,.7)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(100,116,139,.7)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="income" name="Entrées" stroke="#10B981" strokeWidth={2.5} fill="url(#inc)" />
              <Area type="monotone" dataKey="expenses" name="Sorties" stroke="#EF4444" strokeWidth={2} fill="url(#exp)" />
              <Area type="monotone" dataKey="net" name="Bénéfice net" stroke="#8B5CF6" strokeWidth={2} fill="url(#net)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Expense breakdown */}
        <div className="chart-card">
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 4 }}>Répartition dépenses</h3>
          <p style={{ fontSize: ".75rem", color: "rgba(100,116,139,.7)", marginBottom: 16 }}>Total: {totalExpense.toLocaleString("fr-MA")} MAD</p>
          <ResponsiveContainer width="100%" height={150}>
            <RechartsPie>
              <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={40} outerRadius={68} paddingAngle={3} dataKey="value">
                {expenseBreakdown.map((e, i) => <Cell key={i} fill={e.color} strokeWidth={0} />)}
              </Pie>
              <Tooltip formatter={(v: unknown) => [`${Number(v).toLocaleString("fr-MA")} MAD`, ""]} contentStyle={{ background: "rgba(10,10,26,.97)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 10 }} />
            </RechartsPie>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 8 }}>
            {expenseBreakdown.map((e, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: ".8rem" }}>{e.icon}</span>
                <span style={{ fontSize: ".78rem", color: "rgba(148,163,184,.8)", flex: 1 }}>{e.name}</span>
                <span style={{ fontSize: ".78rem", fontWeight: 800, color: e.color }}>{e.value.toLocaleString("fr-MA")}</span>
                <div className="progress" style={{ width: 50 }}>
                  <div className="progress-fill" style={{ width: `${(e.value / totalExpense) * 100}%`, background: e.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction ledger */}
      <div className="chart-card">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700 }}>Journal de transactions</h3>
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 2, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 9, padding: 3 }}>
              {["Tous", "Entrée", "Sortie"].map(f => (
                <button key={f} onClick={() => setTxFilter(f)} style={{
                  padding: "5px 12px", borderRadius: 7, border: "none", cursor: "pointer",
                  fontSize: ".75rem", fontWeight: 700, transition: "all .15s",
                  background: txFilter === f ? (f === "Entrée" ? "rgba(16,185,129,.2)" : f === "Sortie" ? "rgba(239,68,68,.2)" : "rgba(139,92,246,.2)") : "transparent",
                  color: txFilter === f ? (f === "Entrée" ? "#34D399" : f === "Sortie" ? "#f87171" : "rgb(167,139,250)") : "rgba(148,163,184,.7)",
                  fontFamily: "inherit",
                }}>{f}</button>
              ))}
            </div>
            <button className="btn btn-icon"><Filter size={13} /></button>
            <button className="btn btn-icon"><Download size={13} /></button>
          </div>
        </div>

        <table className="tbl">
          <thead>
            <tr>
              <th>Ref</th><th>Date</th><th>Libellé</th><th>Catégorie</th>
              <th>Type</th><th style={{ textAlign: "right" }}>Montant (MAD)</th><th>Statut</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tx) => (
              <tr key={tx.id} style={{ cursor: "pointer" }}>
                <td><code style={{ fontSize: ".72rem", color: "rgba(100,116,139,.7)", fontFamily: "var(--font-mono)", background: "rgba(255,255,255,.05)", padding: "2px 6px", borderRadius: 5 }}>{tx.id}</code></td>
                <td style={{ color: "rgba(100,116,139,.8)", fontSize: ".8rem" }}>{tx.date}</td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: tx.type === "Entrée" ? "rgba(16,185,129,.1)" : "rgba(239,68,68,.1)", display: "flex", alignItems: "center", justifyContent: "center", color: tx.type === "Entrée" ? "#34D399" : "#f87171" }}>
                      {tx.icon}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: ".85rem" }}>{tx.label}</span>
                  </div>
                </td>
                <td><span className="badge badge-gray" style={{ fontSize: ".65rem" }}>{tx.category}</span></td>
                <td>
                  <span className={`badge ${tx.type === "Entrée" ? "badge-green" : "badge-red"}`} style={{ fontSize: ".65rem" }}>
                    {tx.type === "Entrée" ? <ArrowUpRight size={9} /> : <ArrowDownRight size={9} />} {tx.type}
                  </span>
                </td>
                <td style={{ textAlign: "right", fontFamily: "var(--font-display)", fontWeight: 800, color: tx.amount > 0 ? "#10B981" : "#EF4444", fontSize: ".9rem" }}>
                  {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString("fr-MA")}
                </td>
                <td>
                  <span className={`badge ${tx.status === "Complété" ? "badge-green" : "badge-yellow"}`} style={{ fontSize: ".65rem" }}>
                    {tx.status === "Complété" ? "✓" : "⏳"} {tx.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
