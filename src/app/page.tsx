"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowRight, Check, ChevronRight, Zap, BarChart3, Users,
  FileText, MessageSquare, Shield, Globe, Star, Menu, X,
  FolderKanban, Wallet, Brain, Play
} from "lucide-react";

/* ─── Nav links ─── */
const NAV = [
  { label: "Fonctionnalités", href: "#features" },
  { label: "Tarifs", href: "#pricing" },
  { label: "À propos", href: "#about" },
  { label: "Blog", href: "#" },
];

/* ─── Logo cloud ─── */
const LOGOS = ["Bank Al-Maghrib", "OCP Group", "Maroc Telecom", "ONCF Digital", "CDG Capital", "TotalEnergies MA"];

/* ─── Feature items ─── */
const FEATURES = [
  {
    icon: <FolderKanban size={16} />,
    title: "Gestion de projets",
    desc: "Kanban avancé, sprints, suivi du temps et rapports d'avancement en temps réel.",
  },
  {
    icon: <Users size={16} />,
    title: "CRM & Pipeline",
    desc: "Gérez vos prospects et clients avec un pipeline visuel et scoring IA automatique.",
  },
  {
    icon: <FileText size={16} />,
    title: "Facturation MAD",
    desc: "Factures conformes DGI avec TVA 20%, ICE/IF, relances automatiques.",
  },
  {
    icon: <Brain size={16} />,
    title: "Intelligence artificielle",
    desc: "Assistant IA contextuel, prévisions de revenus, détection d'opportunités.",
  },
  {
    icon: <Wallet size={16} />,
    title: "Finance & Comptabilité",
    desc: "Tableau de bord financier complet, flux de trésorerie et rapports mensuels.",
  },
  {
    icon: <Users size={16} />,
    title: "RH & Paie",
    desc: "Gestion des employés, congés et fiches de paie avec calcul CNSS/AMO/IR.",
  },
  {
    icon: <BarChart3 size={16} />,
    title: "Analytics avancés",
    desc: "Tableaux de bord interactifs, métriques personnalisées et exports automatiques.",
  },
  {
    icon: <MessageSquare size={16} />,
    title: "Chat d'équipe",
    desc: "Communication centralisée, canaux thématiques, partage de fichiers.",
  },
];

/* ─── Metrics ─── */
const METRICS = [
  { value: "500+", label: "Entreprises actives" },
  { value: "98%", label: "Taux de satisfaction" },
  { value: "40%", label: "Gain de productivité" },
  { value: "24/7", label: "Support premium" },
];

/* ─── Testimonials ─── */
const TESTIMONIALS = [
  {
    quote: "NexusOS a transformé notre façon de travailler. Tout est centralisé — projets, clients, facturation. Fini les 5 outils différents.",
    name: "Hassan Benali", role: "CTO, TechNova Rabat", avatar: "HB",
  },
  {
    quote: "La facturation en MAD avec TVA automatique nous économise 3 heures par semaine. Le meilleur investissement logiciel de l'année.",
    name: "Fatima Zahra Alami", role: "CFO, InnovaData Casablanca", avatar: "FA",
  },
  {
    quote: "L'IA nous a permis de détecter des opportunités de croissance que nous n'aurions jamais vues. ROI positif en moins d'un mois.",
    name: "Karim Touzani", role: "CEO, DigitalMaroc", avatar: "KT",
  },
];

/* ─── Pricing ─── */
const PRICING = [
  {
    name: "Starter",
    price: "490",
    desc: "Pour les startups early-stage",
    features: ["5 utilisateurs", "3 projets actifs", "Facturation MAD", "CRM basique", "Support email"],
    featured: false,
    cta: "Commencer gratuitement",
  },
  {
    name: "Growth",
    price: "1 490",
    desc: "Pour les équipes en croissance",
    features: ["20 utilisateurs", "Projets illimités", "Assistant IA", "RH & Paie", "Finance avancée", "Support prioritaire 24/7"],
    featured: true,
    cta: "Démarrer l'essai gratuit",
  },
  {
    name: "Enterprise",
    price: "3 990",
    desc: "Pour les grandes structures",
    features: ["Utilisateurs illimités", "Toutes fonctionnalités", "Onboarding dédié", "SLA 99.9%", "Intégrations sur mesure", "Account manager dédié"],
    featured: false,
    cta: "Contacter l'équipe commerciale",
  },
];

/* ─── Header ─── */
function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: scrolled ? "rgba(9,9,11,0.85)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
      transition: "all 0.3s ease",
    }}>
      <div style={{ maxWidth: 1120, margin: "0 auto", padding: "0 24px", height: 60, display: "flex", alignItems: "center", gap: 40 }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, textDecoration: "none", flexShrink: 0 }}>
          <div style={{
            width: 28, height: 28, borderRadius: 7,
            background: "var(--accent)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <Zap size={14} color="white" strokeWidth={2.5} />
          </div>
          <span style={{ fontSize: 15, fontWeight: 700, letterSpacing: "-0.03em", color: "var(--text-1)" }}>NexusOS</span>
        </Link>

        {/* Nav */}
        <nav style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
          {NAV.map(n => (
            <a key={n.label} href={n.href} style={{
              padding: "6px 10px", borderRadius: "var(--r-md)",
              fontSize: 13, color: "var(--text-3)", fontWeight: 500,
              transition: "color var(--t-base), background var(--t-base)",
              textDecoration: "none",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-1)"; (e.currentTarget as HTMLAnchorElement).style.background = "var(--surface-2)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-3)"; (e.currentTarget as HTMLAnchorElement).style.background = "transparent"; }}
            >{n.label}</a>
          ))}
        </nav>

        {/* CTA */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <Link href="/login">
            <button className="btn btn-ghost btn-sm" style={{ fontSize: 13, color: "var(--text-2)" }}>Se connecter</button>
          </Link>
          <Link href="/login">
            <button className="btn btn-primary btn-sm" style={{ fontSize: 13 }}>
              Essai gratuit <ArrowRight size={12} />
            </button>
          </Link>
        </div>
      </div>
    </header>
  );
}

/* ─── Animated Counter ─── */
function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        const dur = 1500, step = 16;
        const inc = to / (dur / step);
        let curr = 0;
        const t = setInterval(() => {
          curr = Math.min(curr + inc, to);
          setVal(Math.floor(curr));
          if (curr >= to) clearInterval(t);
        }, step);
        observer.disconnect();
      }
    });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [to]);
  return <span ref={ref}>{val}{suffix}</span>;
}

/* ─── Logo ticker ─── */
function LogoTicker() {
  return (
    <div style={{ overflow: "hidden", position: "relative" }}>
      <div style={{
        display: "flex", gap: 0,
        animation: "scroll-x 30s linear infinite",
        width: "max-content",
      }}>
        {[...LOGOS, ...LOGOS].map((logo, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", justifyContent: "center",
            height: 48, padding: "0 32px",
            borderLeft: i === 0 ? "none" : "1px solid var(--border)",
          }}>
            <span style={{ fontSize: 13, fontWeight: 600, color: "var(--text-4)", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{logo}</span>
          </div>
        ))}
      </div>
      <style>{`
        @keyframes scroll-x {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
        @keyframes scrollX {
          from { transform: translateX(0); }
          to   { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

/* ─── Main ─── */
export default function LandingPage() {
  return (
    <div style={{ background: "var(--bg)", color: "var(--text-1)", minHeight: "100vh" }}>
      <Header />

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "120px 24px 80px",
        position: "relative", overflow: "hidden",
        textAlign: "center",
      }}>
        {/* Subtle background grid */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "radial-gradient(var(--surface-3) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.4,
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 60% at 50% 50%, black, transparent)",
        }} />
        {/* Subtle glow */}
        <div style={{
          position: "absolute", top: "30%", left: "50%", transform: "translate(-50%, -50%)",
          width: 600, height: 400,
          background: "radial-gradient(ellipse, rgba(124,58,237,0.08) 0%, transparent 70%)",
          filter: "blur(40px)",
        }} />

        <div style={{ position: "relative", zIndex: 1, maxWidth: 700, margin: "0 auto" }}>
          {/* Announcement */}
          <div className="animate-fade-up" style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
            <div className="announce-badge" id="announce-badge">
              <span className="announce-badge-pill">Nouveau</span>
              <span style={{ fontSize: 12, color: "var(--text-2)" }}>Assistant IA nativement intégré</span>
              <ChevronRight size={12} style={{ color: "var(--text-4)" }} />
            </div>
          </div>

          {/* Headline */}
          <h1 className="animate-fade-up delay-100" style={{
            fontSize: "clamp(36px, 6vw, 64px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1.08,
            color: "var(--text-1)",
            marginBottom: 20,
          }}>
            La plateforme pour<br />
            <span className="gradient-text-brand">gérer votre IT</span>
          </h1>

          {/* Subheadline */}
          <p className="animate-fade-up delay-200" style={{
            fontSize: 18, color: "var(--text-3)",
            lineHeight: 1.65, maxWidth: 480, margin: "0 auto 36px",
            fontWeight: 400,
          }}>
            NexusOS centralise vos projets, clients, équipes et finances dans une seule plateforme pensée pour les entreprises IT au Maroc.
          </p>

          {/* CTAs */}
          <div className="animate-fade-up delay-300" style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <Link href="/login">
              <button className="btn btn-primary btn-xl" id="hero-cta-primary" style={{ gap: 8, minWidth: 180 }}>
                Démarrer gratuitement <ArrowRight size={16} />
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="btn btn-secondary btn-xl" id="hero-cta-demo" style={{ gap: 8 }}>
                <Play size={14} /> Voir la démo
              </button>
            </Link>
          </div>

          {/* Trust line */}
          <p className="animate-fade-up delay-400" style={{ marginTop: 20, fontSize: 12, color: "var(--text-4)" }}>
            14 jours gratuits · Aucune carte de crédit · Données hébergées en EU
          </p>
        </div>
      </section>

      {/* ═══ LOGO TICKER ═══ */}
      <section style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)", padding: "0" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <p style={{ textAlign: "center", padding: "20px 24px 12px", fontSize: 11, fontWeight: 600, color: "var(--text-4)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Utilisé par des équipes IT au Maroc
          </p>
        </div>
        <LogoTicker />
        <div style={{ height: 20 }} />
      </section>

      {/* ═══ METRICS ═══ */}
      <section style={{ padding: "80px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "var(--border)", borderRadius: "var(--r-xl)", overflow: "hidden", border: "1px solid var(--border)" }}>
            {METRICS.map((m, i) => (
              <div key={i} style={{ background: "var(--surface-1)", padding: "32px 24px", textAlign: "center" }}>
                <div style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.04em", color: "var(--text-1)", marginBottom: 4 }}>
                  {m.value}
                </div>
                <div style={{ fontSize: 13, color: "var(--text-3)" }}>{m.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES ═══ */}
      <section id="features" style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          {/* Section header */}
          <div style={{ textAlign: "center", marginBottom: 52 }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 6, height: 24, padding: "0 10px", background: "var(--accent-subtle)", border: "1px solid var(--accent-border)", borderRadius: 99, fontSize: 11, fontWeight: 600, color: "var(--accent-light)", textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 16 }}>
              Fonctionnalités
            </div>
            <h2 style={{ fontSize: "clamp(24px, 4vw, 36px)", fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 12 }}>
              Tout ce dont votre équipe a besoin
            </h2>
            <p style={{ fontSize: 16, color: "var(--text-3)", maxWidth: 440, margin: "0 auto" }}>
              Un seul outil remplace votre pile d&apos;applications actuelles.
            </p>
          </div>

          {/* Features grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
            {FEATURES.map((f, i) => (
              <div key={i} className="feature-card">
                <div className="feature-icon">{f.icon}</div>
                <h3 style={{ fontSize: 14, fontWeight: 600, marginBottom: 6, color: "var(--text-1)", letterSpacing: "-0.01em" }}>{f.title}</h3>
                <p style={{ fontSize: 13, color: "var(--text-3)", lineHeight: 1.6 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ DASHBOARD PREVIEW ═══ */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{
            background: "var(--surface-1)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-2xl)",
            overflow: "hidden",
            boxShadow: "var(--shadow-xl)",
          }}>
            {/* Fake window chrome */}
            <div style={{ height: 40, background: "var(--surface-2)", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", padding: "0 16px", gap: 6 }}>
              {["#FF5F56", "#FFBD2E", "#27C93F"].map((c, i) => (
                <div key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, opacity: 0.8 }} />
              ))}
              <div style={{ flex: 1, display: "flex", justifyContent: "center" }}>
                <div style={{ height: 22, width: 260, background: "var(--surface-3)", borderRadius: "var(--r-sm)", display: "flex", alignItems: "center", padding: "0 10px", gap: 6 }}>
                  <Shield size={10} color="var(--text-4)" />
                  <span style={{ fontSize: 11, color: "var(--text-4)" }}>nexus-os-blush.vercel.app/dashboard</span>
                </div>
              </div>
            </div>
            {/* Preview content */}
            <div style={{ padding: 32, minHeight: 400 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 20 }}>
                {[
                  { label: "Revenus Avril", val: "148 000 MAD", delta: "+18%", color: "var(--green)" },
                  { label: "Clients actifs", val: "47", delta: "+5", color: "var(--accent-light)" },
                  { label: "Projets", val: "12", delta: "2 en retard", color: "var(--amber)" },
                  { label: "En attente", val: "77 200 MAD", delta: "3 factures", color: "var(--red)" },
                ].map((k, i) => (
                  <div key={i} style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: "14px 16px" }}>
                    <div style={{ fontSize: 11, color: "var(--text-4)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>{k.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 4 }}>{k.val}</div>
                    <div style={{ fontSize: 11, color: k.color, fontWeight: 600 }}>{k.delta}</div>
                  </div>
                ))}
              </div>
              {/* Fake chart bars */}
              <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", borderRadius: "var(--r-lg)", padding: "16px 20px", marginBottom: 12 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 16, color: "var(--text-2)" }}>Revenus & Dépenses • 2026</div>
                <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 80 }}>
                  {[65, 85, 72, 100, 90, 115, 82, 120, 108, 130].map((h, i) => (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", gap: 2, alignItems: "center" }}>
                      <div style={{ width: "100%", background: "var(--accent)", opacity: 0.7, height: `${h}%`, borderRadius: "3px 3px 0 0", transition: "height 0.5s ease" }} />
                      <div style={{ width: "100%", background: "var(--surface-4)", height: `${h * 0.55}%`, borderRadius: "3px 3px 0 0" }} />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 8 }}>
              Ils nous font confiance
            </h2>
            <p style={{ fontSize: 14, color: "var(--text-3)" }}>Des équipes IT marocaines qui transforment leur productivité</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="testimonial-card">
                <div style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                  {[...Array(5)].map((_, j) => <Star key={j} size={12} color="var(--accent-light)" fill="var(--accent-light)" />)}
                </div>
                <p style={{ fontSize: 13, color: "var(--text-2)", lineHeight: 1.7, marginBottom: 20, fontStyle: "italic" }}>
                  &ldquo;{t.quote}&rdquo;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div className="avatar avatar-sm avatar-round" style={{ background: "var(--accent)", color: "white", fontSize: 10 }}>{t.avatar}</div>
                  <div>
                    <div style={{ fontSize: 12, fontWeight: 600 }}>{t.name}</div>
                    <div style={{ fontSize: 11, color: "var(--text-4)" }}>{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ PRICING ═══ */}
      <section id="pricing" style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, letterSpacing: "-0.03em", marginBottom: 8 }}>Tarifs simples et transparents</h2>
            <p style={{ fontSize: 14, color: "var(--text-3)" }}>
              Tous les plans incluent 14 jours d&apos;essai gratuit. Payez en MAD.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
            {PRICING.map((p, i) => (
              <div key={i} className={`pricing-card ${p.featured ? "featured" : ""}`} id={`plan-${p.name.toLowerCase()}`}>
                {p.featured && (
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 4, marginBottom: 16, fontSize: 11, fontWeight: 700, color: "var(--accent-light)", textTransform: "uppercase", letterSpacing: "0.06em" }}>
                    <Zap size={10} /> Le plus populaire
                  </div>
                )}
                <div style={{ marginBottom: 20 }}>
                  <div style={{ fontSize: 15, fontWeight: 600, marginBottom: 4 }}>{p.name}</div>
                  <div style={{ fontSize: 12, color: "var(--text-4)", marginBottom: 16 }}>{p.desc}</div>
                  <div style={{ display: "flex", alignItems: "baseline", gap: 4 }}>
                    <span style={{ fontSize: 36, fontWeight: 800, letterSpacing: "-0.04em" }}>{p.price}</span>
                    <span style={{ fontSize: 13, color: "var(--text-3)" }}>MAD/mois</span>
                  </div>
                </div>
                <Link href="/login" style={{ display: "block", marginBottom: 24 }}>
                  <button className={`btn ${p.featured ? "btn-primary" : "btn-secondary"} btn-lg`} id={`cta-${p.name.toLowerCase()}`} style={{ width: "100%", justifyContent: "center" }}>
                    {p.cta}
                  </button>
                </Link>
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {p.features.map((f, j) => (
                    <div key={j} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "var(--green-subtle)", border: "1px solid var(--green-border)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                        <Check size={9} color="var(--green)" strokeWidth={3} />
                      </div>
                      <span style={{ fontSize: 13, color: "var(--text-2)" }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA BANNER ═══ */}
      <section style={{ padding: "0 24px 100px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto" }}>
          <div style={{
            background: "var(--surface-1)",
            border: "1px solid var(--border)",
            borderRadius: "var(--r-2xl)",
            padding: "64px 48px",
            textAlign: "center",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", width: 400, height: 200, background: "radial-gradient(ellipse, rgba(124,58,237,0.06) 0%, transparent 70%)", filter: "blur(30px)" }} />
            <div style={{ position: "relative", zIndex: 1 }}>
              <h2 style={{ fontSize: 32, fontWeight: 800, letterSpacing: "-0.04em", marginBottom: 12 }}>
                Prêt à moderniser votre IT ?
              </h2>
              <p style={{ fontSize: 15, color: "var(--text-3)", maxWidth: 420, margin: "0 auto 28px", lineHeight: 1.65 }}>
                Rejoignez les entreprises IT de Rabat qui ont fait confiance à NexusOS.
              </p>
              <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
                <Link href="/login">
                  <button className="btn btn-primary btn-xl" id="bottom-cta-primary">
                    Démarrer l&apos;essai gratuit <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
              <p style={{ marginTop: 16, fontSize: 12, color: "var(--text-4)" }}>14 jours gratuits · Aucune carte requise</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer style={{ borderTop: "1px solid var(--border)", padding: "40px 24px" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 22, height: 22, borderRadius: 5, background: "var(--accent)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={11} color="white" strokeWidth={2.5} />
            </div>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-0.02em" }}>NexusOS</span>
            <span style={{ fontSize: 12, color: "var(--text-4)", marginLeft: 12 }}>© 2026</span>
          </div>

          <div style={{ display: "flex", gap: 20 }}>
            {["Confidentialité", "CGU", "Sécurité", "Contact"].map(l => (
              <a key={l} href="#" style={{ fontSize: 12, color: "var(--text-4)", textDecoration: "none", transition: "color var(--t-base)" }}
                onMouseEnter={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-2)"}
                onMouseLeave={e => (e.currentTarget as HTMLAnchorElement).style.color = "var(--text-4)"}
              >{l}</a>
            ))}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12, color: "var(--text-4)" }}>
            <Globe size={12} /> Rabat, Maroc
          </div>
        </div>
      </footer>
    </div>
  );
}
