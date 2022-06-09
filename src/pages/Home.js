/* eslint-disable no-unused-vars */
// Package imports
import { Fragment, useRef, useState, useLayoutEffect, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AnimateSharedLayout, useMotionValue, useTransform, motion } from 'framer-motion';

// Icons imports
import { IoIosArrowDown } from 'react-icons/io';

// Custom component imports
import { IncludeHelmet } from '../components/tools/IncludeHelmet';

// Modules imports
import Lang from '../lang.json';
import { getDimensionObject } from '../source/useDimensions';

export function Home() {

    // Lang param from current location
    let { lang } = useParams();
    
    // Element references
    let body = useRef();
    let content = useRef();
    
    // React states
    let [ scrollHeight, setScrollHeight ] = useState(0);
    let [ scrollPosition, setScrollPosition ] = useState(0);
    let [ scrollPercent, setScrollPercent ] = useState(0);
    let [ orientation, setOrientation ] = useState(window.orientation);

    // Function to set scrollPosition to calculate scrollPercent
    const scrollHandle = () => {if (content.current) setScrollPosition(-getDimensionObject(content.current).y)};

    // useLayoutEffect function that updates when body or content changes
    useLayoutEffect(() => {
        if (!body.current || !content.current) return;
        let contentDims = getDimensionObject(content.current);
        setScrollHeight(contentDims.height - window.innerHeight);
        setScrollPosition(-contentDims.y);
    }, [body, content]);

    // useEffect function that only executes when scrollHeight or scrollPosition updates
    useEffect(() => {
        setScrollPercent(parseInt((scrollPosition / scrollHeight) * 100));
        if ('orientation' in window) setOrientation(window.orientation);
    }, [scrollHeight, scrollPosition]);

    // Scroll percent converted to motion value
    let scrollY = useMotionValue();
    scrollY.set(scrollPercent);

    // Bar height from scrollY value
    let barHeight = useTransform(scrollY, [0, 99], [0, window.innerHeight]);
    // Container X position track
    let contentX = useMotionValue(0);
    // Content opacity animation based from container X position
    let contentOpacity = useTransform(contentX, [0, -200], [1, 0]);
    
    // Boolean to know when to show full screen topbar
    let isHeaderVisible = scrollY.get() > 2;

    let className = " after:block after:w-full after:h-full after:bg-secondary after:z-20 after:absolute after:left-0 after:top-0"
    
    return <Fragment>
        {/* Current page info */}
        <IncludeHelmet title={Lang.pages.home.info.title[lang]} desc={Lang.pages.home.info.desc[lang]} />
        {/* Main container */}
        <motion.div className="w-full h-full relative overflow-hidden">
            {/* Scroll content container */}
            <motion.div ref={body} className="h-full overflow-y-auto hidden-scrollbar text-white" onScroll={scrollHandle}>

                <AnimateSharedLayout>
                    {/* Header */}
                    {isHeaderVisible && <motion.div transition={{ ease: [ .3, .5, .6, .9 ], duration: .5 }} layoutId='greeting__background' className="fixed z-10 top-0 left-0 w-full h-[4rem] bg-secondary pl-16 flex items-center">
                        {isHeaderVisible && <motion.span transition={{ ease: [ .1, .9, .5, 1 ], duration: .5 }} layoutId='greeting' className='text-white text-3xl font-bold'>{Lang.pages.home.body.top.greeting[lang]}</motion.span>}
                    </motion.div>}
                    {/* Center */}
                    {!isHeaderVisible && <motion.div transition={{ ease: [ .3, .5, .6, .9 ], duration: .75 }} layoutId='greeting__background' className={"fixed -z-10 top-0 left-0 w-full h-full bg-secondary flex items-center justify-center" + className}>
                        {!isHeaderVisible && <motion.span transition={{ ease: [ .2, .5, .7, .9 ], duration: .75 }} layoutId='greeting' className='text-white relative z-[21] text-3xl sm:text-4xl md:text-6xl xl:text-8xl mobile:portrait:text-6xl mobile:landscape:text-7xl font-bold'>{Lang.pages.home.body.top.greeting[lang]}</motion.span>}
                        <motion.span className="h-16 w-16 bottom-4 rounded-full fixed left-[calc(50%-2rem)] transform floating-animation" >
                            <IoIosArrowDown className="w-full h-full" />
                        </motion.span>
                    </motion.div>}
                </AnimateSharedLayout>

                {/* Scroll progress animation */}
                <motion.div className="bg-white fixed right-0 top-0 w-1" style={{ height: barHeight }}></motion.div>

                <motion.div
                    className="h-[200vh] z-[-10] flex flex-col items-center content-center"
                    ref={content}
                >
                    <motion.div
                        className="mt-[20vh] bg-white/20 w-full h-[90vh]"
                        initial={{ x: -200 }}
                        animate={isHeaderVisible ? { x: 0 } : { x: -200 }}
                        exit={{ x: -200 }}
                        style={{ x: contentX, opacity: contentOpacity }}
                        transition={{ duration: .25, ease: [ .6, .2, .8, .9 ] }}
                    >
                        
                    </motion.div>
                </motion.div>

            </motion.div>
        </motion.div>
    </Fragment>
}