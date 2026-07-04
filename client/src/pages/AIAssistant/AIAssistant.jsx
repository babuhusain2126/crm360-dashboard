import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiCpu, FiUser } from 'react-icons/fi';
import Card from '../../components/Card/Card';
import './AIAssistant.css';

const SUGGESTED_PROMPTS = [
  'Summarize this week\'s pipeline health',
  'Which customers are at risk of churn?',
  'Draft a follow-up email for a stalled deal',
  'Show me our top performing sales channel',
];

const INITIAL_MESSAGES = [
  {
    role: 'assistant',
    content: "Hi Babu, I'm your AiCRM assistant. Ask me about pipeline health, customer risk, or anything in your workspace.",
  },
];

function mockAssistantReply(prompt) {
  const lower = prompt.toLowerCase();
  if (lower.includes('churn') || lower.includes('risk')) {
    return "I found **4 accounts** trending toward churn based on declining login activity:\n\n- Northwind Traders (−32% usage)\n- Cascade Finance (−18% usage)\n- Fernway Logistics (−14% usage)\n- Kite & Co (−11% usage)\n\nWant me to draft check-in emails for these accounts?";
  }
  if (lower.includes('pipeline')) {
    return "Your pipeline is healthy this week:\n\n```\nNew: 8   Qualified: 5\nProposal: 3   Won: 2\n```\n\nQualified lead volume is up **18%** versus last month, driven mostly by referral traffic.";
  }
  if (lower.includes('email') || lower.includes('draft')) {
    return "Here's a draft follow-up:\n\n> Hi {{name}}, following up on our last conversation about the AI Insights add-on — happy to walk through pricing whenever works for you this week.\n\nLet me know if you'd like a different tone.";
  }
  if (lower.includes('channel')) {
    return "**Direct** is your top-performing channel this month at 38% of closed revenue, followed by Referral (24%) and Partner (21%).";
  }
  return "Got it — based on your CRM data, I'd recommend reviewing the Reports tab for deeper analytics on this. Want me to pull a specific metric?";
}

export default function AIAssistant() {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  const sendMessage = (text) => {
    const prompt = text ?? input;
    if (!prompt.trim()) return;
    setMessages((prev) => [...prev, { role: 'user', content: prompt }]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      setMessages((prev) => [...prev, { role: 'assistant', content: mockAssistantReply(prompt) }]);
      setTyping(false);
    }, 1100);
  };

  return (
    <div className="page-stack">
      <div>
        <h2 className="page-title">AI Assistant</h2>
        <p className="text-secondary">Ask questions about your customers, pipeline, and performance.</p>
      </div>

      <Card className="chat-card" padded={false}>
        <div className="chat-messages" ref={scrollRef}>
          <AnimatePresence initial={false}>
            {messages.map((m, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className={`chat-bubble-row ${m.role === 'user' ? 'chat-row-user' : ''}`}
              >
                <span className={`chat-avatar ${m.role === 'user' ? 'chat-avatar-user' : ''}`}>
                  {m.role === 'user' ? <FiUser /> : <FiCpu />}
                </span>
                <div className={`chat-bubble ${m.role === 'user' ? 'chat-bubble-user' : ''}`}>
                  {m.content.split('\n').map((line, idx) => (
                    <p key={idx} className={line.startsWith('```') ? 'chat-code' : ''}>
                      {line.replace(/```/g, '').replace(/\*\*(.*?)\*\*/g, '$1')}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
            {typing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="chat-bubble-row">
                <span className="chat-avatar"><FiCpu /></span>
                <div className="chat-bubble chat-typing">
                  <span className="typing-dot" /><span className="typing-dot" /><span className="typing-dot" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {messages.length <= 1 && (
          <div className="suggested-prompts">
            {SUGGESTED_PROMPTS.map((p) => (
              <button key={p} onClick={() => sendMessage(p)}>{p}</button>
            ))}
          </div>
        )}

        <form
          className="chat-input-row"
          onSubmit={(e) => { e.preventDefault(); sendMessage(); }}
        >
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask AiCRM anything..."
            aria-label="Message the AI assistant"
          />
          <button type="submit" aria-label="Send message"><FiSend /></button>
        </form>
      </Card>
    </div>
  );
}
