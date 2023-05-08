import * as React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { wrap } from "popmotion";
import Image from "next/image";

const variants = {
  enter: (direction: number) => {
    return {
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    };
  },
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    position: "relative",
  },
  exit: (direction: number) => {
    return {
      //zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      position: "absolute",
    };
  },
};

/**
 * Experimenting with distilling swipe offset and velocity into a single variable, so the
 * less distance a user has swiped, the more velocity they need to register as a swipe.
 * Should accomodate longer swipes and short flicks without having binary checks on
 * just distance thresholds and velocity > 0.
 */
const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
  return Math.abs(offset) * velocity;
};

export const Images = ({ images }: { images: string[] }) => {
  const [[page, direction], setPage] = useState([0, 0]);

  // We only have 3 images, but we paginate them absolutely (ie 1, 2, 3, 4, 5...) and
  // then wrap that within 0-2 to find our image ID in the array below. By passing an
  // absolute page index as the `motion` component's `key` prop, `AnimatePresence` will
  // detect it as an entirely new image. So you can infinitely paginate as few as 1 images.

  //eslint-disable-next-line
  const imageIndex = wrap(0, images.length, page);

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  return (
    <>
      <div className="relative flex h-full w-2/3 flex-col md:w-1/2">
        <div className="flex flex-col md:flex-row">
          <div className="flex w-1/3 flex-row max-md:order-1 md:flex-col lg:w-1/6">
            {images?.map((image, index) => (
              <button
                key={index}
                onClick={() => {
                  setPage([index, page > index ? -1 : 1]);
                }}
              >
                <Image
                  className="full object-cover shadow-lg"
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
              <motion.img
                key={page}
                //eslint-disable-next-line
                src={`/${(images[imageIndex] as string).trim()}`}
                custom={direction}
                //eslint-disable-next-line
                //@ts-ignore
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: {
                    type: "tween",
                    duration: 1,
                    /*                     type: "spring",
                    stiffness: 100,
                    damping: 30,
                    mass: 5, */
                  },
                  opacity: { duration: 0.7 },
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
                className=""
              />
            </AnimatePresence>
            <div
              className="next absolute right-10 top-1/2 z-10 flex h-10 w-10 cursor-pointer select-none items-center justify-center rounded-full bg-white text-lg font-bold"
              onClick={() => paginate(1)}
            >
              {"‣"}
            </div>
            <div
              className="prev absolute left-10 top-1/2 z-10 flex h-10 w-10 -scale-x-100 transform cursor-pointer select-none items-center justify-center rounded-full bg-white text-lg font-bold"
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
