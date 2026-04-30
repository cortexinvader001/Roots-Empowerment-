import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, Loader2, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import info from './data/centre-info.json';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SYSTEM_PROMPT = `You are the AI assistant for ${info.name}. 
Our mission: ${info.about.mission}
Our programs: ${info.programs.map(p => p.name).join(', ')}.
Contact: ${info.contact.phone}, ${info.contact.email}.
Address: ${info.contact.address}.
Be compassionate, professional, and helpful to parents of children with special needs. 
Keep responses concise and supportive. 
Formatting guidelines:
1. When providing lists or schedules, use Markdown tables or bullet lists.
2. If you use bold text for a section title or key point, put it on its own line.
3. Use a friendly, encouraging tone.`;

export const AIChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  // Load memory from local storage
  useEffect(() => {
    const saved = localStorage.getItem('roots_ai_memory');
    if (saved) {
      try {
        setMessages(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to load AI memory', e);
      }
    } else {
      setMessages([{ role: 'assistant', content: "Hello! I'm your Roots Empowerment assistant. How can I help you and your child today?" }]);
    }
  }, []);

  // Save memory to local storage
  useEffect(() => {
    localStorage.setItem('roots_ai_memory', JSON.stringify(messages));
  }, [messages]);

  // Handle auto-scroll
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const context = newMessages.map(m => `${m.role === 'user' ? 'User' : 'Assistant'}: ${m.content}`).join('\n');
      const fullPrompt = `${SYSTEM_PROMPT}\n\nConversation history:\n${context}\n\nAssistant:`;
      
      const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(fullPrompt)}`);
      let text = await response.text();

      // Ensure that **Section Headers** or bold points at the start of thoughts are on new lines
      // This helps with the user requirement to have bold text on new lines
      text = text.replace(/(\w|\.|\!|\?)\s+(\*\*)/g, '$1\n\n$2');

      setMessages([...newMessages, { role: 'assistant', content: text }]);
    } catch (error) {
      console.error('AI Error:', error);
      setMessages([...newMessages, { role: 'assistant', content: "I'm sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearMemory = () => {
    const initial: Message[] = [{ role: 'assistant', content: "Memory cleared. How can I help you today?" }];
    setMessages(initial);
    localStorage.removeItem('roots_ai_memory');
  };

  return (
    <div className="fixed bottom-4 right-4 md:bottom-8 md:right-8 z-[100]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="absolute bottom-20 right-0 w-[calc(100vw-2rem)] sm:w-[450px] h-[calc(100vh-6rem)] sm:h-[650px] bg-white rounded-[2rem] sm:rounded-[2.5rem] shadow-2xl border border-foreground/5 flex flex-col overflow-hidden overscroll-contain"
          >
            {/* Header */}
            <div className="bg-primary p-4 md:p-6 text-white flex items-center justify-between shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/20 rounded-xl md:rounded-2xl flex items-center justify-center">
                  <Bot size={24} className="md:w-[28px] md:h-[28px]" />
                </div>
                <div>
                  <h3 className="font-extrabold text-lg md:text-xl">Roots Assistant</h3>
                  <p className="text-[9px] md:text-[10px] opacity-70 font-bold uppercase tracking-widest leading-none mt-1">Specialized AI Care</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={clearMemory} className="p-2 hover:bg-white/10 rounded-full transition-colors" title="Clear Memory">
                  <Trash2 size={18} />
                </button>
                <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                  <X size={24} className="md:w-[28px] md:h-[28px]" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 relative min-h-0">
              <ScrollArea className="h-full w-full">
                <div className="p-4 md:p-6 space-y-6 md:space-y-8 pb-10">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`flex gap-3 md:gap-4 max-w-[95%] sm:max-w-[90%] ${m.role === 'user' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl flex items-center justify-center shrink-0 shadow-sm ${m.role === 'user' ? 'bg-secondary text-white' : 'bg-muted text-primary'}`}>
                          {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`p-4 md:p-5 rounded-2xl md:rounded-3xl text-sm font-medium leading-relaxed shadow-sm ai-markdown-content overflow-x-auto ${m.role === 'user' ? 'bg-secondary text-white rounded-tr-none' : 'bg-muted/50 text-foreground rounded-tl-none'}`}>
                          <ReactMarkdown 
                            remarkPlugins={[remarkGfm]}
                            components={{
                              p: ({children}) => <p className="mb-4 last:mb-0">{children}</p>,
                              strong: ({children}) => <strong className="font-extrabold text-primary decoration-primary/20">{children}</strong>
                            }}
                          >
                            {m.content}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  ))}
                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="flex gap-3 md:gap-4 max-w-[95%] sm:max-w-[90%]">
                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-xl md:rounded-2xl bg-muted text-primary flex items-center justify-center shrink-0">
                          <Bot size={16} />
                        </div>
                        <div className="p-4 md:p-5 rounded-2xl md:rounded-3xl bg-muted/50 text-foreground rounded-tl-none flex items-center gap-2 shadow-sm">
                          <Loader2 size={16} className="animate-spin text-primary" />
                          <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-widest opacity-50">Thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={scrollRef} className="h-2" />
                </div>
              </ScrollArea>
            </div>

            {/* InputArea */}
            <div className="p-4 md:p-8 border-t border-foreground/5 bg-white">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about programs..."
                  className="w-full bg-muted/30 border-2 border-transparent rounded-xl md:rounded-2xl p-4 md:p-5 pr-14 md:pr-16 shadow-inner focus:border-primary/20 focus:ring-4 focus:ring-primary/5 outline-none font-bold text-sm transition-all"
                />
                <button
                  onClick={handleSend}
                  disabled={isLoading || !input.trim()}
                  className="absolute right-2 md:right-3 top-1/2 -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-primary text-white rounded-lg md:rounded-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all shadow-lg btn-shadow disabled:opacity-50 disabled:hover:scale-100"
                >
                  <Send size={20} className="md:w-[22px] md:h-[22px]" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 md:w-16 md:h-16 bg-primary text-white rounded-full flex items-center justify-center shadow-2xl btn-shadow relative group"
      >
        {isOpen ? <X size={28} className="md:w-[32px] md:h-[32px]" /> : <MessageSquare size={28} className="md:w-[32px] md:h-[32px]" />}
        {!isOpen && (
          <span className="absolute right-full mr-4 bg-foreground text-white px-4 py-2 rounded-xl text-xs font-extrabold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none hidden sm:block">
            Need help? Chat with us!
          </span>
        )}
      </motion.button>
    </div>
  );
};