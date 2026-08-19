import React from 'react';
import { motion } from 'framer-motion';

export const HeroVisualization: React.FC = () => {
  return (
    <div className="w-full max-w-5xl mx-auto px-6 pb-12 flex flex-col items-center justify-center select-none relative z-10">
      {/* Hero Visual Image - One Single complete visual asset */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="w-full max-w-4xl flex items-center justify-center z-10"
      >
        <img
          src="/study_abroad_hero.png"
          alt="GradScope study abroad travel planning still life composition featuring suitcase, passport, books, globe, bottle and notebook"
          className="w-full h-auto object-contain block max-h-[550px] md:max-h-[650px]"
        />
      </motion.div>
    </div>
  );
};
