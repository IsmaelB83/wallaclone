// All information regarding serviceworker lifecycle here:
// https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle

// VAPID Key for push notifications
const publicVapidKey = 'BCKzHuEXd7u1KviQLVodwYTGgJ6z7iJf-DYtLSNX6FTREky0uxvXCYMwenwp7oXB_3kgEOPGlEO3wYw6XAF2NmY';

// Register service worker
export const register = (login, callback) =>  {

    console.log('SERVICE WORKER INTIALIZATION PROCESS STARTING...')

    // 0. Check for service workers capabilities
    if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
        return console.error('Service workers not available');
    }
    
    // 0. Unregister all in case there is any
    console.log('Unregister all previous SERVICE WORKERS...');
    unregister(login);
    
    // 1. register service worker
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
                        try {
                            // MY assumption regarding "ready promise" resolves when page is controlled by service worker IS WRONG.
                            // https://github.com/w3c/ServiceWorker/issues/799
                            // ERROR: navigator.serviceWorker.ready
                            // SOLUTION: use the custom promise developed by the polymer team (code at the end of this file)
                            window._controlledPromise
                            .then(registration => {
                                // 6. enable communication between service worker and the rest of the app (callback)
                                console.log('Calling the POST MESSAGE...');
                                navigator.serviceWorker.addEventListener('message', event => callback(event.data));
                                navigator.serviceWorker.controller.postMessage('ping');
                                console.log('SERVICE WORKER INTIALIZATION PROCESS FINISHED!');
                            })    
                        } catch (error) {
                            console.error(error)
                        }
                    })
                    .catch(error => console.error(error));
                })
                .catch(error => console.error(error));
            })
            .catch (error => console.error (error));
        })
        .catch(error => console.error(error));
    });
}

// Unregister
export const unregister = login =>  {
    return navigator.serviceWorker.getRegistrations()
    .then(registrations => {
        for(let registration of registrations) {
            fetch(`${process.env.REACT_APP_NOTIFY_URL}unsubscribe/${login}`, { 
                method: 'POST',
                headers: { 'content-type': 'application/json' }
            })
            .catch();
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

/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at
http://polymer.github.io/LICENSE.txt The complete set of authors may be found at
http://polymer.github.io/AUTHORS.txt The complete set of contributors may be
found at http://polymer.github.io/CONTRIBUTORS.txt Code distributed by Google as
part of the polymer project is also subject to an additional IP rights grant
found at http://polymer.github.io/PATENTS.txt
*/
// Provides an equivalent to navigator.serviceWorker.ready that waits for the
// page to be controlled, as opposed to waiting for the active service worker.
// See https://github.com/slightlyoff/ServiceWorker/issues/799
window._controlledPromise = new Promise(function(resolve) {
    // Resolve with the registration, to match the .ready promise's behavior.
    var resolveWithRegistration = function() {
        navigator.serviceWorker.getRegistration().then(function(registration) {
            resolve(registration);
        });
    };
    
    if (navigator.serviceWorker.controller) {
        resolveWithRegistration();
    } else {
        navigator.serviceWorker.addEventListener('controllerchange', resolveWithRegistration);
    }
});