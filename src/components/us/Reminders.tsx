"use client";

import { motion } from "framer-motion";
import { wedding } from "@/wedding.config";
import { SectionHeader } from "./SectionHeader";

export const Reminders = () => {
  return (
    <section className="bg-[#f8f5f0] px-6 py-20">
      <div className="mx-auto max-w-md">
        <SectionHeader
          label="REMINDERS"
          subtitle="잊지 않으려고, 미리 적어 둔 날들."
        />

        <div className="space-y-3">
          {wedding.us.reminders.map((reminder, index) => (
            <motion.article
              key={reminder.title}
              className="rounded-lg border border-[#e8e2d9] bg-white p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 * index }}
            >
              <p className="mb-1 text-[10px] tracking-[0.15em] text-[#a08d6e]">
                {reminder.when}
              </p>
              <p className="mb-2 text-sm font-light text-[#4a4a4a]">
                {reminder.title}
              </p>
              <p className="text-sm font-light leading-relaxed text-[#6b6b6b]">
                {reminder.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
