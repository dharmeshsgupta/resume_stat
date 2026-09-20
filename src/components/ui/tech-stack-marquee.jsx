"use client";
import React from "react";
import { motion } from "motion/react";

export const TechStackMarquee = ({
  className,
  technologies,
  duration = 20,
  reverse = false,
}) => {
  return (
    <div className={`flex w-full overflow-hidden ${className}`}>
      <motion.div
        animate={{
          translateX: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
          repeatType: "loop",
        }}
        className="flex flex-row gap-12 pr-12 w-max items-center"
      >
        {[...new Array(2)].fill(0).map((_, index) => (
          <React.Fragment key={index}>
            {technologies.map(({ name, icon }, i) => (
              <div 
                key={i} 
                className="flex items-center gap-3 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
              >
                {/* CSS filters force the logo to be monochrome (white since our site is dark) until hovered */}
                <img
                  src={icon}
                  alt={name}
                  className="h-10 w-10 object-contain brightness-0 invert hover:filter-none transition-all duration-300"
                />
                <span className="font-medium text-lg tracking-tight whitespace-nowrap text-white">{name}</span>
              </div>
            ))}
          </React.Fragment>
        ))}
      </motion.div>
    </div>
  );
};
