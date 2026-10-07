'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface AccordionItem {
  id: string;
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  className?: string;
  allowMultiple?: boolean;
}

export const Accordion: React.FC<AccordionProps> = ({ items, className, allowMultiple = false }) => {
  const [openIds, setOpenIds] = React.useState<string[]>([]);

  const toggle = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id)
        ? prev.filter((i) => i !== id)
        : allowMultiple
        ? [...prev, id]
        : [id]
    );
  };

  return (
    <div className={cn('space-y-3', className)}>
      {items.map((item) => {
        const isOpen = openIds.includes(item.id);
        return (
          <div
            key={item.id}
            className="border border-border rounded-xl overflow-hidden transition-shadow hover:shadow-md"
          >
            <button
              type="button"
              className="flex items-center justify-between w-full px-6 py-4 text-left font-semibold text-navy hover:text-primary transition-colors"
              onClick={() => toggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`accordion-panel-${item.id}`}
              id={`accordion-btn-${item.id}`}
            >
              <span className="text-sm sm:text-base">{item.question}</span>
              <span
                className={cn(
                  'ml-4 h-5 w-5 shrink-0 text-primary transition-transform duration-300',
                  isOpen && 'rotate-180'
                )}
                aria-hidden
              >
                <svg fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </span>
            </button>
            <div
              id={`accordion-panel-${item.id}`}
              role="region"
              aria-labelledby={`accordion-btn-${item.id}`}
              className={cn(
                'overflow-hidden transition-all duration-300 ease-in-out',
                isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              )}
            >
              <p className="px-6 pb-5 text-sm sm:text-base text-muted leading-relaxed">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};
