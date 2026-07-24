export const ANIMATION = {
  spring: {
    type: "spring",
    stiffness: 180,
    damping: 24,
    mass: 0.8,
  },
  ease: {
    type: "tween",
    ease: [0.16, 1, 0.3, 1],
    duration: 0.35,
  },
  delays: {
    staggerStep: 0.05,
  },
  transitions: {
    fast: 0.2,
    normal: 0.35,
    slow: 0.4,
  }
} as const;
