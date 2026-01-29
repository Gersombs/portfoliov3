"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from "@/context/LanguageContext";

export default function Contact() {
  const { t } = useLanguage();
  
  const formRef = useRef<HTMLFormElement>(null);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'success' | 'error' | null>(null);
  
  /**
   * Anti-bot: Timer de inicio
   *
   * `startedAt` is captured on mount and sent to the backend to help
   * validate that a human (not a bot) completed the form — e.g., too-fast
   * submissions can be rejected.
   */
  const [startedAt] = useState(Date.now());

  /**
   * Reset form on mount
   *
   * Ensures the form is in a clean state when the component appears.
   */
  useEffect(() => {
    formRef.current?.reset();
  }, []);

  /**
   * Auto-clear feedback
   *
   * When `status` is set to 'success' or 'error', automatically clear the
   * message after a short delay so the UI returns to its default state.
   */
  useEffect(() => {
    if (status) {
      const timer = setTimeout(() => setStatus(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  /**
   * handleSubmit
   *
   * Serializes the form and POSTs to `/api/contact`. Includes anti-spam
   * measures:
   *  - hidden honeypot `company` field
   *  - `startedAt` timestamp for timing heuristics
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    if (!formRef.current) return;

    const formData = new FormData(formRef.current);
    const data = {
      ...Object.fromEntries(formData),
      startedAt, // Enviamos el timestamp para validar en backend
    };

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setStatus('success');
        formRef.current.reset();
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="w-full max-w-4xl mx-auto px-6 py-24 mb-20 scroll-mt-24">
      
      {/*
        Header
        - Localized section label and title come from `t.contact`.
        - Keep header concise to focus attention on the form.
      */}
      <div className="text-center mb-16">
        <span className="font-mono text-neon-green text-sm tracking-widest uppercase mb-2 block">
            [{t.contact.label}]
        </span>
        <h2 className="font-heading text-4xl md:text-5xl font-bold text-white mb-6">
            {t.contact.title}
        </h2>
      </div>

      <div className="w-full flex lg:flex-row flex-col items-center justify-center gap-12 lg:gap-20">
        
        {/*
          Decorative panel (glitch)
          - Purely visual on large screens to give a subtle interactive feel.
          - Hidden on small screens to prioritize form access.
        */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="hidden lg:block w-75 h-100 relative bg-elevated/30 rounded-lg border border-white/5 overflow-hidden"
        >
            <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(0,240,255,0.05)_50%,transparent_75%,transparent_100%)] bg-size-[250%_250%] animate-[background-position_3s_infinite]"></div>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-mono text-neon-cyan text-xs animate-pulse">Waiting for input...</span>
            </div>
        </motion.div>

        {/*
          Contact form
          - Uses `AnimatePresence` for accessible feedback messages.
          - Includes a hidden honeypot `company` input to deter bots.
          - All inputs include `aria-label` for screen reader clarity.
        */}
        <motion.form
          ref={formRef}
          onSubmit={handleSubmit}
          autoComplete="off"
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="w-full max-w-md flex flex-col gap-6"
        >
          {/* Honeypot field (anti-spam) */}
          <input type="text" name="company" className="hidden" tabIndex={-1} autoComplete="off" />

          <div className="w-full flex flex-col md:flex-row gap-4">
            <div className="group w-full relative">
                <input
                    type="text"
                    name="name"
                  placeholder={t.contact.name_ph} 
                  aria-label={t.contact.name_ph} // A11Y CRÍTICO
                  autoComplete="name"
                    required
                    className="w-full bg-elevated/50 border border-white/10 rounded-md px-4 py-3 text-sm text-white font-mono outline-none focus:border-neon-cyan transition-colors placeholder:text-white/20"
                />
            </div>
            <div className="group w-full relative">
                <input
                    type="email"
                    name="email"
                  placeholder={t.contact.email_ph} 
                  aria-label={t.contact.email_ph} // A11Y CRÍTICO
                  autoComplete="email"
                    required
                    className="w-full bg-elevated/50 border border-white/10 rounded-md px-4 py-3 text-sm text-white font-mono outline-none focus:border-neon-cyan transition-colors placeholder:text-white/20"
                />
            </div>
          </div>

          <input
            type="text"
            name="subject"
            placeholder={t.contact.subject_ph}
            aria-label={t.contact.subject_ph} // A11Y CRÍTICO
            autoComplete="on"
            className="w-full bg-elevated/50 border border-white/10 rounded-md px-4 py-3 text-sm text-white font-mono outline-none focus:border-neon-cyan transition-colors placeholder:text-white/20"
          />

          <textarea
            name="message"
            placeholder={t.contact.msg_ph} 
            aria-label={t.contact.msg_ph} // A11Y CRÍTICO
            required
            autoComplete="off"
            className="min-h-37.5 w-full bg-elevated/50 border border-white/10 rounded-md px-4 py-3 text-sm text-white font-mono outline-none focus:border-neon-cyan transition-colors placeholder:text-white/20 resize-none"
          />

          <button
            type="submit"
            disabled={loading}
            className={`
              relative w-full border border-white/20 rounded-md px-6 py-4 text-sm font-mono font-bold tracking-widest transition-all overflow-hidden group
              ${loading ? 'bg-white/5 cursor-wait text-white/50' : 'bg-white text-black hover:bg-neon-cyan hover:border-neon-cyan hover:text-black'}
            `}
          >
            {loading ? t.contact.btn_sending : t.contact.btn_send} 
            
            {!loading && <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 pointer-events-none"></div>}
          </button>

          {/*
            Feedback (accessible)
            - `role="status"` and `aria-live="polite"` ensure screen readers
              announce success/error messages.
            - Visual styles use color-coded backgrounds and borders.
          */}
          <AnimatePresence>
            {status && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                role="status"        // <--- A11Y: IMPORTANTE
                aria-live="polite"   // <--- A11Y: IMPORTANTE
                className={`text-xs font-mono text-center p-2 border rounded ${
                  status === 'success' 
                    ? 'border-neon-green/30 text-neon-green bg-neon-green/5' 
                    : 'border-neon-red/30 text-neon-red bg-neon-red/5'
                }`}
              >
                {status === 'success'
                  ? t.contact.success 
                  : t.contact.error}  
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>
      </div>
    </section>
  );
}