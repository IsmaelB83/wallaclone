// Points to the creator of this service worker (react application)
let reactClient;

// Enable communication between service worker and react app
self.addEventListener('message', event => {
    if (event.data == "ping") { 
        reactClient = event.source;  
    }
});

// Push notification received
self.addEventListener('push', e => {
    // Show notification
    const data = e.data.json();
    self.registration.showNotification(data.title, {
        body: data.body,
        data: data.slug,
        requireInteraction: true,
        icon: data.icon,
        image: data.image,
        actions: data.actions,
        tag: data.slug
    });
});

// Event listener de las acciones
self.addEventListener('notificationclick', function(event) {
    if (!event.action) return;
    const slug = event.notification.data
    switch (event.action) {
        case 'delete':
            reactClient.postMessage({ 
                action: 'delete',
                data: slug
            });
            break;
        case 'detail':
            reactClient.postMessage({ 
                action: 'navigate',
                data: `/advert/${slug}`
            });
            break;
        case 'favorites':
            reactClient.postMessage({ 
                action: 'navigate',
                data: 'favorites'
            });
            break;
        case 'add':
            reactClient.postMessage({ 
                action: 'add',
                data: slug
            });
            break;
    }
});