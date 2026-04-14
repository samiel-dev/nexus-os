"use client";

import { useState } from "react";
import { Save, Bell, Lock, Globe, Palette, Users } from "lucide-react";

export default function SettingsPage() {
  const [notifications, setNotifications] = useState({ email: true, push: true, sms: false, weekly: true });
  const [language, setLanguage] = useState("fr");
  const [currency, setCurrency] = useState("MAD");

  return (
    <div style={{ padding: "28px" }}>
      <h1 style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1.75rem", fontWeight: 800, marginBottom: 4 }}>Paramètres</h1>
      <p style={{ color: "rgba(148, 163, 184, 0.7)", marginBottom: 28 }}>Configurez votre espace de travail NexusOS</p>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        {/* Profile */}
        <div style={{ background: "rgba(15, 15, 30, 0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}><Users size={18} style={{ color: "#8B5CF6" }} /> Profil</h3>
          {[
            { label: "Nom complet", value: "Youssef Amrani" },
            { label: "Email", value: "y.amrani@techflow.ma" },
            { label: "Entreprise", value: "TechFlow Rabat" },
            { label: "Téléphone", value: "+212 661 234 567" },
          ].map((field, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(148, 163, 184, 0.7)", display: "block", marginBottom: 6 }}>{field.label}</label>
              <input defaultValue={field.value} className="nexus-input" id={`setting-${field.label.toLowerCase().replace(" ", "-")}`} />
            </div>
          ))}
        </div>

        {/* Notifications */}
        <div style={{ background: "rgba(15, 15, 30, 0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}><Bell size={18} style={{ color: "#06B6D4" }} /> Notifications</h3>
          {[
            { key: "email", label: "Notifications email" },
            { key: "push", label: "Notifications push" },
            { key: "sms", label: "SMS pour factures" },
            { key: "weekly", label: "Rapport hebdomadaire" },
          ].map((notif) => (
            <div key={notif.key} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, padding: "12px 0", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
              <span style={{ fontSize: "0.875rem", color: "rgba(226, 232, 240, 0.8)" }}>{notif.label}</span>
              <button
                id={`toggle-${notif.key}`}
                onClick={() => setNotifications(prev => ({ ...prev, [notif.key]: !prev[notif.key as keyof typeof prev] }))}
                style={{
                  width: 44, height: 24, borderRadius: 100,
                  background: notifications[notif.key as keyof typeof notifications] ? "linear-gradient(135deg, #7C3AED, #4F46E5)" : "rgba(255,255,255,0.1)",
                  border: "none", cursor: "pointer", position: "relative", transition: "all 0.3s ease",
                }}
              >
                <div style={{
                  width: 18, height: 18, borderRadius: "50%", background: "white",
                  position: "absolute", top: 3, transition: "left 0.3s ease",
                  left: notifications[notif.key as keyof typeof notifications] ? 23 : 3,
                }} />
              </button>
            </div>
          ))}
        </div>

        {/* Regional */}
        <div style={{ background: "rgba(15, 15, 30, 0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}><Globe size={18} style={{ color: "#10B981" }} /> Région & Langue</h3>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(148, 163, 184, 0.7)", display: "block", marginBottom: 6 }}>Langue</label>
            <select id="setting-language" value={language} onChange={(e) => setLanguage(e.target.value)} className="nexus-input" style={{ cursor: "pointer" }}>
              <option value="fr">Français</option>
              <option value="ar">العربية</option>
              <option value="en">English</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(148, 163, 184, 0.7)", display: "block", marginBottom: 6 }}>Devise principale</label>
            <select id="setting-currency" value={currency} onChange={(e) => setCurrency(e.target.value)} className="nexus-input" style={{ cursor: "pointer" }}>
              <option value="MAD">MAD — Dirham Marocain</option>
              <option value="EUR">EUR — Euro</option>
              <option value="USD">USD — Dollar américain</option>
            </select>
          </div>
          <div style={{ marginBottom: 16 }}>
            <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(148, 163, 184, 0.7)", display: "block", marginBottom: 6 }}>Fuseau horaire</label>
            <select className="nexus-input" style={{ cursor: "pointer" }} id="setting-timezone">
              <option>Africa/Casablanca (GMT+1)</option>
              <option>Europe/Paris (GMT+2)</option>
            </select>
          </div>
        </div>

        {/* Security */}
        <div style={{ background: "rgba(15, 15, 30, 0.6)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: 16, padding: 24 }}>
          <h3 style={{ fontFamily: "Space Grotesk, sans-serif", fontWeight: 700, marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}><Lock size={18} style={{ color: "#F59E0B" }} /> Sécurité</h3>
          {[
            { label: "Mot de passe actuel", type: "password" },
            { label: "Nouveau mot de passe", type: "password" },
            { label: "Confirmer le mot de passe", type: "password" },
          ].map((field, i) => (
            <div key={i} style={{ marginBottom: 16 }}>
              <label style={{ fontSize: "0.75rem", fontWeight: 600, color: "rgba(148, 163, 184, 0.7)", display: "block", marginBottom: 6 }}>{field.label}</label>
              <input type={field.type} placeholder="••••••••" className="nexus-input" id={`setting-pwd-${i}`} />
            </div>
          ))}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: "0.875rem" }}>Authentification 2FA</div>
              <div style={{ fontSize: "0.75rem", color: "rgba(148, 163, 184, 0.6)" }}>Sécurité renforcée recommandée</div>
            </div>
            <span className="badge badge-green">Activé</span>
          </div>
        </div>
      </div>

      <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
        <button
          id="save-settings-btn"
          style={{
            display: "flex", alignItems: "center", gap: 6,
            padding: "12px 28px", background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
            border: "none", borderRadius: 12, color: "white", fontWeight: 700, cursor: "pointer",
            boxShadow: "0 4px 16px rgba(124, 58, 237, 0.4)",
          }}
        >
          <Save size={16} />
          Enregistrer les modifications
        </button>
      </div>
    </div>
  );
}
