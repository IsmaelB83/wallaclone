// VAPID Key for push notifications
const publicVapidKey = 'BCKzHuEXd7u1KviQLVodwYTGgJ6z7iJf-DYtLSNX6FTREky0uxvXCYMwenwp7oXB_3kgEOPGlEO3wYw6XAF2NmY';

// Register service worker
export const register = (login) =>  {
    // Check for service workers capabilities
    if ('serviceWorker' in navigator) {
        console.log('Registering SERVICE WORKER...');
        navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/custom-service-worker.js`)
        .then(registration => {
            console.log('Registering PUSH...');
            registration.pushManager.subscribe({
                userVisibleOnly: true,
                applicationServerKey: urlBase64ToUint8Array(publicVapidKey)
            })
            .then (subscription => {
                console.log('Sending PUSH subscription...');
                fetch(`${process.env.REACT_APP_NOTIFY_URL}subscribe/${login}`, { 
                    method: 'POST',
                    body: JSON.stringify(subscription),
                    headers: { 'content-type': 'application/json' }
                })
                .catch(error => console.error(error));
            })
            .catch (error => console.error (error));
        })
        .catch (error => console.error(error));
    }
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