import { Fragment } from 'react';
import { motion } from "framer-motion";

export function SVGIcon({ className, subClassName, d, children, pathLength }) {

    return <Fragment>
        <motion.svg
            className={className}
            width={d instanceof Array ? 23 : 24}
            height={d instanceof Array ? 23 : 24}
            variants={{ 
                in: { 
                    transition: { 
                        staggerChildren: d instanceof Array && d.length === 6 ? .125 : .25,
                        staggerDirection: 1,
                        duration: .25
                    }
                },
                out: {
                    transition: {
                        staggerChildren: .125,
                        staggerDirection: -1,
                        duration: .25
                    }
                }
            }}
            viewBox={d instanceof Array ? "0 0 23 23" : "0 0 24 24"}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {d instanceof Array
                ? d.map((path, index, arr) => <motion.path d={path} key={index} stroke="white" className={subClassName} pathLength={pathLength} transition={{ duration: arr.length === 6 ? .125 : .5 }} strokeWidth="1" />) 
                : <motion.path d={d} stroke="white" transition={{ duration: .5 }} pathLength={pathLength} className={subClassName} strokeWidth="2" />
            }
        </motion.svg>
    </Fragment>
}