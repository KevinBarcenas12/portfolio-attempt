// Package imports
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';

// Custom component imports
import { CubeTransition } from './components/CubeTransition';
import { ChoseLang } from './pages/ChoseLang';
import { Home } from './pages/Home';
import { Navigation } from './components/tools/Navigation';

// Custom module imports
import { IncludeHelmet } from './components/tools/IncludeHelmet';

// Lang utils import
// import Lang from './lang.json';
import { About } from './pages/About';
import { Projects } from './pages/Projects';

export function App() {

    let [ lang, setLang ] = useState(null);
    let [ rendering, setRendering ] = useState(false);
    let [ isAnimating, setAnimating ] = useState(false);
    
    let Location = useLocation();

    // fetch('https://api.github.com/users/kevinbarcenas12/repos').then(response => response.json()).then(console.log);

    

    if (!rendering) (async function() {
        if ("caches" in window) {
            let cache = await caches.open("portfolio");
            if (!cache) {
                console.warn("Could not open cache storage");
                setRendering(true);
                return;
            }
            let body = await cache.match("/lang");
            if (!body?.body) {
                console.log("Could not find cache storage, creating it.");
                cache.put("/lang", new Response(JSON.stringify("")));
                setLang(undefined);
                setRendering(true);
                return;
            }
            setLang(await body.json());
            setRendering(true);
            return;
        }
        setLang(undefined);
        setRendering(true);
        return;
    })();
    async function newLang(lang) {
        if (!lang) {
            console.error("Must provide a lang.");
            return;
        }
        if ("caches" in window) {
            let cache = await caches.open("portfolio");
            if (!cache) {
                console.warn("Could not open cache storage.");
                return;
            }
            await cache.put("/lang", new Response(JSON.stringify(lang)));
        }
        else console.warn("Cache storage not supported.");
    };

    return rendering && <div>
        <IncludeHelmet title={"Redirecting..."} desc={""} />
        <AnimatePresence initial={performance.getEntriesByType("navigation")[0].type !== "reload"} >
            <Routes key={Location.pathname} location={Location}>
                <Route index element={<Navigate to={!lang ? "/chose-lang/" : `/${!lang ? "es" : lang}/home/`} />} />
                <Route path="/chose-lang/" element={<ChoseLang lang={lang} newLang={newLang} setLang={setLang} />} />
                <Route path="/:lang/home/" element={<CubeTransition nobg start={() => { setAnimating(true); }} end={() => { setAnimating(false); }}><Home /></CubeTransition>} />
                <Route path="/:lang/about/" element={<CubeTransition nobg start={() => { setAnimating(true); }} end={() => { setAnimating(false); }}><About /></CubeTransition>} />
                <Route path="/:lang/projects//*" element={<CubeTransition nobg start={() => { setAnimating(true); }} end={() => { setAnimating(false); }}><Projects /></CubeTransition>} />
            </Routes>
        </AnimatePresence>
        <Navigation isAnimating={isAnimating} lang={lang} />
    </div>
}