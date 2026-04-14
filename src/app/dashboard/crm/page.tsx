"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Globe,
  Phone,
  Mail,
  MapPin,
  TrendingUp,
  Star,
  MoreHorizontal,
  Eye,
  Edit,
  Filter,
  Building2,
  ChevronRight,
  CheckCircle2,
  Clock,
  XCircle,
} from "lucide-react";

const CLIENTS = [
  {
    id: "c1",
    name: "MarketPlus SA",
    logo: "MP",
    logoColor: "linear-gradient(135deg, #7C3AED, #4F46E5)",
    contact: "Hassan Bennani",
    email: "h.bennani@marketplus.ma",
    phone: "+212 661 234 567",
    city: "Casablanca",
    status: "Actif",
    statusColor: "#10B981",
    value: "220,000 MAD",
    score: 92,
    stage: "Client fidèle",
    stageColor: "#10B981",
    projects: 3,
    lastContact: "Il y a 2j",
    tags: ["E-Commerce", "Retail"],
  },
  {
    id: "c2",
    name: "Bank Al-Maghrib Tech",
    logo: "BM",
    logoColor: "linear-gradient(135deg, #0891B2, #1D4ED8)",
    contact: "Rachida Alaoui",
    email: "r.alaoui@bam.ma",
    phone: "+212 537 456 789",
    city: "Rabat",
    status: "Actif",
    statusColor: "#10B981",
    value: "580,000 MAD",
    score: 98,
    stage: "Client VIP",
    stageColor: "#F59E0B",
    projects: 2,
    lastContact: "Aujourd'hui",
    tags: ["Finance", "Banking"],
  },
  {
    id: "c3",
    name: "OCP Digital",
    logo: "OC",
    logoColor: "linear-gradient(135deg, #059669, #0D9488)",
    contact: "Mohammed El Fassi",
    email: "m.elfassi@ocp.ma",
    phone: "+212 522 678 901",
    city: "Casablanca",
    status: "Actif",
    statusColor: "#10B981",
    value: "145,000 MAD",
    score: 85,
    stage: "En contrat",
    stageColor: "#8B5CF6",
    projects: 1,
    lastContact: "Il y a 1 sem",
    tags: ["Mining", "Enterprise"],
  },
  {
    id: "c4",
    name: "InnovaData Maroc",
    logo: "ID",
    logoColor: "linear-gradient(135deg, #DC2626, #9333EA)",
    contact: "Zineb Tahiri",
    email: "z.tahiri@innovadata.ma",
    phone: "+212 669 345 678",
    city: "Rabat",
    status: "Prospect",
    statusColor: "#F59E0B",
    value: "75,000 MAD",
    score: 67,
    stage: "Négociation",
    stageColor: "#F59E0B",
    projects: 1,
    lastContact: "Il y a 3j",
    tags: ["Data", "Analytics"],
  },
  {
    id: "c5",
    name: "AlphaConsult SARL",
    logo: "AC",
    logoColor: "linear-gradient(135deg, #D97706, #EA580C)",
    contact: "Khalid Benjelloun",
    email: "k.benjelloun@alphaconsult.ma",
    phone: "+212 655 234 567",
    city: "Marrakech",
    status: "Prospect",
    statusColor: "#F59E0B",
    value: "40,000 MAD",
    score: 45,
    stage: "Proposition",
    stageColor: "#06B6D4",
    projects: 0,
    lastContact: "Il y a 1j",
    tags: ["Consulting"],
  },
  {
    id: "c6",
    name: "TechHub Agadir",
    logo: "TH",
    logoColor: "linear-gradient(135deg, #6D28D9, #7C3AED)",
    contact: "Nadia Cherkaoui",
    email: "n.cherkaoui@techhub.ma",
    phone: "+212 628 456 789",
    city: "Agadir",
    status: "Inactif",
    statusColor: "#6B7280",
    value: "28,000 MAD",
    score: 30,
    stage: "À relancer",
    stageColor: "#EF4444",
    projects: 0,
    lastContact: "Il y a 1 mois",
    tags: ["Startup", "Tech"],
  },
];

const PIPELINE = [
  { stage: "Prospect", count: 8, value: "120K MAD", color: "#06B6D4" },
  { stage: "Contact établi", count: 5, value: "85K MAD", color: "#8B5CF6" },
  { stage: "Proposition envoyée", count: 4, value: "210K MAD", color: "#F59E0B" },
  { stage: "Négociation", count: 3, value: "185K MAD", color: "#EF4444" },
  { stage: "Conclu", count: 12, value: "945K MAD", color: "#10B981" },
];

export default function CRMPage() {
  const [selectedClient, setSelectedClient] = useState<typeof CLIENTS[0] | null>(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredClients = CLIENTS.filter((c) => {
    const matchSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.contact.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" || c.status.toLowerCase() === statusFilter.toLowerCase();
    return matchSearch && matchStatus;
  });

  return (
    <div style={{ padding: "28px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 24,
        }}
      >
        <div>
          <h1
            style={{
              fontFamily: "Space Grotesk, sans-serif",
              fontSize: "1.75rem",
              fontWeight: 800,
              marginBottom: 4,
              letterSpacing: "-0.02em",
            }}
          >
            CRM & Clients
          </h1>
          <p style={{ color: "rgba(148, 163, 184, 0.7)", fontSize: "0.875rem" }}>
            47 clients • Pipeline total: 1.5M MAD
          </p>
        </div>

        <button
          id="add-client-btn"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            padding: "10px 18px",
            background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
            border: "none",
            borderRadius: 10,
            color: "white",
            fontSize: "0.8rem",
            fontWeight: 700,
            cursor: "pointer",
            boxShadow: "0 4px 16px rgba(124, 58, 237, 0.4)",
          }}
        >
          <Plus size={15} />
          Nouveau Client
        </button>
      </div>

      {/* Pipeline */}
      <div
        style={{
          background: "rgba(15, 15, 30, 0.6)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          padding: "20px",
          marginBottom: 24,
        }}
      >
        <h3
          style={{
            fontFamily: "Space Grotesk, sans-serif",
            fontSize: "0.95rem",
            fontWeight: 700,
            marginBottom: 16,
          }}
        >
          Pipeline Commercial
        </h3>
        <div style={{ display: "flex", gap: 8, alignItems: "stretch" }}>
          {PIPELINE.map((p, i) => (
            <div
              key={i}
              style={{
                flex: 1,
                background: `${p.color}10`,
                border: `1px solid ${p.color}25`,
                borderRadius: 12,
                padding: "14px",
                cursor: "pointer",
                transition: "all 0.2s ease",
                position: "relative",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${p.color}18`;
                (e.currentTarget as HTMLElement).style.borderColor = `${p.color}45`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = `${p.color}10`;
                (e.currentTarget as HTMLElement).style.borderColor = `${p.color}25`;
              }}
            >
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "1.4rem",
                  fontWeight: 800,
                  color: p.color,
                  marginBottom: 2,
                }}
              >
                {p.count}
              </div>
              <div
                style={{ fontSize: "0.72rem", fontWeight: 700, color: p.color, marginBottom: 4 }}
              >
                {p.stage}
              </div>
              <div
                style={{ fontSize: "0.7rem", color: "rgba(148, 163, 184, 0.7)" }}
              >
                {p.value}
              </div>
              {i < PIPELINE.length - 1 && (
                <ChevronRight
                  size={16}
                  style={{
                    position: "absolute",
                    right: -14,
                    top: "50%",
                    transform: "translateY(-50%)",
                    color: "rgba(100, 116, 139, 0.4)",
                    zIndex: 1,
                  }}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Filters */}
      <div
        style={{
          display: "flex",
          gap: 12,
          marginBottom: 20,
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(255,255,255,0.04)",
            border: "1px solid rgba(255,255,255,0.08)",
            borderRadius: 10,
            padding: "0 14px",
            height: 38,
            flex: 1,
            maxWidth: 360,
          }}
        >
          <Search size={14} style={{ color: "rgba(100, 116, 139, 0.7)" }} />
          <input
            type="text"
            placeholder="Rechercher un client..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="client-search"
            style={{
              background: "transparent",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "0.85rem",
              flex: 1,
              fontFamily: "inherit",
            }}
          />
        </div>

        {["all", "Actif", "Prospect", "Inactif"].map((f) => (
          <button
            key={f}
            id={`filter-${f}`}
            onClick={() => setStatusFilter(f)}
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              border: statusFilter === f
                ? "1px solid rgba(139, 92, 246, 0.3)"
                : "1px solid rgba(255,255,255,0.07)",
              cursor: "pointer",
              fontSize: "0.8rem",
              fontWeight: 600,
              transition: "all 0.2s ease",
              background:
                statusFilter === f
                  ? "rgba(139, 92, 246, 0.2)"
                  : "rgba(255,255,255,0.04)",
              color:
                statusFilter === f
                  ? "rgb(167, 139, 250)"
                  : "rgba(148, 163, 184, 0.7)",
            }}
          >
            {f === "all" ? "Tous" : f}
          </button>
        ))}
      </div>

      {/* Client Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
          gap: 16,
        }}
      >
        {filteredClients.map((client) => (
          <div
            key={client.id}
            id={`client-card-${client.id}`}
            className="nexus-card"
            style={{ padding: 20, cursor: "pointer" }}
            onClick={() => setSelectedClient(client)}
          >
            {/* Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 14,
              }}
            >
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <div
                  className="avatar avatar-lg"
                  style={{ background: client.logoColor, borderRadius: 12 }}
                >
                  {client.logo}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 2 }}>
                    {client.name}
                  </div>
                  <div
                    style={{
                      fontSize: "0.75rem",
                      color: "rgba(148, 163, 184, 0.6)",
                    }}
                  >
                    {client.contact}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: client.statusColor,
                    background: `${client.statusColor}15`,
                    border: `1px solid ${client.statusColor}30`,
                    padding: "2px 8px",
                    borderRadius: 100,
                  }}
                >
                  {client.status}
                </span>
                <button
                  style={{
                    background: "transparent",
                    border: "none",
                    color: "rgba(100, 116, 139, 0.5)",
                    cursor: "pointer",
                  }}
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreHorizontal size={14} />
                </button>
              </div>
            </div>

            {/* Info */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 6,
                marginBottom: 14,
              }}
            >
              {[
                { icon: <Mail size={11} />, text: client.email },
                { icon: <Phone size={11} />, text: client.phone },
                { icon: <MapPin size={11} />, text: client.city },
                {
                  icon: <Building2 size={11} />,
                  text: `${client.projects} projet${client.projects > 1 ? "s" : ""}`,
                },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 5,
                    fontSize: "0.72rem",
                    color: "rgba(148, 163, 184, 0.6)",
                    overflow: "hidden",
                  }}
                >
                  <span style={{ color: "rgba(100, 116, 139, 0.6)", flexShrink: 0 }}>
                    {item.icon}
                  </span>
                  <span
                    style={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {item.text}
                  </span>
                </div>
              ))}
            </div>

            {/* Stage & Score */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                paddingTop: 12,
                borderTop: "1px solid rgba(255,255,255,0.05)",
              }}
            >
              <div>
                <span
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: client.stageColor,
                    background: `${client.stageColor}15`,
                    padding: "3px 10px",
                    borderRadius: 100,
                  }}
                >
                  {client.stage}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontSize: "0.7rem",
                      color: "rgba(100, 116, 139, 0.6)",
                      marginBottom: 1,
                    }}
                  >
                    Valeur
                  </div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 700, color: "white" }}>
                    {client.value}
                  </div>
                </div>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background:
                      client.score >= 80
                        ? "rgba(16, 185, 129, 0.15)"
                        : client.score >= 50
                        ? "rgba(245, 158, 11, 0.15)"
                        : "rgba(239, 68, 68, 0.15)",
                    border: `2px solid ${
                      client.score >= 80
                        ? "rgba(16, 185, 129, 0.4)"
                        : client.score >= 50
                        ? "rgba(245, 158, 11, 0.4)"
                        : "rgba(239, 68, 68, 0.4)"
                    }`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.7rem",
                    fontWeight: 800,
                    color:
                      client.score >= 80
                        ? "#10B981"
                        : client.score >= 50
                        ? "#F59E0B"
                        : "#EF4444",
                  }}
                >
                  {client.score}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Client Detail Modal */}
      {selectedClient && (
        <div
          className="modal-overlay"
          onClick={() => setSelectedClient(null)}
        >
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            style={{ maxWidth: 560 }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 24,
              }}
            >
              <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                <div
                  className="avatar avatar-lg"
                  style={{
                    background: selectedClient.logoColor,
                    borderRadius: 12,
                    width: 52,
                    height: 52,
                  }}
                >
                  {selectedClient.logo}
                </div>
                <div>
                  <h2
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "1.3rem",
                      fontWeight: 800,
                      marginBottom: 4,
                    }}
                  >
                    {selectedClient.name}
                  </h2>
                  <div style={{ display: "flex", gap: 8 }}>
                    {selectedClient.tags.map((t) => (
                      <span key={t} className="badge badge-violet">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
              <button
                onClick={() => setSelectedClient(null)}
                id="close-modal-btn"
                style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  width: 32,
                  height: 32,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  color: "rgba(148, 163, 184, 0.8)",
                }}
              >
                ✕
              </button>
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 24,
              }}
            >
              {[
                { label: "Contact", value: selectedClient.contact, icon: <Globe size={14} /> },
                { label: "Email", value: selectedClient.email, icon: <Mail size={14} /> },
                { label: "Téléphone", value: selectedClient.phone, icon: <Phone size={14} /> },
                { label: "Ville", value: selectedClient.city, icon: <MapPin size={14} /> },
                { label: "Valeur totale", value: selectedClient.value, icon: <TrendingUp size={14} /> },
                { label: "Dernier contact", value: selectedClient.lastContact, icon: <Clock size={14} /> },
              ].map((item, i) => (
                <div
                  key={i}
                  style={{
                    background: "rgba(0,0,0,0.2)",
                    border: "1px solid rgba(255,255,255,0.06)",
                    borderRadius: 10,
                    padding: "12px 14px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 6,
                      fontSize: "0.7rem",
                      color: "rgba(100, 116, 139, 0.7)",
                      marginBottom: 4,
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "white" }}>
                    {item.value}
                  </div>
                </div>
              ))}
            </div>

            {/* Score */}
            <div
              style={{
                background:
                  "linear-gradient(135deg, rgba(139, 92, 246, 0.1), rgba(6, 182, 212, 0.05))",
                border: "1px solid rgba(139, 92, 246, 0.2)",
                borderRadius: 12,
                padding: "16px",
                marginBottom: 20,
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  background:
                    selectedClient.score >= 80
                      ? "rgba(16, 185, 129, 0.15)"
                      : "rgba(245, 158, 11, 0.15)",
                  border: `2px solid ${selectedClient.score >= 80 ? "#10B981" : "#F59E0B"}`,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "1.1rem",
                  fontWeight: 800,
                  color: selectedClient.score >= 80 ? "#10B981" : "#F59E0B",
                  flexShrink: 0,
                }}
              >
                {selectedClient.score}
              </div>
              <div>
                <div style={{ fontWeight: 700, marginBottom: 4 }}>
                  Score de fidélité IA
                </div>
                <div style={{ fontSize: "0.8rem", color: "rgba(148, 163, 184, 0.7)" }}>
                  {selectedClient.score >= 80
                    ? "Client très satisfait — fort potentiel de renouvellement"
                    : selectedClient.score >= 50
                    ? "Client à entretenir — relancer dans 48h"
                    : "Client à risque — action immédiate requise"}
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                id="contact-client-btn"
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
                  border: "none",
                  borderRadius: 10,
                  color: "white",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Contacter
              </button>
              <button
                id="edit-client-btn"
                style={{
                  flex: 1,
                  padding: "12px",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 10,
                  color: "rgba(203, 213, 225, 0.8)",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Modifier
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
