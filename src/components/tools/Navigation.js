// Package imports
import { AnimateSharedLayout, motion } from "framer-motion";
import { useState, Fragment, useEffect, useRef } from 'react';
import { NavLink, useLocation } from "react-router-dom";
import { RiAccountCircleFill as AboutIcon } from 'react-icons/ri';
import { IoHome as HomeIcon, IoFileTrayFull as ProjectsIcon } from 'react-icons/io5';
import Flags from 'country-flag-icons/react/3x2';

// Custom Component imports

// Lang utils import
import Lang from '../../lang.json';
import { isMobile } from "../../source/isMobile";

function Link({ title = undefined, url, children, onClick, isAnyActive = false, setAnyActive = () => {} }) {

    let Location = useLocation();

    let [ isActive, setActive ] = useState(false);
    let [ isHovered, setHovered ] = useState(false);

    useEffect(() => {
        setActive(url.indexOf(Location.pathname) !== -1);
    }, [Location, url]);

    return <motion.button
        onClick={isActive ? () => {} : onClick}
        variants={{
            closed: {
                opacity: 0,
                x: '-50%',
            },
            open: {
                opacity: 1,
                x: '0%',
            }
        }}
        onMouseEnter={() => { setAnyActive(isMobile() ? false : true); setHovered(isMobile() ? false : true); }}
        onMouseLeave={() => { setAnyActive(false); setHovered(false); }}
        className={"relative shadow-lg desktop:hover:shadow-xl text-xl rounded-lg from-blue-400 to-cyan-600" + (isActive ? " cursor-not-allowed" : "")}
    >
        {!isActive && <NavLink to={url} title={title}>{children}</NavLink>}
        {isActive && <motion.span>{children}</motion.span>}
        {(!isAnyActive && isActive) && <motion.div layoutId="selected-page" className="ring-4 -z-10 ring-blue-600 absolute top-0 left-0 w-full h-full rounded-lg"></motion.div>}
        {isHovered && <motion.div layoutId="selected-page" className={"ring-4 -z-10 absolute top-0 left-0 w-full h-full rounded-lg" + (isActive ? " ring-red-400" : " ring-cyan-400")}></motion.div>}
        {/* ring-cyan-600 | ring-red-600 */}
    </motion.button>
}

/** @param {{ lang: "es" | "en"; isAnimating: boolean; }} param0 */
export function Navigation({ lang = "es", isAnimating = false }) {

    lang = lang || "es";

    let [ isOpen, setOpen ] = useState(false);
    let [ isAnyActive, setAnyActive ] = useState(false);
    let Flag = Flags[Lang.utilities["available-langs"][lang]?.icon]

    const handleClick = () => { setOpen(!isOpen); };
    const _handleClick = () => setTimeout(() => setOpen(false), 200);
    const close = () => { setTimeout(setOpen(false), 200); };

    let [ wHeight, setHeight ] = useState(document.body.clientHeight);

    useEffect(() => {
        const measure = () => setHeight(ref.current?.getBoundingClientRect().height ?? 0);
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, []);

    const ref = useRef(null);

    return <Fragment>
        <motion.nav
            ref={ref}
            className={"absolute h-full z-50 font-poppins w-full mobile:portrait:w-full sm:w-3/5 md:w-2/5 sm:max-w-md bg-white flex flex-col items-center zoom:justify-start desktop:justify-center mobile:landscape:justify-start mobile:portrait:justify-center desktop:overflow-y-auto mobile:landscape:overflow-y-auto desktop:sm:overflow-y-hidden sm:justify-center gap-10 py-10"}
            initial="closed"
            animate={isOpen ? "open" : "closed"}
            exit="closed"
            variants={{
                open: (height = 720) => ({
                    clipPath: `circle(${height / 8}rem at 2rem 2rem)`,
                    transition: {
                        duration: .5,
                        ease: [ .75, -.025, .15, 1 ],
                        when: "beforeChildren",
                        staggerChildren: .125 / 1.25,
                        staggerDirection: 1,
                    }
                }),
                closed: {
                    clipPath: "circle(1.5rem at 2rem 2rem)",
                    transition: {
                        duration: .5,
                        ease: [ .05, .25, .15, 1 ],
                        staggerChildren: .125 / 2,
                        staggerDirection: -1,
                        delay: .2,
                    }
                }
            }}
            custom={wHeight}
        >
            {isAnimating && <div className="absolute z-30 w-full h-full top-0 left-0"></div>}
            <AnimateSharedLayout>
                <Link url="/chose-lang/" onClick={close} isAnyActive={isAnyActive} setAnyActive={setAnyActive}>
                    <span className="px-6 py-4 whitespace-nowrap flex items-center justify-center gap-3">
                        {Flag && <Flag className="inline-block h-[1.5em]"/>}
                        {Lang.pages["chose-lang"].info.link[lang]}
                    </span>
                </Link>
                <Link url={`/${lang}/home/`} onClick={_handleClick} isAnyActive={isAnyActive} setAnyActive={setAnyActive}>
                    <span className="px-6 py-4 whitespace-nowrap flex items-center justify-center gap-3">
                        <HomeIcon className="inline-block scale-125" />
                        {Lang.pages.home.info.link[lang]}
                    </span>
                </Link>
                <Link url={`/${lang}/about/`} onClick={_handleClick} isAnyActive={isAnyActive} setAnyActive={setAnyActive}>
                    <span className="px-6 py-4 whitespace-nowrap flex items-center justify-center gap-3">
                        <AboutIcon className="inline-block scale-125" />
                        {Lang.pages.about.info.link[lang]}
                    </span>
                </Link>
                <Link url={`/${lang}/projects/`} onClick={_handleClick} isAnyActive={isAnyActive} setAnyActive={setAnyActive}>
                    <span className="px-6 py-4 whitespace-nowrap flex items-center justify-center gap-3">
                        <ProjectsIcon className="inline-block scale-125" />
                        {Lang.pages.projects.info.link[lang]}
                    </span>
                </Link>
            </AnimateSharedLayout>
        </motion.nav>
        <motion.button className="absolute top-2 left-2 z-50 rounded-full w-12 h-12 grid place-items-center bg-white shadow-lg" onClick={handleClick} >
            <motion.svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 24 24" height="24" width="24" className="overflow-visible w-3/5 h-3/5" xmlns="http://www.w3.org/2000/svg" >
                <motion.path stroke="currentColor" strokeWidth={2} animate={!isOpen ? { d: "M22 4L2 4" } : { d: "M22 2L2 22" }}></motion.path>
                <motion.path stroke="currentColor" strokeWidth={2} d="M22 12L2 12" animate={!isOpen ? { opacity: 1 } : { opacity: 0 }}></motion.path>
                <motion.path stroke="currentColor" strokeWidth={2} animate={!isOpen ? { d: "M22 20L2 20" } : { d: "M22 22L2 2" }}></motion.path>
            </motion.svg>
        </motion.button>
    </Fragment>
}