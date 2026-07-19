import { useEffect, useRef, useState } from "react";
import { Bot, MessageCircle, Send, X, Sparkles } from "lucide-react";
import { useSite } from "../context/SiteContext";

const COPY = {
  ar: {
    title: "مساعد أحمد",
    status: "متاح الآن",
    welcome: "أهلًا! أنا مساعد الموقع. أقدر أساعدك في خدمات تصميم PCB، خطوات العمل، الملفات والتواصل.",
    placeholder: "اكتب سؤالك هنا...",
    quick: ["ما الخدمات المتاحة؟", "كيف نبدأ مشروعًا؟", "ما الملفات التي سأستلمها؟"],
    fallback: "أقدر أساعدك بخصوص خدمات PCB، البرامج، التسليمات، الأسعار المبدئية أو طريقة التواصل. جرّب أن تسألني عن أحدها.",
    services: "تشمل الخدمات: تصميم المخططات، تخطيط PCB، مراجعة DRC، اللوحات متعددة الطبقات، تحسين قابلية التصنيع وتجهيز ملفات الإنتاج.",
    process: "نبدأ بوصف وظيفة الدائرة والمتطلبات، ثم مراجعة المخطط، التخطيط والتوجيه، فحوصات DRC، وأخيرًا تجهيز ملفات التصنيع.",
    files: "التسليم يمكن أن يشمل Gerber، ملفات الحفر، BOM، Pick & Place، PDF للمخطط وملفات المصدر حسب المشروع.",
    tools: "تُستخدم أدوات مثل KiCad وAltium Designer وEasyEDA وفق احتياجات المشروع.",
    price: "السعر يعتمد على تعقيد الدائرة، عدد الطبقات، أبعاد اللوحة والموعد المطلوب. أرسل تفاصيل المشروع للحصول على تقدير مناسب.",
    contact: "يمكنك إرسال تفاصيل مشروعك من قسم التواصل أسفل الصفحة، وسأنتقل بك إليه الآن.",
  },
  en: {
    title: "Ahmed's Assistant", status: "Online now",
    welcome: "Hi! I can help with PCB design services, workflow, deliverables and contact details.",
    placeholder: "Type your question...",
    quick: ["What services are available?", "How do we start?", "Which files will I receive?"],
    fallback: "Ask me about PCB services, tools, deliverables, pricing or how to get in touch.",
    services: "Services include schematic design, PCB layout, DRC review, multilayer boards, DFM optimization and production file preparation.",
    process: "We start with requirements and schematic review, then placement and routing, DRC checks, and finally manufacturing outputs.",
    files: "Deliverables may include Gerbers, drill files, BOM, Pick & Place, schematic PDF and editable source files.",
    tools: "Projects use KiCad, Altium Designer or EasyEDA depending on their requirements.",
    price: "Pricing depends on circuit complexity, layer count, board size and deadline. Send the project details for an estimate.",
    contact: "Use the contact section below to send your project details. I will take you there now.",
  },
  tr: {
    title: "Ahmed'in Asistanı", status: "Şimdi çevrimiçi",
    welcome: "Merhaba! PCB tasarım hizmetleri, süreç, teslimatlar ve iletişim konusunda yardımcı olabilirim.",
    placeholder: "Sorunuzu yazın...",
    quick: ["Hangi hizmetler var?", "Projeye nasıl başlarız?", "Hangi dosyaları alacağım?"],
    fallback: "PCB hizmetleri, araçlar, teslimatlar, fiyatlandırma veya iletişim hakkında soru sorabilirsiniz.",
    services: "Hizmetler şematik tasarım, PCB yerleşimi, DRC kontrolü, çok katmanlı kartlar, DFM ve üretim dosyalarını kapsar.",
    process: "Gereksinimler ve şematik inceleme ile başlar, yerleşim ve yönlendirme, DRC ve üretim çıktılarıyla tamamlarız.",
    files: "Gerber, delme dosyaları, BOM, Pick & Place, şematik PDF ve kaynak dosyalar teslim edilebilir.",
    tools: "Projeye göre KiCad, Altium Designer veya EasyEDA kullanılır.",
    price: "Fiyat; devre karmaşıklığı, katman sayısı, kart boyutu ve teslim tarihine bağlıdır.",
    contact: "Proje detaylarını iletişim bölümünden gönderebilirsiniz. Şimdi sizi oraya götürüyorum.",
  },
};

function answerFor(input, copy) {
  const q = input.toLowerCase();
  if (/service|خدم|hizmet/.test(q)) return copy.services;
  if (/start|process|begin|نبدأ|خطوات|başla|süreç/.test(q)) return copy.process;
  if (/file|deliver|gerber|bom|ملف|استلم|teslim|dosya/.test(q)) return copy.files;
  if (/tool|software|kicad|altium|برنامج|أدوات|araç|yazılım/.test(q)) return copy.tools;
  if (/price|cost|budget|سعر|تكلف|fiyat|ücret/.test(q)) return copy.price;
  if (/contact|email|whatsapp|تواصل|ايميل|بريد|iletişim/.test(q)) return copy.contact;
  return copy.fallback;
}

export default function Chatbot() {
  const { lang } = useSite();
  const copy = COPY[lang] || COPY.en;
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [messages, setMessages] = useState([{ from: "bot", text: copy.welcome }]);
  const endRef = useRef(null);

  useEffect(() => {
    setMessages([{ from: "bot", text: copy.welcome }]);
  }, [lang]);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [messages, typing]);

  const send = (value) => {
    const text = (value ?? input).trim();
    if (!text || typing) return;
    setMessages((items) => [...items, { from: "user", text }]);
    setInput("");
    setTyping(true);
    const reply = answerFor(text, copy);
    window.setTimeout(() => {
      setMessages((items) => [...items, { from: "bot", text: reply }]);
      setTyping(false);
      if (reply === copy.contact) {
        window.setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 350);
      }
    }, 550);
  };

  return (
    <div className="chatbot-shell" dir={lang === "ar" ? "rtl" : "ltr"}>
      {open && (
        <section className="chatbot-panel" aria-label={copy.title}>
          <header className="chatbot-header">
            <span className="chatbot-avatar"><Bot className="w-5 h-5" /></span>
            <span className="flex-1">
              <strong className="block text-sm">{copy.title}</strong>
              <small className="chatbot-status">{copy.status}</small>
            </span>
            <button onClick={() => setOpen(false)} className="chatbot-close" aria-label="Close"><X className="w-4 h-4" /></button>
          </header>

          <div className="chatbot-messages">
            {messages.map((message, index) => (
              <div key={index} className={`chat-message ${message.from}`}>{message.text}</div>
            ))}
            {typing && <div className="chat-message bot typing"><i /><i /><i /></div>}
            <div ref={endRef} />
          </div>

          <div className="chatbot-quick">
            {copy.quick.map((item) => <button key={item} onClick={() => send(item)}>{item}</button>)}
          </div>

          <form className="chatbot-form" onSubmit={(event) => { event.preventDefault(); send(); }}>
            <input value={input} onChange={(event) => setInput(event.target.value)} placeholder={copy.placeholder} />
            <button type="submit" aria-label="Send"><Send className="w-4 h-4" /></button>
          </form>
        </section>
      )}

      <button className="chatbot-trigger" onClick={() => setOpen((value) => !value)} aria-label={copy.title}>
        {open ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!open && <Sparkles className="chatbot-sparkle w-3.5 h-3.5" />}
      </button>
    </div>
  );
}
