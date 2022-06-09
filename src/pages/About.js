import { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';

// Component imports
import { IncludeHelmet } from '../components/tools/IncludeHelmet';

// Lang utils import
import Lang from '../lang.json';

export function About() {
    let { lang } = useParams();

    const Content = Lang.pages.about;

    return <Fragment>
        <IncludeHelmet title={Content.info.title[lang]} desc={Content.info.desc[lang]} />
        <motion.div className="text-white font-poppins grid place-items-center">
            {Content.info.link[lang]}
        </motion.div>
    </Fragment>
}