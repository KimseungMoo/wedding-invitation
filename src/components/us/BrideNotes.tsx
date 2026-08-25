"use client";

import { motion } from "framer-motion";
import { wedding } from "@/wedding.config";
import { SectionHeader } from "./SectionHeader";

export const BrideNotes = () => {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-md">
        <SectionHeader
          label="NOTES"
          subtitle="좋아하는 것과, 챙기고 싶은 것들."
        />

        <div className="space-y-3">
          {wedding.us.notes.map((note, index) => (
            <motion.article
              key={note.title}
              className="rounded-lg border border-[#e8e2d9] bg-[#faf9f6] p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 * index }}
            >
              <p className="mb-2 text-sm font-light text-[#4a4a4a]">
                {note.title}
              </p>
              <p className="text-sm font-light leading-relaxed text-[#6b6b6b]">
                {note.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
