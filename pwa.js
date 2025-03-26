document.addEventListener('DOMContentLoaded', function() {
  // Check if the browser supports service workers
  if ('serviceWorker' in navigator) {
    // Register service worker
    navigator.serviceWorker.register('/service-worker.js')
      .then(function(registration) {
        console.log('Service Worker registered with scope:', registration.scope);
      })
      .catch(function(error) {
        console.error('Service Worker registration failed:', error);
      });
    
    // Add mobile install prompt
    let deferredPrompt;
    const installPrompt = document.createElement('div');
    installPrompt.className = 'pwa-install-prompt';
    installPrompt.innerHTML = 'Install Dublin Sports Mentor app for a better experience <button id="install-button">Install</button>';
    document.body.appendChild(installPrompt);
    
    // Hide the prompt initially
    installPrompt.style.display = 'none';
    
    // Listen for beforeinstallprompt event
    window.addEventListener('beforeinstallprompt', (e) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt
      e.preventDefault();
      // Stash the event so it can be triggered later
      deferredPrompt = e;
      // Show the install prompt
      installPrompt.style.display = 'block';
    });
    
    // Add click event for install button
    document.getElementById('install-button').addEventListener('click', (e) => {
      // Hide the app provided install promotion
      installPrompt.style.display = 'none';
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
    
    // Add mobile navigation
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    
    // Get current page path
    const currentPath = window.location.pathname;
    const pageName = currentPath.split('/').pop() || 'index.html';
    
    // Create mobile navigation links
    mobileNav.innerHTML = `
      <a href="index.html" class="${pageName === 'index.html' ? 'active' : ''}">Home</a>
      <a href="find-player.html" class="${pageName === 'find-player.html' ? 'active' : ''}">Find Player</a>
      <a href="login.html" class="${pageName === 'login.html' ? 'active' : ''}">Account</a>
    `;
    
    // Add mobile navigation to the page
    document.body.appendChild(mobileNav);
    
    // Add hamburger menu for small screens
    const header = document.querySelector('header');
    if (header && window.innerWidth <= 480) {
      const hamburger = document.createElement('div');
      hamburger.className = 'hamburger-menu';
      hamburger.innerHTML = '<span></span><span></span><span></span>';
      header.appendChild(hamburger);
      
      // Toggle navigation menu on hamburger click
      hamburger.addEventListener('click', function() {
        const navMenu = document.querySelector('nav ul');
        if (navMenu) {
          navMenu.classList.toggle('show');
        }
      });
    }
  }
});
