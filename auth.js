document.addEventListener('DOMContentLoaded', function() {
  // Tab switching functionality
  const tabs = document.querySelectorAll('.auth-tab');
  const forms = document.querySelectorAll('.auth-form');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', function() {
      const targetForm = this.getAttribute('data-tab');
      
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      this.classList.add('active');
      
      // Show target form
      forms.forEach(form => {
        form.classList.remove('active');
        if (form.id === `${targetForm}-form`) {
          form.classList.add('active');
        }
      });
    });
  });
  
  // Forgot password link
  const forgotPasswordLink = document.getElementById('forgot-password-link');
  if (forgotPasswordLink) {
    forgotPasswordLink.addEventListener('click', function(e) {
      e.preventDefault();
      const loginForm = document.getElementById('login-form');
      const forgotForm = document.getElementById('forgot-password-form');
      if (loginForm && forgotForm) {
        loginForm.classList.remove('active');
        forgotForm.classList.add('active');
        // Remove active state from tabs
        document.querySelectorAll('.auth-tab').forEach(tab => tab.classList.remove('active'));
      }
    });
  }
  
  // Back to login link
  const backToLoginLink = document.getElementById('back-to-login-link');
  if (backToLoginLink) {
    backToLoginLink.addEventListener('click', function(e) {
      e.preventDefault();
      forms.forEach(form => form.classList.remove('active'));
      document.getElementById('login-form').classList.add('active');
      tabs[0].classList.add('active');
    });
  }
  
  // Email/Password Login
  const loginBtn = document.getElementById('login-btn');
  if (loginBtn) {
    loginBtn.addEventListener('click', function() {
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
      
      if (!email || !password) {
        alert('Please enter both email and password');
        return;
      }
      
      firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Show success message
          showAuthSuccess('Login Successful', 'You have been logged in successfully. Redirecting...');
          
          // Redirect to home page after a short delay
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 2000);
        })
        .catch((error) => {
          alert(`Login failed: ${error.message}`);
        });
    });
  }
  
  // Email/Password Registration
  const registerBtn = document.getElementById('register-btn');
  if (registerBtn) {
    registerBtn.addEventListener('click', function() {
      const name = document.getElementById('register-name').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
      const confirmPassword = document.getElementById('register-confirm-password').value;
      
      if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields');
        return;
      }
      
      if (password !== confirmPassword) {
        alert('Passwords do not match');
        return;
      }
      
      if (password.length < 6) {
        alert('Password must be at least 6 characters');
        return;
      }
      
      firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          // Update profile with name
          return userCredential.user.updateProfile({
            displayName: name
          });
        })
        .then(() => {
          // Show success message
          showAuthSuccess('Registration Successful', 'Your account has been created successfully. Redirecting...');
          
          // Redirect to home page after a short delay
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 2000);
        })
        .catch((error) => {
          alert(`Registration failed: ${error.message}`);
        });
    });
  }
  
  // Password Reset
  const resetBtn = document.getElementById('reset-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      const email = document.getElementById('reset-email').value;
      
      if (!email) {
        alert('Please enter your email address');
        return;
      }
      
      firebase.auth().sendPasswordResetEmail(email)
        .then(() => {
          showAuthSuccess('Reset Email Sent', 'Check your email for a link to reset your password.');
          
          // Go back to login form after a short delay
          setTimeout(() => {
            forms.forEach(form => form.classList.remove('active'));
            document.getElementById('login-form').classList.add('active');
            tabs[0].classList.add('active');
          }, 3000);
        })
        .catch((error) => {
          alert(`Password reset failed: ${error.message}`);
        });
    });
  }
  
  // Google Login
  const googleLoginBtn = document.getElementById('google-login-btn');
  const googleRegisterBtn = document.getElementById('google-register-btn');
  
  const handleGoogleLogin = async () => {
    try {
      const provider = new firebase.auth.GoogleAuthProvider();
      const result = await firebase.auth().signInWithRedirect(provider);
      
      if (result) {
        showAuthSuccess('Google Login Successful', 'You have been logged in successfully.');
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 2000);
      }
    } catch (error) {
      console.error('Google login error:', error);
      alert(`Login failed: ${error.message}`);
    }
  };
  
  if (googleLoginBtn) {
    googleLoginBtn.addEventListener('click', handleGoogleLogin);
  }
  
  if (googleRegisterBtn) {
    googleRegisterBtn.addEventListener('click', handleGoogleLogin);
  }
  
  // Helper function to show success modal
  function showAuthSuccess(title, message) {
    const modal = document.getElementById('authSuccessModal');
    const titleElement = document.getElementById('auth-success-title');
    const messageElement = document.getElementById('auth-success-message');
    
    if (modal && titleElement && messageElement) {
      titleElement.textContent = title;
      messageElement.textContent = message;
      modal.style.display = 'flex';
    }
  }
});
