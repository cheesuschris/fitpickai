"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import FitPickAILogo from "./fitpickai-logo";

export default function FadingLogo() {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity }}
      className="-mx-6 w-screen flex h-20 shrink-0 items-end rounded-lg p-4 md:h-52"
    >
      <FitPickAILogo />
    </motion.div>
  );
}
