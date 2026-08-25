"use client";

import { motion } from "framer-motion";
import { wedding } from "@/wedding.config";
import { SectionHeader } from "./SectionHeader";

export const Story = () => {
  return (
    <section className="bg-white px-6 py-20">
      <div className="mx-auto max-w-md">
        <SectionHeader
          label="STORY"
          subtitle="우리가 여기까지 온 이야기."
        />

        <div className="relative space-y-6 pl-2">
          {wedding.us.story.map((beat, index) => (
            <motion.article
              key={beat.title}
              className="relative pl-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.08 * index }}
            >
              {index < wedding.us.story.length - 1 ? (
                <div className="absolute bottom-[-24px] left-[3px] top-3 w-px bg-[#d4c5a9]/40" />
              ) : null}
              <div className="absolute left-0 top-2 h-1.5 w-1.5 rotate-45 border border-[#c9a961]/60 bg-[#faf9f6]" />
              <p className="mb-2 text-sm font-light text-[#4a4a4a]">
                {beat.title}
              </p>
              <p className="text-sm font-light leading-loose text-[#6b6b6b]">
                {beat.body}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
