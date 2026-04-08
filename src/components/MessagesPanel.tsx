import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { MessageCircle, X } from "lucide-react";
import ChatWindow from "@/components/ChatWindow";

interface Conversation {
  partnerId: string;
  partnerName: string;
  lastMessage: string;
  lastTime: string;
  unreadCount: number;
}

const MessagesPanel = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeChat, setActiveChat] = useState<{ id: string; name: string } | null>(null);
  const [unreadTotal, setUnreadTotal] = useState(0);

  useEffect(() => {
    if (!user) return;
    fetchConversations();

    const channel = supabase
      .channel("messages-panel")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages" }, () => {
        fetchConversations();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user]);

  const fetchConversations = async () => {
    if (!user) return;

    const { data: msgs } = await supabase
      .from("messages")
      .select("*")
      .or(`sender_id.eq.${user.id},receiver_id.eq.${user.id}`)
      .order("created_at", { ascending: false });

    if (!msgs) return;

    const convMap = new Map<string, Conversation>();
    for (const msg of msgs) {
      const partnerId = msg.sender_id === user.id ? msg.receiver_id : msg.sender_id;
      if (!convMap.has(partnerId)) {
        convMap.set(partnerId, {
          partnerId,
          partnerName: "",
          lastMessage: msg.content,
          lastTime: msg.created_at,
          unreadCount: 0,
        });
      }
      const conv = convMap.get(partnerId)!;
      if (msg.receiver_id === user.id && !msg.is_read) {
        conv.unreadCount++;
      }
    }

    const partnerIds = Array.from(convMap.keys());
    if (partnerIds.length > 0) {
      const { data: profiles } = await supabase
        .from("profiles")
        .select("user_id, full_name")
        .in("user_id", partnerIds);

      if (profiles) {
        for (const p of profiles) {
          const conv = convMap.get(p.user_id);
          if (conv) conv.partnerName = p.full_name || "مستخدم";
        }
      }
    }

    const list = Array.from(convMap.values());
    setConversations(list);
    setUnreadTotal(list.reduce((sum, c) => sum + c.unreadCount, 0));
  };

  if (!user) return null;

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 left-6 z-50 w-14 h-14 rounded-2xl bg-accent text-accent-foreground shadow-elevated flex items-center justify-center hover:scale-105 transition-transform"
      >
        <MessageCircle className="w-6 h-6" />
        {unreadTotal > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-destructive text-destructive-foreground text-[10px] font-bold rounded-full flex items-center justify-center">
            {unreadTotal}
          </span>
        )}
      </button>

      {/* Panel */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-50 w-[380px] max-w-[calc(100vw-48px)] h-[520px] max-h-[70vh] bg-card rounded-2xl border border-border/40 shadow-elevated overflow-hidden flex flex-col animate-scale-in">
          {activeChat ? (
            <ChatWindow
              receiverId={activeChat.id}
              receiverName={activeChat.name}
              onBack={() => { setActiveChat(null); fetchConversations(); }}
            />
          ) : (
            <>
              <div className="flex items-center justify-between px-5 py-4 border-b border-border/40">
                <h3 className="font-bold text-foreground flex items-center gap-2">
                  <MessageCircle className="w-5 h-5 text-accent" />
                  الرسائل
                  {unreadTotal > 0 && (
                    <span className="text-xs bg-accent/10 text-accent px-2 py-0.5 rounded-full">{unreadTotal}</span>
                  )}
                </h3>
                <button onClick={() => setIsOpen(false)} className="p-1.5 rounded-lg hover:bg-secondary/70 transition-colors">
                  <X className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>

              <div className="flex-1 overflow-y-auto">
                {conversations.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-center px-6">
                    <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4">
                      <MessageCircle className="w-8 h-8 text-muted-foreground/40" />
                    </div>
                    <p className="text-muted-foreground text-sm">لا توجد محادثات بعد</p>
                    <p className="text-muted-foreground/60 text-xs mt-1">ابدأ محادثة من صفحة الحرفي</p>
                  </div>
                ) : (
                  conversations.map((conv) => (
                    <button
                      key={conv.partnerId}
                      onClick={() => setActiveChat({ id: conv.partnerId, name: conv.partnerName })}
                      className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-secondary/50 transition-colors text-right"
                    >
                      <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center shrink-0">
                        <span className="text-accent font-bold text-sm">{conv.partnerName.charAt(0)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-foreground text-sm">{conv.partnerName}</h4>
                          <span className="text-[10px] text-muted-foreground">
                            {new Date(conv.lastTime).toLocaleTimeString("ar", { hour: "2-digit", minute: "2-digit" })}
                          </span>
                        </div>
                        <p className="text-xs text-muted-foreground truncate mt-0.5">{conv.lastMessage}</p>
                      </div>
                      {conv.unreadCount > 0 && (
                        <span className="w-5 h-5 bg-accent text-accent-foreground text-[10px] font-bold rounded-full flex items-center justify-center shrink-0">
                          {conv.unreadCount}
                        </span>
                      )}
                    </button>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default MessagesPanel;
