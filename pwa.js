// PWA initialization and installation handling

// Register service worker
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/service-worker.js')
      .then(registration => {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(error => {
        console.error('Service Worker registration failed:', error);
      });
  });
}

// PWA installation prompt handling
let deferredPrompt;
const installButton = document.createElement('button');
installButton.textContent = 'Install App';
installButton.style.display = 'none';

// Create install prompt container
const promptContainer = document.createElement('div');
promptContainer.className = 'pwa-install-prompt';
promptContainer.textContent = 'Install this app on your device for a better experience';
promptContainer.appendChild(installButton);
document.body.appendChild(promptContainer);

window.addEventListener('beforeinstallprompt', (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  
  // Stash the event so it can be triggered later
  deferredPrompt = e;
  
  // Show the install button
  installButton.style.display = 'inline-block';
  promptContainer.style.display = 'block';
});

installButton.addEventListener('click', () => {
  // Hide the app provided install promotion
  promptContainer.style.display = 'none';
  
  // Show the install prompt
  deferredPrompt.prompt();
  
  // Wait for the user to respond to the prompt
  deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // Clear the deferredPrompt variable
    deferredPrompt = null;
  });
});

window.addEventListener('appinstalled', (evt) => {
  console.log('App was installed');
  promptContainer.style.display = 'none';
});

// Add offline/online status indicator
const statusIndicator = document.createElement('div');
statusIndicator.className = 'connection-status';
statusIndicator.style.position = 'fixed';
statusIndicator.style.top = '0';
statusIndicator.style.right = '0';
statusIndicator.style.padding = '5px 10px';
statusIndicator.style.fontSize = '12px';
statusIndicator.style.zIndex = '1000';
statusIndicator.style.display = 'none';
document.body.appendChild(statusIndicator);

function updateOnlineStatus() {
  const isOnline = navigator.onLine;
  
  if (isOnline) {
    statusIndicator.textContent = 'Online';
    statusIndicator.style.backgroundColor = '#4CAF50';
    statusIndicator.style.color = 'white';
    statusIndicator.style.display = 'none';
    document.body.classList.remove('offline');
    
    // Process sync queue if we have the db module loaded
    if (window.db && typeof window.db.processSyncQueue === 'function') {
      window.db.processSyncQueue();
    }
  } else {
    statusIndicator.textContent = 'Offline';
    statusIndicator.style.backgroundColor = '#F44336';
    statusIndicator.style.color = 'white';
    statusIndicator.style.display = 'block';
    document.body.classList.add('offline');
  }
}

window.addEventListener('online', updateOnlineStatus);
window.addEventListener('offline', updateOnlineStatus);

// Initial check
updateOnlineStatus();

// Initialize database if available
if (window.db && typeof window.db.initializeDatabase === 'function') {
  window.db.initializeDatabase();
}
