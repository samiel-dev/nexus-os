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
      background: "rgb(6,6,16)",
      position: "relative", overflow: "hidden",
    }}>
      {/* ── Animated background ── */}
      <div style={{ position: "absolute", inset: 0, zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-20%", left: "-10%", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(124,58,237,.18) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{ position: "absolute", bottom: "-20%", right: "-10%", width: 600, height: 600, borderRadius: "50%", background: "radial-gradient(circle, rgba(6,182,212,.12) 0%, transparent 70%)", filter: "blur(80px)" }} />
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(139,92,246,.03) 1px, transparent 1px), linear-gradient(90deg, rgba(139,92,246,.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />
      </div>

      {/* ── Left panel — Feature showcase ── */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", justifyContent: "center",
        padding: "60px 64px", position: "relative", zIndex: 1,
        borderRight: "1px solid rgba(255,255,255,.05)",
      }}>
        {/* Logo */}
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", marginBottom: 60 }}>
          <div style={{ width: 38, height: 38, borderRadius: 10, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", boxShadow: "0 0 24px rgba(124,58,237,.5)" }}>
            <Zap size={20} color="white" />
          </div>
          <span style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.3rem" }}>
            Nexus<span className="gradient-text">OS</span>
          </span>
        </Link>

        <h1 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.8rem,3vw,2.6rem)", fontWeight: 900, letterSpacing: "-.03em", lineHeight: 1.15, marginBottom: 20 }}>
          Le système d&apos;exploitation<br />
          <span className="gradient-text">de votre entreprise</span>
        </h1>
        <p style={{ fontSize: "1.05rem", color: "rgba(148,163,184,.8)", lineHeight: 1.7, maxWidth: 420, marginBottom: 48 }}>
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
              <div style={{ width: 38, height: 38, borderRadius: 10, background: "rgba(139,92,246,.1)", border: "1px solid rgba(139,92,246,.2)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.1rem", flexShrink: 0 }}>{f.icon}</div>
              <div>
                <div style={{ fontWeight: 700, fontSize: ".9rem", marginBottom: 2 }}>{f.title}</div>
                <div style={{ fontSize: ".8rem", color: "rgba(100,116,139,.8)" }}>{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonial */}
        <div style={{ background: "rgba(139,92,246,.08)", border: "1px solid rgba(139,92,246,.2)", borderRadius: 16, padding: "20px 24px" }}>
          <p style={{ fontSize: ".875rem", color: "rgba(203,213,225,.85)", lineHeight: 1.7, fontStyle: "italic", marginBottom: 14 }}>
            &ldquo;NexusOS nous a permis de réduire notre temps administratif de 40%. La facturation en MAD avec TVA automatique est une révolution.&rdquo;
          </p>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div className="avatar avatar-sm avatar-sq" style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)" }}>HB</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: ".82rem" }}>Hassan Benali</div>
              <div style={{ fontSize: ".73rem", color: "rgba(100,116,139,.7)" }}>CEO, TechNova Rabat</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right panel — Auth form ── */}
      <div style={{
        width: 480, display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "60px 48px",
        position: "relative", zIndex: 1,
      }}>
        {/* Tabs */}
        <div style={{
          display: "flex", background: "rgba(255,255,255,.04)", border: "1px solid rgba(255, 255,255,.07)",
          borderRadius: 12, padding: 4, marginBottom: 36,
        }}>
          {(["login", "register"] as const).map(t => (
            <button key={t} id={`tab-${t}`} onClick={() => setTab(t)} style={{
              flex: 1, padding: "10px", borderRadius: 9, border: "none", cursor: "pointer",
              fontWeight: 700, fontSize: ".85rem", transition: "all .2s ease",
              background: tab === t ? "linear-gradient(135deg,rgba(139,92,246,.25),rgba(79,70,229,.2))" : "transparent",
              color: tab === t ? "white" : "rgba(148,163,184,.7)",
              fontFamily: "inherit",
            }}>
              {t === "login" ? "Se connecter" : "Créer un compte"}
            </button>
          ))}
        </div>

        <h2 style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.6rem", marginBottom: 6 }}>
          {tab === "login" ? "Bon retour 👋" : "Commencer gratuitement"}
        </h2>
        <p style={{ fontSize: ".875rem", color: "rgba(100,116,139,.8)", marginBottom: 28 }}>
          {tab === "login" ? "Connectez-vous à votre workspace NexusOS" : "14 jours gratuits — aucune carte de crédit"}
        </p>

        {/* Social login */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          {[
            { icon: <GitBranch size={16} />, label: "GitHub" },
            { icon: <Globe size={16} />, label: "Google" },
          ].map((s) => (
            <Link key={s.label} href="/dashboard" style={{ textDecoration: "none", flex: 1 }}>
              <button id={`sso-${s.label.toLowerCase()}`} style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "11px", borderRadius: 10, border: "1px solid rgba(255,255,255,.1)",
                background: "rgba(255,255,255,.04)", color: "rgba(203,213,225,.9)",
                fontWeight: 600, fontSize: ".85rem", cursor: "pointer", fontFamily: "inherit",
                transition: "all .2s ease",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,.08)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,.04)"; }}
              >
                {s.icon} Continuer avec {s.label}
              </button>
            </Link>
          ))}
        </div>

        {/* Divider */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 24 }}>
          <div className="divider" style={{ flex: 1 }} />
          <span style={{ fontSize: ".75rem", color: "rgba(71,85,105,.8)" }}>ou avec email</span>
          <div className="divider" style={{ flex: 1 }} />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          {tab === "register" && (
            <div>
              <label style={{ fontSize: ".78rem", fontWeight: 700, color: "rgba(148,163,184,.8)", display: "block", marginBottom: 6 }}>Nom complet</label>
              <div style={{ position: "relative" }}>
                <input className="input" id="register-name" placeholder="Youssef Amrani" style={{ paddingLeft: 40 }} />
                <span style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "rgba(100,116,139,.6)" }}>👤</span>
              </div>
            </div>
          )}

          <div>
            <label style={{ fontSize: ".78rem", fontWeight: 700, color: "rgba(148,163,184,.8)", display: "block", marginBottom: 6 }}>Email professionnel</label>
            <div style={{ position: "relative" }}>
              <input
                className="input" id="email-input" type="email"
                value={email} onChange={e => setEmail(e.target.value)}
                placeholder="vous@entreprise.ma"
                style={{ paddingLeft: 40 }}
              />
              <Mail size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "rgba(100,116,139,.6)" }} />
            </div>
          </div>

          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <label style={{ fontSize: ".78rem", fontWeight: 700, color: "rgba(148,163,184,.8)" }}>Mot de passe</label>
              {tab === "login" && <a href="#" style={{ fontSize: ".75rem", color: "rgba(139,92,246,.8)", textDecoration: "none" }}>Mot de passe oublié ?</a>}
            </div>
            <div style={{ position: "relative" }}>
              <input
                className="input" id="password-input" type={showPass ? "text" : "password"}
                value={password} onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••"
                style={{ paddingLeft: 40, paddingRight: 44 }}
              />
              <Lock size={15} style={{ position: "absolute", left: 13, top: "50%", transform: "translateY(-50%)", color: "rgba(100,116,139,.6)" }} />
              <button type="button" onClick={() => setShowPass(s => !s)} style={{
                position: "absolute", right: 13, top: "50%", transform: "translateY(-50%)",
                background: "none", border: "none", cursor: "pointer", color: "rgba(100,116,139,.6)",
              }}>
                {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
          </div>

          {tab === "register" && (
            <div>
              <label style={{ fontSize: ".78rem", fontWeight: 700, color: "rgba(148,163,184,.8)", display: "block", marginBottom: 6 }}>Entreprise</label>
              <input className="input" id="company-input" placeholder="TechFlow Rabat" />
            </div>
          )}

          {/* 2FA info for login */}
          {tab === "login" && (
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 12px", background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.2)", borderRadius: 10 }}>
              <Shield size={14} color="#10B981" />
              <span style={{ fontSize: ".78rem", color: "rgba(148,163,184,.8)" }}>Authentification 2FA activée sur ce compte</span>
            </div>
          )}

          <Link href="/dashboard" style={{ textDecoration: "none", marginTop: 6 }}>
            <button
              id="submit-btn"
              type="submit"
              onClick={handleSubmit}
              style={{
                width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                padding: "13px", borderRadius: 11, border: "none", cursor: "pointer",
                background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
                color: "white", fontWeight: 700, fontSize: ".925rem", fontFamily: "inherit",
                boxShadow: "0 4px 20px rgba(124,58,237,.45)",
                transition: "all .25s ease",
                opacity: loading ? 0.7 : 1,
              }}
            >
              {loading ? (
                <>Connexion en cours...</>
              ) : (
                <>{tab === "login" ? "Se connecter" : "Créer mon compte"} <ArrowRight size={16} /></>
              )}
            </button>
          </Link>
        </form>

        {/* Security badges */}
        <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 28 }}>
          {[
            { icon: <Shield size={12} />, text: "SSL/TLS" },
            { icon: <Check size={12} />, text: "RGPD" },
            { icon: <Lock size={12} />, text: "AES-256" },
          ].map((b) => (
            <div key={b.text} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: ".72rem", color: "rgba(71,85,105,.8)" }}>
              <span style={{ color: "#10B981" }}>{b.icon}</span> {b.text}
            </div>
          ))}
        </div>

        {tab === "register" && (
          <p style={{ fontSize: ".73rem", color: "rgba(71,85,105,.7)", textAlign: "center", marginTop: 14, lineHeight: 1.6 }}>
            En créant un compte, vous acceptez nos{" "}
            <a href="#" style={{ color: "rgba(139,92,246,.8)", textDecoration: "none" }}>CGU</a>{" "}
            et notre{" "}
            <a href="#" style={{ color: "rgba(139,92,246,.8)", textDecoration: "none" }}>Politique de confidentialité</a>.
          </p>
        )}
      </div>
    </div>
  );
}
