"use client";

import { motion } from "framer-motion";
import { wedding, type ChatSpeaker } from "@/wedding.config";
import { SectionHeader } from "./SectionHeader";

const speakerName = (from: ChatSpeaker) => {
  if (from === "groom") return wedding.groom.shortName;
  if (from === "bride") return wedding.bride.shortName;
  return wedding.us.botName;
};

const bubbleClass = (from: ChatSpeaker) => {
  if (from === "groom") {
    return "ml-8 border-[#d4c5a9]/30 bg-[#e8f0f8]/70";
  }
  if (from === "bride") {
    return "mr-8 border-[#d4c5a9]/30 bg-[#fdf0f0]/80";
  }
  return "mr-6 border-[#e8e2d9] bg-[#faf9f6]";
};

export const PromiseChat = () => {
  const { us } = wedding;

  return (
    <section className="bg-[#f8f5f0] px-6 py-20">
      <div className="mx-auto max-w-md">
        <SectionHeader label="DATES" subtitle={us.intro} />

        <div className="space-y-4">
          {us.chats.map((thread, index) => (
            <motion.article
              key={thread.title}
              className="rounded-lg border border-[#e8e2d9] bg-white p-5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 * index }}
            >
              <p className="mb-4 text-center text-xs font-light tracking-wide text-[#8b7355]">
                {thread.title}
              </p>
              <div className="space-y-3">
                {thread.messages.map((message) => (
                  <div key={`${thread.title}-${message.text}`}>
                    <p
                      className={`mb-1 text-[10px] tracking-wide text-[#a0a0a0] ${
                        message.from === "bot" ? "font-mono" : "font-light"
                      }`}
                    >
                      {speakerName(message.from)}
                    </p>
                    <div
                      className={`rounded-lg border px-3.5 py-2.5 ${bubbleClass(message.from)}`}
                    >
                      <p className="text-sm font-light leading-relaxed text-[#4a4a4a]">
                        {message.text}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
