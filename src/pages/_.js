// Package imports
import { Fragment, useRef, useState, useLayoutEffect } from 'react';
import { useParams } from 'react-router-dom';
import { AnimateSharedLayout, motion, useMotionValue, useTransform, useUnmountEffect } from 'framer-motion';
// import { useInView } from 'react-intersection-observer';

// Component imports
import { IncludeHelmet } from '../components/tools/IncludeHelmet';
// import { SVGIcon } from '../components/SVGIcon';

// Module imports

// Lang utils import
import Lang from '../lang.json';

export function Home() {
    // Navitaiton params declaration
    let { lang } = useParams();

    // React states
    let [ scrollHeight, setScrollHeight ] = useState(0);
    let [ scrollPosition, setScrollPosition ] = useState(0);
    let [ scrollPercent, setScrollPercent ] = useState(0);
    let [ orientation, setOrientation ] = useState(window.orientation);

    // Constant variables
    const body = useRef();
    const container = useRef();

    // Function declarations
    const measure = () => setScrollPosition(-body.current.getBoundingClientRect().y);
    
    // Icons for decoration
    // const Icons = {
    //     Loop: "M10 10C9 9 8 8 6 8C4 8 2 9.5 2 12C2 14.5 4 16 6 16C8 16 9 15 12 12C15 9 16 8 18 8C20 8 22 9.5 22 12C22 14.5 20 16 18 16C16 16 15 15 14 14",
    //     Dice: [
    //         "M19 3H4C3.44772 3 3 3.44772 3 4V19C3 19.5523 3.44772 20 4 20H19C19.5523 20 20 19.5523 20 19V4C20 3.44772 19.5523 3 19 3Z",
    //         "M6.5 17C6.77614 17 7 16.7761 7 16.5C7 16.2239 6.77614 16 6.5 16C6.22386 16 6 16.2239 6 16.5C6 16.7761 6.22386 17 6.5 17Z",
    //         "M16.5 17C16.7761 17 17 16.7761 17 16.5C17 16.2239 16.7761 16 16.5 16C16.2239 16 16 16.2239 16 16.5C16 16.7761 16.2239 17 16.5 17Z",
    //         "M16.5 7C16.7761 7 17 6.77614 17 6.5C17 6.22386 16.7761 6 16.5 6C16.2239 6 16 6.22386 16 6.5C16 6.77614 16.2239 7 16.5 7Z",
    //         "M6.5 7C6.77614 7 7 6.77614 7 6.5C7 6.22386 6.77614 6 6.5 6C6.22386 6 6 6.22386 6 6.5C6 6.77614 6.22386 7 6.5 7Z",
    //         "M11.5 12C11.7761 12 12 11.7761 12 11.5C12 11.2239 11.7761 11 11.5 11C11.2239 11 11 11.2239 11 11.5C11 11.7761 11.2239 12 11.5 12Z",
    //     ],
    //     About: [
    //         "M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z",
    //         "M5 18L5.63604 17.364C9.15076 13.8492 14.8492 13.8492 18.364 17.364L19 18",
    //         "M9.65101 10.6443C8.95992 9.65702 8.95992 8.34298 9.65101 7.3557C10.7925 5.72502 13.2075 5.72502 14.349 7.3557C15.0401 8.34298 15.0401 9.65702 14.349 10.6443C13.2075 12.275 10.7925 12.275 9.65101 10.6443Z",
    //     ],
    //     Completed: [
    //         "M3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3C7.02944 3 3 7.02944 3 12Z",
    //         "M6.5 11.5L10.5 15.5L17.5 8.5",
    //     ]
    // };

    useLayoutEffect(() => {
        if (!body.current) return;

        let rect = body.current.getBoundingClientRect();

        if (scrollHeight === 0) setScrollHeight(rect.height);
        setScrollPercent(parseInt(scrollPosition / (scrollHeight - window.innerHeight) * 100));
        
        if (!('orientation' in window)) return;
        if (orientation !== window.orientation) setScrollHeight(rect.height);
        if (orientation !== window.orientation) setOrientation(window.orientation);
    }, [scrollHeight, scrollPosition, orientation]);

    useLayoutEffect(() => {
        if (!body.current) return;

        let rect = body.current.getBoundingClientRect();

        setScrollHeight(rect.height);
        setScrollPercent(parseInt(scrollPosition / (scrollHeight - window.innerHeight)))
    }, [body]);

    // Motion animated values
    let scrollY = useMotionValue();
    scrollY.set(scrollPercent);

    // Transformed motion values
    let scrollButton = useTransform(scrollY, [0, 95, 95, 95, 100], [0, 0, 0, 1, 1]);
    // let headerScrollRange = [0, 35];
    let greetingHidden = useTransform(scrollY, [0, 0, 0, 25, 25], [0, 0, 0, 1, 1]);

    return <Fragment>
        <IncludeHelmet title={Lang.pages.home.page.title[lang]} desc={Lang.pages.home.page.desc[lang]} />
        <div className="h-full overflow-y-auto [scroll-behavior:smooth]" onScroll={measure} ref={container}>
            <div className="bg-white h-[.125rem] fixed" style={{ width: `${scrollY.get()}%` }}></div>
            <motion.div className="h-[200vh] text-white p-4 md:p-6 lg:p-8 xl:p-12" ref={body}>

                {/* Page content */}
                <AnimateSharedLayout >
                    {
                        // Centrado
                        !greetingHidden.get() && <motion.div
                            layoutId='greeting'
                            className="fixed top-1/2 left-1/2 text-6xl grid place-items-center z-[-4]"
                        >
                            <motion.span className="grid place-content-center w-0 h-0">{Lang.pages.home.body.top.greeting[lang]}</motion.span>
                        </motion.div>
                    }
                    <motion.div className="absolute top-7 left-40 text-transparent" style={{ translateX: '50%', translateY: '50%' }}>
                        {
                            // Barra superior
                            greetingHidden.get() && <motion.div
                                layoutId='greeting'
                                className="text-4xl grid place-items-center text-white"
                            >
                                <motion.span className="grid place-content-center w-0 h-0">{Lang.pages.home.body.top.greeting[lang]}</motion.span>
                            </motion.div>
                        }
                    </motion.div>
                </AnimateSharedLayout>

                {/* Scroll-to-top button */}
                <motion.button
                    className='fixed bottom-4 right-4 w-14 h-14 bg-blue-300 rounded-full'
                    animate={!scrollButton.get() ? { translateX: '200%' } : { translateX: 0 }}
                    onClick={() => { if (!container.current) return; container.current.scrollTo(0, 0); }}
                >
                </motion.button>

            </motion.div>
        </div>
    </Fragment>
}