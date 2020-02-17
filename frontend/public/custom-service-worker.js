// Points to the creator of this service worker (react application)
let reactClient;

// Enable communication between service worker and react app
self.addEventListener('message', event => {
    // if message is a "ping" string, we store the client sent the message into reactClient variable
    console.log(event);
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
        requireInteraction: true,
        icon: data.icon,
        image: data.image,
        actions: data.actions
    });
});

// Event listener de las acciones
self.addEventListener('notificationclick', function(event) {
    if (!event.action) return;
    reactClient.postMessage(event.action);
});