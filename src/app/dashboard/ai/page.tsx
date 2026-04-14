"use client";

import { useState, useRef, useEffect } from "react";
import {
  Send, Sparkles, Brain, User, Copy, ThumbsUp, ThumbsDown,
  RefreshCw, Zap, TrendingUp, FileText, Users, AlertTriangle,
  ChevronRight, Plus, MessageSquare, Settings, Download
} from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
  time: string;
  liked?: boolean | null;
};

const SUGGESTIONS = [
  { icon: <TrendingUp size={14} />, text: "Analyse mes revenus du mois d'Avril", color: "#8B5CF6" },
  { icon: <Users size={14} />, text: "Quels clients ont le plus fort potentiel de croissance ?", color: "#06B6D4" },
  { icon: <FileText size={14} />, text: "Génère un rapport exécutif de la semaine", color: "#10B981" },
  { icon: <AlertTriangle size={14} />, text: "Y a-t-il des projets à risque cette semaine ?", color: "#F59E0B" },
];

const CONVERSATION_HISTORY = [
  { id: 1, title: "Analyse revenus Avril 2026", time: "Aujourd'hui" },
  { id: 2, title: "Plan de recrutement Q2", time: "Hier" },
  { id: 3, title: "Stratégie clients premium", time: "22 Avr" },
  { id: 4, title: "Prévisions Mai 2026", time: "21 Avr" },
];

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    role: "assistant",
    content: `# Bonjour Youssef 👋

Je suis **NexusAI**, votre assistant d'intelligence artificielle intégré à NexusOS.

J'ai analysé vos données de ce matin. Voici ce que j'ai trouvé :

**📊 Points clés du jour :**
- Revenus d'Avril : **148,000 MAD** (+18% vs Mars)
- 3 factures en attente de paiement pour un total de **77,200 MAD**
- Le projet *App Mobile Banking* consomme 62% du budget avec 45% d'avancement ⚠️
- 2 nouveaux leads chauds dans votre CRM méritent une attention immédiate

**💡 Recommandation prioritaire :**
Contactez Bank Al-Maghrib Tech cette semaine — probabilité de renouvellement de 89% basée sur leur comportement de navigation.

Comment puis-je vous aider aujourd'hui ?`,
    time: "09:00",
  },
];

function formatContent(text: string) {
  return text
    .split("\n")
    .map((line, i) => {
      if (line.startsWith("# ")) return <h3 key={i} style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 800, marginBottom: 8, marginTop: i > 0 ? 12 : 0 }}>{line.slice(2)}</h3>;
      if (line.startsWith("## ")) return <h4 key={i} style={{ fontFamily: "var(--font-display)", fontSize: ".95rem", fontWeight: 700, marginBottom: 6, marginTop: 10 }}>{line.slice(3)}</h4>;
      if (line.startsWith("**") && line.endsWith("**")) return <p key={i} style={{ fontWeight: 700, color: "rgba(167,139,250,.95)", marginBottom: 6, fontSize: ".875rem" }}>{line.slice(2, -2)}</p>;
      if (line.startsWith("- ")) return (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start", marginBottom: 5 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#8B5CF6", marginTop: 7, flexShrink: 0 }} />
          <span style={{ fontSize: ".875rem", color: "rgba(203,213,225,.9)", lineHeight: 1.6 }} dangerouslySetInnerHTML={{ __html: line.slice(2).replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>").replace(/\*(.*?)\*/g, "<em style='color:#A78BFA'>$1</em>") }} />
        </div>
      );
      if (line === "") return <div key={i} style={{ height: 6 }} />;
      return (
        <p key={i} style={{ fontSize: ".875rem", color: "rgba(203,213,225,.9)", lineHeight: 1.7, marginBottom: 4 }}
          dangerouslySetInnerHTML={{ __html: line.replace(/\*\*(.*?)\*\*/g, "<strong style='color:white'>$1</strong>").replace(/\*(.*?)\*/g, "<em style='color:#A78BFA;font-style:italic'>$1</em>") }} />
      );
    });
}

const AI_RESPONSES = [
  `**Analyse des revenus d'Avril 2026 :**

Vos revenus ce mois atteignent **148,000 MAD**, soit une croissance de **+18%** par rapport à Mars (125,400 MAD).

**Décomposition par client :**
- Bank Al-Maghrib Tech : 58,500 MAD (39.5%)
- OCP Digital : 45,200 MAD (30.5%)
- MarketPlus SA : 32,000 MAD (21.6%)
- Autres : 12,300 MAD (8.4%)

**🔮 Prévision Mai 2026 :**
Basé sur votre pipeline actuel et les tendances observées, je prévois des revenus de **162,000 - 178,000 MAD** pour Mai, soit une croissance de +9 à +20%.

**Action recommandée :** Relancer InnovaData Maroc pour valider leur contrat avant le 20 Avril — cela pourrait ajouter 40,000+ MAD en Mai.`,
  `**Clients à fort potentiel de croissance :**

Après analyse de 47 clients et 12 variables comportementales, voici le classement IA :

**🥇 Bank Al-Maghrib Tech (Score: 98/100)**
Fréquence de connexion ↑ 340%, ouverture des emails 95%. Recommandation : proposer une extension de contrat annuel avec remise 15%.

**🥈 OCP Digital (Score: 87/100)**
Utilisent 4/8 modules. Potentiel d'upsell sur le module Analytics IA estimé à **+35,000 MAD/an**.

**🥉 MarketPlus SA (Score: 92/100)**
3 projets actifs, satisfaction 4.9/5. Idéal pour un témoignage vidéo et une étude de cas marketing.

**⚠️ À surveiller :** TechHub Agadir (Score: 30) — aucune connexion depuis 28 jours. Risque de churn estimé à 67%.`,
  `**Rapport exécutif — Semaine du 14 au 20 Avril 2026 :**

## 📊 Performance financière
- CA semaine : **47,200 MAD** (+22% vs S-1)
- Factures émises : 3 (Total: 105,700 MAD)
- Recouvrement : 1 facture payée (58,500 MAD)

## 🎯 Projets
- **12 projets actifs** — 3 dans les délais, 1 en retard (Banking App)
- Sprint velocity : 94% (excellent)
- Livraisons cette semaine : 5 features

## 👥 Équipe
- Présence : 4/5 (Karim en congé approuvé)
- Performance moyenne : 91%
- Satisfaction : 4.8/5

## 🚀 Prochaines actions prioritaires
1. Réunion client OCP Digital — Mercredi 17h
2. Relance InnovaData (3 tentatives sans réponse)
3. Recrutement : 1 développeur senior pour Q2

**Score de santé global :** 92/100 🟢`,
  `**Analyse des risques projets — Semaine actuelle :**

J'ai détecté **2 projets à risque immédiat** sur les 12 actifs :

## ⚠️ Risque Élevé — App Mobile Banking
- Budget consommé : **62%** pour **45%** d'avancement
- Dépassement prévu : +28,000 MAD si rythme actuel
- Cause principale : scope creep sur le module 2FA (+6 jours)
- **Action requise avant le 18 Avril**

Recommandation : organiser une réunion de cadrage avec le client pour réviser le périmètre ou négocier un avenant.

## 🟡 Risque Modéré — E-Commerce Platform
- Délai de livraison : 3 jours de retard accumulés
- Impact client : faible (contrat flexible)
- Résolution probable : équipe complète disponible lundi

## ✅ 10 projets en bonne santé
Aucune action requise pour les autres projets. Felicitations à l'équipe !`,
];

export default function AIAssistantPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [responseIdx, setResponseIdx] = useState(0);
  const [activeConv, setActiveConv] = useState(1);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const send = async (text?: string) => {
    const content = text || input;
    if (!content.trim() || loading) return;
    setInput("");

    const userMsg: Message = {
      id: messages.length + 1,
      role: "user",
      content,
      time: new Date().toLocaleTimeString("fr-MA", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages(prev => [...prev, userMsg]);
    setLoading(true);

    await new Promise(r => setTimeout(r, 1400 + Math.random() * 800));

    const aiMsg: Message = {
      id: messages.length + 2,
      role: "assistant",
      content: AI_RESPONSES[responseIdx % AI_RESPONSES.length],
      time: new Date().toLocaleTimeString("fr-MA", { hour: "2-digit", minute: "2-digit" }),
    };
    setResponseIdx(i => i + 1);
    setMessages(prev => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 62px)" }}>
      {/* ── LEFT: conversation history ── */}
      <div style={{
        width: 240, background: "rgba(6,6,16,.95)",
        borderRight: "1px solid rgba(255,255,255,.05)",
        display: "flex", flexDirection: "column",
        flexShrink: 0,
      }}>
        <div style={{ padding: "16px 14px 10px", borderBottom: "1px solid rgba(255,255,255,.05)" }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 8, width: "100%",
            background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
            border: "none", borderRadius: 10, padding: "10px 14px",
            color: "white", fontWeight: 700, fontSize: ".82rem", cursor: "pointer",
          }} id="new-chat-btn" onClick={() => { setMessages(INITIAL_MESSAGES); setActiveConv(0); }}>
            <Plus size={14} /> Nouvelle conversation
          </button>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "10px 8px" }}>
          <div className="section-label" style={{ padding: "0 6px", marginBottom: 8 }}>Récent</div>
          {CONVERSATION_HISTORY.map((conv) => (
            <div key={conv.id} id={`conv-${conv.id}`}
              onClick={() => setActiveConv(conv.id)}
              style={{
                padding: "9px 10px", borderRadius: 9, cursor: "pointer", marginBottom: 2,
                background: activeConv === conv.id ? "rgba(139,92,246,.15)" : "transparent",
                border: activeConv === conv.id ? "1px solid rgba(139,92,246,.25)" : "1px solid transparent",
                transition: "all .15s ease",
              }}
              onMouseEnter={e => { if (activeConv !== conv.id) (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.04)"; }}
              onMouseLeave={e => { if (activeConv !== conv.id) (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
                <MessageSquare size={13} style={{ color: "rgba(100,116,139,.6)", marginTop: 1, flexShrink: 0 }} />
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: ".78rem", fontWeight: 600, color: activeConv === conv.id ? "white" : "rgba(203,213,225,.7)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {conv.title}
                  </div>
                  <div style={{ fontSize: ".68rem", color: "rgba(71,85,105,.8)", marginTop: 2 }}>{conv.time}</div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Model info */}
        <div style={{ padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,.05)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
            <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#10B981", boxShadow: "0 0 6px rgba(16,185,129,.6)" }} />
            <span style={{ fontSize: ".7rem", fontWeight: 700, color: "#34D399" }}>NexusAI Active</span>
          </div>
          <div style={{ fontSize: ".65rem", color: "rgba(71,85,105,.7)" }}>Basé sur vos données temps réel</div>
        </div>
      </div>

      {/* ── CENTER: chat ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        {/* Chat header */}
        <div style={{
          height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "0 24px",
          background: "rgba(8,8,20,.7)",
          borderBottom: "1px solid rgba(255,255,255,.05)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{
              width: 34, height: 34, borderRadius: 10,
              background: "linear-gradient(135deg, #7C3AED, #4F46E5)",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: "0 0 14px rgba(124,58,237,.4)",
            }}>
              <Brain size={17} color="white" />
            </div>
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: ".95rem" }}>
                NexusAI <span style={{ fontSize: ".7rem", color: "rgba(139,92,246,.8)", fontWeight: 700 }}>v2.0</span>
              </div>
              <div style={{ fontSize: ".7rem", color: "rgba(100,116,139,.7)" }}>
                Analyse des données de TechFlow Rabat en temps réel
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-icon" id="export-chat-btn">
              <Download size={14} />
            </button>
            <button className="btn btn-icon">
              <Settings size={14} />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "24px", display: "flex", flexDirection: "column", gap: 24 }}>
          {messages.map((msg) => (
            <div key={msg.id} id={`msg-${msg.id}`} style={{
              display: "flex",
              gap: 14,
              flexDirection: msg.role === "user" ? "row-reverse" : "row",
              maxWidth: "88%",
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
            }}>
              {/* Avatar */}
              <div style={{ flexShrink: 0 }}>
                {msg.role === "assistant" ? (
                  <div style={{
                    width: 34, height: 34, borderRadius: 10,
                    background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    boxShadow: "0 0 12px rgba(124,58,237,.35)",
                  }}>
                    <Brain size={16} color="white" />
                  </div>
                ) : (
                  <div className="avatar" style={{ background: "linear-gradient(135deg,#7C3AED,#4F46E5)", width: 34, height: 34, borderRadius: 10, fontSize: ".7rem" }}>
                    YA
                  </div>
                )}
              </div>

              {/* Content */}
              <div style={{ minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                  <span style={{ fontWeight: 700, fontSize: ".8rem", color: msg.role === "assistant" ? "rgb(167,139,250)" : "rgba(203,213,225,.9)" }}>
                    {msg.role === "assistant" ? "NexusAI" : "Youssef Amrani"}
                  </span>
                  <span style={{ fontSize: ".7rem", color: "rgba(71,85,105,.7)" }}>{msg.time}</span>
                </div>

                <div className={msg.role === "user" ? "bubble-user" : "bubble-ai"}>
                  {msg.role === "assistant" ? formatContent(msg.content) : (
                    <p style={{ fontSize: ".875rem", color: "rgba(226,232,240,.95)", lineHeight: 1.6 }}>{msg.content}</p>
                  )}
                </div>

                {/* AI message actions */}
                {msg.role === "assistant" && msg.id > 0 && (
                  <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                    {[
                      { icon: <Copy size={11} />, label: "Copier" },
                      { icon: <ThumbsUp size={11} />, label: "Utile" },
                      { icon: <ThumbsDown size={11} />, label: "Pas utile" },
                      { icon: <RefreshCw size={11} />, label: "Régénérer" },
                    ].map((action) => (
                      <button key={action.label} style={{
                        display: "flex", alignItems: "center", gap: 4,
                        padding: "3px 8px", borderRadius: 6,
                        background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)",
                        color: "rgba(100,116,139,.7)", fontSize: ".68rem", cursor: "pointer",
                        transition: "all .15s",
                      }}
                        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(139,92,246,.1)"; (e.currentTarget as HTMLElement).style.color = "rgba(167,139,250,.9)"; }}
                        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.04)"; (e.currentTarget as HTMLElement).style.color = "rgba(100,116,139,.7)"; }}
                      >
                        {action.icon} {action.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {/* Loading */}
          {loading && (
            <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
              <div style={{
                width: 34, height: 34, borderRadius: 10,
                background: "linear-gradient(135deg,#7C3AED,#4F46E5)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Brain size={16} color="white" />
              </div>
              <div className="bubble-ai" style={{ display: "flex", alignItems: "center", gap: 6, padding: "14px 18px" }}>
                <span style={{ fontSize: ".82rem", color: "rgba(148,163,184,.7)" }}>NexusAI analyse vos données</span>
                {[0, 1, 2].map(i => (
                  <div key={i} style={{
                    width: 6, height: 6, borderRadius: "50%", background: "#8B5CF6",
                    animation: "pulse-ring .8s ease-in-out infinite",
                    animationDelay: `${i * 0.2}s`,
                  }} />
                ))}
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Suggestions */}
        {messages.length <= 1 && (
          <div style={{ padding: "0 24px 12px", display: "flex", gap: 8, flexWrap: "wrap" }}>
            {SUGGESTIONS.map((s, i) => (
              <button key={i} id={`suggestion-${i}`}
                onClick={() => send(s.text)}
                style={{
                  display: "flex", alignItems: "center", gap: 7,
                  padding: "8px 14px", borderRadius: 10,
                  background: "rgba(255,255,255,.04)", border: `1px solid rgba(255,255,255,.08)`,
                  color: "rgba(203,213,225,.85)", fontSize: ".8rem", cursor: "pointer",
                  transition: "all .2s ease",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = `${s.color}15`; (e.currentTarget as HTMLElement).style.borderColor = `${s.color}35`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,.04)"; (e.currentTarget as HTMLElement).style.borderColor = "rgba(255,255,255,.08)"; }}
              >
                <span style={{ color: s.color }}>{s.icon}</span>
                {s.text}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div style={{
          padding: "12px 24px 20px",
          borderTop: "1px solid rgba(255,255,255,.05)",
          background: "rgba(6,6,16,.6)",
        }}>
          <div style={{
            display: "flex", gap: 10, alignItems: "flex-end",
            background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.09)",
            borderRadius: 14, padding: "10px 12px",
            transition: "border-color .2s",
          }}
            onFocus={() => {}}
          >
            <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(139,92,246,.15)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
              <Sparkles size={13} color="#A78BFA" />
            </div>
            <textarea
              ref={inputRef}
              id="ai-chat-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
              placeholder="Posez une question sur vos données, demandez une analyse, un rapport..."
              rows={1}
              style={{
                flex: 1, background: "transparent", border: "none", outline: "none",
                color: "white", fontSize: ".875rem", fontFamily: "inherit",
                resize: "none", lineHeight: 1.6, maxHeight: 120, overflowY: "auto",
              }}
            />
            <button
              id="ai-send-btn"
              onClick={() => send()}
              disabled={!input.trim() || loading}
              style={{
                width: 36, height: 36, borderRadius: 10, border: "none",
                background: input.trim() && !loading ? "linear-gradient(135deg,#7C3AED,#4F46E5)" : "rgba(255,255,255,.06)",
                color: input.trim() && !loading ? "white" : "rgba(100,116,139,.4)",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: input.trim() && !loading ? "pointer" : "default",
                transition: "all .2s ease", flexShrink: 0,
                boxShadow: input.trim() && !loading ? "0 4px 14px rgba(124,58,237,.4)" : "none",
              }}
            >
              {loading ? <RefreshCw size={14} style={{ animation: "spin-slow 1s linear infinite" }} /> : <Send size={14} />}
            </button>
          </div>
          <p style={{ fontSize: ".68rem", color: "rgba(71,85,105,.6)", marginTop: 8, textAlign: "center" }}>
            NexusAI analyse vos données en temps réel. Les réponses sont générées à partir de votre historique NexusOS.
          </p>
        </div>
      </div>
    </div>
  );
}
