"use client";

import { useState } from "react";
import Link from "next/link";
import { Zap, Mail, Lock, Eye, EyeOff, ArrowRight, GitBranch, Globe, Shield, Check } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("y.amrani@techflow.ma");
  const [password, setPassword] = useState("••••••••••••");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<"login" | "register">("login");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 1400));
    window.location.href = "/dashboard";
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex",
      position: "relative", overflow: "hidden",
    }}>
      {/* ── Left panel — Feature showcase ── */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "60px 64px", position: "relative", zIndex: 1,
        borderRight: "1px solid var(--border)",
        background: "var(--glass-2)",
        backdropFilter: "blur(var(--blur-md))",
        WebkitBackdropFilter: "blur(var(--blur-md))",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 60 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg, var(--accent), #EC4899)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "var(--shadow-md)" }}>
            <Zap size={20} color="white" />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.3rem", color: "var(--text-1)" }}>
            Nexus<span className="gradient-text-brand">OS</span>
          </span>
        </Link>

        <h1 style={{ color: "var(--text-1)", fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 900, letterSpacing: "-.03em", lineHeight: 1.15, marginBottom: 20 }}>
          Le système d&apos;exploitation<br />
          <span className="gradient-text-brand">de votre entreprise</span>
        </h1>
        <p style={{ fontSize: "1.05rem", color: "var(--text-3)", lineHeight: 1.7, maxWidth: 420, marginBottom: 48 }}>
          Rejoignez 500+ startups marocaines qui gèrent leurs projets, clients, factures et équipes depuis une seule plateforme.
        </p>

        {/* Feature list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 48 }}>
          {[
            { icon: "🚀", title: "Opérationnel en 5 minutes", desc: "Aucune configuration complexe" },
            { icon: "🇲🇦", title: "100% conforme Maroc", desc: "TVA 20%, CNSS, AMO, IR, ICE/IF" },
            { icon: "🤖", title: "IA intégrée nativement", desc: "Insights et prévisions en temps réel" },
            { icon: "🔒", title: "Sécurité enterprise", desc: "2FA, AES-256, RGPD compliant" },
          ].map((f, i) => (
            <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "var(--glass-0)", border: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0, boxShadow: "var(--shadow-sm)" }}>{f.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: ".9rem", marginBottom: 2, color: "var(--text-1)" }}>{f.title}</div>
                <div style={{ fontSize: ".8rem", color: "var(--text-3)" }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div style={{ background: "var(--glass-0)", border: "1px solid var(--border)", borderRadius: 16, padding: "20px 24px", boxShadow: "var(--shadow-sm)" }}>
          <p style={{ fontSize: ".875rem", color: "var(--text-2)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 14 }}>
            &ldquo;NexusOS nous a permis de réduire notre temps administratif de 40%. La facturation en MAD avec TVA automatique est une révolution.&rdquo;
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="avatar avatar-sm avatar-sq" style={{ background: "linear-gradient(135deg, var(--accent), #EC4899)", color: "white" }}>HB</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: ".82rem", color: "var(--text-1)" }}>Hassan Benali</div>
              <div style={{ fontSize: ".73rem", color: "var(--text-4)" }}>CEO, TechNova Rabat</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel — Auth form ── */}
      <div style={{
        width: 480, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "60px 48px",
        position: "relative", zIndex: 1,
        background: "var(--glass-1)",
        backdropFilter: "blur(var(--blur-lg))",
        WebkitBackdropFilter: "blur(var(--blur-lg))",
      }}>
        {/* Tabs */}
        <div style={{
          display: "flex", background: "var(--glass-2)", border: "1px solid var(--border)",
          boxShadow: "inset 0 1px 4px rgba(0,0,0,0.05)",
          borderRadius: 12, padding: 4, marginBottom: 36,
        }}>
          {(["login", "register"] as const).map(t => (
            <button key={t} id={`tab-${t}`} onClick={() => setTab(t)} style={{
              flex: 1, padding: "10px", borderRadius: 9, border: "none", cursor: "pointer",
              fontWeight: 700, fontSize: ".85rem", transition: "all var(--t-base)",
              background: tab === t ? "var(--glass-0)" : "transparent",
              color: tab === t ? "var(--text-1)" : "var(--text-3)",
              boxShadow: tab === t ? "var(--shadow-sm)" : "none",
              fontFamily: "inherit",
            }}>
              {t === "login" ? "Se connecter" : "Créer un compte"}
            </button>
          ))}
        </div>

        <h2 style={{ color: "var(--text-1)", fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.6rem", marginBottom: 6 }}>
          {tab === "login" ? "Bon retour 👋" : "Commencer gratuitement"}
        </h2>
        <p style={{ fontSize: ".875rem", color: "var(--text-3)", marginBottom: 28 }}>
          {tab === "login" ? "Connectez-vous à votre workspace NexusOS" : "14 jours gratuits — aucune carte de crédit"}
        </p>

        {/* Social login */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          {[
            { icon: <GitBranch size={16} />, label: "GitHub" },
            { icon: <Globe size={16} />, label: "Google" },
          ].map((s) => (
             <button key={s.label} id={`sso-${s.label.toLowerCase()}`} onClick={handleSubmit} style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "11px", borderRadius: 10, border: "1px solid var(--border)",
                background: "var(--glass-0)", color: "var(--text-2)",
                fontWeight: 600, fontSize: ".85rem", cursor: "pointer", fontFamily: "inherit",
                transition: "all var(--t-base)", boxShadow: "var(--shadow-sm)",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--shadow-md)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.transform = "none"; (e.currentTarget as HTMLButtonElement).style.boxShadow = "var(--shadow-sm)"; }}
              >
                {s.icon} {s.label}
              </button>
          ))}
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div className="divider" style={{ flex: 1 }} />
          <span style={{ fontSize: ".75rem", color: "var(--text-4)", fontWeight: 600 }}>ou avec email</span>
          <div className="divider" style={{ flex: 1 }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {tab === "register" && (
            <div>
              <label className="label">Nom complet</label>
              <div style={{ position: "relative" }}>
                <input className="input" id="register-name" placeholder="Youssef Amrani" style={{ paddingLeft: 40 }} />
                <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-4)" }}>👤</span>
              </div>
            </div>
          )}

          <div>
            <label className="label">Email professionnel</label>
            <div style={{ position: "relative" }}>
              <input
                className="input" id="email-input" type="email"
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="vous@entreprise.ma"
                style={{ paddingLeft: 40 }}
              />
              <Mail size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-4)" }} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <label className="label" style={{ marginBottom: 0 }}>Mot de passe</label>
              {tab === "login" && <a href="#" style={{ fontSize: ".75rem", color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Mot de passe oublié ?</a>}
            </div>
            <div style={{ position: "relative" }}>
              <input
                className="input" id="password-input" type={showPass ? "text" : "password"}
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••"
                style={{ paddingLeft: 40, paddingRight: 44 }}
              />
              <Lock size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "var(--text-4)" }} />
              <button type="button" onClick={() => setShowPass(s => !s)} style={{
                position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", color: "var(--text-4)",
              }}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {tab === "register" && (
            <div>
              <label className="label">Entreprise</label>
              <input className="input" id="company-input" placeholder="TechFlow Rabat" />
            </div>
          )}

          {/* 2FA info for login */}
          {tab === "login" && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", background: "var(--green-subtle)", border: "1px solid var(--green-border)", borderRadius: "var(--r-md)" }}>
              <Shield size={14} color="var(--green)" />
              <span style={{ fontSize: ".78rem", color: "var(--green)", fontWeight: 600 }}>Authentification 2FA activée</span>
            </div>
          )}

          <button
            id="submit-btn"
            type="submit"
            className="btn btn-primary btn-lg"
            style={{ marginTop: 6, width: "100%", opacity: loading ? 0.7 : 1 }}
          >
            {loading ? (
              <>Connexion en cours...</>
            ) : (
              <>{tab === "login" ? "Se connecter" : "Créer mon compte"} <ArrowRight size={16} /></>
            )}
          </button>
        </form>

        {/* Security badges */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 28 }}>
          {[
            { icon: <Shield size={12} />, text: "SSL/TLS" },
            { icon: <Check size={12} />, text: "RGPD" },
            { icon: <Lock size={12} />, text: "AES-256" },
          ].map((b) => (
            <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: ".72rem", color: "var(--text-3)", fontWeight: 600 }}>
              <span style={{ color: "var(--green)" }}>{b.icon}</span> {b.text}
            </div>
          ))}
        </div>

        {tab === "register" && (
          <p style={{ fontSize: ".73rem", color: "var(--text-4)", textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>
            En créant un compte, vous acceptez nos{" "}
            <a href="#" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>CGU</a>{" "}
            et notre{" "}
            <a href="#" style={{ color: "var(--accent)", textDecoration: "none", fontWeight: 600 }}>Politique de confidentialité</a>.
          </p>
        )}
      </div>
    </div>
  );
}
