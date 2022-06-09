const isLocalHost = Boolean(
    window.location.hostname === 'localhost' || 
    window.location.hostname === '[::1]' || 
    window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/)
);

export function register(config) {
    if ('serviceWorker' in navigator && process.env.NODE_ENV === 'production') {
        let publicUrl = new URL(process.env.PUBLIC_URL, window.location.href);

        if (publicUrl.origin !== window.location.origin) return;

        window.addEventListener('load', event => {
            let serviceWorkerURL = `${process.env.PUBLIC_URL}/service-worker.js`;
            if (isLocalHost) {
                checkValidServiceWorker(serviceWorkerURL, config);
                return;
            }
            registerValidServiceWorker(serviceWorkerURL, config);
        });
    }
}

function registerValidServiceWorker(serviceWorkerURL, config) {
    navigator.serviceWorker.register(serviceWorkerURL).then(registration => {
        registration.onupdatefound = () => {
            let installingWorker = registration.installing;
            if (installingWorker == null) return;

            installingWorker.onstatechange = () => {
                if (installingWorker.state === 'installed') {
                    if (navigator.serviceWorker.controller) {
                        config?.onUpdate?.(registration);
                        console.warn('New content is available and will be used when all tabs for this page are closed.');
                        return;
                    }
                    console.log('Content is ready for offline use.');
                    config?.onUpdate?.(registration);
                }
            }
        };
    }).catch(error => console.log('Error during service worker registration: ', error));
}

function checkValidServiceWorker(serviceWorkerURL, config) {
    fetch(serviceWorkerURL, { headers: { 'Service-Worker': 'script' } }).then(({ headers, status }) => {
        let contentType = headers.get('content-type');
        if (contentType != null && contentType.indexOf('javascript') === -1) {
            navigator.serviceWorker.ready.then(registration => {
                registration.unregister().then(() => window.location.reload());
            });
            return;
        }
        registerValidServiceWorker(serviceWorkerURL, config);
    }).catch(error => console.log('No internet connection found. App is running offline.'));
}

export function unregister() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.ready.then(registration => registration.unregister()).catch(error => console.log(error));
    }
}