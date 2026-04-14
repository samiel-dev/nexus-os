"use client";

import { useState } from "react";
import {
  Zap,
  TrendingUp,
  TrendingDown,
  BarChart3,
  Target,
  Star,
  AlertTriangle,
  ArrowRight,
  Activity,
  Globe,
  Users,
  DollarSign,
  Calendar,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart as ReBarChart,
  Bar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  Legend,
} from "recharts";

const monthlyData = [
  { month: "Jan", revenue: 98000, clients: 35, projects: 9, satisfaction: 88 },
  { month: "Fév", revenue: 134000, clients: 38, projects: 10, satisfaction: 90 },
  { month: "Mar", revenue: 121000, clients: 40, projects: 11, satisfaction: 87 },
  { month: "Avr", revenue: 148000, clients: 47, projects: 12, satisfaction: 94 },
];

const teamPerf = [
  { name: "Youssef A.", delivery: 95, quality: 96, satisfaction: 94, speed: 92 },
  { name: "Fatima Z.", delivery: 98, quality: 98, satisfaction: 96, speed: 95 },
  { name: "Karim T.", delivery: 80, quality: 85, satisfaction: 82, speed: 78 },
  { name: "Amal K.", delivery: 90, quality: 92, satisfaction: 91, speed: 88 },
  { name: "Said O.", delivery: 88, quality: 86, satisfaction: 87, speed: 90 },
];

const radarData = [
  { dimension: "Revenus", value: 86, fullMark: 100 },
  { dimension: "Satisfaction", value: 94, fullMark: 100 },
  { dimension: "Livrabilité", value: 90, fullMark: 100 },
  { dimension: "Équipe", value: 88, fullMark: 100 },
  { dimension: "Clients", value: 82, fullMark: 100 },
  { dimension: "Qualité", value: 92, fullMark: 100 },
];

const aiInsightsFull = [
  {
    type: "opportunity",
    icon: <TrendingUp size={20} />,
    color: "#10B981",
    bg: "rgba(16, 185, 129, 0.1)",
    border: "rgba(16, 185, 129, 0.25)",
    title: "Opportunité de croissance détectée",
    description:
      "Basé sur vos données, une offre de maintenance annuelle aux 12 clients actifs pourrait générer +180,000 MAD de revenus récurrents. Probabilité d'acceptation: 73%.",
    action: "Créer une offre",
    confidence: 73,
  },
  {
    type: "alert",
    icon: <AlertTriangle size={20} />,
    color: "#F59E0B",
    bg: "rgba(245, 158, 11, 0.1)",
    border: "rgba(245, 158, 11, 0.25)",
    title: "Risque de dépassement de budget",
    description:
      "Le projet App Mobile Banking consomme 62% du budget avec seulement 45% d'avancement. Action corrective recommandée avant le 25 Avril.",
    action: "Voir le projet",
    confidence: 89,
  },
  {
    type: "prediction",
    icon: <Zap size={20} />,
    color: "#8B5CF6",
    bg: "rgba(139, 92, 246, 0.1)",
    border: "rgba(139, 92, 246, 0.25)",
    title: "Prévision Mai 2026",
    description:
      "Revenus anticipés: 165,000-180,000 MAD. 3 nouveaux projets attendus sur la base de votre pipeline actuel. Recommandé: recruter 1 développeur.",
    action: "Plan de recrutement",
    confidence: 81,
  },
  {
    type: "recommendation",
    icon: <Star size={20} />,
    color: "#06B6D4",
    bg: "rgba(6, 182, 212, 0.1)",
    border: "rgba(6, 182, 212, 0.25)",
    title: "Segment de marché sous-exploité",
    description:
      "L'analyse de votre zone de chalandise montre 40+ startups fintech à Rabat non encore contactées. Potentiel estimé: 500,000+ MAD sur 12 mois.",
    action: "Explorer le segment",
    confidence: 68,
  },
];

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: Array<{ name: string; value: number; color: string }>; label?: string }) {
  if (active && payload && payload.length) {
    return (
      <div style={{ background: "rgba(15, 15, 35, 0.96)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: 10, padding: "12px 16px", backdropFilter: "blur(20px)" }}>
        <div style={{ fontWeight: 700, marginBottom: 8, color: "rgba(226, 232, 240, 0.8)", fontSize: "0.8rem" }}>{label}</div>
        {payload.map((entry, i) => (
          <div key={i} style={{ display: "flex", justifyContent: "space-between", gap: 20, fontSize: "0.8rem", color: entry.color, marginBottom: 4 }}>
            <span>{entry.name}</span>
            <span style={{ fontWeight: 700 }}>{typeof entry.value === "number" && entry.value > 1000 ? `${entry.value.toLocaleString("fr-MA")} MAD` : entry.value}</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
}

export default function AnalyticsPage() {
  const [period, setPeriod] = useState<"3m" | "6m" | "1y">("3m");

  return (
    <div style={{ padding: "28px" }}>
      {/* Header */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.75rem", fontWeight: 800, marginBottom: 4, letterSpacing: "-0.02em" }}>
            Analytics IA
          </h1>
          <p style={{ color: "rgba(148, 163, 184, 0.7)", fontSize: "0.875rem" }}>
            Intelligence artificielle • Prédictions en temps réel • Score de santé: <span style={{ color: "#10B981", fontWeight: 700 }}>92/100</span>
          </p>
        </div>
        <div style={{ display: "flex", gap: 4, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: 4 }}>
          {(["3m", "6m", "1y"] as const).map((p) => (
            <button
              key={p}
              id={`period-${p}`}
              onClick={() => setPeriod(p)}
              style={{
                padding: "7px 16px",
                borderRadius: 8,
                border: "none",
                cursor: "pointer",
                fontSize: "0.8rem",
                fontWeight: 700,
                transition: "all 0.2s ease",
                background: period === p ? "rgba(139, 92, 246, 0.2)" : "transparent",
                color: period === p ? "rgb(167, 139, 250)" : "rgba(148, 163, 184, 0.7)",
              }}
            >
              {p}
            </button>
          ))}
        </div>
      </div>

      {/* Health Score */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(30, 20, 60, 0.9), rgba(15, 10, 35, 0.9))",
          border: "1px solid rgba(139, 92, 246, 0.3)",
          borderRadius: 20,
          padding: 24,
          marginBottom: 24,
          display: "flex",
          gap: 32,
          alignItems: "center",
          boxShadow: "0 0 40px rgba(139, 92, 246, 0.12)",
        }}
      >
        <div style={{ flexShrink: 0 }}>
          <div style={{ fontSize: "0.75rem", color: "rgba(148, 163, 184, 0.6)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>
            Score de santé global
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
            <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "4rem", fontWeight: 900, color: "#10B981", lineHeight: 1 }}>92</span>
            <span style={{ fontSize: "1.5rem", color: "rgba(148, 163, 184, 0.5)", fontWeight: 300 }}>/100</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8 }}>
            <TrendingUp size={14} style={{ color: "#10B981" }} />
            <span style={{ fontSize: "0.8rem", color: "#10B981", fontWeight: 700 }}>+4 points ce mois</span>
          </div>
        </div>

        <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
          {[
            { label: "Revenus", score: 88, trend: "+18%", color: "#8B5CF6" },
            { label: "Clients", score: 94, trend: "+5", color: "#06B6D4" },
            { label: "Équipe", score: 90, trend: "+2%", color: "#10B981" },
            { label: "Projets", score: 85, trend: "12 actifs", color: "#F59E0B" },
            { label: "Finances", score: 96, trend: "86% recouvrement", color: "#3B82F6" },
            { label: "Satisfaction", score: 94, trend: "4.8/5", color: "#EC4899" },
          ].map((m, i) => (
            <div key={i} style={{ background: "rgba(0,0,0,0.2)", borderRadius: 10, padding: "12px 14px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: "0.75rem", color: "rgba(148, 163, 184, 0.6)", fontWeight: 600 }}>{m.label}</span>
              </div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 6 }}>
                <span style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.4rem", fontWeight: 800, color: m.color }}>{m.score}</span>
                <span style={{ fontSize: "0.7rem", color: "rgba(148, 163, 184, 0.4)" }}>/100</span>
              </div>
              <div className="progress-bar">
                <div className="progress-fill" style={{ width: `${m.score}%`, background: `linear-gradient(to right, ${m.color}, ${m.color}aa)` }} />
              </div>
              <div style={{ fontSize: "0.7rem", color: m.color, marginTop: 4, fontWeight: 600 }}>{m.trend}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 24 }}>
        {/* Revenue Trend */}
        <div className="chart-container">
          <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", fontWeight: 700, marginBottom: 4 }}>
            Évolution des métriques clés
          </h3>
          <p style={{ fontSize: "0.8rem", color: "rgba(148, 163, 184, 0.6)", marginBottom: 20 }}>
            Revenus, clients et satisfaction — 4 derniers mois
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyData}>
              <defs>
                <linearGradient id="r" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0.02} />
                </linearGradient>
                <linearGradient id="c" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#06B6D4" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#06B6D4" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
              <XAxis dataKey="month" tick={{ fill: "rgba(148,163,184,0.6)", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "rgba(148,163,184,0.6)", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => v > 1000 ? `${(v/1000).toFixed(0)}K` : v} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenus" stroke="#8B5CF6" strokeWidth={2} fill="url(#r)" />
              <Area type="monotone" dataKey="satisfaction" name="Satisfaction" stroke="#06B6D4" strokeWidth={2} fill="url(#c)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Radar */}
        <div className="chart-container">
          <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", fontWeight: 700, marginBottom: 4 }}>
            Performance globale
          </h3>
          <p style={{ fontSize: "0.8rem", color: "rgba(148, 163, 184, 0.6)", marginBottom: 10 }}>
            Score multidimensionnel
          </p>
          <ResponsiveContainer width="100%" height={220}>
            <RadarChart data={radarData}>
              <PolarGrid stroke="rgba(255,255,255,0.06)" />
              <PolarAngleAxis dataKey="dimension" tick={{ fill: "rgba(148,163,184,0.6)", fontSize: 10 }} />
              <Radar name="Score" dataKey="value" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Team Performance */}
      <div className="chart-container" style={{ marginBottom: 24 }}>
        <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", fontWeight: 700, marginBottom: 4 }}>
          Performance individuelle — Équipe
        </h3>
        <p style={{ fontSize: "0.8rem", color: "rgba(148, 163, 184, 0.6)", marginBottom: 20 }}>
          Livrabilité, qualité, satisfaction client, vitesse
        </p>
        <ResponsiveContainer width="100%" height={200}>
          <ReBarChart data={teamPerf} barSize={16}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.04)" vertical={false} />
            <XAxis dataKey="name" tick={{ fill: "rgba(148,163,184,0.6)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <YAxis domain={[70, 100]} tick={{ fill: "rgba(148,163,184,0.6)", fontSize: 11 }} axisLine={false} tickLine={false} />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="delivery" name="Livrabilité" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="quality" name="Qualité" fill="#06B6D4" radius={[4, 4, 0, 0]} />
            <Bar dataKey="satisfaction" name="Satisfaction" fill="#10B981" radius={[4, 4, 0, 0]} />
          </ReBarChart>
        </ResponsiveContainer>
      </div>

      {/* AI Insights Full */}
      <div>
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg, #7C3AED, #4F46E5)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Zap size={16} color="white" />
          </div>
          <div>
            <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", fontWeight: 700 }}>
              Recommandations IA
            </h3>
            <p style={{ fontSize: "0.75rem", color: "rgba(148, 163, 184, 0.6)" }}>
              4 insights générés ce matin
            </p>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 16 }}>
          {aiInsightsFull.map((insight, i) => (
            <div
              key={i}
              id={`ai-insight-${i}`}
              style={{
                background: insight.bg,
                border: `1px solid ${insight.border}`,
                borderRadius: 16,
                padding: 20,
                transition: "all 0.3s ease",
                cursor: "pointer",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)";
                (e.currentTarget as HTMLElement).style.boxShadow = `0 12px 32px ${insight.bg}`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ color: insight.color }}>{insight.icon}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 700, fontSize: "0.9rem", color: "white" }}>
                    {insight.title}
                  </div>
                  <div style={{ fontSize: "0.7rem", color: insight.color, fontWeight: 600 }}>
                    Confiance IA: {insight.confidence}%
                  </div>
                </div>
              </div>

              <p style={{ fontSize: "0.82rem", color: "rgba(203, 213, 225, 0.8)", lineHeight: 1.6, marginBottom: 14 }}>
                {insight.description}
              </p>

              <div style={{ height: 4, background: "rgba(255,255,255,0.08)", borderRadius: 2, marginBottom: 14 }}>
                <div style={{ width: `${insight.confidence}%`, height: "100%", background: `linear-gradient(to right, ${insight.color}, ${insight.color}aa)`, borderRadius: 2 }} />
              </div>

              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  background: "transparent",
                  border: "none",
                  color: insight.color,
                  fontSize: "0.8rem",
                  fontWeight: 700,
                  cursor: "pointer",
                  padding: 0,
                  transition: "gap 0.2s ease",
                }}
              >
                {insight.action}
                <ArrowRight size={14} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
