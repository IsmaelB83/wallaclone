// VAPID Key for push notifications
const publicVapidKey = 'BCKzHuEXd7u1KviQLVodwYTGgJ6z7iJf-DYtLSNX6FTREky0uxvXCYMwenwp7oXB_3kgEOPGlEO3wYw6XAF2NmY';

// Register service worker
export const register = (login, callback) =>  {
    // 0. Check for service workers capabilities
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        return console.error('Service workers not available');
    }
    // 1. regisger service worker
    console.log('Registering SERVICE WORKER...');
    registerServiceWorker()
    .then(registration => {
        // 2. ask user permisson
        console.log('Asking form PERMISSIONS...');
        askPermission()
        .then (() => {
            // 3. Registering push
            console.log('Registering PUSH...');
            subscribeUserToPush()
            .then (subscription => {
                // 4. Push subscription
                console.log('Sending PUSH subscription...');
                sendSubscriptionToBackEnd(subscription, login)
                .then (result => {
                    // 5. Ensure service worker is ready
                    navigator.serviceWorker.ready
                    .then(registration => {
                        // 6. enable communication between service worker and the rest of the app (callback)
                        // IMPORTANT!!! Even with all these promises fulfilled, andthe previous .ready promise.. sometimes sw
                        // is still not ready here. Loop with set interval until post message works.
                        const postMessage = setInterval(() => {
                            try {
                                console.log('Calling the POST MESSAGE...');
                                navigator.serviceWorker.controller.postMessage("ping");
                                navigator.serviceWorker.addEventListener('message', function (event) {
                                    callback(event.data);    
                                }); 
                                console.log('ALL SET!')
                                clearInterval(postMessage);
                            } catch (error) {
                                console.error(error);
                            }
                        }, 2000);
                    })
                    .catch(error => console.error(error));
                })
                .catch(error => console.error(error));
            })
            .catch (error => console.error (error));
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

// Subscribe to Push
function subscribeUserToPush() {
    return navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/custom-service-worker.js`)
    .then(registration => {
        const subscribeOptions = {
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
        };
        return registration.pushManager.subscribe(subscribeOptions);
    })
    .then(function(pushSubscription) {
        console.log('Received PushSubscription');
        return pushSubscription;
    });
}

// Susbcribe in Backend
function sendSubscriptionToBackEnd(subscription, login) {
    return fetch(`${process.env.REACT_APP_NOTIFY_URL}subscribe/${login}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(subscription)
    })
    .then(response => {
        if (!response.ok) { throw new Error('Bad status code from server.'); }
        return response.json();
    })
    .then(responseData => {
        if (!(responseData.data && responseData.data.success)) {
            throw new Error('Bad response from server.');
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