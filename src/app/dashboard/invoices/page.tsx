"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  FileText,
  Send,
  Check,
  Clock,
  AlertTriangle,
  Download,
  Eye,
  Copy,
  Trash2,
  ChevronDown,
  Filter,
  TrendingUp,
  DollarSign,
} from "lucide-react";

const INVOICES = [
  {
    id: "INV-2024-089",
    client: "Bank Al-Maghrib Tech",
    clientLogo: "BM",
    clientColor: "linear-gradient(135deg, #0891B2, #1D4ED8)",
    amount: "58,500 MAD",
    amountNum: 58500,
    date: "10 Avr 2026",
    dueDate: "25 Avr 2026",
    status: "Payée",
    statusColor: "#10B981",
    items: 3,
    tva: "11,700 MAD",
    ht: "46,800 MAD",
  },
  {
    id: "INV-2024-088",
    client: "MarketPlus SA",
    clientLogo: "MP",
    clientColor: "linear-gradient(135deg, #7C3AED, #4F46E5)",
    amount: "32,000 MAD",
    amountNum: 32000,
    date: "5 Avr 2026",
    dueDate: "20 Avr 2026",
    status: "En attente",
    statusColor: "#F59E0B",
    items: 2,
    tva: "6,400 MAD",
    ht: "25,600 MAD",
  },
  {
    id: "INV-2024-087",
    client: "OCP Digital",
    clientLogo: "OC",
    clientColor: "linear-gradient(135deg, #059669, #0D9488)",
    amount: "45,200 MAD",
    amountNum: 45200,
    date: "1 Avr 2026",
    dueDate: "16 Avr 2026",
    status: "En attente",
    statusColor: "#F59E0B",
    items: 4,
    tva: "9,040 MAD",
    ht: "36,160 MAD",
  },
  {
    id: "INV-2024-086",
    client: "InnovaData Maroc",
    clientLogo: "ID",
    clientColor: "linear-gradient(135deg, #DC2626, #9333EA)",
    amount: "15,000 MAD",
    amountNum: 15000,
    date: "25 Mar 2026",
    dueDate: "9 Avr 2026",
    status: "En retard",
    statusColor: "#EF4444",
    items: 1,
    tva: "3,000 MAD",
    ht: "12,000 MAD",
  },
  {
    id: "INV-2024-085",
    client: "AlphaConsult SARL",
    clientLogo: "AC",
    clientColor: "linear-gradient(135deg, #D97706, #EA580C)",
    amount: "8,400 MAD",
    amountNum: 8400,
    date: "20 Mar 2026",
    dueDate: "4 Avr 2026",
    status: "Brouillon",
    statusColor: "#6B7280",
    items: 2,
    tva: "1,680 MAD",
    ht: "6,720 MAD",
  },
  {
    id: "INV-2024-084",
    client: "MarketPlus SA",
    clientLogo: "MP",
    clientColor: "linear-gradient(135deg, #7C3AED, #4F46E5)",
    amount: "121,000 MAD",
    amountNum: 121000,
    date: "1 Mar 2026",
    dueDate: "16 Mar 2026",
    status: "Payée",
    statusColor: "#10B981",
    items: 6,
    tva: "24,200 MAD",
    ht: "96,800 MAD",
  },
];

const STATUS_ICONS: Record<string, React.ReactNode> = {
  Payée: <Check size={12} />,
  "En attente": <Clock size={12} />,
  "En retard": <AlertTriangle size={12} />,
  Brouillon: <FileText size={12} />,
};

export default function InvoicesPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedInvoice, setSelectedInvoice] = useState<typeof INVOICES[0] | null>(null);

  const totalPaid = INVOICES.filter((i) => i.status === "Payée").reduce(
    (acc, i) => acc + i.amountNum,
    0
  );
  const totalPending = INVOICES.filter(
    (i) => i.status === "En attente" || i.status === "En retard"
  ).reduce((acc, i) => acc + i.amountNum, 0);
  const totalOverdue = INVOICES.filter((i) => i.status === "En retard").reduce(
    (acc, i) => acc + i.amountNum,
    0
  );

  const filtered = INVOICES.filter((inv) => {
    const matchSearch =
      inv.client.toLowerCase().includes(search.toLowerCase()) ||
      inv.id.toLowerCase().includes(search.toLowerCase());
    const matchStatus =
      statusFilter === "all" || inv.status.toLowerCase() === statusFilter.toLowerCase();
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
            Facturation
          </h1>
          <p style={{ color: "rgba(148, 163, 184, 0.7)", fontSize: "0.875rem" }}>
            Facturation conforme TVA Maroc (20%) • Multi-devises MAD/EUR/USD
          </p>
        </div>

        <button
          id="create-invoice-btn"
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
          Créer une facture
        </button>
      </div>

      {/* Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          {
            label: "Encaissé ce mois",
            value: `${totalPaid.toLocaleString("fr-MA")} MAD`,
            icon: <DollarSign size={18} />,
            color: "#10B981",
            bg: "rgba(16, 185, 129, 0.1)",
          },
          {
            label: "En attente",
            value: `${totalPending.toLocaleString("fr-MA")} MAD`,
            icon: <Clock size={18} />,
            color: "#F59E0B",
            bg: "rgba(245, 158, 11, 0.1)",
          },
          {
            label: "En retard",
            value: `${totalOverdue.toLocaleString("fr-MA")} MAD`,
            icon: <AlertTriangle size={18} />,
            color: "#EF4444",
            bg: "rgba(239, 68, 68, 0.1)",
          },
          {
            label: "Taux recouvrement",
            value: "86%",
            icon: <TrendingUp size={18} />,
            color: "#8B5CF6",
            bg: "rgba(139, 92, 246, 0.1)",
          },
        ].map((stat, i) => (
          <div
            key={i}
            style={{
              background: "rgba(15, 15, 30, 0.7)",
              border: `1px solid ${stat.color}20`,
              borderRadius: 14,
              padding: "18px 20px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 8,
              }}
            >
              <span
                style={{
                  fontSize: "0.75rem",
                  color: "rgba(148, 163, 184, 0.6)",
                  fontWeight: 600,
                }}
              >
                {stat.label}
              </span>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: 8,
                  background: stat.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: stat.color,
                }}
              >
                {stat.icon}
              </div>
            </div>
            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "1.4rem",
                fontWeight: 800,
                color: "white",
              }}
            >
              {stat.value}
            </div>
          </div>
        ))}
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
            placeholder="Rechercher une facture..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            id="invoice-search"
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

        {["all", "Payée", "En attente", "En retard", "Brouillon"].map((f) => (
          <button
            key={f}
            id={`invoice-filter-${f.replace(" ", "-")}`}
            onClick={() => setStatusFilter(f)}
            style={{
              padding: "7px 12px",
              borderRadius: 8,
              border: statusFilter === f
                ? "1px solid rgba(139, 92, 246, 0.3)"
                : "1px solid rgba(255,255,255,0.07)",
              cursor: "pointer",
              fontSize: "0.78rem",
              fontWeight: 600,
              transition: "all 0.2s ease",
              background: statusFilter === f ? "rgba(139, 92, 246, 0.2)" : "rgba(255,255,255,0.04)",
              color: statusFilter === f ? "rgb(167, 139, 250)" : "rgba(148, 163, 184, 0.7)",
              whiteSpace: "nowrap",
            }}
          >
            {f === "all" ? "Toutes" : f}
          </button>
        ))}
      </div>

      {/* Invoice Table */}
      <div
        style={{
          background: "rgba(15, 15, 30, 0.6)",
          border: "1px solid rgba(255,255,255,0.06)",
          borderRadius: 16,
          overflow: "hidden",
        }}
      >
        <table className="nexus-table">
          <thead>
            <tr>
              <th>N° Facture</th>
              <th>Client</th>
              <th>Date</th>
              <th>Échéance</th>
              <th>Montant TTC</th>
              <th>TVA (20%)</th>
              <th>Statut</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((inv, i) => (
              <tr key={inv.id} id={`invoice-row-${inv.id}`}>
                <td>
                  <span
                    style={{
                      fontFamily: "monospace",
                      fontSize: "0.85rem",
                      fontWeight: 700,
                      color: "rgb(167, 139, 250)",
                    }}
                  >
                    {inv.id}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      className="avatar avatar-sm"
                      style={{
                        background: inv.clientColor,
                        borderRadius: 6,
                        fontSize: "0.6rem",
                      }}
                    >
                      {inv.clientLogo}
                    </div>
                    <span style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                      {inv.client}
                    </span>
                  </div>
                </td>
                <td>
                  <span style={{ fontSize: "0.8rem", color: "rgba(148, 163, 184, 0.7)" }}>
                    {inv.date}
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      fontSize: "0.8rem",
                      color:
                        inv.status === "En retard"
                          ? "#EF4444"
                          : "rgba(148, 163, 184, 0.7)",
                      fontWeight: inv.status === "En retard" ? 700 : 400,
                    }}
                  >
                    {inv.dueDate}
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      fontFamily: "Space Grotesk, sans-serif",
                      fontSize: "0.9rem",
                      fontWeight: 800,
                      color: "white",
                    }}
                  >
                    {inv.amount}
                  </span>
                </td>
                <td>
                  <span style={{ fontSize: "0.8rem", color: "rgba(148, 163, 184, 0.6)" }}>
                    {inv.tva}
                  </span>
                </td>
                <td>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 4,
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      color: inv.statusColor,
                      background: `${inv.statusColor}15`,
                      border: `1px solid ${inv.statusColor}30`,
                      padding: "3px 10px",
                      borderRadius: 100,
                    }}
                  >
                    {STATUS_ICONS[inv.status]}
                    {inv.status}
                  </span>
                </td>
                <td>
                  <div style={{ display: "flex", gap: 6 }}>
                    {[
                      { icon: <Eye size={13} />, id: `view-${inv.id}`, tip: "Voir" },
                      { icon: <Download size={13} />, id: `dl-${inv.id}`, tip: "PDF" },
                      { icon: <Send size={13} />, id: `send-${inv.id}`, tip: "Envoyer" },
                    ].map((action) => (
                      <button
                        key={action.id}
                        id={action.id}
                        onClick={() => setSelectedInvoice(inv)}
                        style={{
                          width: 28,
                          height: 28,
                          borderRadius: 7,
                          background: "rgba(255,255,255,0.05)",
                          border: "1px solid rgba(255,255,255,0.08)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                          color: "rgba(148, 163, 184, 0.7)",
                          transition: "all 0.15s ease",
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(139, 92, 246, 0.15)";
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(139, 92, 246, 0.3)";
                          (e.currentTarget as HTMLElement).style.color = "rgb(167, 139, 250)";
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)";
                          (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.08)";
                          (e.currentTarget as HTMLElement).style.color = "rgba(148, 163, 184, 0.7)";
                        }}
                      >
                        {action.icon}
                      </button>
                    ))}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Invoice Detail Modal */}
      {selectedInvoice && (
        <div className="modal-overlay" onClick={() => setSelectedInvoice(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            id="invoice-modal"
          >
            {/* Invoice header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                marginBottom: 24,
              }}
            >
              <div>
                <div
                  style={{
                    fontSize: "0.7rem",
                    fontWeight: 700,
                    color: "rgba(148, 163, 184, 0.5)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 4,
                  }}
                >
                  Facture
                </div>
                <h2
                  style={{
                    fontFamily: "Space Grotesk, sans-serif",
                    fontSize: "1.5rem",
                    fontWeight: 800,
                    color: "rgb(167, 139, 250)",
                  }}
                >
                  {selectedInvoice.id}
                </h2>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <span
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: 700,
                    color: selectedInvoice.statusColor,
                    background: `${selectedInvoice.statusColor}15`,
                    border: `1px solid ${selectedInvoice.statusColor}30`,
                    padding: "4px 12px",
                    borderRadius: 100,
                  }}
                >
                  {selectedInvoice.status}
                </span>
                <button
                  onClick={() => setSelectedInvoice(null)}
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
            </div>

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 16,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "rgba(100, 116, 139, 0.7)",
                    marginBottom: 8,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  De
                </div>
                <div style={{ fontWeight: 700 }}>NexusOS SARL</div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(148, 163, 184, 0.7)",
                    marginTop: 4,
                  }}
                >
                  Route des Zaërs, Rabat
                  <br />
                  ICE: 000123456789000
                  <br />
                  IF: 12345678
                </div>
              </div>
              <div
                style={{
                  background: "rgba(0,0,0,0.2)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: 12,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    fontSize: "0.7rem",
                    color: "rgba(100, 116, 139, 0.7)",
                    marginBottom: 8,
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                  }}
                >
                  Facturé à
                </div>
                <div style={{ fontWeight: 700 }}>{selectedInvoice.client}</div>
                <div
                  style={{
                    fontSize: "0.8rem",
                    color: "rgba(148, 163, 184, 0.7)",
                    marginTop: 4,
                  }}
                >
                  Date: {selectedInvoice.date}
                  <br />
                  Échéance: {selectedInvoice.dueDate}
                </div>
              </div>
            </div>

            {/* Amount breakdown */}
            <div
              style={{
                background: "rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 12,
                overflow: "hidden",
                marginBottom: 20,
              }}
            >
              <div
                style={{
                  padding: "12px 16px",
                  borderBottom: "1px solid rgba(255,255,255,0.05)",
                  display: "grid",
                  gridTemplateColumns: "2fr 1fr 1fr",
                  gap: 10,
                }}
              >
                {["Description", "Quantité", "Montant HT"].map((h) => (
                  <span
                    key={h}
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: "rgba(100, 116, 139, 0.7)",
                      textTransform: "uppercase",
                    }}
                  >
                    {h}
                  </span>
                ))}
              </div>
              {["Développement backend", "Design UI/UX", "Tests & QA"].slice(0, selectedInvoice.items).map((item, i) => (
                <div
                  key={i}
                  style={{
                    padding: "12px 16px",
                    borderBottom: "1px solid rgba(255,255,255,0.04)",
                    display: "grid",
                    gridTemplateColumns: "2fr 1fr 1fr",
                    gap: 10,
                  }}
                >
                  <span style={{ fontSize: "0.85rem" }}>{item}</span>
                  <span style={{ fontSize: "0.85rem", color: "rgba(148, 163, 184, 0.7)" }}>1</span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    {(parseInt(selectedInvoice.ht.replace(/[^0-9]/g, "")) / selectedInvoice.items).toLocaleString("fr-MA")} MAD
                  </span>
                </div>
              ))}
              <div
                style={{
                  padding: "16px",
                  background: "rgba(139, 92, 246, 0.05)",
                }}
              >
                {[
                  { label: "Sous-total HT", value: selectedInvoice.ht },
                  { label: "TVA (20%)", value: selectedInvoice.tva },
                  { label: "Total TTC", value: selectedInvoice.amount, bold: true },
                ].map((line, i) => (
                  <div
                    key={i}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: i < 2 ? 8 : 0,
                      paddingTop: i === 2 ? 8 : 0,
                      borderTop: i === 2 ? "1px solid rgba(255,255,255,0.08)" : "none",
                    }}
                  >
                    <span
                      style={{
                        fontSize: "0.85rem",
                        color: line.bold ? "white" : "rgba(148, 163, 184, 0.7)",
                        fontWeight: line.bold ? 800 : 400,
                      }}
                    >
                      {line.label}
                    </span>
                    <span
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: line.bold ? 800 : 600,
                        color: line.bold ? "rgb(167, 139, 250)" : "rgba(226, 232, 240, 0.8)",
                        fontFamily: line.bold ? "Space Grotesk, sans-serif" : "inherit",
                      }}
                    >
                      {line.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                id="download-invoice-btn"
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <Download size={15} />
                Télécharger PDF
              </button>
              <button
                id="send-invoice-btn"
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
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 6,
                }}
              >
                <Send size={15} />
                Envoyer par email
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
