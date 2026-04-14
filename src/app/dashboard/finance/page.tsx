"use client";

import { BarChart3, TrendingUp, DollarSign, ArrowUpRight, ArrowDownRight } from "lucide-react";

export default function FinancePage() {
  return (
    <div style={{ padding: "28px" }}>
      <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.75rem", fontWeight: 800, marginBottom: 4 }}>Finance</h1>
      <p style={{ color: "rgba(148, 163, 184, 0.7)", marginBottom: 28 }}>Vue financière complète — MAD conforme DGI</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginBottom: 28 }}>
        {[
          { label: "Chiffre d'affaires YTD", value: "501K MAD", delta: "+24%", positive: true, color: "#8B5CF6" },
          { label: "Résultat net YTD", value: "189K MAD", delta: "+31%", positive: true, color: "#10B981" },
          { label: "Trésorerie disponible", value: "242K MAD", delta: "-5%", positive: false, color: "#F59E0B" },
        ].map((s, i) => (
          <div key={i} style={{ background: "rgba(15, 15, 30, 0.7)", border: `1px solid ${s.color}20`, borderRadius: 16, padding: 24 }}>
            <div style={{ fontSize: "0.75rem", color: "rgba(148, 163, 184, 0.6)", marginBottom: 10, fontWeight: 600, textTransform: "uppercase" }}>{s.label}</div>
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "2.2rem", fontWeight: 800, color: "white", marginBottom: 8 }}>{s.value}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: "0.8rem", fontWeight: 700, color: s.positive ? "#10B981" : "#EF4444" }}>
              {s.positive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
              {s.delta} vs N-1
            </div>
          </div>
        ))}
      </div>

      <div style={{ background: "rgba(15, 15, 30, 0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 24 }}>
        <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, marginBottom: 16 }}>Transactions récentes</h3>
        {[
          { desc: "Paiement — Bank Al-Maghrib Tech", amount: "+58,500 MAD", date: "10 Avr", color: "#10B981" },
          { desc: "Salaires équipe — Avril 2026", amount: "-84,000 MAD", date: "5 Avr", color: "#EF4444" },
          { desc: "Facture MarketPlus (partielle)", amount: "+15,000 MAD", date: "3 Avr", color: "#10B981" },
          { desc: "Infrastructure Cloud AWS", amount: "-3,200 MAD", date: "1 Avr", color: "#EF4444" },
          { desc: "OCP Digital — Acompte", amount: "+20,000 MAD", date: "28 Mar", color: "#10B981" },
        ].map((t, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 0", borderBottom: i < 4 ? "1px solid rgba(255,255,255,0.04)" : "none" }}>
            <span style={{ fontSize: "0.875rem", color: "rgba(226, 232, 240, 0.8)" }}>{t.desc}</span>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontSize: "0.9rem", fontWeight: 800, color: t.color }}>{t.amount}</div>
              <div style={{ fontSize: "0.7rem", color: "rgba(100, 116, 139, 0.6)" }}>{t.date}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
