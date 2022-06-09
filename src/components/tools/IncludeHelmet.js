import { Helmet } from "react-helmet";

export function IncludeHelmet({ title = null, desc = null }) {

    return <Helmet>
        {title && <title>{title}</title>}
        {title && <meta property="og:title" content={title} />}
        {title && <meta name="apple-mobile-web-app-title" content={title} />}

        {desc && <meta name="description" content={desc} />}
        {desc && <meta property="og:description" content={desc} />}
    </Helmet>
}