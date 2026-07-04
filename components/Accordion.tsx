'use client';

import { useState, type ReactNode } from 'react';
import { ChevronIcon } from './icons';
import { cn } from '@/lib/utils';

interface AccordionItem {
  title: string;
  content: ReactNode;
}

export function Accordion({ items }: { items: AccordionItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="divide-y divide-hairline border-y border-hairline">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `accordion-panel-${index}`;
        const buttonId = `accordion-button-${index}`;
        return (
          <div key={item.title}>
            <h3>
              <button
                id={buttonId}
                type="button"
                onClick={() => setOpenIndex(isOpen ? null : index)}
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex w-full items-center justify-between gap-4 py-4 text-left font-sans text-sm font-medium text-ink"
              >
                {item.title}
                <ChevronIcon
                  className={cn(
                    'h-4 w-4 shrink-0 text-muted transition-transform duration-300',
                    isOpen && 'rotate-180',
                  )}
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className="pb-5 text-sm leading-relaxed text-ink/70"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}
