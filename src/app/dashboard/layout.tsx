"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard, FolderKanban, Users, FileText, BarChart3,
  MessageSquare, Settings, Wallet, Brain, Zap, Bell, Search,
  ChevronDown, ChevronRight, LogOut, HelpCircle, ChevronsLeft,
  Crown, Plus
} from "lucide-react";

type NavItem = { href: string; icon: React.ElementType; label: string; count?: number };
type NavSection = { title: string; items: NavItem[] };

const NAV: NavSection[] = [
  {
    title: "Workspace",
    items: [
      { href: "/dashboard",            icon: LayoutDashboard, label: "Vue d'ensemble" },
      { href: "/dashboard/projects",   icon: FolderKanban,    label: "Projets",       count: 12 },
      { href: "/dashboard/analytics",  icon: BarChart3,       label: "Analytics" },
    ],
  },
  {
    title: "Business",
    items: [
      { href: "/dashboard/crm",        icon: Users,           label: "CRM",           count: 3 },
      { href: "/dashboard/invoices",   icon: FileText,        label: "Facturation" },
      { href: "/dashboard/finance",    icon: Wallet,          label: "Finance" },
    ],
  },
  {
    title: "Équipe",
    items: [
      { href: "/dashboard/hr",         icon: Users,           label: "RH & Paie" },
      { href: "/dashboard/teams",      icon: Users,           label: "Équipes" },
      { href: "/dashboard/chat",       icon: MessageSquare,   label: "Chat",          count: 5 },
    ],
  },
];

const NOTIFICATIONS = [
  { icon: "💰", text: "Facture INV-089 payée", sub: "Bank Al-Maghrib Tech · 58 500 MAD", time: "5 min", unread: true },
  { icon: "🤖", text: "NexusAI: 3 insights générés", sub: "Opportunités de croissance détectées", time: "20 min", unread: true },
  { icon: "👤", text: "Nouveau lead entrant", sub: "InnovaData Maroc · Score 67/100", time: "1h", unread: true },
  { icon: "✅", text: "Sprint 3 terminé", sub: "App Mobile Banking · 12 tâches", time: "2h", unread: false },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const path = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const [search, setSearch] = useState("");

  const unread = NOTIFICATIONS.filter(n => n.unread).length;

  // CMD+K shortcut
  useEffect(() => {
    const fn = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") { e.preventDefault(); setCmdOpen(c => !c); }
      if (e.key === "Escape") { setCmdOpen(false); setNotifOpen(false); setProfileOpen(false); }
    };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, []);

  const closeAll = () => { setNotifOpen(false); setProfileOpen(false); };

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--bg)" }}>

      {/* ══════════════════════════════
          SIDEBAR
      ══════════════════════════════ */}
      <aside style={{
        width: collapsed ? 52 : 224,
        height: "100vh",
        background: "var(--surface-0)",
        borderRight: "1px solid var(--border)",
        display: "flex", flexDirection: "column",
        position: "fixed", left: 0, top: 0, zIndex: 50,
        transition: "width 0.25s cubic-bezier(0.4,0,0.2,1)",
        overflow: "hidden",
      }}>
        {/* Workspace header */}
        <div style={{
          height: 52, display: "flex", alignItems: "center",
          padding: collapsed ? "0 10px" : "0 12px",
          borderBottom: "1px solid var(--border)",
          gap: 8, flexShrink: 0,
          justifyContent: collapsed ? "center" : "flex-start",
        }}>
          {!collapsed ? (
            <>
              <div style={{
                width: 24, height: 24, borderRadius: 6,
                background: "var(--accent)",
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>
                <Zap size={13} color="white" strokeWidth={2.5} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: "-0.02em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>TechFlow Rabat</div>
                <div style={{ fontSize: 10, color: "var(--text-4)", fontWeight: 500 }}>Plan Growth</div>
              </div>
              <button
                onClick={() => setCollapsed(true)}
                className="btn-icon btn-icon-sm"
                style={{ flexShrink: 0, color: "var(--text-4)" }}
                title="Réduire"
              >
                <ChevronsLeft size={13} />
              </button>
            </>
          ) : (
            <button
              onClick={() => setCollapsed(false)}
              style={{ width: 32, height: 32, borderRadius: 8, background: "var(--accent)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
              title="Agrandir"
            >
              <Zap size={14} color="white" strokeWidth={2.5} />
            </button>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: collapsed ? "8px 6px" : "8px 8px" }}>
          {/* AI shortcut */}
          <div style={{ marginBottom: 8 }}>
            <Link href="/dashboard/ai" style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8,
                height: 32, padding: collapsed ? "0 8px" : "0 10px",
                borderRadius: "var(--r-md)", cursor: "pointer",
                background: path === "/dashboard/ai" ? "var(--surface-2)" : "transparent",
                border: "1px solid",
                borderColor: path === "/dashboard/ai" ? "var(--border)" : "transparent",
                color: path === "/dashboard/ai" ? "var(--text-1)" : "var(--text-3)",
                transition: "all 0.1s ease",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
                onMouseEnter={e => { if (path !== "/dashboard/ai") { (e.currentTarget as HTMLDivElement).style.background = "var(--surface-2)"; (e.currentTarget as HTMLDivElement).style.color = "var(--text-1)"; } }}
                onMouseLeave={e => { if (path !== "/dashboard/ai") { (e.currentTarget as HTMLDivElement).style.background = "transparent"; (e.currentTarget as HTMLDivElement).style.color = "var(--text-3)"; } }}
                title={collapsed ? "NexusAI" : undefined}
              >
                <Brain size={15} style={{ flexShrink: 0, color: path === "/dashboard/ai" ? "var(--accent-light)" : "inherit" }} />
                {!collapsed && <span style={{ fontSize: 13, fontWeight: 500, flex: 1 }}>NexusAI</span>}
                {!collapsed && (
                  <span style={{
                    fontSize: 9, fontWeight: 700, letterSpacing: "0.04em",
                    padding: "1px 5px", borderRadius: 99,
                    background: "var(--accent-subtle)", color: "var(--accent-light)",
                    border: "1px solid var(--accent-border)", textTransform: "uppercase",
                  }}>IA</span>
                )}
              </div>
            </Link>
          </div>

          {NAV.map((section) => (
            <div key={section.title} style={{ marginBottom: 16 }}>
              {!collapsed && (
                <div style={{
                  fontSize: 10, fontWeight: 600, color: "var(--text-4)",
                  textTransform: "uppercase", letterSpacing: "0.08em",
                  padding: "0 10px", marginBottom: 4, height: 24, display: "flex", alignItems: "center",
                }}>
                  {section.title}
                </div>
              )}
              {section.items.map((item) => {
                const active = path === item.href;
                return (
                  <Link key={item.href} href={item.href} style={{ textDecoration: "none", display: "block", marginBottom: 1 }}>
                    <div
                      title={collapsed ? item.label : undefined}
                      style={{
                        display: "flex", alignItems: "center",
                        gap: 8, height: 32,
                        padding: collapsed ? "0 8px" : "0 10px",
                        borderRadius: "var(--r-md)",
                        color: active ? "var(--text-1)" : "var(--text-3)",
                        background: active ? "var(--surface-2)" : "transparent",
                        border: `1px solid ${active ? "var(--border)" : "transparent"}`,
                        cursor: "pointer",
                        transition: "all 0.1s ease",
                        justifyContent: collapsed ? "center" : "flex-start",
                      }}
                      onMouseEnter={e => { if (!active) { (e.currentTarget as HTMLDivElement).style.background = "var(--surface-2)"; (e.currentTarget as HTMLDivElement).style.color = "var(--text-1)"; } }}
                      onMouseLeave={e => { if (!active) { (e.currentTarget as HTMLDivElement).style.background = "transparent"; (e.currentTarget as HTMLDivElement).style.color = "var(--text-3)"; } }}
                    >
                      <item.icon size={15} style={{ flexShrink: 0, color: active ? "var(--accent-light)" : "inherit" }} />
                      {!collapsed && (
                        <>
                          <span style={{ fontSize: 13, fontWeight: active ? 500 : 400, flex: 1, letterSpacing: "-0.01em" }}>{item.label}</span>
                          {item.count && (
                            <span style={{
                              fontSize: 10, fontWeight: 700, minWidth: 18, height: 16,
                              display: "flex", alignItems: "center", justifyContent: "center",
                              background: "var(--surface-3)", color: "var(--text-3)",
                              borderRadius: 99, padding: "0 5px",
                            }}>{item.count}</span>
                          )}
                        </>
                      )}
                    </div>
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Bottom section */}
        <div style={{ borderTop: "1px solid var(--border)", flexShrink: 0 }}>
          {/* Settings */}
          <div style={{ padding: collapsed ? "6px" : "6px 8px" }}>
            <Link href="/dashboard/settings" style={{ textDecoration: "none" }}>
              <div style={{
                display: "flex", alignItems: "center", gap: 8, height: 32,
                padding: collapsed ? "0 8px" : "0 10px", borderRadius: "var(--r-md)",
                color: path === "/dashboard/settings" ? "var(--text-1)" : "var(--text-3)",
                cursor: "pointer", transition: "all 0.1s ease",
                background: path === "/dashboard/settings" ? "var(--surface-2)" : "transparent",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.background = "var(--surface-2)"; (e.currentTarget as HTMLDivElement).style.color = "var(--text-1)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.background = path === "/dashboard/settings" ? "var(--surface-2)" : "transparent"; (e.currentTarget as HTMLDivElement).style.color = path === "/dashboard/settings" ? "var(--text-1)" : "var(--text-3)"; }}
                title={collapsed ? "Paramètres" : undefined}
              >
                <Settings size={15} style={{ flexShrink: 0 }} />
                {!collapsed && <span style={{ fontSize: 13, fontWeight: 400 }}>Paramètres</span>}
              </div>
            </Link>
          </div>

          {/* User */}
          <div style={{ padding: collapsed ? "6px" : "6px 8px 10px" }}>
            <div
              onClick={() => setProfileOpen(o => !o)}
              style={{
                display: "flex", alignItems: "center", gap: 8, height: 36,
                padding: collapsed ? "0 8px" : "0 10px", borderRadius: "var(--r-md)",
                cursor: "pointer", transition: "background 0.1s ease",
                justifyContent: collapsed ? "center" : "flex-start",
              }}
              onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "var(--surface-2)"}
              onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = "transparent"}
            >
              <div className="avatar avatar-sm" style={{ background: "var(--accent)", color: "white", flexShrink: 0, borderColor: "transparent" }}>
                YA
              </div>
              {!collapsed && (
                <>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: "-0.01em", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Youssef Amrani</div>
                    <div style={{ fontSize: 10, color: "var(--text-4)" }}>CEO & Lead Dev</div>
                  </div>
                  <ChevronDown size={12} style={{ color: "var(--text-4)", flexShrink: 0 }} />
                </>
              )}
            </div>

            {/* Profile dropdown */}
            {profileOpen && !collapsed && (
              <div className="dropdown" style={{
                position: "absolute", bottom: 54, left: 8, width: 200, zIndex: 200,
              }}>
                <div style={{ padding: "10px 12px 8px", borderBottom: "1px solid var(--border)" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 1 }}>Youssef Amrani</div>
                  <div style={{ fontSize: 11, color: "var(--text-4)" }}>y.amrani@techflow.ma</div>
                </div>
                {[
                  { icon: <Settings size={13} />, label: "Paramètres" },
                  { icon: <HelpCircle size={13} />, label: "Documentation" },
                  { icon: <Crown size={13} />, label: "Plan Growth — Mettre à niveau" },
                ].map(item => (
                  <div key={item.label} className="dropdown-item">{item.icon}{item.label}</div>
                ))}
                <div style={{ height: 1, background: "var(--border)", margin: "4px 0" }} />
                <div className="dropdown-item dropdown-item-danger"><LogOut size={13} />Se déconnecter</div>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ══════════════════════════════
          MAIN CONTENT
      ══════════════════════════════ */}
      <div style={{
        marginLeft: collapsed ? 52 : 224,
        flex: 1, minWidth: 0,
        transition: "margin-left 0.25s cubic-bezier(0.4,0,0.2,1)",
        display: "flex", flexDirection: "column",
      }}>
        {/* Topbar */}
        <header style={{
          height: 52, flexShrink: 0,
          background: "var(--surface-0)",
          borderBottom: "1px solid var(--border)",
          display: "flex", alignItems: "center",
          padding: "0 24px", gap: 12,
          position: "sticky", top: 0, zIndex: 40,
        }}>
          {/* Search / CMD */}
          <button
            id="cmd-search"
            onClick={() => setCmdOpen(true)}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              flex: 1, maxWidth: 320, height: 32,
              background: "var(--surface-2)", border: "1px solid var(--border)",
              borderRadius: "var(--r-md)", padding: "0 10px",
              cursor: "pointer", textAlign: "left",
              transition: "all 0.15s ease",
              color: "var(--text-4)",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-strong)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-3)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLButtonElement).style.color = "var(--text-4)"; }}
          >
            <Search size={13} />
            <span style={{ fontSize: 12, flex: 1 }}>Rechercher...</span>
            <div style={{ display: "flex", gap: 3, alignItems: "center" }}>
              <kbd>⌘</kbd><kbd>K</kbd>
            </div>
          </button>

          <div style={{ flex: 1 }} />

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
            {/* New */}
            <button className="btn btn-secondary btn-sm" style={{ gap: 5, fontSize: 12 }} id="new-item-btn">
              <Plus size={13} /> Nouveau
            </button>

            {/* Help */}
            <button className="btn-icon" id="help-btn"><HelpCircle size={15} /></button>

            {/* Notifications */}
            <div style={{ position: "relative" }}>
              <button
                className="btn-icon"
                id="notif-btn"
                onClick={() => { setNotifOpen(o => !o); setProfileOpen(false); }}
                style={{ position: "relative" }}
              >
                <Bell size={15} />
                {unread > 0 && (
                  <span style={{
                    position: "absolute", top: 6, right: 6,
                    width: 6, height: 6, borderRadius: "50%",
                    background: "var(--accent-light)",
                    border: "1.5px solid var(--surface-0)",
                  }} />
                )}
              </button>

              {notifOpen && (
                <div className="dropdown" style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", width: 320, zIndex: 200 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 14px 8px" }}>
                    <span style={{ fontSize: 13, fontWeight: 600 }}>Notifications</span>
                    <span className="badge badge-accent">{unread} nouvelles</span>
                  </div>
                  <div style={{ borderTop: "1px solid var(--border)" }}>
                    {NOTIFICATIONS.map((n, i) => (
                      <div key={i} style={{
                        display: "flex", gap: 10, padding: "10px 14px",
                        borderBottom: i < NOTIFICATIONS.length - 1 ? "1px solid var(--border)" : "none",
                        background: n.unread ? "rgba(124,58,237,0.03)" : "transparent",
                        cursor: "pointer", transition: "background 0.1s",
                      }}
                        onMouseEnter={e => (e.currentTarget as HTMLDivElement).style.background = "var(--surface-3)"}
                        onMouseLeave={e => (e.currentTarget as HTMLDivElement).style.background = n.unread ? "rgba(124,58,237,0.03)" : "transparent"}
                      >
                        <span style={{ fontSize: 16, lineHeight: 1.4, flexShrink: 0 }}>{n.icon}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: 12, fontWeight: n.unread ? 600 : 400, marginBottom: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.text}</div>
                          <div style={{ fontSize: 11, color: "var(--text-4)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{n.sub}</div>
                        </div>
                        <div style={{ fontSize: 10, color: "var(--text-4)", flexShrink: 0 }}>{n.time}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1 }} onClick={closeAll}>
          {children}
        </main>
      </div>

      {/* ══════════════════════════════
          COMMAND PALETTE
      ══════════════════════════════ */}
      {cmdOpen && (
        <div className="cmd-overlay" onClick={() => setCmdOpen(false)}>
          <div className="cmd-palette" onClick={e => e.stopPropagation()} id="cmd-palette">
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", borderBottom: "1px solid var(--border)" }}>
              <Search size={15} style={{ color: "var(--text-4)", flexShrink: 0 }} />
              <input
                autoFocus
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Rechercher ou accéder à..."
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", fontSize: 14, color: "var(--text-1)", fontFamily: "inherit" }}
              />
              <kbd>Esc</kbd>
            </div>
            <div style={{ padding: "8px" }}>
              <div style={{ fontSize: 10, fontWeight: 600, color: "var(--text-4)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "4px 8px 6px" }}>Navigation rapide</div>
              {[
                { icon: <LayoutDashboard size={13} />, label: "Vue d'ensemble", sub: "Dashboard principal", href: "/dashboard" },
                { icon: <FolderKanban size={13} />, label: "Projets", sub: "Kanban & gestion", href: "/dashboard/projects" },
                { icon: <Brain size={13} />, label: "NexusAI", sub: "Assistant IA", href: "/dashboard/ai" },
                { icon: <Users size={13} />, label: "CRM", sub: "Clients & prospects", href: "/dashboard/crm" },
                { icon: <FileText size={13} />, label: "Facturation", sub: "Factures & paiements", href: "/dashboard/invoices" },
                { icon: <BarChart3 size={13} />, label: "Analytics", sub: "Rapports & données", href: "/dashboard/analytics" },
              ].filter(i => !search || i.label.toLowerCase().includes(search.toLowerCase())).map((item, i) => (
                <Link key={i} href={item.href} onClick={() => setCmdOpen(false)} style={{ textDecoration: "none" }}>
                  <div className="dropdown-item" style={{ height: 40 }}>
                    <div style={{ width: 26, height: 26, borderRadius: "var(--r-sm)", background: "var(--surface-3)", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-3)", flexShrink: 0 }}>
                      {item.icon}
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-1)" }}>{item.label}</div>
                      <div style={{ fontSize: 11, color: "var(--text-4)" }}>{item.sub}</div>
                    </div>
                    <ChevronRight size={12} style={{ color: "var(--text-4)" }} />
                  </div>
                </Link>
              ))}
            </div>
            <div style={{ borderTop: "1px solid var(--border)", padding: "8px 16px", display: "flex", gap: 12 }}>
              {[["↵", "Ouvrir"], ["↑↓", "Naviguer"], ["Esc", "Fermer"]].map(([k, l]) => (
                <div key={l} style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, color: "var(--text-4)" }}>
                  <kbd>{k}</kbd><span>{l}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
