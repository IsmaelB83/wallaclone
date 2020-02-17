// VAPID Key for push notifications
const publicVapidKey = 'BCKzHuEXd7u1KviQLVodwYTGgJ6z7iJf-DYtLSNX6FTREky0uxvXCYMwenwp7oXB_3kgEOPGlEO3wYw6XAF2NmY';

// Register service worker
export const register = (login, callback) =>  {
    // Check for service workers capabilities
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        return console.error('Service workers not available');
    }

    // 1st regisger service worker
    console.log('Registering SERVICE WORKER...');
    registerServiceWorker()
    .then(registration => {
        // 2nd ask user permisson
        console.log('Asking form PERMISSIONS...');
        askPermission()
        .then (() => {
            // 3rd Ensure service worker is ready
            navigator.serviceWorker.ready
            .then(registration => {
                // 4th Registering push
                console.log('Registering PUSH...');
                registration.pushManager.subscribe({
                    userVisibleOnly: true,
                    applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
                })
                .then (subscription => {
                    // 5th Push subscription
                    console.log('Sending PUSH subscription...');
                    fetch(`${process.env.REACT_APP_NOTIFY_URL}subscribe/${login}`, { 
                        method: 'POST',
                        body: JSON.stringify(subscription),
                        headers: { 'content-type': 'application/json' }
                    })
                    .then (data => {
                        // 6th enable communication between service worker and the rest of the app (callback)
                        console.log('Calling the POST MESSAGE...');
                        navigator.serviceWorker.controller.postMessage("ping");
                        navigator.serviceWorker.addEventListener('message', function (event) {
                            callback(event.data);
                        })
                    })
                    .catch(error => console.error(error));
                })
                .catch (error => console.error (error));
            })
            .catch(error => console.error(error));
        })
        .catch(error => console.error(error));
    })
}

// Unregister
export const unregister = (login) =>  {
    navigator.serviceWorker.getRegistrations()
    .then(function(registrations) {
        for(let registration of registrations) {
            console.log('Sending PUSH delete subscription...');
            fetch(`${process.env.REACT_APP_NOTIFY_URL}unsubscribe/${login}`, { 
                method: 'POST',
                headers: { 'content-type': 'application/json' }
            })
            .catch(error => console.error(error));
            registration.unregister()
        } 
    })
    .catch(error => console.error(error));
}

// Register service worker. Returns a promise.
function registerServiceWorker() {
    return navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/custom-service-worker.js`)
    .then(registration => {
        console.log('Service worker successfully registered.');
        return registration;
    })
    .catch(error => console.error('Unable to register service worker.', error));
}

// Ask user permisson. Returns a promise.
function askPermission() {
    return new Promise((resolve, reject) => {
        const permissionResult = Notification.requestPermission(function(result) {
            resolve(result);
        });
        if (permissionResult) {
            permissionResult.then(resolve, reject);
        }
    })
    .then(permissionResult => {
        if (permissionResult !== 'granted') {
            throw new Error('We weren\'t granted permission.');
        }
    });
}

// Convert vapid key to urlBase64 format
function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');
    
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}