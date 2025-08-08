"use client";

import React, { CSSProperties, useState, forwardRef } from "react";
import { HiArrowNarrowRight } from "react-icons/hi";
import { motion, Variants } from "framer-motion";
import { oklch, formatCss } from "culori";
import { themeColors } from "../themes";

type ButtonParams = {
  text: string;
  arrow?: boolean;
  color?: string;
  width?: string;
  action?: () => void;
  className?: string;
  style?: CSSProperties;
};

const Button = forwardRef<HTMLDivElement, ButtonParams>(
  (
    {
      text,
      arrow = false,
      color = themeColors.primary,
      width = "fit-content",
      action = () => {},
      className = "px-[1rem] md:px-[1.3rem] lg:px-[1.5rem]",
      style = {},
    },
    ref
  ) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);
    const [isTouchScreen, setIsTouchScreen] = useState(false);

    let tempColor = oklch(color);
    tempColor.l -= 0.6;
    tempColor.c -= 0.11;
    const gradientDark = formatCss(tempColor);

    tempColor = oklch(color);
    tempColor.l -= 0.52;
    tempColor.c -= 0.11;
    const gradientLight = formatCss(tempColor);

    const getAnimationState = () => {
      if (isTouchScreen) return isClicked ? "clicked" : "default";
      else return isClicked ? "clicked" : isHovered ? "hovered" : "default";
    };

    return (
      <div
        ref={ref}
        className="relative rounded-[1.5rem] h-fit select-none cursor-pointer"
        style={{ width }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setIsClicked(false);
        }}
        onMouseDown={() => {
          setIsClicked(true);
          setIsTouchScreen(false);
        }}
        onTouchStart={() => {
          setIsClicked(true);
          setIsTouchScreen(true);
        }}
        onClick={action}
      >
        <motion.div
          variants={brickButtonScaleAnimation}
          initial="default"
          animate={getAnimationState()}
          className={`h-fit rounded-[1.5rem] border-[0.15rem] ${className}`}
          style={{
            width,
            borderColor: color,
            background: `linear-gradient(to bottom, ${gradientLight}, ${gradientDark})`,
            ...style,
          }}
        >
          <div className="flex flex-row space-x-[0.6rem] items-center justify-center">
            <h4
              className="py-[0.5rem] md:py-[0.6rem] lg:py-[0.75rem]"
              style={{ color }}
            >
              {text.toUpperCase()}
            </h4>
            {arrow && (
              <HiArrowNarrowRight
                className="mr-[-0.3rem] mt-[0.03rem] h-[1.4rem] lg:h-[1.6rem] w-auto"
                style={{ color }}
              />
            )}
          </div>
          <motion.div
            variants={brickButtonOverlayAnimation}
            initial="default"
            animate={getAnimationState()}
            className="absolute inset-0 w-full h-full rounded-[1.5rem] border-[0.15rem] bg-white opacity-0"
          />
        </motion.div>
      </div>
    );
  }
);

Button.displayName = "Button";
export default Button;

export const brickButtonScaleAnimation: Variants = {
  default: {
    scale: 1.0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  hovered: {
    scale: 1.0,
    transition: {
      duration: 0.3,
      ease: "easeInOut",
    },
  },
  clicked: {
    scale: 0.93,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

export const brickButtonOverlayAnimation: Variants = {
  default: {
    opacity: 0,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  hovered: {
    opacity: 0.1,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
  clicked: {
    opacity: 0.2,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};
