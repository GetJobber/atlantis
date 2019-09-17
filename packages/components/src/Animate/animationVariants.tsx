export const animationVariants = {
  slideDown: {
    initial: { y: -4, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    exit: { y: -4, opacity: 0 },
  },

  popIn: {
    initial: { scale: 0.8, opacity: 0.8 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
  },

  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 0.8 },
    exit: { opacity: 0 },
  },
};
