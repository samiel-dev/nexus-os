"use client";

import { useState } from "react";
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Clock,
  User,
  MoreHorizontal,
  FolderKanban,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Zap,
  Flag,
} from "lucide-react";

const STATUSES = [
  { id: "backlog", label: "Backlog", color: "#64748B", count: 3 },
  { id: "todo", label: "À faire", color: "#F59E0B", count: 5 },
  { id: "inprogress", label: "En cours", color: "#8B5CF6", count: 4 },
  { id: "review", label: "En révision", color: "#06B6D4", count: 2 },
  { id: "done", label: "Terminé", color: "#10B981", count: 8 },
];

const TASKS: Record<string, Array<{
  id: string;
  title: string;
  project: string;
  priority: "high" | "medium" | "low";
  assignee: string;
  assigneeColor: string;
  dueDate: string;
  tags: string[];
  progress?: number;
}>> = {
  backlog: [
    {
      id: "t1",
      title: "Intégration API paiement CMI",
      project: "E-Commerce",
      priority: "high",
      assignee: "KT",
      assigneeColor: "#059669",
      dueDate: "20 Mai",
      tags: ["Backend", "API"],
      progress: 0,
    },
    {
      id: "t2",
      title: "Tests de charge & performance",
      project: "Banking App",
      priority: "medium",
      assignee: "SO",
      assigneeColor: "#D97706",
      dueDate: "15 Jun",
      tags: ["DevOps", "QA"],
    },
    {
      id: "t3",
      title: "Documentation API v2.0",
      project: "E-Commerce",
      priority: "low",
      assignee: "YA",
      assigneeColor: "#7C3AED",
      dueDate: "30 Jun",
      tags: ["Docs"],
    },
  ],
  todo: [
    {
      id: "t4",
      title: "Design système de notifications push",
      project: "Banking App",
      priority: "high",
      assignee: "AK",
      assigneeColor: "#DC2626",
      dueDate: "18 Mai",
      tags: ["UI/UX", "Mobile"],
      progress: 10,
    },
    {
      id: "t5",
      title: "Implémentation du module RH",
      project: "Système RH",
      priority: "high",
      assignee: "FZ",
      assigneeColor: "#0891B2",
      dueDate: "12 Avr",
      tags: ["Backend", "Frontend"],
      progress: 20,
    },
    {
      id: "t6",
      title: "Refactoring base de données",
      project: "E-Commerce",
      priority: "medium",
      assignee: "KT",
      assigneeColor: "#059669",
      dueDate: "25 Mai",
      tags: ["Database"],
    },
  ],
  inprogress: [
    {
      id: "t7",
      title: "Dashboard analytics en temps réel",
      project: "InnovaData",
      priority: "high",
      assignee: "YA",
      assigneeColor: "#7C3AED",
      dueDate: "15 Avr",
      tags: ["Frontend", "Charts"],
      progress: 65,
    },
    {
      id: "t8",
      title: "Module authentification 2FA",
      project: "Banking App",
      priority: "high",
      assignee: "FZ",
      assigneeColor: "#0891B2",
      dueDate: "10 Avr",
      tags: ["Security", "Backend"],
      progress: 80,
    },
    {
      id: "t9",
      title: "Optimisation des requêtes SQL",
      project: "E-Commerce",
      priority: "medium",
      assignee: "KT",
      assigneeColor: "#059669",
      dueDate: "20 Avr",
      tags: ["Performance"],
      progress: 45,
    },
  ],
  review: [
    {
      id: "t10",
      title: "Interface utilisateur catalogue produits",
      project: "E-Commerce",
      priority: "medium",
      assignee: "AK",
      assigneeColor: "#DC2626",
      dueDate: "8 Avr",
      tags: ["UI/UX"],
      progress: 95,
    },
    {
      id: "t11",
      title: "Tests unitaires module paiement",
      project: "E-Commerce",
      priority: "high",
      assignee: "SO",
      assigneeColor: "#D97706",
      dueDate: "9 Avr",
      tags: ["QA", "Testing"],
      progress: 90,
    },
  ],
  done: [
    {
      id: "t12",
      title: "Maquettes UI validées",
      project: "Banking App",
      priority: "high",
      assignee: "AK",
      assigneeColor: "#DC2626",
      dueDate: "1 Avr",
      tags: ["Design"],
      progress: 100,
    },
    {
      id: "t13",
      title: "Configuration environnement CI/CD",
      project: "E-Commerce",
      priority: "high",
      assignee: "SO",
      assigneeColor: "#D97706",
      dueDate: "28 Mar",
      tags: ["DevOps"],
      progress: 100,
    },
  ],
};

const PRIORITY_CONFIG = {
  high: { color: "#EF4444", label: "Haute", bg: "rgba(239, 68, 68, 0.1)" },
  medium: { color: "#F59E0B", label: "Moyenne", bg: "rgba(245, 158, 11, 0.1)" },
  low: { color: "#10B981", label: "Basse", bg: "rgba(16, 185, 129, 0.1)" },
};

export default function ProjectsPage() {
  const [view, setView] = useState<"kanban" | "list">("kanban");
  const [filter, setFilter] = useState("all");

  return (
    <div style={{ padding: "28px" }}>
      {/* Header */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
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
            Gestion de Projets
          </h1>
          <p style={{ color: "rgba(148, 163, 184, 0.7)", fontSize: "0.875rem" }}>
            12 projets actifs • 22 tâches en cours
          </p>
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          {/* View Toggle */}
          <div
            style={{
              display: "flex",
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 10,
              padding: 3,
            }}
          >
            {[
              { id: "kanban", label: "Kanban", icon: <FolderKanban size={14} /> },
              { id: "list", label: "Liste", icon: <Filter size={14} /> },
            ].map((v) => (
              <button
                key={v.id}
                id={`view-${v.id}`}
                onClick={() => setView(v.id as "kanban" | "list")}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 5,
                  padding: "7px 14px",
                  borderRadius: 8,
                  border: "none",
                  cursor: "pointer",
                  fontSize: "0.8rem",
                  fontWeight: 600,
                  transition: "all 0.2s ease",
                  background: view === v.id ? "rgba(139, 92, 246, 0.2)" : "transparent",
                  color: view === v.id ? "rgb(167, 139, 250)" : "rgba(148, 163, 184, 0.7)",
                }}
              >
                {v.icon}
                {v.label}
              </button>
            ))}
          </div>

          <button
            id="new-task-btn"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              padding: "10px 16px",
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
            Nouvelle tâche
          </button>
        </div>
      </div>

      {/* Project stats bar */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 12,
          marginBottom: 28,
        }}
      >
        {STATUSES.map((s) => (
          <div
            key={s.id}
            style={{
              background: "rgba(15, 15, 30, 0.7)",
              border: `1px solid ${s.color}20`,
              borderRadius: 12,
              padding: "14px 16px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = `${s.color}50`;
              (e.currentTarget as HTMLElement).style.background = `${s.color}08`;
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.borderColor = `${s.color}20`;
              (e.currentTarget as HTMLElement).style.background = "rgba(15, 15, 30, 0.7)";
            }}
          >
            <div
              style={{
                fontFamily: "Space Grotesk, sans-serif",
                fontSize: "1.5rem",
                fontWeight: 800,
                color: s.color,
                marginBottom: 2,
              }}
            >
              {s.count}
            </div>
            <div
              style={{
                fontSize: "0.75rem",
                color: "rgba(148, 163, 184, 0.7)",
              }}
            >
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {/* Kanban Board */}
      {view === "kanban" && (
        <div
          style={{
            display: "flex",
            gap: 16,
            overflowX: "auto",
            paddingBottom: 16,
          }}
        >
          {STATUSES.map((status) => (
            <div key={status.id} className="kanban-col">
              {/* Column header */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 14,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      background: status.color,
                      boxShadow: `0 0 6px ${status.color}60`,
                    }}
                  />
                  <span
                    style={{
                      fontWeight: 700,
                      fontSize: "0.85rem",
                      color: "rgba(226, 232, 240, 0.9)",
                    }}
                  >
                    {status.label}
                  </span>
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 6,
                  }}
                >
                  <span
                    style={{
                      fontSize: "0.7rem",
                      fontWeight: 700,
                      padding: "1px 8px",
                      borderRadius: 100,
                      background: `${status.color}18`,
                      color: status.color,
                      border: `1px solid ${status.color}30`,
                    }}
                  >
                    {TASKS[status.id]?.length || 0}
                  </span>
                  <button
                    style={{
                      background: "transparent",
                      border: "none",
                      color: "rgba(148, 163, 184, 0.4)",
                      cursor: "pointer",
                      padding: 2,
                      display: "flex",
                    }}
                  >
                    <Plus size={14} />
                  </button>
                </div>
              </div>

              {/* Tasks */}
              {(TASKS[status.id] || []).map((task) => (
                <div key={task.id} className="kanban-card" id={`task-${task.id}`}>
                  {/* Priority & Project */}
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
                        fontSize: "0.65rem",
                        fontWeight: 700,
                        color: PRIORITY_CONFIG[task.priority].color,
                        background: PRIORITY_CONFIG[task.priority].bg,
                        padding: "2px 7px",
                        borderRadius: 100,
                        display: "flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <Flag size={9} />
                      {PRIORITY_CONFIG[task.priority].label}
                    </span>
                    <button
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "rgba(100, 116, 139, 0.5)",
                        cursor: "pointer",
                        padding: 2,
                        display: "flex",
                      }}
                    >
                      <MoreHorizontal size={14} />
                    </button>
                  </div>

                  {/* Title */}
                  <div
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: 600,
                      color: "rgba(226, 232, 240, 0.95)",
                      marginBottom: 8,
                      lineHeight: 1.4,
                    }}
                  >
                    {task.title}
                  </div>

                  {/* Tags */}
                  <div
                    style={{ display: "flex", flexWrap: "wrap", gap: 4, marginBottom: 10 }}
                  >
                    {task.tags.map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: "0.6rem",
                          fontWeight: 600,
                          padding: "2px 7px",
                          borderRadius: 4,
                          background: "rgba(255,255,255,0.06)",
                          color: "rgba(148, 163, 184, 0.8)",
                          border: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Progress */}
                  {task.progress !== undefined && task.progress > 0 && (
                    <div style={{ marginBottom: 10 }}>
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{
                            width: `${task.progress}%`,
                            background:
                              task.progress === 100
                                ? "linear-gradient(to right, #10B981, #059669)"
                                : "linear-gradient(to right, #8B5CF6, #4F46E5)",
                          }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Footer */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 4,
                        fontSize: "0.7rem",
                        color: "rgba(100, 116, 139, 0.7)",
                      }}
                    >
                      <Calendar size={11} />
                      {task.dueDate}
                    </div>
                    <div
                      className="avatar avatar-sm"
                      style={{
                        background: `linear-gradient(135deg, ${task.assigneeColor}, ${task.assigneeColor}88)`,
                        fontSize: "0.6rem",
                      }}
                    >
                      {task.assignee}
                    </div>
                  </div>
                </div>
              ))}

              {/* Add task button */}
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  width: "100%",
                  padding: "8px 10px",
                  background: "transparent",
                  border: "1px dashed rgba(255,255,255,0.1)",
                  borderRadius: 8,
                  color: "rgba(100, 116, 139, 0.6)",
                  fontSize: "0.8rem",
                  cursor: "pointer",
                  marginTop: 8,
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(139, 92, 246, 0.4)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(167, 139, 250, 0.8)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,0.1)";
                  (e.currentTarget as HTMLElement).style.color = "rgba(100, 116, 139, 0.6)";
                }}
              >
                <Plus size={13} />
                Ajouter une tâche
              </button>
            </div>
          ))}
        </div>
      )}

      {/* List view */}
      {view === "list" && (
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
                <th>Tâche</th>
                <th>Projet</th>
                <th>Priorité</th>
                <th>Statut</th>
                <th>Assigné</th>
                <th>Deadline</th>
                <th>Progression</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(TASKS).flatMap(([statusId, tasks]) =>
                tasks.map((task) => {
                  const status = STATUSES.find((s) => s.id === statusId)!;
                  return (
                    <tr key={task.id} id={`list-task-${task.id}`}>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>
                          {task.title}
                        </div>
                        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
                          {task.tags.map((t) => (
                            <span
                              key={t}
                              style={{
                                fontSize: "0.6rem",
                                padding: "1px 6px",
                                borderRadius: 4,
                                background: "rgba(255,255,255,0.05)",
                                color: "rgba(148, 163, 184, 0.7)",
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <span style={{ fontSize: "0.8rem", color: "rgba(148, 163, 184, 0.8)" }}>
                          {task.project}
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: PRIORITY_CONFIG[task.priority].color,
                            background: PRIORITY_CONFIG[task.priority].bg,
                            padding: "3px 10px",
                            borderRadius: 100,
                          }}
                        >
                          {PRIORITY_CONFIG[task.priority].label}
                        </span>
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            color: status.color,
                            background: `${status.color}15`,
                            padding: "3px 10px",
                            borderRadius: 100,
                          }}
                        >
                          {status.label}
                        </span>
                      </td>
                      <td>
                        <div
                          className="avatar avatar-sm"
                          style={{
                            background: `linear-gradient(135deg, ${task.assigneeColor}, ${task.assigneeColor}88)`,
                            fontSize: "0.6rem",
                          }}
                        >
                          {task.assignee}
                        </div>
                      </td>
                      <td>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "rgba(148, 163, 184, 0.7)",
                            display: "flex",
                            alignItems: "center",
                            gap: 4,
                          }}
                        >
                          <Calendar size={12} />
                          {task.dueDate}
                        </span>
                      </td>
                      <td>
                        {task.progress !== undefined ? (
                          <div
                            style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 100 }}
                          >
                            <div className="progress-bar" style={{ flex: 1 }}>
                              <div
                                className="progress-fill"
                                style={{
                                  width: `${task.progress}%`,
                                  background:
                                    task.progress === 100
                                      ? "linear-gradient(to right, #10B981, #059669)"
                                      : "linear-gradient(to right, #8B5CF6, #4F46E5)",
                                }}
                              />
                            </div>
                            <span style={{ fontSize: "0.7rem", color: "rgba(148, 163, 184, 0.6)" }}>
                              {task.progress}%
                            </span>
                          </div>
                        ) : (
                          <span style={{ color: "rgba(100, 116, 139, 0.5)", fontSize: "0.8rem" }}>
                            —
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
