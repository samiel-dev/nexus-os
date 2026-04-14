"use client";

import { useState } from "react";
import {
  Users,
  Plus,
  Search,
  Star,
  Calendar,
  Clock,
  Award,
  TrendingUp,
  MoreHorizontal,
  CheckCircle2,
  AlertTriangle,
  Sun,
  Moon,
} from "lucide-react";

const EMPLOYEES = [
  {
    id: "e1",
    name: "Youssef Amrani",
    role: "CEO & Lead Developer",
    dept: "Direction",
    avatar: "YA",
    avatarColor: "linear-gradient(135deg, #7C3AED, #4F46E5)",
    email: "y.amrani@techflow.ma",
    phone: "+212 661 234 567",
    salary: "22,000 MAD",
    status: "Présent",
    statusColor: "#10B981",
    leave: 0,
    performance: 96,
    joinDate: "1 Jan 2022",
    tasks: 5,
    skills: ["React", "Node.js", "Leadership"],
    contract: "CDI",
  },
  {
    id: "e2",
    name: "Fatima Zahra Benali",
    role: "CTO & Tech Lead",
    dept: "Technique",
    avatar: "FZ",
    avatarColor: "linear-gradient(135deg, #0891B2, #1D4ED8)",
    email: "f.benali@techflow.ma",
    phone: "+212 655 345 678",
    salary: "20,000 MAD",
    status: "Présent",
    statusColor: "#10B981",
    leave: 2,
    performance: 98,
    joinDate: "15 Mar 2022",
    tasks: 8,
    skills: ["Architecture", "AWS", "DevOps"],
    contract: "CDI",
  },
  {
    id: "e3",
    name: "Karim Tazi",
    role: "Full Stack Developer",
    dept: "Technique",
    avatar: "KT",
    avatarColor: "linear-gradient(135deg, #059669, #0D9488)",
    email: "k.tazi@techflow.ma",
    phone: "+212 662 456 789",
    salary: "14,000 MAD",
    status: "En congé",
    statusColor: "#F59E0B",
    leave: 12,
    performance: 82,
    joinDate: "1 Jun 2023",
    tasks: 3,
    skills: ["Vue.js", "Python", "SQL"],
    contract: "CDI",
  },
  {
    id: "e4",
    name: "Amal Khoury",
    role: "UI/UX Designer",
    dept: "Design",
    avatar: "AK",
    avatarColor: "linear-gradient(135deg, #DC2626, #9333EA)",
    email: "a.khoury@techflow.ma",
    phone: "+212 661 567 890",
    salary: "12,000 MAD",
    status: "Présent",
    statusColor: "#10B981",
    leave: 5,
    performance: 90,
    joinDate: "10 Sep 2023",
    tasks: 6,
    skills: ["Figma", "Prototyping", "Research"],
    contract: "CDI",
  },
  {
    id: "e5",
    name: "Said Ouali",
    role: "DevOps Engineer",
    dept: "Infrastructure",
    avatar: "SO",
    avatarColor: "linear-gradient(135deg, #D97706, #EA580C)",
    email: "s.ouali@techflow.ma",
    phone: "+212 668 678 901",
    salary: "16,000 MAD",
    status: "Télétravail",
    statusColor: "#8B5CF6",
    leave: 3,
    performance: 88,
    joinDate: "20 Fév 2023",
    tasks: 2,
    skills: ["Docker", "Kubernetes", "CI/CD"],
    contract: "CDI",
  },
];

const LEAVE_REQUESTS = [
  {
    employee: "Karim Tazi",
    avatar: "KT",
    color: "linear-gradient(135deg, #059669, #0D9488)",
    type: "Congé annuel",
    from: "14 Avr",
    to: "25 Avr",
    days: 10,
    status: "Approuvé",
    statusColor: "#10B981",
  },
  {
    employee: "Amal Khoury",
    avatar: "AK",
    color: "linear-gradient(135deg, #DC2626, #9333EA)",
    type: "Congé maladie",
    from: "20 Avr",
    to: "22 Avr",
    days: 3,
    status: "En attente",
    statusColor: "#F59E0B",
  },
  {
    employee: "Said Ouali",
    avatar: "SO",
    color: "linear-gradient(135deg, #D97706, #EA580C)",
    type: "Télétravail",
    from: "15 Avr",
    to: "19 Avr",
    days: 5,
    status: "Approuvé",
    statusColor: "#10B981",
  },
];

export default function HRPage() {
  const [activeTab, setActiveTab] = useState<"employees" | "leaves" | "payroll">("employees");
  const [search, setSearch] = useState("");
  const [selectedEmployee, setSelectedEmployee] = useState<typeof EMPLOYEES[0] | null>(null);

  const filtered = EMPLOYEES.filter(
    (e) =>
      e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.role.toLowerCase().includes(search.toLowerCase())
  );

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
            Ressources Humaines
          </h1>
          <p style={{ color: "rgba(148, 163, 184, 0.7)", fontSize: "0.875rem" }}>
            Conforme au Code du Travail Marocain • 5 employés actifs
          </p>
        </div>
        <button
          id="add-employee-btn"
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
          Ajouter employé
        </button>
      </div>

      {/* HR Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 16,
          marginBottom: 24,
        }}
      >
        {[
          { label: "Effectif total", value: "5", icon: <Users size={18} />, color: "#8B5CF6", bg: "rgba(139, 92, 246, 0.1)" },
          { label: "Présents aujourd'hui", value: "4", icon: <CheckCircle2 size={18} />, color: "#10B981", bg: "rgba(16, 185, 129, 0.1)" },
          { label: "En congé", value: "1", icon: <Sun size={18} />, color: "#F59E0B", bg: "rgba(245, 158, 11, 0.1)" },
          { label: "Masse salariale", value: "84K MAD", icon: <TrendingUp size={18} />, color: "#06B6D4", bg: "rgba(6, 182, 212, 0.1)" },
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
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
              <span style={{ fontSize: "0.75rem", color: "rgba(148, 163, 184, 0.6)", fontWeight: 600 }}>
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
            <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "white" }}>
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div
        style={{
          display: "flex",
          gap: 4,
          marginBottom: 20,
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.07)",
          borderRadius: 12,
          padding: 4,
          width: "fit-content",
        }}
      >
        {[
          { id: "employees", label: "Employés" },
          { id: "leaves", label: "Congés" },
          { id: "payroll", label: "Fiches de paie" },
        ].map((tab) => (
          <button
            key={tab.id}
            id={`hr-tab-${tab.id}`}
            onClick={() => setActiveTab(tab.id as "employees" | "leaves" | "payroll")}
            style={{
              padding: "8px 20px",
              borderRadius: 9,
              border: "none",
              cursor: "pointer",
              fontSize: "0.85rem",
              fontWeight: 600,
              transition: "all 0.2s ease",
              background: activeTab === tab.id ? "rgba(139, 92, 246, 0.2)" : "transparent",
              color: activeTab === tab.id ? "rgb(167, 139, 250)" : "rgba(148, 163, 184, 0.7)",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Employees Tab */}
      {activeTab === "employees" && (
        <>
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
              maxWidth: 360,
              marginBottom: 20,
            }}
          >
            <Search size={14} style={{ color: "rgba(100, 116, 139, 0.7)" }} />
            <input
              type="text"
              placeholder="Rechercher un employé..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              id="employee-search"
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: 16,
            }}
          >
            {filtered.map((emp) => (
              <div
                key={emp.id}
                id={`emp-card-${emp.id}`}
                className="nexus-card"
                style={{ padding: 20, cursor: "pointer" }}
                onClick={() => setSelectedEmployee(emp)}
              >
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <div
                      className="avatar avatar-lg"
                      style={{ background: emp.avatarColor }}
                    >
                      {emp.avatar}
                    </div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: "0.95rem", marginBottom: 2 }}>
                        {emp.name}
                      </div>
                      <div style={{ fontSize: "0.75rem", color: "rgba(148, 163, 184, 0.6)" }}>
                        {emp.role}
                      </div>
                    </div>
                  </div>
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      color: emp.statusColor,
                      background: `${emp.statusColor}15`,
                      border: `1px solid ${emp.statusColor}30`,
                      padding: "2px 8px",
                      borderRadius: 100,
                      height: "fit-content",
                    }}
                  >
                    {emp.status}
                  </span>
                </div>

                <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
                  {emp.skills.map((skill) => (
                    <span
                      key={skill}
                      style={{
                        fontSize: "0.65rem",
                        fontWeight: 600,
                        padding: "2px 8px",
                        borderRadius: 6,
                        background: "rgba(139, 92, 246, 0.1)",
                        color: "rgba(167, 139, 250, 0.9)",
                        border: "1px solid rgba(139, 92, 246, 0.2)",
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>

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
                    <div style={{ fontSize: "0.65rem", color: "rgba(100, 116, 139, 0.6)", marginBottom: 2 }}>
                      Salaire
                    </div>
                    <div style={{ fontSize: "0.9rem", fontWeight: 800, color: "white" }}>
                      {emp.salary}
                    </div>
                  </div>

                  <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: "0.65rem", color: "rgba(100, 116, 139, 0.6)", marginBottom: 2 }}>
                      Performance
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Star
                        size={12}
                        style={{
                          color: emp.performance >= 90 ? "#F59E0B" : "rgba(100, 116, 139, 0.5)",
                          fill: emp.performance >= 90 ? "#F59E0B" : "none",
                        }}
                      />
                      <span
                        style={{
                          fontSize: "0.9rem",
                          fontWeight: 800,
                          color:
                            emp.performance >= 90
                              ? "#F59E0B"
                              : emp.performance >= 80
                              ? "#10B981"
                              : "#F59E0B",
                        }}
                      >
                        {emp.performance}%
                      </span>
                    </div>
                  </div>

                  <div style={{ textAlign: "right" }}>
                    <div style={{ fontSize: "0.65rem", color: "rgba(100, 116, 139, 0.6)", marginBottom: 2 }}>
                      Congés restants
                    </div>
                    <div
                      style={{
                        fontSize: "0.9rem",
                        fontWeight: 700,
                        color:
                          emp.leave > 10 ? "#10B981" : emp.leave > 0 ? "#F59E0B" : "#EF4444",
                      }}
                    >
                      {emp.leave}j
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Leaves Tab */}
      {activeTab === "leaves" && (
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
                <th>Employé</th>
                <th>Type</th>
                <th>Début</th>
                <th>Fin</th>
                <th>Durée</th>
                <th>Statut</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {LEAVE_REQUESTS.map((req, i) => (
                <tr key={i}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div
                        className="avatar avatar-sm"
                        style={{ background: req.color }}
                      >
                        {req.avatar}
                      </div>
                      <span style={{ fontWeight: 600 }}>{req.employee}</span>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.85rem", color: "rgba(148, 163, 184, 0.8)" }}>
                      {req.type}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.8rem", color: "rgba(148, 163, 184, 0.7)" }}>
                      {req.from}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.8rem", color: "rgba(148, 163, 184, 0.7)" }}>
                      {req.to}
                    </span>
                  </td>
                  <td>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "white" }}>
                      {req.days} jours
                    </span>
                  </td>
                  <td>
                    <span
                      style={{
                        fontSize: "0.75rem",
                        fontWeight: 700,
                        color: req.statusColor,
                        background: `${req.statusColor}15`,
                        border: `1px solid ${req.statusColor}30`,
                        padding: "3px 10px",
                        borderRadius: 100,
                      }}
                    >
                      {req.status}
                    </span>
                  </td>
                  <td>
                    {req.status === "En attente" ? (
                      <div style={{ display: "flex", gap: 6 }}>
                        <button
                          id={`approve-leave-${i}`}
                          style={{
                            padding: "4px 10px",
                            background: "rgba(16, 185, 129, 0.15)",
                            border: "1px solid rgba(16, 185, 129, 0.3)",
                            borderRadius: 6,
                            color: "#10B981",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          Approuver
                        </button>
                        <button
                          id={`reject-leave-${i}`}
                          style={{
                            padding: "4px 10px",
                            background: "rgba(239, 68, 68, 0.1)",
                            border: "1px solid rgba(239, 68, 68, 0.3)",
                            borderRadius: 6,
                            color: "#EF4444",
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            cursor: "pointer",
                          }}
                        >
                          Refuser
                        </button>
                      </div>
                    ) : (
                      <span style={{ fontSize: "0.75rem", color: "rgba(100, 116, 139, 0.5)" }}>
                        —
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Payroll Tab */}
      {activeTab === "payroll" && (
        <div>
          <div
            style={{
              background:
                "linear-gradient(135deg, rgba(30, 20, 60, 0.8), rgba(15, 10, 35, 0.8))",
              border: "1px solid rgba(139, 92, 246, 0.2)",
              borderRadius: 16,
              padding: 24,
              marginBottom: 20,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <div>
              <div style={{ fontSize: "0.8rem", color: "rgba(148, 163, 184, 0.6)", marginBottom: 6 }}>
                Masse salariale — Avril 2026
              </div>
              <div
                style={{
                  fontFamily: "Space Grotesk, sans-serif",
                  fontSize: "2.5rem",
                  fontWeight: 800,
                  color: "white",
                }}
              >
                84,000 MAD
              </div>
              <div style={{ fontSize: "0.8rem", color: "#10B981", marginTop: 4 }}>
                CNSS & IR inclus — Conforme DGI
              </div>
            </div>
            <button
              id="run-payroll-btn"
              style={{
                padding: "14px 24px",
                background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
                border: "none",
                borderRadius: 12,
                color: "white",
                fontWeight: 700,
                fontSize: "0.9rem",
                cursor: "pointer",
                boxShadow: "0 4px 16px rgba(124, 58, 237, 0.4)",
              }}
            >
              Générer les fiches de paie
            </button>
          </div>

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
                  <th>Employé</th>
                  <th>Salaire brut</th>
                  <th>CNSS (4.48%)</th>
                  <th>AMO (2.26%)</th>
                  <th>IR</th>
                  <th>Salaire net</th>
                  <th>Statut</th>
                </tr>
              </thead>
              <tbody>
                {EMPLOYEES.map((emp) => {
                  const gross = parseInt(emp.salary.replace(/[^0-9]/g, ""));
                  const cnss = Math.round(gross * 0.0448);
                  const amo = Math.round(gross * 0.0226);
                  const ir = Math.round(gross * 0.15);
                  const net = gross - cnss - amo - ir;
                  return (
                    <tr key={emp.id} id={`payroll-row-${emp.id}`}>
                      <td>
                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                          <div className="avatar avatar-sm" style={{ background: emp.avatarColor }}>
                            {emp.avatar}
                          </div>
                          <div>
                            <div style={{ fontWeight: 600 }}>{emp.name}</div>
                            <div style={{ fontSize: "0.7rem", color: "rgba(148, 163, 184, 0.5)" }}>
                              {emp.contract}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span style={{ fontWeight: 700 }}>{emp.salary}</span>
                      </td>
                      <td>
                        <span style={{ color: "rgba(148, 163, 184, 0.7)", fontSize: "0.85rem" }}>
                          {cnss.toLocaleString("fr-MA")} MAD
                        </span>
                      </td>
                      <td>
                        <span style={{ color: "rgba(148, 163, 184, 0.7)", fontSize: "0.85rem" }}>
                          {amo.toLocaleString("fr-MA")} MAD
                        </span>
                      </td>
                      <td>
                        <span style={{ color: "rgba(148, 163, 184, 0.7)", fontSize: "0.85rem" }}>
                          {ir.toLocaleString("fr-MA")} MAD
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            fontFamily: "Space Grotesk, sans-serif",
                            fontSize: "0.95rem",
                            fontWeight: 800,
                            color: "#10B981",
                          }}
                        >
                          {net.toLocaleString("fr-MA")} MAD
                        </span>
                      </td>
                      <td>
                        <span className="badge badge-green">Généré</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Employee Detail Modal */}
      {selectedEmployee && (
        <div className="modal-overlay" onClick={() => setSelectedEmployee(null)}>
          <div
            className="modal-content"
            onClick={(e) => e.stopPropagation()}
            id="employee-modal"
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 24 }}>
              <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
                <div
                  className="avatar"
                  style={{
                    background: selectedEmployee.avatarColor,
                    width: 56,
                    height: 56,
                    borderRadius: 14,
                    fontSize: "1rem",
                    fontWeight: 800,
                  }}
                >
                  {selectedEmployee.avatar}
                </div>
                <div>
                  <h2 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.25rem", fontWeight: 800, marginBottom: 4 }}>
                    {selectedEmployee.name}
                  </h2>
                  <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                    <span style={{ fontSize: "0.8rem", color: "rgba(148, 163, 184, 0.7)" }}>
                      {selectedEmployee.role}
                    </span>
                    <span style={{ color: "rgba(100, 116, 139, 0.5)" }}>•</span>
                    <span className="badge badge-violet">{selectedEmployee.dept}</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setSelectedEmployee(null)} style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(148, 163, 184, 0.8)" }}>✕</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Performance", value: `${selectedEmployee.performance}%`, color: selectedEmployee.performance >= 90 ? "#F59E0B" : "#10B981" },
                { label: "Congés restants", value: `${selectedEmployee.leave} jours`, color: "#06B6D4" },
                { label: "Tâches actives", value: `${selectedEmployee.tasks}`, color: "#8B5CF6" },
              ].map((m, i) => (
                <div key={i} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "14px 16px", textAlign: "center" }}>
                  <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.5rem", fontWeight: 800, color: m.color }}>{m.value}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(148, 163, 184, 0.6)", marginTop: 4 }}>{m.label}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
              {[
                { label: "Email", value: selectedEmployee.email },
                { label: "Téléphone", value: selectedEmployee.phone },
                { label: "Salaire", value: selectedEmployee.salary },
                { label: "Date d'embauche", value: selectedEmployee.joinDate },
              ].map((item, i) => (
                <div key={i} style={{ background: "rgba(0,0,0,0.2)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 10, padding: "12px 14px" }}>
                  <div style={{ fontSize: "0.7rem", color: "rgba(100, 116, 139, 0.6)", marginBottom: 3 }}>{item.label}</div>
                  <div style={{ fontSize: "0.85rem", fontWeight: 600, color: "white" }}>{item.value}</div>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 20 }}>
              {selectedEmployee.skills.map((skill) => (
                <span key={skill} style={{ fontSize: "0.75rem", fontWeight: 600, padding: "4px 12px", borderRadius: 8, background: "rgba(139, 92, 246, 0.12)", color: "rgba(167, 139, 250, 0.9)", border: "1px solid rgba(139, 92, 246, 0.25)" }}>
                  {skill}
                </span>
              ))}
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button id="edit-employee-btn" style={{ flex: 1, padding: "12px", background: "linear-gradient(135deg, #7C3AED, #4F46E5)", border: "none", borderRadius: 10, color: "white", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
                Modifier le profil
              </button>
              <button id="payslip-btn" style={{ flex: 1, padding: "12px", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 10, color: "rgba(203, 213, 225, 0.8)", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
                Fiche de paie
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
