"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FolderKanban, Users, FileText, BarChart3,
  MessageSquare, Settings, TrendingUp, Wallet, CreditCard,
  Zap, Bell, Search, ChevronDown, LogOut, User, HelpCircle,
  Menu, X, Sparkles, Shield, Wifi, Crown
} from "lucide-react";

const NAV = [
  {
    section: "GÉNÉRAL",
    items: [
      { href: "/dashboard", icon: LayoutDashboard, label: "Vue d'ensemble", badge: null },
      { href: "/dashboard/projects", icon: FolderKanban, label: "Projets", badge: "12" },
      { href: "/dashboard/analytics", icon: BarChart3, label: "Analytics IA", badge: "🔥" },
    ],
  },
  {
    section: "BUSINESS",
    items: [
      { href: "/dashboard/crm", icon: Users, label: "CRM & Clients", badge: "3" },
      { href: "/dashboard/invoices", icon: FileText, label: "Facturation", badge: null },
      { href: "/dashboard/finance", icon: Wallet, label: "Finance", badge: null },
    ],
  },
  {
    section: "ÉQUIPE",
    items: [
      { href: "/dashboard/hr", icon: CreditCard, label: "Ressources Humaines", badge: null },
      { href: "/dashboard/teams", icon: Users, label: "Équipes", badge: null },
      { href: "/dashboard/chat", icon: MessageSquare, label: "Chat", badge: "5" },
    ],
  },
  {
    section: "COMPTE",
    items: [
      { href: "/dashboard/settings", icon: Settings, label: "Paramètres", badge: null },
    ],
  },
];

const NOTIFS = [
  { icon: "💰", text: "Facture INV-089 payée — 58,500 MAD", time: "Il y a 5 min", unread: true },
  { icon: "🤖", text: "IA: 3 nouvelles opportunités détectées", time: "Il y a 20 min", unread: true },
  { icon: "👤", text: "Nouveau lead entrant — InnovaData", time: "Il y a 1h", unread: true },
  { icon: "✅", text: "Sprint 3 terminé avec succès", time: "Il y a 2h", unread: false },
  { icon: "⚠️", text: "Budget dépassé — App Banking +12%", time: "Il y a 3h", unread: false },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const unreadCount = NOTIFS.filter(n => n.unread).length;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* ════════ SIDEBAR ════════ */}
      <div
        className="sidebar"
        style={{ width: collapsed ? 68 : 260, transition: "width .3s cubic-bezier(.4,0,.2,1)" }}
      >
        {/* Logo */}
        <div style={{
          height: 62, display: "flex", alignItems: "center",
          padding: collapsed ? "0 16px" : "0 18px",
          borderBottom: "1px solid rgba(255,255,255,.05)",
          justifyContent: collapsed ? "center" : "space-between",
          flexShrink: 0,
        }}>
          {!collapsed && (
            <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
              <div style={{
                width: 34, height: 34, borderRadius: 9,
                background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 0 20px rgba(124,58,237,.45)",
                flexShrink: 0,
              }}>
                <Zap size={17} color="white" />
              </div>
              <div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 800, fontSize: "1.05rem", lineHeight: 1.1 }}>
                  Nexus<span style={{ color: "rgb(139,92,246)" }}>OS</span>
                </div>
                <div style={{ fontSize: ".6rem", color: "rgba(71,85,105,.9)", letterSpacing: ".05em" }}>Business Platform</div>
              </div>
            </Link>
          )}
          {collapsed && (
            <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Zap size={17} color="white" />
            </div>
          )}
          <button
            onClick={() => setCollapsed(c => !c)}
            style={{
              background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)",
              borderRadius: 8, width: 28, height: 28, display: "flex", alignItems: "center",
              justifyContent: "center", cursor: "pointer", color: "rgba(100,116,139,.7)",
              flexShrink: 0,
            }}
          >
            {collapsed ? <Menu size={14} /> : <X size={14} />}
          </button>
        </div>

        {/* Nav */}
        <div style={{ flex: 1, padding: collapsed ? "12px 8px" : "12px 10px", overflowY: "auto", overflowX: "hidden" }}>
          {NAV.map((section) => (
            <div key={section.section} style={{ marginBottom: 20 }}>
              {!collapsed && (
                <div className="section-label" style={{ paddingLeft: 4 }}>{section.section}</div>
              )}
              {section.items.map((item) => {
                const active = path === item.href;
                return (
                  <Link key={item.href} href={item.href} style={{ textDecoration: "none", display: "block", marginBottom: 2 }}>
                    <div
                      className={`nav-item ${active ? "active" : ""}`}
                      style={{ justifyContent: collapsed ? "center" : "flex-start" }}
                      title={collapsed ? item.label : undefined}
                    >
                      <item.icon size={17} className="nav-icon" style={{
                        color: active ? "rgb(167,139,250)" : "rgba(100,116,139,.8)",
                        flexShrink: 0,
                      }} />
                      {!collapsed && (
                        <>
                          <span style={{ flex: 1 }}>{item.label}</span>
                          {item.badge && (
                            <span style={{
                              fontSize: ".65rem", fontWeight: 800, lineHeight: 1,
                              background: item.badge === "🔥" || item.badge.includes("🔥") ? "transparent" : "rgba(139,92,246,.2)",
                              color: "rgba(167,139,250,.9)",
                              border: item.badge === "🔥" ? "none" : "1px solid rgba(139,92,246,.3)",
                              borderRadius: 100, padding: "1px 6px", minWidth: 18, textAlign: "center",
                            }}>
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </div>

        {/* AI widget */}
        {!collapsed && (
          <div style={{
            margin: "0 10px 10px",
            background: "linear-gradient(135deg,rgba(139,92,246,.15),rgba(6,182,212,.08))",
            border: "1px solid rgba(139,92,246,.25)",
            borderRadius: 14, padding: "14px 16px",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
              <Sparkles size={14} color="#A78BFA" />
              <span style={{ fontWeight: 700, fontSize: ".8rem", color: "rgba(167,139,250,.95)" }}>IA NexusOS</span>
            </div>
            <p style={{ fontSize: ".73rem", color: "rgba(148,163,184,.75)", lineHeight: 1.6, marginBottom: 10 }}>
              3 insights générés ce matin. Probabilité de croissance: +18%
            </p>
            <div className="progress" style={{ marginBottom: 8 }}>
              <div className="progress-fill" style={{ width: "72%", background: "linear-gradient(90deg,#7C3AED,#06B6D4)" }} />
            </div>
            <div style={{ fontSize: ".68rem", color: "rgba(100,116,139,.7)" }}>Score santé: 92/100</div>
          </div>
        )}

        {/* Plan badge */}
        {!collapsed && (
          <div style={{
            margin: "0 10px 10px",
            background: "rgba(0,0,0,.3)", border: "1px solid rgba(255,255,255,.06)",
            borderRadius: 12, padding: "12px 14px",
            display: "flex", alignItems: "center", gap: 10,
          }}>
            <div style={{ width: 32, height: 32, borderRadius: 10, background: "linear-gradient(135deg,#7C3AED,#4F46E5)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Crown size={14} color="white" />
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: ".8rem", color: "white" }}>TechFlow Rabat</div>
              <div style={{ fontSize: ".68rem", color: "rgba(139,92,246,.8)", fontWeight: 600 }}>Plan Growth</div>
            </div>
          </div>
        )}

        {/* Profile */}
        <div style={{
          borderTop: "1px solid rgba(255,255,255,.05)",
          padding: collapsed ? "12px 8px" : "12px 12px",
          flexShrink: 0,
          display: "flex", alignItems: "center",
          gap: collapsed ? 0 : 10,
          justifyContent: collapsed ? "center" : "flex-start",
        }}>
          <div className="avatar avatar-md" style={{
            background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
            borderRadius: 10, flexShrink: 0,
            boxShadow: "0 0 12px rgba(124,58,237,.35)",
          }}>YA</div>
          {!collapsed && (
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 700, fontSize: ".85rem", color: "white", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                Youssef Amrani
              </div>
              <div style={{ fontSize: ".7rem", color: "rgba(100,116,139,.7)" }}>CEO & Lead Dev</div>
            </div>
          )}
        </div>
      </div>

      {/* ════════ MAIN ════════ */}
      <div className="main-content" style={{ marginLeft: collapsed ? 68 : 260, flex: 1, transition: "margin-left .3s cubic-bezier(.4,0,.2,1)" }}>
        {/* TOPBAR */}
        <div className="topbar" style={{ gap: 16 }}>
          {/* Search */}
          <div style={{
            display: "flex", alignItems: "center", gap: 8,
            background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
            borderRadius: 10, padding: "0 14px", height: 38, flex: 1, maxWidth: 440,
          }}>
            <Search size={14} style={{ color: "rgba(100,116,139,.6)", flexShrink: 0 }} />
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Rechercher projets, clients, factures..."
              id="topbar-search"
              style={{
                background: "transparent", border: "none", outline: "none",
                color: "white", fontSize: ".85rem", flex: 1, fontFamily: "inherit",
              }}
            />
            <kbd style={{
              background: "rgba(255,255,255,.07)", border: "1px solid rgba(255,255,255,.1)",
              borderRadius: 5, padding: "1px 6px", fontSize: ".65rem",
              color: "rgba(100,116,139,.7)", fontFamily: "monospace",
            }}>⌘K</kbd>
          </div>

          <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 10 }}>
            {/* Live clock */}
            <div style={{
              fontSize: ".75rem", color: "rgba(100,116,139,.7)", fontFamily: "var(--font-mono)",
              background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)",
              borderRadius: 8, padding: "5px 10px",
            }}>
              {time.toLocaleTimeString("fr-MA", { hour: "2-digit", minute: "2-digit" })}
              <span style={{ color: "rgba(139,92,246,.6)", marginLeft: 4, fontSize: ".65rem" }}>WEST</span>
            </div>

            {/* Status */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: "rgba(16,185,129,.08)", border: "1px solid rgba(16,185,129,.2)",
              borderRadius: 8, padding: "5px 10px", fontSize: ".73rem", fontWeight: 700, color: "#34D399",
            }}>
              <Wifi size={11} />Connecté
            </div>

            {/* Help */}
            <button className="btn btn-icon">
              <HelpCircle size={15} />
            </button>

            {/* Notifications */}
            <div style={{ position: "relative" }} id="notif-wrapper">
              <button
                className="btn btn-icon"
                id="notif-btn"
                onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }}
              >
                <Bell size={15} />
                {unreadCount > 0 && (
                  <span style={{
                    position: "absolute", top: 6, right: 6, width: 8, height: 8,
                    background: "#EF4444", borderRadius: "50%",
                    border: "1.5px solid rgb(8,8,20)",
                  }} />
                )}
              </button>

              {notifOpen && (
                <div style={{
                  position: "absolute", right: 0, top: "calc(100% + 10px)",
                  width: 340, maxHeight: 420,
                  background: "linear-gradient(145deg,rgba(16,16,40,.99),rgba(10,10,28,.99))",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: 16, overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,.7)",
                  zIndex: 200,
                }}>
                  <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid rgba(255,255,255,.06)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: ".95rem" }}>Notifications</div>
                    <span className="badge badge-red" style={{ fontSize: ".65rem" }}>{unreadCount} nouvelles</span>
                  </div>
                  <div style={{ overflowY: "auto", maxHeight: 320 }}>
                    {NOTIFS.map((n, i) => (
                      <div key={i} style={{
                        display: "flex", gap: 12, padding: "12px 18px",
                        borderBottom: "1px solid rgba(255,255,255,.04)",
                        background: n.unread ? "rgba(139,92,246,.05)" : "transparent",
                        cursor: "pointer",
                        transition: "background .15s ease",
                      }}
                        onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,.03)")}
                        onMouseLeave={e => (e.currentTarget.style.background = n.unread ? "rgba(139,92,246,.05)" : "transparent")}
                      >
                        <div style={{ fontSize: "1.1rem", flexShrink: 0, lineHeight: 1.4 }}>{n.icon}</div>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: ".8rem", color: "rgba(226,232,240,.9)", marginBottom: 3, lineHeight: 1.4 }}>{n.text}</div>
                          <div style={{ fontSize: ".7rem", color: "rgba(71,85,105,.8)" }}>{n.time}</div>
                        </div>
                        {n.unread && <div style={{ width: 7, height: 7, background: "#8B5CF6", borderRadius: "50%", flexShrink: 0, marginTop: 6 }} />}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Profile */}
            <div style={{ position: "relative" }} id="profile-wrapper">
              <button
                id="profile-btn"
                onClick={() => { setProfileOpen(o => !o); setNotifOpen(false); }}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 10, padding: "5px 10px 5px 6px", cursor: "pointer",
                }}
              >
                <div className="avatar" style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)", width: 28, height: 28, borderRadius: 8, fontSize: ".65rem" }}>YA</div>
                <span style={{ fontSize: ".82rem", fontWeight: 600, color: "rgba(203,213,225,.9)" }}>Youssef A.</span>
                <ChevronDown size={13} color="rgba(100,116,139,.7)" />
              </button>

              {profileOpen && (
                <div style={{
                  position: "absolute", right: 0, top: "calc(100% + 10px)",
                  width: 220,
                  background: "linear-gradient(145deg,rgba(16,16,40,.99),rgba(10,10,28,.99))",
                  border: "1px solid rgba(255,255,255,.1)",
                  borderRadius: 14, overflow: "hidden",
                  boxShadow: "0 20px 60px rgba(0,0,0,.7)",
                  zIndex: 200,
                }}>
                  <div style={{ padding: "14px 16px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
                    <div style={{ fontWeight: 700, fontSize: ".85rem" }}>Youssef Amrani</div>
                    <div style={{ fontSize: ".73rem", color: "rgba(100,116,139,.7)" }}>y.amrani@techflow.ma</div>
                    <div className="badge badge-violet" style={{ marginTop: 8, fontSize: ".65rem" }}><Crown size={9} /> Plan Growth</div>
                  </div>
                  {[
                    { icon: <User size={14} />, label: "Mon profil" },
                    { icon: <Settings size={14} />, label: "Paramètres" },
                    { icon: <Shield size={14} />, label: "Sécurité & 2FA" },
                    { icon: <HelpCircle size={14} />, label: "Aide & support" },
                  ].map((item) => (
                    <div key={item.label} style={{
                      display: "flex", alignItems: "center", gap: 10,
                      padding: "10px 16px", cursor: "pointer",
                      fontSize: ".82rem", color: "rgba(203,213,225,.85)",
                      borderBottom: "1px solid rgba(255,255,255,.04)",
                      transition: "background .15s",
                    }}
                      onMouseEnter={e => (e.currentTarget.style.background = "rgba(255,255,255,.04)")}
                      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
                    >
                      <span style={{ color: "rgba(100,116,139,.7)" }}>{item.icon}</span>
                      {item.label}
                    </div>
                  ))}
                  <div style={{
                    display: "flex", alignItems: "center", gap: 10,
                    padding: "10px 16px", cursor: "pointer",
                    fontSize: ".82rem", color: "#f87171",
                  }}>
                    <LogOut size={14} /> Déconnexion
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Page content */}
        <div onClick={() => { setNotifOpen(false); setProfileOpen(false); }}>
          {children}
        </div>
      </div>
    </div>
  );
}
