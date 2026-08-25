"use client";

import { motion } from "framer-motion";

type SectionHeaderProps = {
  label: string;
  subtitle?: string;
};

export const SectionHeader = ({ label, subtitle }: SectionHeaderProps) => {
  return (
    <motion.div
      className="mb-10 text-center"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <p className="mb-2 text-[10px] tracking-[0.3em] text-[#a08d6e]">{label}</p>
      <div className="mx-auto mb-4 flex items-center justify-center gap-3">
        <div className="h-px w-8 bg-gradient-to-r from-transparent to-[#d4c5a9]/50" />
        <div className="h-1 w-1 rotate-45 border border-[#c9a961]/50" />
        <div className="h-px w-8 bg-gradient-to-l from-transparent to-[#d4c5a9]/50" />
      </div>
      {subtitle ? (
        <p className="text-sm font-light leading-relaxed text-[#8b8b8b]">
          {subtitle}
        </p>
      ) : null}
    </motion.div>
  );
};
