"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { UsHome, UsSaveSlot, UsShell } from "@/components/us";

export default function UsPage() {
  const [phase, setPhase] = useState<"entry" | "body">("entry");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [phase]);

  return (
    <UsShell phase={phase}>
      <AnimatePresence mode="wait">
        {phase === "entry" ? (
          <motion.div
            key="entry"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <UsSaveSlot onContinue={() => setPhase("body")} />
          </motion.div>
        ) : (
          <motion.main
            key="body"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <UsHome onBack={() => setPhase("entry")} />
          </motion.main>
        )}
      </AnimatePresence>
    </UsShell>
  );
}
