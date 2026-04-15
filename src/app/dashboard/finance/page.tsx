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
  { name: "Salaires", value: 48000, color: "var(--accent)" },
  { name: "Hébergement", value: 12000, color: "var(--blue)" },
  { name: "Marketing", value: 9500, color: "var(--green)" },
  { name: "Logiciels", value: 6200, color: "var(--amber)" },
  { name: "Bureaux", value: 3800, color: "var(--red)" },
  { name: "Autres", value: 500, color: "var(--text-4)" },
];

const TRANSACTIONS = [
  { id: "TXN-2847", date: "15 Avr", label: "Bank Al-Maghrib Tech", type: "Entrée", category: "Facturation", amount: 58500, status: "Complété", icon: <Building2 size={14} /> },
  { id: "TXN-2846", date: "14 Avr", label: "AWS Cloud Services", type: "Sortie", category: "Hébergement", amount: -4200, status: "Complété", icon: <Laptop size={14} /> },
  { id: "TXN-2845", date: "14 Avr", label: "OCP Digital", type: "Entrée", category: "Facturation", amount: 45200, status: "Complété", icon: <Building2 size={14} /> },
  { id: "TXN-2844", date: "13 Avr", label: "Google Workspace", type: "Sortie", category: "Logiciels", amount: -1850, status: "Complété", icon: <Zap size={14} /> },
  { id: "TXN-2843", date: "12 Avr", label: "MarketPlus SA", type: "Entrée", category: "Facturation", amount: 32000, status: "En attente", icon: <Building2 size={14} /> },
  { id: "TXN-2842", date: "11 Avr", label: "Salaires Mars", type: "Sortie", category: "RH", amount: -48000, status: "Complété", icon: <Users size={14} /> },
  { id: "TXN-2841", date: "10 Avr", label: "Fiverr — Freelance", type: "Sortie", category: "Freelance", amount: -8500, status: "Complété", icon: <ShoppingCart size={14} /> },
  { id: "TXN-2840", date: "09 Avr", label: "InnovaData", type: "Entrée", category: "Facturation", amount: 15000, status: "Complété", icon: <Building2 size={14} /> },
];

const KPI = [
  { label: "Solde actuel", value: "248,500", suffix: " MAD", delta: "+12%", positive: true, icon: <Wallet size={20} />, color: "var(--accent)", sub: "Mise à jour il y a 2h", bg: "var(--accent-subtle)", border: "var(--accent-border)" },
  { label: "Revenus Avril", value: "148,000", suffix: " MAD", delta: "+18%", positive: true, icon: <TrendingUp size={20} />, color: "var(--green)", sub: "Objectif: 150K MAD", bg: "var(--green-subtle)", border: "var(--green-border)", },
  { label: "Dépenses Avril", value: "80,000", suffix: " MAD", delta: "+6%", positive: false, icon: <CreditCard size={20} />, color: "var(--red)", sub: "Budget: 90K MAD", bg: "var(--red-subtle)", border: "var(--red-border)" },
  { label: "Bénéfice net", value: "68,000", suffix: " MAD", delta: "+28%", positive: true, icon: <BarChart3 size={20} />, color: "var(--blue)", sub: "Marge: 45.9%", bg: "var(--blue-subtle)", border: "var(--blue-border)" },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div style={{ background: "var(--glass-0)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", padding: "12px 16px", backdropFilter: "blur(var(--blur-lg))", boxShadow: "var(--shadow-md)" }}>
      <div style={{ fontSize: ".78rem", color: "var(--text-3)", marginBottom: 8, fontWeight: 700 }}>{label}</div>
      {payload.map((e, i) => (
        <div key={i} style={{ display: "flex", gap: 16, justifyContent: "space-between", fontSize: ".8rem", marginBottom: 4 }}>
          <span style={{ color: "var(--text-2)", fontWeight: 500 }}>{e.name}</span>
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
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 28 }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-display)", fontSize: "1.7rem", fontWeight: 900, letterSpacing: "-.025em", marginBottom: 4, color: "var(--text-1)" }}>Finance</h1>
          <p style={{ color: "var(--text-3)", fontSize: ".875rem" }}>Gestion financière — Avril 2026 • MAD</p>
        </div>
        <div style={{ display: "flex", gap: 10 }}>
          <button className="btn btn-secondary btn-sm" style={{ gap: 6 }}><Download size={13} /> Exporter</button>
          <button className="btn btn-primary btn-sm" style={{ gap: 6 }}><Plus size={13} /> Nouvelle transaction</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
        {KPI.map((k, i) => (
          <div key={i} className="stat-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, background: k.bg, border: `1px solid ${k.border}`, display: "flex", alignItems: "center", justifyContent: "center", color: k.color }}>
                {k.icon}
              </div>
              <span className={`badge ${k.positive ? "badge-green" : "badge-red"}`} style={{ height: 22, fontSize: ".65rem", padding: "0 8px" }}>
                {k.positive ? <ArrowUpRight size={11} /> : <ArrowDownRight size={11} />} {k.delta}
              </span>
            </div>
            <div style={{ fontSize: ".72rem", color: "var(--text-4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: ".04em", marginBottom: 4 }}>{k.label}</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: "1.75rem", fontWeight: 900, lineHeight: 1.1, color: "var(--text-1)" }}>
              {k.value}<span style={{ fontSize: ".9rem", color: "var(--text-4)", fontWeight: 600 }}>{k.suffix}</span>
            </div>
            <div style={{ fontSize: ".72rem", color: "var(--text-3)", marginTop: 6, fontWeight: 500 }}>{k.sub}</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 24 }}>
        <div className="card" style={{ padding: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text-1)" }}>Flux de trésorerie</h3>
              <p style={{ fontSize: ".75rem", color: "var(--text-3)" }}>Entrées vs Sorties vs Bénéfice net</p>
            </div>
            <div className="badge badge-green" style={{ height: 26, padding: "0 10px" }}><Activity size={12} /> Tendance</div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={cashFlowData} margin={{ top: 5, right: 0, bottom: 0, left: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "var(--text-4)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "var(--text-4)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={v => `${(v / 1000).toFixed(0)}K`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="income" name="Entrées" stroke="var(--green)" strokeWidth={2.5} fill="var(--green-subtle)" />
              <Area type="monotone" dataKey="expenses" name="Sorties" stroke="var(--red)" strokeWidth={2} fill="var(--red-subtle)" />
              <Area type="monotone" dataKey="net" name="Bénéfice net" stroke="var(--accent)" strokeWidth={2} fill="var(--accent-subtle)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="card" style={{ padding: 24 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, marginBottom: 4, color: "var(--text-1)" }}>Dépenses</h3>
          <p style={{ fontSize: ".75rem", color: "var(--text-3)", marginBottom: 16 }}>Total: {totalExpense.toLocaleString("fr-MA")} MAD</p>
          <ResponsiveContainer width="100%" height={150}>
            <RechartsPie>
              <Pie data={expenseBreakdown} cx="50%" cy="50%" innerRadius={40} outerRadius={68} paddingAngle={3} dataKey="value">
                {expenseBreakdown.map((e, i) => <Cell key={i} fill={e.color} strokeWidth={0} />)}
              </Pie>
              <Tooltip formatter={(v: unknown) => [`${Number(v).toLocaleString("fr-MA")} MAD`, ""]} contentStyle={{ background: "var(--glass-0)", border: "1px solid var(--border)", borderRadius: 10, color: "var(--text-1)" }} />
            </RechartsPie>
          </ResponsiveContainer>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 12 }}>
            {expenseBreakdown.slice(0, 4).map((e, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                 <div style={{ width: 8, height: 8, borderRadius: "50%", background: e.color }} />
                <span style={{ fontSize: ".78rem", color: "var(--text-2)", flex: 1, fontWeight: 500 }}>{e.name}</span>
                <span style={{ fontSize: ".78rem", fontWeight: 800, color: e.color }}>{e.value.toLocaleString("fr-MA")}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <h3 style={{ fontFamily: "var(--font-display)", fontWeight: 700, color: "var(--text-1)" }}>Journal de transactions</h3>
           <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <div style={{ display: "flex", gap: 2, background: "var(--glass-2)", border: "1px solid var(--border)", borderRadius: "var(--r-md)", padding: 4 }}>
              {["Tous", "Entrée", "Sortie"].map(f => (
                <button key={f} onClick={() => setTxFilter(f)} style={{
                  padding: "5px 12px", borderRadius: 7, border: "none", cursor: "pointer",
                  fontSize: ".75rem", fontWeight: 700, transition: "all .15s", fontFamily: "inherit",
                  background: txFilter === f ? "var(--glass-0)" : "transparent",
                  color: txFilter === f ? (f === "Entrée" ? "var(--green)" : f === "Sortie" ? "var(--red)" : "var(--accent)") : "var(--text-3)",
                  boxShadow: txFilter === f ? "var(--shadow-sm)" : "none",
                }}>{f}</button>
              ))}
            </div>
            <button className="btn-icon btn-icon-sm"><Filter size={13} /></button>
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead>
            <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-4)", fontSize: 12, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.04em" }}>
              <th style={{ textAlign: "left", padding: "12px 16px" }}>Date</th>
              <th style={{ textAlign: "left", padding: "12px 16px" }}>Libellé</th>
              <th style={{ textAlign: "left", padding: "12px 16px" }}>Catégorie</th>
              <th style={{ textAlign: "right", padding: "12px 16px" }}>Montant (MAD)</th>
              <th style={{ textAlign: "center", padding: "12px 16px" }}>Statut</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((tx) => (
              <tr key={tx.id} style={{ borderBottom: "1px solid var(--border-strong)", transition: "background 0.15s" }}
                onMouseEnter={e => (e.currentTarget.style.background = "var(--glass-0)")}
                onMouseLeave={e => (e.currentTarget.style.background = "transparent")}>
                <td style={{ padding: "16px", color: "var(--text-3)", fontSize: ".8rem", fontWeight: 500 }}>{tx.date}</td>
                <td style={{ padding: "16px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: tx.type === "Entrée" ? "var(--green-subtle)" : "var(--red-subtle)", display: "flex", alignItems: "center", justifyContent: "center", color: tx.type === "Entrée" ? "var(--green)" : "var(--red)", border: `1px solid ${tx.type === "Entrée" ? "var(--green-border)" : "var(--red-border)"}` }}>
                      {tx.icon}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: ".85rem", color: "var(--text-1)" }}>{tx.label}</span>
                  </div>
                </td>
                <td style={{ padding: "16px" }}>
                   <span className="badge badge-neutral" style={{ fontSize: ".65rem" }}>{tx.category}</span>
                </td>
                <td style={{ padding: "16px", textAlign: "right", fontFamily: "var(--font-display)", fontWeight: 800, color: tx.amount > 0 ? "var(--green)" : "var(--red)", fontSize: ".9rem" }}>
                  {tx.amount > 0 ? "+" : ""}{tx.amount.toLocaleString("fr-MA")}
                </td>
                <td style={{ padding: "16px", textAlign: "center" }}>
                  <span className={`badge ${tx.status === "Complété" ? "badge-green" : "badge-amber"}`} style={{ fontSize: ".65rem" }}>
                    {tx.status}
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
