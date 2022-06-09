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

    if (rendering) return <div>

    </div>;

    if ('caches' in window) setLang(
        caches.open('portfolio')
        .then(cache => {
            if (!cache) {
                console.warn('Couldn\'t open cache storage.');
                return null;
            }
            return cache.match('/lang', { ignoreSearch: true });
        })
        .then(body => {
            if (body == null) return null;
            if (!body.body) {
                
            }
        })
    );

    setRendering(true);

}