"use client";

import { motion } from "framer-motion";

type UsPanelProps = {
  label: string;
  title?: string;
  children: React.ReactNode;
};

export const UsPanel = ({ label, title, children }: UsPanelProps) => {
  return (
    <motion.section
      className="px-4 py-5"
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.45 }}
    >
      <div className="mx-auto max-w-md overflow-hidden rounded-lg border border-[var(--us-line)] bg-[var(--us-ink-2)]">
        <div className="flex items-center gap-2 border-b border-[var(--us-line)] px-3 py-2">
          <span className="font-mono text-[10px] tracking-wider text-[var(--us-amber)]">
            {label}
          </span>
          {title ? (
            <span className="truncate font-mono text-[10px] text-[var(--us-dim)]">
              {title}
            </span>
          ) : null}
        </div>
        <div className="px-4 py-4">{children}</div>
      </div>
    </motion.section>
  );
};
