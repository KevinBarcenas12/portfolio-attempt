import { motion } from 'framer-motion';
import { useState, Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { BsArrowRight as ArrowIcon } from 'react-icons/bs';
import Flags from 'country-flag-icons/react/3x2';

import Lang from '../lang.json';
import { IncludeHelmet } from '../components/tools/IncludeHelmet';

/** @param {{ lang: "es" | "en"; newLang: async (lang: "es" | "en") => Promise<void> }} param0 */
export function ChoseLang({ lang, newLang, setLang }) {

    let [ currentLang, setCurrentLang ] = useState(!lang ? "es" : lang);
    const Content = Lang.pages['chose-lang'];

    const className = {
        container: "grid place-items-center w-full h-full absolute top-0 left-0",
        content: {
            container: "bg-white px-6 py-6 sm:py-12 rounded-xl flex flex-col gap-6 z-20 items-center font-poppins text-lg lg:text-xl xl:text-2xl w-3/4 lg:w-3/5 xl:w-[32rem] text-center",
            text: "cursor-default",
            selection: {
                container: "gap-3 flex justify-evenly items-center flex-col md:flex-row mobile:flex-col",
                text: "cursor-pointer animated-line from-blue-300/50 to-purple-400/50 hover:from-red-400/50 hover:to-fuchsia-500/50 desktop:hover:shadow-xl rounded-md font-bold p-1 text-center w-fit relative h-auto flex items-center flex-row gap-2"
            },
            button: {
                container: "bg-cyan-500 p-2 rounded-xl",
                text: "text-white font-bold flex flex-row items-center gap-1 hover:gap-3 transition-all duration-500"
            }
        }
    };

    return <Fragment>
        <IncludeHelmet title={Lang.pages['chose-lang'].info.title[lang]} desc={Lang.pages['chose-lang'].info.desc[lang]} />
        <motion.div className={className.container}>
            <motion.div
                initial={{
                    x: -300,
                    opacity: 0,
                }}
                animate={{
                    x: 0,
                    opacity: 1,
                    transition: {
                        duration: .75,
                        delay: .75,
                    }
                }}
                exit={{
                    x: 300,
                    opacity: 0,
                }}
                transition={{ when: "beforeChildren", duration: .75 }}
                className={className.content.container}
            >
                <span className={className.content.text}>{Content.body.title[currentLang]}:</span>
                <div className={className.content.selection.container}>
                    {Object.keys( Lang.utilities['available-langs'] ).map(
                        /** @param { "es" | "en" } key @param {number} index */
                        (key, index) => {

                            const Flag = Flags[Lang.utilities['available-langs'][key].icon];

                            return (
                                <motion.div
                                    className={className.content.selection.text + (currentLang === key ? " active shadow-xl" : " shadow-lg")}
                                    key={index}
                                    onClick={() => { setCurrentLang(key); }}
                                >
                                    <span>{Lang.utilities['available-langs'][key].name[currentLang]}</span> <span><Flag className="h-[.75em] inline-block" /></span>
                                </motion.div>
                            )
                        }
                    )}
                </div>
                <motion.button
                    variants={{
                        hidden: { x: 100, opacity: 0 },
                        visible: { x: 0, opacity: 1 }
                    }}
                    animate={currentLang ? "visible" : "hidden"}
                    className={className.content.button.container}
                    onClick={async () => { await newLang(currentLang); setLang(currentLang); }}
                >
                    <NavLink to={`/${currentLang}/home/`} className={className.content.button.text}>{Content.body.button[currentLang]} <ArrowIcon className="inline-block" /></NavLink>
                </motion.button>
            </motion.div>
        </motion.div>
    </Fragment>
}