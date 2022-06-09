import { useState } from 'react';
import { motion } from 'framer-motion';

export function CubeTransition({ children, nobg = false, start = () => {}, end = () => {} }) {

    let [ display, setDisplay ] = useState("none");
    let [ isAnimating, setAnimating ] = useState(false);
    let S = .98;
    let D = 1.5;

    return <motion.div
        className="transition-container"
        initial={{
            rotateY: -90,
            x: '-100%',
            transformOrigin: "right",
            scale: 1,
            opacity: 0,
        }}
        animate={{
            rotateY: 0,
            x: 0,
            transformOrigin: "right",
            scale: [ 1, S, S, S, S, 1 ],
            opacity: [ 0, 1, 1, 1, 1, 1 ]
        }}
        exit={{
            x: '100%',
            rotateY: 90,
            transformOrigin: "left",
            scale: [ 1, S, S, S, S, 1 ],
            opacity: [ 1, 1, 1, 1, 1, 0, 0 ]
        }}
        transition={{
            duration: D,
            ease: [ .05, .125, .8, 1 ],
            x: {
                ease: [ .05, .2, .8, 1.05 ],
                duration: D
            }
        }}
        onAnimationStart={() => {
            setDisplay("block"); start();
            setAnimating(true);
            setTimeout(() => { setDisplay("none"); setAnimating(false); end(); }, 2100);
        }}
    >
        <motion.div
            initial={{ scale: 1 }}
            animate={{ scale: [ 1, .95, .95, 1 ] }}
            exit={{ scale: [ 1, .95, .95, 1 ] }}
            transition={{ duration: D }}
            className={`w-full h-full overflow-y-auto overflow-x-hidden ${nobg ? "" : "bg-white bg-opacity-5"}`}
        >
            {children}
            <motion.div className="z-[6] fixed top-0 left-0 w-full h-full" style={{ display }}></motion.div>
            <motion.div
                className={"z-[6] fixed top-0 left-0 w-full h-full bg-white/10"}
                animate={isAnimating ? "animating" : "hidden"}
                variants={{
                    animating: {
                        background: "rgb(255 255 255 / .1)",
                        display: "block"
                    },
                    hidden: {
                        background: "rgb(255 255 255 / 0)",
                        display: "none",
                        transition: {
                            duration: .25,
                            display: {
                                delay: .25
                            }
                        }
                    }
                }}
                transition={{ duration: .25 }}
            ></motion.div>
        </motion.div>
    </motion.div>
}