
const CACHE_NAME = 'eco-skin-v1';
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/favicon.ico'
];

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  const { action, data } = event;
  const notificationData = event.notification.data || {};
  
  switch (action) {
    case 'complete':
      if (notificationData.type === 'routine') {
        // Mark routine as complete
        console.log('Routine marked as complete:', notificationData.routineName);
      }
      break;
      
    case 'snooze':
      if (notificationData.type === 'routine') {
        // Reschedule notification for 15 minutes later
        const snoozeTime = new Date(Date.now() + 15 * 60 * 1000);
        self.registration.showNotification(event.notification.title, {
          ...event.notification,
          timestamp: snoozeTime.getTime()
        });
      }
      break;
      
    case 'view':
      if (notificationData.type === 'product') {
        // Open recommendations page
        event.waitUntil(
          clients.openWindow('/recommendations')
        );
      }
      break;
      
    case 'dismiss':
      // Just close the notification
      break;
      
    case 'confirm':
      if (notificationData.type === 'appointment') {
        console.log('Appointment confirmed:', notificationData.appointmentType);
      }
      break;
      
    case 'reschedule':
      if (notificationData.type === 'appointment') {
        // Open calendar/scheduling page
        event.waitUntil(
          clients.openWindow('/custom-planner')
        );
      }
      break;
      
    default:
      // Default action - open the app
      event.waitUntil(
        clients.openWindow('/')
      );
      break;
  }
});

// Handle push notifications (for future server-sent notifications)
self.addEventListener('push', (event) => {
  if (event.data) {
    const options = event.data.json();
    event.waitUntil(
      self.registration.showNotification(options.title, options)
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

function doBackgroundSync() {
  // Handle any queued actions when coming back online
  return Promise.resolve();
}
