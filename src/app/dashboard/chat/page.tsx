"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Search, Phone, Video, MoreHorizontal, Paperclip, Smile, Hash, Plus } from "lucide-react";

const CHANNELS = [
  { id: "general", name: "général", unread: 0 },
  { id: "tech", name: "technique", unread: 3 },
  { id: "design", name: "design", unread: 1 },
  { id: "finance", name: "finances", unread: 0 },
  { id: "random", name: "random", unread: 2 },
];

const CONTACTS = [
  { id: "fz", name: "Fatima Zahra", avatar: "FZ", color: "linear-gradient(135deg, #0891B2, #1D4ED8)", status: "online", lastMsg: "Le sprint 3 est prêt ✅" },
  { id: "kt", name: "Karim Tazi", avatar: "KT", color: "linear-gradient(135deg, #059669, #0D9488)", status: "away", lastMsg: "Je termine le refactoring" },
  { id: "ak", name: "Amal Khoury", avatar: "AK", color: "linear-gradient(135deg, #DC2626, #9333EA)", status: "online", lastMsg: "Maquettes finalisées 🎨" },
  { id: "so", name: "Said Ouali", avatar: "SO", color: "linear-gradient(135deg, #D97706, #EA580C)", status: "offline", lastMsg: "Pipeline configuré" },
];

const MESSAGES = [
  { id: 1, author: "Fatima Zahra", avatar: "FZ", color: "linear-gradient(135deg, #0891B2, #1D4ED8)", content: "Bonjour l'équipe! Le sprint 3 de l'App Mobile est terminé. Toutes les fonctionnalités 2FA sont validées ✅", time: "09:14", mine: false },
  { id: 2, author: "Karim Tazi", avatar: "KT", color: "linear-gradient(135deg, #059669, #0D9488)", content: "Super boulot Fatima! Le refactoring de la base E-Commerce est lui aussi terminé. Gain de performance: +40%", time: "09:22", mine: false },
  { id: 3, author: "Youssef Amrani", avatar: "YA", color: "linear-gradient(135deg, #7C3AED, #4F46E5)", content: "Excellent résultats équipe 💪 On est en avance sur le calendrier d'Avril. Nouveau client confirmé: InnovaData commence la semaine prochaine!", time: "09:35", mine: true },
  { id: 4, author: "Amal Khoury", avatar: "AK", color: "linear-gradient(135deg, #DC2626, #9333EA)", content: "Les maquettes du nouveau dashboard InnovaData sont prêtes. Je partage un lien Figma dans 5 minutes 🎨", time: "09:41", mine: false },
  { id: 5, author: "Said Ouali", avatar: "SO", color: "linear-gradient(135deg, #D97706, #EA580C)", content: "Le pipeline CI/CD E-Commerce est maintenant entièrement automatisé. Déploiement en < 2 minutes 🚀", time: "09:52", mine: false },
  { id: 6, author: "Youssef Amrani", avatar: "YA", color: "linear-gradient(135deg, #7C3AED, #4F46E5)", content: "Parfait! Réunion hebdo à 14h aujourd'hui. Préparez vos mises à jour de sprint. L'appel avec Bank Al-Maghrib est confirmé à 11h.", time: "10:05", mine: true },
];

export default function ChatPage() {
  const [activeChannel, setActiveChannel] = useState("general");
  const [activeContact, setActiveContact] = useState(CONTACTS[0]);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(MESSAGES);
  const [chatMode, setChatMode] = useState<"channel" | "dm">("channel");
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([
      ...messages,
      {
        id: messages.length + 1,
        author: "Youssef Amrani",
        avatar: "YA",
        color: "linear-gradient(135deg, #7C3AED, #4F46E5)",
        content: message,
        time: new Date().toLocaleTimeString("fr-MA", { hour: "2-digit", minute: "2-digit" }),
        mine: true,
      },
    ]);
    setMessage("");
  };

  return (
    <div style={{ display: "flex", height: "calc(100vh - 64px)" }}>
      {/* Sidebar */}
      <div style={{ width: 260, background: "rgba(10, 10, 24, 0.95)", borderRight: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column" }}>
        <div style={{ padding: "16px 14px 12px", borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontFamily: "Space Grotesk, sans-serif", fontSize: "1rem", fontWeight: 700, marginBottom: 12 }}>
            Chat d&apos;équipe
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", borderRadius: 8, padding: "7px 12px" }}>
            <Search size={13} style={{ color: "rgba(100, 116, 139, 0.7)" }} />
            <input placeholder="Rechercher..." id="chat-search" style={{ background: "transparent", border: "none", outline: "none", color: "white", fontSize: "0.8rem", flex: 1, fontFamily: "inherit" }} />
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "12px 8px" }}>
          <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(71, 85, 105, 0.8)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "0 8px", marginBottom: 6 }}>
            Canaux
          </div>
          {CHANNELS.map((ch) => (
            <button
              key={ch.id}
              id={`channel-${ch.id}`}
              onClick={() => { setActiveChannel(ch.id); setChatMode("channel"); }}
              style={{
                display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%",
                padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer",
                background: chatMode === "channel" && activeChannel === ch.id ? "rgba(139, 92, 246, 0.15)" : "transparent",
                color: chatMode === "channel" && activeChannel === ch.id ? "white" : "rgba(148, 163, 184, 0.7)",
                marginBottom: 2, transition: "all 0.15s ease",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: "0.85rem" }}>
                <Hash size={13} style={{ opacity: 0.6 }} />
                {ch.name}
              </div>
              {ch.unread > 0 && (
                <span style={{ fontSize: "0.65rem", fontWeight: 800, background: "#8B5CF6", color: "white", borderRadius: 100, padding: "1px 6px", minWidth: 18, textAlign: "center" }}>
                  {ch.unread}
                </span>
              )}
            </button>
          ))}

          <div style={{ fontSize: "0.65rem", fontWeight: 700, color: "rgba(71, 85, 105, 0.8)", textTransform: "uppercase", letterSpacing: "0.08em", padding: "12px 8px 6px", marginTop: 8 }}>
            Messages directs
          </div>
          {CONTACTS.map((contact) => (
            <button
              key={contact.id}
              id={`dm-${contact.id}`}
              onClick={() => { setActiveContact(contact); setChatMode("dm"); }}
              style={{
                display: "flex", alignItems: "center", gap: 10, width: "100%",
                padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer",
                background: chatMode === "dm" && activeContact.id === contact.id ? "rgba(139, 92, 246, 0.15)" : "transparent",
                marginBottom: 2, transition: "all 0.15s ease",
              }}
            >
              <div style={{ position: "relative", flexShrink: 0 }}>
                <div className="avatar avatar-sm" style={{ background: contact.color }}>
                  {contact.avatar}
                </div>
                <div style={{
                  position: "absolute", bottom: 0, right: 0, width: 8, height: 8, borderRadius: "50%",
                  background: contact.status === "online" ? "#10B981" : contact.status === "away" ? "#F59E0B" : "#6B7280",
                  border: "1.5px solid rgba(10, 10, 24, 0.95)",
                }} />
              </div>
              <div style={{ flex: 1, minWidth: 0, textAlign: "left" }}>
                <div style={{ fontSize: "0.8rem", fontWeight: 600, color: chatMode === "dm" && activeContact.id === contact.id ? "white" : "rgba(203, 213, 225, 0.8)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {contact.name}
                </div>
                <div style={{ fontSize: "0.7rem", color: "rgba(100, 116, 139, 0.7)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                  {contact.lastMsg}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
        {/* Chat Header */}
        <div style={{ height: 57, background: "rgba(12, 12, 28, 0.95)", borderBottom: "1px solid rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {chatMode === "channel" ? (
              <>
                <Hash size={18} style={{ color: "rgba(139, 92, 246, 0.8)" }} />
                <span style={{ fontWeight: 700 }}>{CHANNELS.find(c => c.id === activeChannel)?.name}</span>
              </>
            ) : (
              <>
                <div className="avatar avatar-sm" style={{ background: activeContact.color }}>
                  {activeContact.avatar}
                </div>
                <span style={{ fontWeight: 700 }}>{activeContact.name}</span>
                <div style={{ width: 7, height: 7, borderRadius: "50%", background: activeContact.status === "online" ? "#10B981" : "#6B7280" }} />
              </>
            )}
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {[<Phone size={16} key="phone" />, <Video size={16} key="video" />, <MoreHorizontal size={16} key="more" />].map((icon, i) => (
              <button
                key={i}
                style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(148, 163, 184, 0.7)" }}
              >
                {icon}
              </button>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div style={{ flex: 1, overflowY: "auto", padding: "20px", display: "flex", flexDirection: "column", gap: 16 }}>
          {messages.map((msg) => (
            <div key={msg.id} id={`msg-${msg.id}`} style={{ display: "flex", gap: 12, flexDirection: msg.mine ? "row-reverse" : "row" }}>
              <div className="avatar avatar-sm" style={{ background: msg.color, flexShrink: 0 }}>
                {msg.avatar}
              </div>
              <div style={{ maxWidth: "70%", display: "flex", flexDirection: "column", alignItems: msg.mine ? "flex-end" : "flex-start" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4, flexDirection: msg.mine ? "row-reverse" : "row" }}>
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: msg.mine ? "rgb(167, 139, 250)" : "rgba(226, 232, 240, 0.9)" }}>{msg.author}</span>
                  <span style={{ fontSize: "0.7rem", color: "rgba(100, 116, 139, 0.6)" }}>{msg.time}</span>
                </div>
                <div style={{
                  padding: "10px 14px",
                  borderRadius: msg.mine ? "16px 4px 16px 16px" : "4px 16px 16px 16px",
                  background: msg.mine ? "linear-gradient(135deg, rgba(124, 58, 237, 0.3), rgba(79, 70, 229, 0.25))" : "rgba(26, 26, 52, 0.8)",
                  border: `1px solid ${msg.mine ? "rgba(139, 92, 246, 0.25)" : "rgba(255,255,255,0.07)"}`,
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  color: "rgba(226, 232, 240, 0.9)",
                }}>
                  {msg.content}
                </div>
              </div>
            </div>
          ))}
          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div style={{ padding: "16px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", background: "rgba(12, 12, 28, 0.95)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.09)", borderRadius: 12, padding: "10px 14px" }}>
            <button style={{ background: "transparent", border: "none", color: "rgba(100, 116, 139, 0.6)", cursor: "pointer", display: "flex" }}>
              <Paperclip size={16} />
            </button>
            <input
              type="text"
              placeholder="Écrire un message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              id="chat-input"
              style={{ background: "transparent", border: "none", outline: "none", color: "white", fontSize: "0.875rem", flex: 1, fontFamily: "inherit" }}
            />
            <button style={{ background: "transparent", border: "none", color: "rgba(100, 116, 139, 0.6)", cursor: "pointer", display: "flex" }}>
              <Smile size={16} />
            </button>
            <button
              id="send-msg-btn"
              onClick={handleSend}
              disabled={!message.trim()}
              style={{
                width: 32, height: 32, borderRadius: 8,
                background: message.trim() ? "linear-gradient(135deg, #7C3AED, #4F46E5)" : "rgba(255,255,255,0.06)",
                border: "none", display: "flex", alignItems: "center", justifyContent: "center",
                cursor: message.trim() ? "pointer" : "default",
                color: message.trim() ? "white" : "rgba(100, 116, 139, 0.4)",
                transition: "all 0.2s ease",
              }}
            >
              <Send size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
