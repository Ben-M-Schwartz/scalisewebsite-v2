import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import Image from "next/image";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 550 : -550,
      opacity: 0,
      position: "absolute",
    };
  },
  center: {
    x: 0,
    opacity: 1,
    position: "relative",
  },
  exit: (direction: number) => {
    return {
      x: direction < 0 ? 550 : -550,
      opacity: 0,
      position: "absolute",
    };
  },
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const Images = ({ images }: { images: string[] }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  //eslint-disable-next-line
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <div className="relative flex h-full w-2/3 flex-col md:w-1/2">
        <div className="flex flex-col md:flex-row">
          <div className="flex w-1/3 flex-row max-md:order-1 md:w-1/6 md:flex-col">
            {images?.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setPage([index, page > index ? -1 : 1]);
                }}
              >
                <Image
                  className="full object-cover"
                  src={`/${image.trim()}`}
                  alt="image"
                  height={719}
                  width={540}
                />
              </button>
            ))}
          </div>
          <div className="relative h-full w-full overflow-hidden border-red-500">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={page}
                //eslint-disable-next-line
                //src={`/${(images[imageIndex] as string).trim()}`}
                custom={direction}
                //eslint-disable-next-line
                //@ts-ignore
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  delay: 0.2,
                  x: {
                    type: "tween",
                    duration: 0.7,
                    ease: "easeInOut",
                  },
                  opacity: { duration: 1 },
                }}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={1}
                onDragEnd={(e, { offset, velocity }) => {
                  const swipe = swipePower(offset.x, velocity.x);

                  if (swipe < -swipeConfidenceThreshold) {
                    paginate(1);
                  } else if (swipe > swipeConfidenceThreshold) {
                    paginate(-1);
                  }
                }}
                className="z-10 flex bg-transparent"
              >
                <Image
                  className="full -z-10 flex object-cover shadow-lg"
                  //eslint-disable-next-line
                  src={`/${(images[imageIndex] as string).trim()}`}
                  alt="image"
                  height={540}
                  width={540}
                />
              </motion.div>
            </AnimatePresence>
            <div
              className="next absolute right-3 top-1/2 z-10 flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full bg-white text-lg font-bold xl:right-10"
              onClick={() => paginate(1)}
            >
              {"‣"}
            </div>
            <div
              className="prev absolute left-3 top-1/2 z-10 flex h-10 w-10 -scale-x-100 transform cursor-pointer select-none items-center justify-center rounded-full bg-white text-lg font-bold xl:left-10"
              onClick={() => paginate(-1)}
            >
              {"‣"}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
