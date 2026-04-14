"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, Check, Star, Zap, Shield, Globe, BarChart3, Users,
  FileText, MessageSquare, TrendingUp, ChevronRight, Play, Sparkles,
  Brain, Rocket, Award, Building2, Lock, Clock, Target, Menu, X,
  ChevronDown, ExternalLink, Activity
} from "lucide-react";

/* ─────────────────────────────────────────── TYPEWRITER ─── */
function Typewriter({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[index % words.length];
    let timeout: NodeJS.Timeout;

    if (!deleting && displayed.length < word.length) {
      timeout = setTimeout(() => setDisplayed(word.slice(0, displayed.length + 1)), 80);
    } else if (!deleting && displayed.length === word.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 45);
    } else if (deleting && displayed.length === 0) {
      setDeleting(false);
      setIndex((i) => (i + 1) % words.length);
    }
    return () => clearTimeout(timeout);
  }, [displayed, deleting, index, words]);

  return (
    <span className="gradient-text-animated">
      {displayed}
      <span style={{ opacity: Math.sin(Date.now() / 500) > 0 ? 1 : 0, borderRight: "2px solid #8B5CF6", marginLeft: 2 }} />
    </span>
  );
}

/* ─────────────────────────────────────────── COUNTER ─── */
function Counter({ to, suffix = "", prefix = "" }: { to: number; suffix?: string; prefix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const dur = 1800, step = 16;
        const inc = to / (dur / step);
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + inc, to);
          setVal(Math.round(cur));
          if (cur >= to) clearInterval(t);
        }, step);
      }
    }, { threshold: 0.3 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [to]);

  return <span ref={ref}>{prefix}{val.toLocaleString("fr-MA")}{suffix}</span>;
}

/* ─────────────────────────────────────────── PARTICLE ─── */
function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    type P = { x: number; y: number; vx: number; vy: number; size: number; opacity: number; color: string };
    const colors = ["rgba(139,92,246,", "rgba(6,182,212,", "rgba(16,185,129,", "rgba(249,115,22,"];
    const particles: P[] = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      size: Math.random() * 2 + 0.5,
      opacity: Math.random() * 0.6 + 0.1,
      color: colors[Math.floor(Math.random() * colors.length)],
    }));

    let raf: number;
    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color}${p.opacity})`;
        ctx.fill();
      });
      // connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(139,92,246,${0.08 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }
      raf = requestAnimationFrame(draw);
    };
    draw();
    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    window.addEventListener("resize", resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0 }} />;
}

/* ─────────────────────────────────────────── DATA ─── */
const FEATURES = [
  { icon: <BarChart3 size={22} />, color: "#8B5CF6", bg: "rgba(139,92,246,.12)", label: "Projets & Kanban", desc: "Gestion de projets agile avec tableaux Kanban, suivi en temps réel et automatisation des workflows." },
  { icon: <Users size={22} />, color: "#06B6D4", bg: "rgba(6,182,212,.12)", label: "CRM & Pipeline", desc: "Suivez vos prospects, gérez votre pipeline commercial et boostez votre taux de conversion." },
  { icon: <FileText size={22} />, color: "#10B981", bg: "rgba(16,185,129,.12)", label: "Facturation MAD", desc: "Facturation conforme TVA 20% Maroc, devis, bons de commande et recouvrement automatisé." },
  { icon: <Brain size={22} />, color: "#F59E0B", bg: "rgba(245,158,11,.12)", label: "Analytics IA", desc: "Intelligence artificielle prédictive, insights en temps réel et recommandations actionnables." },
  { icon: <Users size={22} />, color: "#EF4444", bg: "rgba(239,68,68,.12)", label: "RH & Paie", desc: "Gestion des employés, congés, fiches de paie automatiques conformes au code du travail marocain." },
  { icon: <MessageSquare size={22} />, color: "#8B5CF6", bg: "rgba(139,92,246,.12)", label: "Chat d'équipe", desc: "Communication interne unifiée avec canaux thématiques, messages directs et partage de fichiers." },
  { icon: <Shield size={22} />, color: "#06B6D4", bg: "rgba(6,182,212,.12)", label: "Sécurité 2FA", desc: "Authentification double facteur, chiffrement AES-256, conformité RGPD et audit trail complet." },
  { icon: <Globe size={22} />, color: "#10B981", bg: "rgba(16,185,129,.12)", label: "Multi-langues", desc: "Interface disponible en Français, Arabe (RTL) et Anglais. Fuseau Africa/Casablanca natif." },
];

const TESTIMONIALS = [
  {
    name: "Hassan Benali",
    role: "CEO, TechNova Rabat",
    avatar: "HB",
    color: "linear-gradient(135deg,#7C3AED,#4F46E5)",
    stars: 5,
    text: "NexusOS a transformé notre façon de travailler. Nous avons remplacé 8 outils différents par une seule plateforme. Notre productivité a augmenté de 60% en 3 mois.",
    impact: "+60% productivité",
  },
  {
    name: "Fatima Zahra El Idrissi",
    role: "Directrice, DigitalMa Agency",
    avatar: "FZ",
    color: "linear-gradient(135deg,#0891B2,#1D4ED8)",
    stars: 5,
    text: "La facturation en MAD avec TVA automatique nous a sauvé des heures chaque mois. L'interface est magnifique et l'IA nous aide vraiment à prendre de meilleures décisions.",
    impact: "-40h admin/mois",
  },
  {
    name: "Youssef Amrani",
    role: "CTO, InnovaData Casablanca",
    avatar: "YA",
    color: "linear-gradient(135deg,#059669,#0D9488)",
    stars: 5,
    text: "Enfin un SaaS conçu pour le marché marocain ! Le module RH with calcul CNSS/AMO/IR automatique est une révolution. Je ne peux plus m'en passer.",
    impact: "ROI en 45 jours",
  },
];

const PLANS = [
  {
    id: "starter",
    name: "Starter",
    price: "490",
    period: "/mois",
    desc: "Parfait pour les startups en démarrage",
    color: "#06B6D4",
    bg: "rgba(6,182,212,.08)",
    border: "rgba(6,182,212,.2)",
    cta: "Commencer gratuitement",
    trial: "14 jours gratuits",
    features: [
      "5 utilisateurs inclus",
      "Projets & Kanban (illimité)",
      "CRM — jusqu'à 100 clients",
      "Facturation (50 factures/mois)",
      "Chat d'équipe",
      "Analytics basique",
      "Support email 48h",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "1 490",
    period: "/mois",
    desc: "La solution complète pour les équipes en croissance",
    color: "#8B5CF6",
    bg: "rgba(139,92,246,.1)",
    border: "rgba(139,92,246,.4)",
    cta: "Démarrer l'essai",
    trial: "30 jours gratuits",
    popular: true,
    features: [
      "20 utilisateurs inclus",
      "Tout le plan Starter +",
      "CRM illimité + pipeline IA",
      "Facturation illimitée",
      "Module RH complet + Paie",
      "Analytics IA avancée",
      "Intégrations API",
      "Support prioritaire 4h",
      "Onboarding dédié",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    price: "3 990",
    period: "/mois",
    desc: "Pour les agences et grandes structures",
    color: "#F59E0B",
    bg: "rgba(245,158,11,.08)",
    border: "rgba(245,158,11,.2)",
    cta: "Contacter les ventes",
    trial: "Démo personnalisée",
    features: [
      "Utilisateurs illimités",
      "Tout le plan Growth +",
      "Multi-entreprises",
      "White-label disponible",
      "AI custom (fine-tuning)",
      "Intégration ERP/CRM externe",
      "SLA 99.9% garanti",
      "Account manager dédié",
      "Formation équipe incluse",
    ],
  },
];

const LOGOS = [
  "OCP Group", "BAM Tech", "Maroc Telecom", "CDG Capital", "HPS", "M2M Group", "Lydec", "Inwi"
];

const COMPARISON = [
  { feature: "Localisation MAD / TVA 20%", nexus: true, odoo: false, hubspot: false },
  { feature: "CNSS/AMO/IR automatique", nexus: true, odoo: false, hubspot: false },
  { feature: "Interface en Arabe (RTL)", nexus: true, odoo: true, hubspot: false },
  { feature: "AI Insights natifs", nexus: true, odoo: false, hubspot: false },
  { feature: "Prix adapté au marché MA", nexus: true, odoo: false, hubspot: false },
  { feature: "Setup < 30 minutes", nexus: true, odoo: false, hubspot: true },
  { feature: "Support en Darija/Français", nexus: true, odoo: false, hubspot: false },
  { feature: "Conforme DGI Maroc", nexus: true, odoo: false, hubspot: false },
];

const STATS = [
  { value: 500, suffix: "+", label: "Startups marocaines", color: "#8B5CF6" },
  { value: 98, suffix: "%", label: "Satisfaction client", color: "#10B981" },
  { value: 40, suffix: "%", label: "Gain de productivité", color: "#06B6D4" },
  { value: 2.4, suffix: "M MAD", prefix: "+", label: "Pipeline géré", color: "#F59E0B" },
];

const FAQS = [
  { q: "NexusOS est-il conforme à la législation marocaine ?", a: "Oui, totalement. NexusOS a été conçu dès le départ pour le marché marocain : TVA 20%, CNSS, AMO, IR, conformité DGI, et format ICE/IF sur les factures." },
  { q: "Puis-je importer mes données existantes ?", a: "Oui. NexusOS supporte l'import CSV/Excel pour les clients, projets et factures. Notre équipe d'onboarding vous accompagne gratuitement sur les plans Growth et Enterprise." },
  { q: "Y a-t-il une version mobile ?", a: "L'interface web est entièrement responsive. Une application mobile native (iOS & Android) est prévue pour T3 2026 avec toutes les fonctionnalités clés." },
  { q: "Mes données sont-elles sécurisées ?", a: "Absolument. Chiffrement AES-256, hébergement en Europe (conformité RGPD), authentification 2FA, et audit trail complet. Vos données vous appartiennent." },
  { q: "Quel est le contrat d'engagement ?", a: "Aucun engagement minimum. Vous pouvez commencer avec un essai gratuit et passer à n'importe quel plan à tout moment. Résiliation sans frais." },
];

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const [videoOpen, setVideoOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <div style={{ position: "relative", overflow: "hidden" }}>
      {/* Noise overlay */}
      <div className="noise" />

      {/* ═══════════════════════ NAV ═══════════════════════ */}
      <nav
        style={{
          position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
          height: 68,
          background: scrolled ? "rgba(6,6,16,.9)" : "transparent",
          backdropFilter: scrolled ? "blur(24px)" : "none",
          borderBottom: scrolled ? "1px solid rgba(255,255,255,.06)" : "1px solid transparent",
          display: "flex", alignItems: "center",
          padding: "0 max(40px, calc((100vw - 1280px)/2))",
          transition: "all .35s ease",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginRight: "auto" }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 0 20px rgba(124,58,237,.5)",
          }}>
            <Zap size={18} color="white" />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.25rem" }}>
            Nexus<span className="gradient-text">OS</span>
          </span>
          <span className="badge-live badge" style={{ marginLeft: 6, fontSize: ".6rem" }}>
            BETA
          </span>
        </div>

        <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
          {["Fonctionnalités", "Tarifs", "Comparaison", "FAQ", "Blog"].map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`}
              style={{ padding: "8px 14px", borderRadius: 8, fontSize: ".875rem", fontWeight: 500, color: "rgba(203,213,225,.8)", textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#fff")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(203,213,225,.8)")}
            >{item}</a>
          ))}
          <div style={{ width: 1, height: 20, background: "rgba(255,255,255,.1)", margin: "0 8px" }} />
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <button className="btn btn-sm btn-outline">Connexion</button>
          </Link>
          <Link href="/dashboard" style={{ textDecoration: "none" }}>
            <button className="btn btn-sm btn-primary" style={{ padding: "8px 18px" }}>
              Essai gratuit <ArrowRight size={13} />
            </button>
          </Link>
        </div>
      </nav>

      {/* ═══════════════════════ HERO ═══════════════════════ */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "120px 24px 80px",
        position: "relative", textAlign: "center",
      }}>
        <Particles />

        {/* Background glows */}
        <div className="hero-glow-primary" style={{ top: "10%", left: "20%", transform: "translateX(-50%)" }} />
        <div className="hero-glow-secondary" style={{ bottom: "20%", right: "15%", transform: "translateX(50%)" }} />
        <div className="hero-glow-accent" style={{ top: "40%", right: "10%" }} />
        <div className="grid-pattern" style={{ position: "absolute", inset: 0, zIndex: 0 }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 900, margin: "0 auto" }}>
          {/* Launch badge */}
          <div className="animate-fade-up" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "rgba(139,92,246,.12)", border: "1px solid rgba(139,92,246,.3)",
            borderRadius: 100, padding: "6px 16px 6px 8px", marginBottom: 32,
          }}>
            <span style={{
              background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
              borderRadius: 100, padding: "2px 10px", fontSize: ".7rem", fontWeight: 800,
              color: "#fff",
            }}>NOUVEAU</span>
            <span style={{ fontSize: ".8rem", color: "rgba(203,213,225,.9)" }}>
              Analytics IA v2 disponible — Prédictions à 30 jours
            </span>
            <ChevronRight size={13} color="rgba(139,92,246,.8)" />
          </div>

          {/* Main headline */}
          <h1 className="animate-fade-up d-100" style={{
            fontFamily: "var(--font-display)", fontWeight: 900, lineHeight: 1.1,
            letterSpacing: "-0.03em", marginBottom: 24,
            fontSize: "clamp(2.6rem, 6vw, 4.2rem)",
          }}>
            L&apos;OS qui propulse<br />
            les{" "}
            <Typewriter words={["startups marocaines", "agences digitales", "équipes tech", "PMEs innovantes"]} />
            <br />
            <span className="gradient-text">vers le sommet</span>
          </h1>

          <p className="animate-fade-up d-200" style={{
            fontSize: "clamp(1rem, 2vw, 1.2rem)", lineHeight: 1.7,
            color: "rgba(148,163,184,.9)", maxWidth: 680, margin: "0 auto 40px",
          }}>
            Une plateforme tout-en-un qui remplace vos 8+ outils fragmentés.
            Conçue par des Marocains, pour le marché marocain.
            Facturation MAD, conformité DGI, IA prédictive.
          </p>

          <div className="animate-fade-up d-300" style={{
            display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap", marginBottom: 48,
          }}>
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <button className="btn btn-primary-lg">
                Essayer gratuitement <ArrowRight size={18} />
              </button>
            </Link>
            <button
              className="btn btn-outline-lg"
              onClick={() => setVideoOpen(true)}
              style={{ display: "flex", alignItems: "center", gap: 10 }}
            >
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: "rgba(255,255,255,.1)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Play size={12} style={{ marginLeft: 2 }} />
              </div>
              Voir la démo (2 min)
            </button>
          </div>

          {/* Trust signals */}
          <div className="animate-fade-up d-400" style={{
            display: "flex", gap: 24, justifyContent: "center", alignItems: "center",
            flexWrap: "wrap",
          }}>
            {["Aucune carte de crédit", "14 jours gratuits", "Annulation à tout moment"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: ".82rem", color: "rgba(148,163,184,.8)" }}>
                <Check size={13} color="#10B981" strokeWidth={3} />
                {t}
              </div>
            ))}
          </div>
        </div>

        {/* Dashboard preview */}
        <div className="animate-fade-up d-500" style={{
          position: "relative", zIndex: 1, marginTop: 72,
          maxWidth: 1100, width: "100%",
        }}>
          <div style={{
            background: "linear-gradient(145deg,rgba(24,24,52,.95),rgba(14,14,34,.98))",
            border: "1px solid rgba(255,255,255,.1)",
            borderRadius: 20,
            padding: "4px",
            boxShadow: "0 40px 120px rgba(0,0,0,.8), 0 0 0 1px rgba(139,92,246,.15), inset 0 1px 0 rgba(255,255,255,.08)",
          }}>
            {/* Browser chrome */}
            <div style={{
              height: 38, background: "rgba(0,0,0,.4)", borderRadius: "16px 16px 0 0",
              display: "flex", alignItems: "center", padding: "0 16px", gap: 8,
            }}>
              {["#EF4444", "#F59E0B", "#10B981"].map((c) => (
                <div key={c} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: .8 }} />
              ))}
              <div style={{
                flex: 1, height: 22, background: "rgba(255,255,255,.05)", borderRadius: 6,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: ".7rem", color: "rgba(100,116,139,.7)", gap: 6, maxWidth: 240, margin: "0 auto",
              }}>
                <Lock size={9} />
                app.nexusos.ma
              </div>
            </div>

            {/* Fake dashboard */}
            <div style={{ display: "flex", minHeight: 420, borderRadius: "0 0 16px 16px", overflow: "hidden" }}>
              {/* Mini sidebar */}
              <div style={{
                width: 52, background: "rgba(6,6,16,.9)",
                borderRight: "1px solid rgba(255,255,255,.05)",
                display: "flex", flexDirection: "column",
                alignItems: "center", padding: "12px 0", gap: 4,
              }}>
                {[BarChart3, Users, FileText, MessageSquare, TrendingUp, Brain].map((Icon, i) => (
                  <div key={i} style={{
                    width: 34, height: 34, borderRadius: 8,
                    background: i === 0 ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "rgba(255,255,255,.04)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                  }}>
                    <Icon size={14} color={i === 0 ? "white" : "rgba(100,116,139,.7)"} />
                  </div>
                ))}
              </div>

              {/* Content */}
              <div style={{ flex: 1, padding: 16, background: "rgba(8,8,20,.7)" }}>
                {/* KPIs */}
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 12 }}>
                  {[
                    { label: "Revenus", value: "148K MAD", delta: "+18%", c: "#8B5CF6" },
                    { label: "Clients actifs", value: "47", delta: "+5", c: "#06B6D4" },
                    { label: "Projets", value: "12", delta: "3 en retard", c: "#F59E0B" },
                    { label: "Score IA", value: "92/100", delta: "+4 pts", c: "#10B981" },
                  ].map((k) => (
                    <div key={k.label} style={{
                      background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.05)",
                      borderRadius: 10, padding: "10px 12px",
                    }}>
                      <div style={{ fontSize: ".6rem", color: "rgba(100,116,139,.7)", marginBottom: 4 }}>{k.label}</div>
                      <div style={{ fontFamily: "var(--font-display)", fontSize: ".95rem", fontWeight: 800, color: "white" }}>{k.value}</div>
                      <div style={{ fontSize: ".6rem", color: k.c, marginTop: 3 }}>{k.delta}</div>
                    </div>
                  ))}
                </div>

                {/* Chart placeholder */}
                <div style={{
                  height: 140, background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.05)",
                  borderRadius: 10, padding: 12, position: "relative", overflow: "hidden",
                }}>
                  <div style={{ fontSize: ".65rem", color: "rgba(100,116,139,.7)", marginBottom: 8 }}>Revenus — 12 derniers mois (MAD)</div>
                  <svg width="100%" height="90" viewBox="0 0 500 90" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#8B5CF6" stopOpacity=".4" />
                        <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path d="M0,80 C60,70 80,50 130,45 C180,40 200,60 250,38 C300,18 330,30 380,20 C420,12 460,15 500,8" fill="none" stroke="#8B5CF6" strokeWidth="2" />
                    <path d="M0,80 C60,70 80,50 130,45 C180,40 200,60 250,38 C300,18 330,30 380,20 C420,12 460,15 500,8 L500,90 L0,90 Z" fill="url(#cg)" />
                    <path d="M0,85 C70,80 90,65 140,60 C200,55 220,70 280,58 C330,48 370,52 430,42 C460,37 480,40 500,35" fill="none" stroke="#06B6D4" strokeWidth="1.5" strokeDasharray="4,3" opacity=".7" />
                  </svg>
                  {/* AI badge */}
                  <div style={{
                    position: "absolute", top: 8, right: 10,
                    background: "rgba(139,92,246,.15)", border: "1px solid rgba(139,92,246,.3)",
                    borderRadius: 6, padding: "3px 8px",
                    display: "flex", alignItems: "center", gap: 4,
                    fontSize: ".6rem", color: "rgba(167,139,250,.9)", fontWeight: 700,
                  }}>
                    <Sparkles size={9} /> IA Prédictive
                  </div>
                </div>

                {/* Mini tasks */}
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  {["Projet Banking App", "CRM — 3 leads chauds", "Facture INV-089 due"].map((t, i) => (
                    <div key={i} style={{
                      flex: 1, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.05)",
                      borderRadius: 8, padding: "8px 10px", fontSize: ".62rem", color: "rgba(203,213,225,.8)",
                    }}>
                      <div style={{
                        width: 6, height: 6, borderRadius: "50%", marginBottom: 4,
                        background: ["#8B5CF6", "#F59E0B", "#EF4444"][i],
                      }} />
                      {t}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Floating badges */}
          <div style={{
            position: "absolute", top: -16, right: -24,
            background: "linear-gradient(135deg,rgba(16,185,129,.2),rgba(6,182,212,.2))",
            border: "1px solid rgba(16,185,129,.3)", borderRadius: 14, padding: "10px 16px",
            display: "flex", alignItems: "center", gap: 8,
            backdropFilter: "blur(20px)",
          }}>
            <Activity size={16} color="#10B981" />
            <div>
              <div style={{ fontSize: ".65rem", color: "rgba(148,163,184,.7)" }}>Économisé ce mois</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: ".95rem", fontWeight: 800, color: "#10B981" }}>+32,000 MAD</div>
            </div>
          </div>

          <div style={{
            position: "absolute", bottom: -16, left: -24,
            background: "rgba(18,18,44,.95)", border: "1px solid rgba(139,92,246,.3)",
            borderRadius: 14, padding: "10px 16px",
            display: "flex", alignItems: "center", gap: 8,
            backdropFilter: "blur(20px)",
          }}>
            <div style={{
              width: 28, height: 28, borderRadius: 8,
              background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <Brain size={14} color="white" />
            </div>
            <div>
              <div style={{ fontSize: ".65rem", color: "rgba(148,163,184,.7)" }}>IA Insight</div>
              <div style={{ fontSize: ".75rem", fontWeight: 700, color: "white" }}>3 opportunités détectées</div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════ TICKER ═══════════════════════ */}
      <div style={{
        background: "linear-gradient(90deg,rgba(139,92,246,.08),rgba(6,182,212,.08))",
        borderTop: "1px solid rgba(255,255,255,.05)",
        borderBottom: "1px solid rgba(255,255,255,.05)",
        padding: "14px 0", overflow: "hidden",
      }}>
        <div className="animate-ticker" style={{ display: "flex", gap: 0, whiteSpace: "nowrap", width: "max-content" }}>
          {[...LOGOS, ...LOGOS].map((logo, i) => (
            <div key={i} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "0 32px",
              fontSize: ".85rem", fontWeight: 700,
              color: "rgba(100,116,139,.8)",
            }}>
              <Building2 size={15} color="rgba(139,92,246,.6)" />
              {logo}
            </div>
          ))}
        </div>
      </div>

      {/* ═══════════════════════ STATS ═══════════════════════ */}
      <section style={{
        padding: "80px max(40px, calc((100vw - 1200px)/2))",
        position: "relative",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }}>
          {STATS.map((s, i) => (
            <div key={i} style={{
              background: "linear-gradient(145deg,rgba(24,24,52,.9),rgba(16,16,36,.95))",
              border: `1px solid ${s.color}25`,
              borderRadius: 20, padding: "32px 24px", textAlign: "center",
              position: "relative", overflow: "hidden",
            }}>
              <div style={{
                position: "absolute", top: 0, right: 0, width: "60%", height: "60%",
                background: `radial-gradient(circle at top right, ${s.color}15, transparent 70%)`,
              }} />
              <div style={{
                fontFamily: "var(--font-display)", fontSize: "2.6rem", fontWeight: 900,
                color: s.color, marginBottom: 8, lineHeight: 1,
              }}>
                <Counter to={s.value} suffix={s.suffix} prefix={s.prefix} />
              </div>
              <div style={{ fontSize: ".875rem", color: "rgba(148,163,184,.8)", fontWeight: 500 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════ FEATURES ═══════════════════════ */}
      <section id="fonctionnalités" style={{
        padding: "80px max(40px, calc((100vw - 1200px)/2))",
        position: "relative",
      }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div className="badge badge-violet" style={{ marginBottom: 16, fontSize: ".75rem" }}>
            <Sparkles size={11} /> FONCTIONNALITÉS
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,2.8rem)",
            fontWeight: 900, letterSpacing: "-0.025em", marginBottom: 16, lineHeight: 1.15,
          }}>
            Tout ce dont votre startup a besoin,<br />
            <span className="gradient-text">dans une seule plateforme</span>
          </h2>
          <p style={{ fontSize: "1.05rem", color: "rgba(148,163,184,.8)", maxWidth: 560, margin: "0 auto" }}>
            8 modules intégrés. Zéro friction. Données synchronisées en temps réel entre tous vos départements.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 18 }}>
          {FEATURES.map((f, i) => (
            <div key={i} className="card" style={{ padding: 28, cursor: "default" }}>
              <div style={{
                width: 48, height: 48, borderRadius: 12,
                background: f.bg, border: `1px solid ${f.color}25`,
                display: "flex", alignItems: "center", justifyContent: "center",
                color: f.color, marginBottom: 18,
              }}>
                {f.icon}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", marginBottom: 8 }}>
                {f.label}
              </div>
              <p style={{ fontSize: ".875rem", color: "rgba(148,163,184,.75)", lineHeight: 1.65 }}>
                {f.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════ COMPARISON ═══════════════════════ */}
      <section id="comparaison" style={{
        padding: "80px max(40px, calc((100vw - 1100px)/2))",
        background: "rgba(0,0,0,.2)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="badge badge-cyan" style={{ marginBottom: 16, fontSize: ".75rem" }}>
            <Target size={11} /> COMPARAISON
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
            fontWeight: 900, letterSpacing: "-0.025em", marginBottom: 14, lineHeight: 1.15,
          }}>
            Pourquoi NexusOS plutôt qu&apos;Odoo ou HubSpot ?
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(148,163,184,.8)", maxWidth: 500, margin: "0 auto" }}>
            La seule plateforme native pour le marché marocain.
          </p>
        </div>

        <div style={{
          background: "linear-gradient(145deg,rgba(18,18,42,.9),rgba(12,12,30,.95))",
          border: "1px solid rgba(255,255,255,.07)",
          borderRadius: 20, overflow: "hidden",
        }}>
          {/* Header row */}
          <div style={{
            display: "grid", gridTemplateColumns: "1fr repeat(3,140px)",
            padding: "20px 28px",
            background: "rgba(0,0,0,.25)",
            borderBottom: "1px solid rgba(255,255,255,.06)",
          }}>
            <div style={{ fontSize: ".75rem", fontWeight: 700, color: "rgba(71,85,105,.9)", textTransform: "uppercase", letterSpacing: ".06em" }}>
              Fonctionnalité
            </div>
            {["NexusOS", "Odoo", "HubSpot"].map((n, i) => (
              <div key={n} style={{
                textAlign: "center", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: ".9rem",
                color: i === 0 ? "rgb(167,139,250)" : "rgba(100,116,139,.8)",
              }}>{n}</div>
            ))}
          </div>

          {COMPARISON.map((row, i) => (
            <div key={i} style={{
              display: "grid", gridTemplateColumns: "1fr repeat(3,140px)",
              padding: "16px 28px",
              borderBottom: i < COMPARISON.length - 1 ? "1px solid rgba(255,255,255,.04)" : "none",
              background: i % 2 === 0 ? "transparent" : "rgba(255,255,255,.01)",
            }}>
              <div style={{ fontSize: ".875rem", color: "rgba(203,213,225,.85)", display: "flex", alignItems: "center", gap: 8 }}>
                {row.feature}
              </div>
              {[row.nexus, row.odoo, row.hubspot].map((v, j) => (
                <div key={j} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                  {v ? (
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%",
                      background: j === 0 ? "rgba(16,185,129,.15)" : "rgba(16,185,129,.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: j === 0 ? "1px solid rgba(16,185,129,.4)" : "1px solid rgba(16,185,129,.2)",
                    }}>
                      <Check size={13} color={j === 0 ? "#10B981" : "#34D399"} strokeWidth={3} />
                    </div>
                  ) : (
                    <div style={{
                      width: 26, height: 26, borderRadius: "50%",
                      background: "rgba(239,68,68,.08)",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      border: "1px solid rgba(239,68,68,.2)",
                      fontSize: "1rem", color: "rgba(239,68,68,.6)",
                    }}>✕</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════ TESTIMONIALS ═══════════════════════ */}
      <section style={{
        padding: "80px max(40px, calc((100vw - 1200px)/2))",
      }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="badge badge-green" style={{ marginBottom: 16, fontSize: ".75rem" }}>
            <Star size={11} /> TÉMOIGNAGES
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
            fontWeight: 900, letterSpacing: "-0.025em", lineHeight: 1.15,
          }}>
            Ils ont choisi NexusOS.<br />
            <span className="gradient-text">Résultats réels.</span>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="card" style={{ padding: 32 }}>
              {/* Stars */}
              <div style={{ display: "flex", gap: 3, marginBottom: 20 }}>
                {Array(t.stars).fill(0).map((_, j) => (
                  <Star key={j} size={15} color="#F59E0B" fill="#F59E0B" />
                ))}
              </div>
              <p style={{ fontSize: ".9rem", color: "rgba(203,213,225,.85)", lineHeight: 1.7, marginBottom: 24, fontStyle: "italic" }}>
                &ldquo;{t.text}&rdquo;
              </p>
              {/* Impact */}
              <div style={{
                background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.2)",
                borderRadius: 10, padding: "8px 14px", marginBottom: 20, display: "inline-block",
                fontSize: ".8rem", fontWeight: 800, color: "#34D399",
              }}>
                {t.impact}
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, paddingTop: 20, borderTop: "1px solid rgba(255,255,255,.06)" }}>
                <div className="avatar avatar-md" style={{ background: t.color, borderRadius: 12 }}>{t.avatar}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: ".9rem" }}>{t.name}</div>
                  <div style={{ fontSize: ".78rem", color: "rgba(100,116,139,.8)" }}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════ PRICING ═══════════════════════ */}
      <section id="tarifs" style={{
        padding: "80px max(40px, calc((100vw - 1200px)/2))",
        background: "rgba(0,0,0,.15)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="badge badge-orange" style={{ marginBottom: 16, fontSize: ".75rem" }}>
            <Rocket size={11} /> TARIFS
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3.5vw,2.6rem)",
            fontWeight: 900, letterSpacing: "-0.025em", marginBottom: 14, lineHeight: 1.15,
          }}>
            Transparent. Juste. <span className="gradient-text">En MAD.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(148,163,184,.8)", maxWidth: 440, margin: "0 auto" }}>
            Pas de frais cachés. Pas de facturation en devises étrangères. Résiliation sans frais.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20, alignItems: "start" }}>
          {PLANS.map((plan, i) => (
            <div key={plan.id} className={`pricing-card ${plan.popular ? "popular" : ""}`}
              style={{ marginTop: plan.popular ? 0 : 16 }}
            >
              {plan.popular && (
                <div style={{
                  position: "absolute", top: -14, left: "50%", transform: "translateX(-50%)",
                  background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
                  borderRadius: 100, padding: "4px 18px",
                  fontSize: ".72rem", fontWeight: 800, color: "#fff",
                  boxShadow: "0 4px 16px rgba(124,58,237,.5)",
                  whiteSpace: "nowrap",
                }}>
                  ⭐ LE PLUS POPULAIRE
                </div>
              )}

              <div className="badge" style={{ background: `${plan.bg}`, border: `1px solid ${plan.border}`, color: plan.color, marginBottom: 20, fontSize: ".72rem" }}>
                {plan.name}
              </div>

              <div style={{ marginBottom: 8 }}>
                <span style={{ fontFamily: "var(--font-display)", fontSize: "3rem", fontWeight: 900, color: "white" }}>
                  {plan.price}
                </span>
                <span style={{ fontSize: ".9rem", color: "rgba(100,116,139,.8)" }}> MAD{plan.period}</span>
              </div>
              <p style={{ fontSize: ".85rem", color: "rgba(148,163,184,.7)", marginBottom: 28 }}>{plan.desc}</p>

              <Link href="/dashboard" style={{ textDecoration: "none", display: "block", marginBottom: 10 }}>
                <button
                  className="btn"
                  style={{
                    width: "100%", padding: "13px", justifyContent: "center",
                    background: plan.popular ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "rgba(255,255,255,.06)",
                    color: plan.popular ? "white" : "rgba(203,213,225,.9)",
                    border: plan.popular ? "none" : `1px solid rgba(255,255,255,.1)`,
                    boxShadow: plan.popular ? "0 4px 20px rgba(124,58,237,.4)" : "none",
                  }}
                >
                  {plan.cta} <ArrowRight size={15} />
                </button>
              </Link>
              <p style={{ fontSize: ".75rem", color: "rgba(100,116,139,.7)", textAlign: "center", marginBottom: 28 }}>{plan.trial}</p>

              <div style={{ borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 24 }}>
                {plan.features.map((feat, j) => (
                  <div key={j} style={{
                    display: "flex", alignItems: "flex-start", gap: 10,
                    marginBottom: 12, fontSize: ".875rem", color: "rgba(203,213,225,.85)",
                  }}>
                    <Check size={14} color={plan.color} strokeWidth={3} style={{ marginTop: 2, flexShrink: 0 }} />
                    {feat}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p style={{ textAlign: "center", marginTop: 32, fontSize: ".85rem", color: "rgba(100,116,139,.7)" }}>
          Tous les prix sont HT. TVA 20% applicable. Facturation mensuelle ou annuelle (−20%).
        </p>
      </section>

      {/* ═══════════════════════ FAQ ═══════════════════════ */}
      <section id="faq" style={{
        padding: "80px max(40px, calc((100vw - 800px)/2))",
      }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <div className="badge badge-violet" style={{ marginBottom: 16, fontSize: ".75rem" }}>
            <Shield size={11} /> FAQ
          </div>
          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3.5vw,2.4rem)",
            fontWeight: 900, letterSpacing: "-0.025em",
          }}>
            Questions fréquentes
          </h2>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {FAQS.map((faq, i) => (
            <div key={i} style={{
              background: "linear-gradient(145deg,rgba(18,18,42,.9),rgba(12,12,32,.95))",
              border: faqOpen === i ? "1px solid rgba(139,92,246,.35)" : "1px solid rgba(255,255,255,.07)",
              borderRadius: 14, overflow: "hidden", transition: "border-color .25s ease",
            }}>
              <button
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                style={{
                  width: "100%", display: "flex", justifyContent: "space-between",
                  alignItems: "center", padding: "20px 24px",
                  background: "transparent", border: "none", cursor: "pointer",
                  color: "white", fontWeight: 600, fontSize: ".95rem", textAlign: "left",
                  gap: 16,
                }}
              >
                {faq.q}
                <ChevronDown size={18} color="rgba(139,92,246,.8)"
                  style={{ transform: faqOpen === i ? "rotate(180deg)" : "none", transition: "transform .25s ease", flexShrink: 0 }}
                />
              </button>
              {faqOpen === i && (
                <div style={{ padding: "0 24px 20px", fontSize: ".9rem", color: "rgba(148,163,184,.85)", lineHeight: 1.7 }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════════════ CTA FINAL ═══════════════════════ */}
      <section style={{
        padding: "80px max(40px, calc((100vw - 1000px)/2)) 100px",
      }}>
        <div style={{
          background: "linear-gradient(135deg,rgba(30,18,65,.95) 0%,rgba(14,12,35,.98) 50%,rgba(8,20,40,.95) 100%)",
          border: "1px solid rgba(139,92,246,.3)",
          borderRadius: 28, padding: "72px 48px", textAlign: "center",
          position: "relative", overflow: "hidden",
          boxShadow: "0 0 80px rgba(139,92,246,.18)",
        }}>
          <div style={{ position: "absolute", top: "-30%", left: "50%", transform: "translateX(-50%)", width: 600, height: 400, background: "radial-gradient(ellipse,rgba(139,92,246,.2),transparent 70%)", filter: "blur(40px)", pointerEvents: "none" }} />

          <div className="badge badge-live" style={{ marginBottom: 24, fontSize: ".75rem" }}>
            Disponible maintenant
          </div>

          <h2 style={{
            fontFamily: "var(--font-display)", fontSize: "clamp(2rem,4vw,3rem)",
            fontWeight: 900, letterSpacing: "-0.03em", marginBottom: 20, lineHeight: 1.15,
            position: "relative",
          }}>
            Prêt à transformer<br />
            <span className="gradient-text-animated">votre façon de travailler ?</span>
          </h2>

          <p style={{ fontSize: "1.1rem", color: "rgba(148,163,184,.85)", maxWidth: 500, margin: "0 auto 40px", position: "relative" }}>
            Rejoignez 500+ startups marocaines qui ont déjà digitalisé leur opération avec NexusOS.
          </p>

          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap", position: "relative" }}>
            <Link href="/dashboard" style={{ textDecoration: "none" }}>
              <button className="btn btn-primary-lg">
                Commencer gratuitement — 14 jours <ArrowRight size={18} />
              </button>
            </Link>
            <button className="btn btn-outline-lg">
              Parler à un expert <ExternalLink size={16} />
            </button>
          </div>

          <p style={{ marginTop: 24, fontSize: ".82rem", color: "rgba(71,85,105,.9)", position: "relative" }}>
            Aucune carte de crédit requise • Installation en moins de 5 minutes • Support en Français & Darija
          </p>
        </div>
      </section>

      {/* ═══════════════════════ FOOTER ═══════════════════════ */}
      <footer style={{
        background: "rgba(0,0,0,.4)",
        borderTop: "1px solid rgba(255,255,255,.05)",
        padding: "48px max(40px, calc((100vw - 1200px)/2)) 32px",
      }}>
        <div style={{ display: "grid", gridTemplateColumns: "2fr repeat(3,1fr)", gap: 40, marginBottom: 40 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Zap size={16} color="white" />
              </div>
              <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.1rem" }}>NexusOS</span>
            </div>
            <p style={{ fontSize: ".85rem", color: "rgba(100,116,139,.8)", lineHeight: 1.7, maxWidth: 280 }}>
              L&apos;OS de référence pour les startups et PMEs marocaines. Construit avec ❤️ à Rabat.
            </p>
          </div>
          {[
            { title: "Produit", items: ["Fonctionnalités", "Tarifs", "Roadmap", "Changelog"] },
            { title: "Légal", items: ["Conditions d'utilisation", "Politique de confidentialité", "RGPD", "Sécurité"] },
            { title: "Contact", items: ["contact@nexusos.ma", "+212 537 000 000", "Route des Zaërs, Rabat", "Support 24/7"] },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontWeight: 700, fontSize: ".85rem", marginBottom: 16, color: "rgba(203,213,225,.9)" }}>{col.title}</div>
              {col.items.map((item) => (
                <div key={item} style={{ fontSize: ".82rem", color: "rgba(100,116,139,.8)", marginBottom: 10, cursor: "pointer", transition: "color .2s" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "rgba(203,213,225,.9)")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(100,116,139,.8)")}
                >{item}</div>
              ))}
            </div>
          ))}
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,.05)", paddingTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: ".8rem", color: "rgba(71,85,105,.8)" }}>
            © 2026 NexusOS SARL — Rabat, Maroc — ICE: 000123456789000
          </p>
          <div style={{ display: "flex", gap: 6 }}>
            {["Français", "العربية", "English"].map((lang) => (
              <button key={lang} style={{
                padding: "4px 10px", borderRadius: 6, fontSize: ".73rem",
                background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)",
                color: "rgba(100,116,139,.8)", cursor: "pointer",
              }}>{lang}</button>
            ))}
          </div>
        </div>
      </footer>

      {/* ═══════════════════════ VIDEO MODAL ═══════════════════════ */}
      {videoOpen && (
        <div className="modal-overlay" onClick={() => setVideoOpen(false)}>
          <div onClick={e => e.stopPropagation()} style={{
            background: "#000", borderRadius: 16, overflow: "hidden",
            width: "min(900px, 95vw)", border: "1px solid rgba(255,255,255,.1)",
          }}>
            <div style={{
              height: "56.25%", minHeight: 400, background: "linear-gradient(135deg,#0a0a18,#130f25)",
              display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16,
            }}>
              <div style={{ width: 70, height: 70, borderRadius: "50%", background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 40px rgba(124,58,237,.5)" }}>
                <Play size={28} color="white" style={{ marginLeft: 4 }} />
              </div>
              <p style={{ color: "rgba(148,163,184,.7)", fontSize: ".9rem" }}>Démo interactive — 2 minutes</p>
            </div>
            <button onClick={() => setVideoOpen(false)} style={{
              position: "absolute", top: 16, right: 16, width: 36, height: 36, borderRadius: "50%",
              background: "rgba(255,255,255,.1)", border: "none", cursor: "pointer", color: "white", fontSize: "1.1rem",
            }}>✕</button>
          </div>
        </div>
      )}
    </div>
  );
}
