import { motion } from "framer-motion";

const variants = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 93vw 30px)`,
    transition: {
      type: "spring",
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: "circle(0px at 93vw 30px)",
    transition: {
      delay: 0.5,
      type: "spring",
      stiffness: 400,
      damping: 40,
    },
  },
};

export const MenuBackground = () => {
  return (
    <div className="absolute inset-0 h-screen">
      <motion.div
        variants={variants}
        className="absolute inset-0 w-full bg-stone-100"
      />
    </div>
  );
};
