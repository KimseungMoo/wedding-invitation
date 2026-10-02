"use client";

import { useState } from "react";
import { motion } from "framer-motion";

type UsWidgetProps = {
  tone?: "frost" | "game";
  className?: string;
  children: React.ReactNode;
};

export const UsWidget = ({
  tone = "frost",
  className = "",
  children,
}: UsWidgetProps) => {
  return (
    <motion.section
      className={`us-widget-${tone} ${className}`}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.section>
  );
};

export const UsExpand = ({
  label = "더 보기",
  children,
}: {
  label?: string;
  children: React.ReactNode;
}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {open ? children : null}
      <button
        type="button"
        className="us-expand"
        onClick={() => setOpen((prev) => !prev)}
      >
        {open ? "접기" : label}
      </button>
    </>
  );
};
