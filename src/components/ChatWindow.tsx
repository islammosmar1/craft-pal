import { useState, useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Send, ArrowRight, MessageCircle } from "lucide-react";

interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  content: string;
  is_read: boolean;
  created_at: string;
}

interface ChatWindowProps {
  receiverId: string;
  receiverName: string;
  onBack?: () => void;
}

const ChatWindow = ({ receiverId, receiverName, onBack }: ChatWindowProps) => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [sending, setSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!user) return;
    fetchMessages();

    const channel = supabase
      .channel(`chat-${receiverId}`)
      .on("postgres_changes", {
        event: "INSERT",
        schema: "public",
        table: "messages",
      }, (payload) => {
        const msg = payload.new as Message;
        if (
          (msg.sender_id === user.id && msg.receiver_id === receiverId) ||
          (msg.sender_id === receiverId && msg.receiver_id === user.id)
        ) {
          setMessages((prev) => [...prev, msg]);
          if (msg.sender_id === receiverId) {
            supabase.from("messages").update({ is_read: true }).eq("id", msg.id);
          }
        }
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [user, receiverId]);

  useEffect(() => { scrollToBottom(); }, [messages]);

  const fetchMessages = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("messages")
      .select("*")
      .or(
        `and(sender_id.eq.${user.id},receiver_id.eq.${receiverId}),and(sender_id.eq.${receiverId},receiver_id.eq.${user.id})`
      )
      .order("created_at", { ascending: true });

    if (data) {
      setMessages(data);
      const unread = data.filter((m) => m.receiver_id === user.id && !m.is_read);
      if (unread.length > 0) {
        await supabase
          .from("messages")
          .update({ is_read: true })
          .in("id", unread.map((m) => m.id));
      }
    }
  };

  const handleSend = async () => {
    if (!newMessage.trim() || !user || sending) return;
    setSending(true);
    const { error } = await supabase.from("messages").insert({
      sender_id: user.id,
      receiver_id: receiverId,
      content: newMessage.trim(),
    });
    if (!error) setNewMessage("");
    setSending(false);
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("ar", { hour: "2-digit", minute: "2-digit" });
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("ar", { weekday: "long", month: "short", day: "numeric" });
  };

  let lastDate = "";

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="flex items-center gap-3 px-5 py-4 border-b border-border/40 bg-card/80 backdrop-blur-sm">
        {onBack && (
          <button onClick={onBack} className="p-1.5 rounded-lg hover:bg-secondary/70 transition-colors">
            <ArrowRight className="w-5 h-5 text-muted-foreground" />
          </button>
        )}
        <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
          <MessageCircle className="w-5 h-5 text-accent" />
        </div>
        <div>
          <h3 className="font-bold text-foreground text-sm">{receiverName}</h3>
          <p className="text-xs text-muted-foreground">محادثة مباشرة</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-1">
        {messages.length === 0 && (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center mb-4">
              <MessageCircle className="w-8 h-8 text-muted-foreground/40" />
            </div>
            <p className="text-muted-foreground text-sm">ابدأ المحادثة الآن</p>
          </div>
        )}
        {messages.map((msg) => {
          const isMine = msg.sender_id === user?.id;
          const msgDate = formatDate(msg.created_at);
          let showDate = false;
          if (msgDate !== lastDate) {
            showDate = true;
            lastDate = msgDate;
          }
          return (
            <div key={msg.id}>
              {showDate && (
                <div className="flex justify-center my-4">
                  <span className="text-[11px] text-muted-foreground bg-secondary/60 px-3 py-1 rounded-full">{msgDate}</span>
                </div>
              )}
              <div className={`flex ${isMine ? "justify-start" : "justify-end"} mb-1.5`}>
                <div className={`max-w-[75%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                  isMine
                    ? "bg-accent text-accent-foreground rounded-br-md"
                    : "bg-secondary/70 text-foreground rounded-bl-md"
                }`}>
                  <p>{msg.content}</p>
                  <p className={`text-[10px] mt-1 ${isMine ? "text-accent-foreground/60" : "text-muted-foreground"}`}>
                    {formatTime(msg.created_at)}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="px-4 py-3 border-t border-border/40 bg-card/80 backdrop-blur-sm">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && handleSend()}
            placeholder="اكتب رسالتك..."
            className="flex-1 h-11 rounded-xl bg-secondary/50 border-border/40"
          />
          <Button
            variant="accent"
            size="icon"
            className="h-11 w-11 rounded-xl shrink-0"
            onClick={handleSend}
            disabled={!newMessage.trim() || sending}
          >
            <Send className="w-4 h-4 rotate-180" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
