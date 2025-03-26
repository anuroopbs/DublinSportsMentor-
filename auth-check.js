// Auth state management
document.addEventListener('DOMContentLoaded', function() {
  // Check if user is logged in
  const user = JSON.parse(localStorage.getItem('user'));
  const protectedPages = ['find-player.html'];
  const currentPage = window.location.pathname.split('/').pop();
  
  // Update navigation based on auth state
  updateNavigation(user);
  
  // Redirect if trying to access protected page while not logged in
  if (!user && protectedPages.includes(currentPage)) {
    // Save the page user was trying to access
    localStorage.setItem('redirectAfterLogin', currentPage);
    
    // Redirect to login page
    window.location.href = 'login.html';
  }
  
  // Handle logout
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Sign out from Firebase
      firebase.auth().signOut().then(() => {
        // Clear user data from localStorage
        localStorage.removeItem('user');
        
        // Redirect to home page
        window.location.href = 'index.html';
      }).catch((error) => {
        console.error('Logout error:', error);
      });
    });
  }
});

// Update navigation based on auth state
function updateNavigation(user) {
  const navList = document.querySelector('nav ul');
  if (!navList) return;
  
  // Remove existing login/logout items
  const existingAuthItems = document.querySelectorAll('.auth-nav-item');
  existingAuthItems.forEach(item => item.remove());
  
  // Create new auth nav item
  const authItem = document.createElement('li');
  authItem.className = 'auth-nav-item';
  
  if (user) {
    // User is logged in, show user menu
    authItem.innerHTML = `
      <a href="#" class="user-menu-toggle">
        <span class="user-name">${user.displayName || user.email}</span>
        <span class="dropdown-icon">▼</span>
      </a>
      <div class="user-dropdown">
        <a href="profile.html">My Profile</a>
        <a href="#" id="logout-btn">Logout</a>
      </div>
    `;
    
    // Add event listener for dropdown toggle
    setTimeout(() => {
      const userMenuToggle = document.querySelector('.user-menu-toggle');
      const userDropdown = document.querySelector('.user-dropdown');
      
      if (userMenuToggle && userDropdown) {
        userMenuToggle.addEventListener('click', function(e) {
          e.preventDefault();
          userDropdown.classList.toggle('active');
        });
        
        // Close dropdown when clicking outside
        document.addEventListener('click', function(e) {
          if (!userMenuToggle.contains(e.target) && !userDropdown.contains(e.target)) {
            userDropdown.classList.remove('active');
          }
        });
      }
    }, 100);
  } else {
    // User is not logged in, show login link
    authItem.innerHTML = '<a href="login.html">Login</a>';
  }
  
  // Add to navigation
  navList.appendChild(authItem);
  
  // Add styles for user dropdown
  addUserDropdownStyles();
}

// Add styles for user dropdown
function addUserDropdownStyles() {
  // Check if styles already exist
  if (document.getElementById('user-dropdown-styles')) return;
  
  const styleElement = document.createElement('style');
  styleElement.id = 'user-dropdown-styles';
  styleElement.textContent = `
    .user-menu-toggle {
      display: flex;
      align-items: center;
      cursor: pointer;
    }
    
    .user-name {
      max-width: 150px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    
    .dropdown-icon {
      font-size: 10px;
      margin-left: 5px;
    }
    
    .user-dropdown {
      display: none;
      position: absolute;
      top: 100%;
      right: 0;
      background-color: white;
      box-shadow: 0 2px 10px rgba(0,0,0,0.1);
      border-radius: 5px;
      padding: 10px 0;
      z-index: 1000;
    }
    
    .user-dropdown.active {
      display: block;
    }
    
    .user-dropdown a {
      display: block;
      padding: 8px 15px;
      color: #333;
      text-decoration: none;
      transition: background-color 0.2s;
    }
    
    .user-dropdown a:hover {
      background-color: #f5f5f5;
    }
    
    .auth-nav-item {
      position: relative;
    }
  `;
  
  document.head.appendChild(styleElement);
}
