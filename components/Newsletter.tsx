'use client';

import { useState, type FormEvent } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowIcon, CheckIcon } from './icons';
import { EASE, tap } from '@/lib/motion';

export function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email) return;
    // No backend — this is a portfolio demo. Acknowledge locally.
    setSubmitted(true);
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 md:items-end">
      <div>
        <p className="eyebrow text-paper/50">The list</p>
        <h2 className="mt-3 max-w-md font-display text-3xl font-bold leading-[1.05] tracking-tight text-paper sm:text-4xl">
          First looks at new frames, and nothing else.
        </h2>
      </div>

      <div>
        <AnimatePresence mode="wait" initial={false}>
        {submitted ? (
          <motion.p
            key="done"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="flex items-center gap-2 font-sans text-sm text-paper"
          >
            <CheckIcon className="h-5 w-5 text-cobalt" />
            You’re on the list — welcome to Meridian.
          </motion.p>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3, ease: EASE }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Email address
            </label>
            <div className="flex items-center gap-2 border-b border-paper/30 pb-2 focus-within:border-cobalt">
              <input
                id="newsletter-email"
                type="email"
                required
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com"
                className="w-full bg-transparent font-sans text-base text-paper placeholder:text-paper/40 focus:outline-none"
              />
              <motion.button
                whileTap={tap}
                whileHover={{ y: -2 }}
                type="submit"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cobalt text-paper"
                aria-label="Subscribe"
              >
                <ArrowIcon className="h-5 w-5" />
              </motion.button>
            </div>
            <p className="mt-3 text-xs text-paper/50">
              No spam. Unsubscribe whenever. Demo form — nothing is stored.
            </p>
          </motion.form>
        )}
        </AnimatePresence>
      </div>
    </div>
  );
}
