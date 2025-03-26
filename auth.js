document.addEventListener('DOMContentLoaded', function() {
  // Get UI elements
  const authTabs = document.querySelectorAll('.auth-tab');
  const authForms = document.querySelectorAll('.auth-form');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');
  const forgotPasswordForm = document.getElementById('forgot-password-form');
  const forgotPasswordLink = document.getElementById('forgot-password-link');
  const backToLoginLink = document.getElementById('back-to-login-link');
  
  const loginBtn = document.getElementById('login-btn');
  const registerBtn = document.getElementById('register-btn');
  const resetBtn = document.getElementById('reset-btn');
  
  const authSuccessModal = document.getElementById('authSuccessModal');
  const authSuccessTitle = document.getElementById('auth-success-title');
  const authSuccessMessage = document.getElementById('auth-success-message');
  
  // Tab switching functionality
  authTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs and forms
      authTabs.forEach(t => t.classList.remove('active'));
      authForms.forEach(f => f.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Show corresponding form
      const tabName = this.getAttribute('data-tab');
      if (tabName === 'login') {
        loginForm.classList.add('active');
      } else if (tabName === 'register') {
        registerForm.classList.add('active');
      }
    });
  });
  
  // Forgot password link
  forgotPasswordLink.addEventListener('click', function(e) {
    e.preventDefault();
    loginForm.classList.remove('active');
    forgotPasswordForm.classList.add('active');
  });
  
  // Back to login link
  backToLoginLink.addEventListener('click', function(e) {
    e.preventDefault();
    forgotPasswordForm.classList.remove('active');
    loginForm.classList.add('active');
  });
  
  // Login functionality
  loginBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    if (!email || !password) {
      showError(loginForm, 'Please fill in all fields');
      return;
    }
    
    // Show loading state
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<span class="auth-loading"></span> Logging in...';
    
    // Sign in with Firebase
    firebase.auth().signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Store user info in localStorage
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName || email.split('@')[0]
        }));
        
        // Show success message
        showSuccessModal('Login Successful', 'You have been logged in successfully. Redirecting to home page...');
        
        // Redirect to home page after 2 seconds
        setTimeout(() => {
          window.location.href = 'index.html';
        }, 2000);
      })
      .catch((error) => {
        console.error('Login error:', error);
        let errorMessage = 'Failed to login. Please try again.';
        
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          errorMessage = 'Invalid email or password';
        } else if (error.code === 'auth/too-many-requests') {
          errorMessage = 'Too many failed login attempts. Please try again later.';
        }
        
        showError(loginForm, errorMessage);
        
        // Reset button
        loginBtn.disabled = false;
        loginBtn.textContent = 'Login';
      });
  });
  
  // Registration functionality
  registerBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;
    const confirmPassword = document.getElementById('register-confirm-password').value;
    
    if (!name || !email || !password || !confirmPassword) {
      showError(registerForm, 'Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      showError(registerForm, 'Passwords do not match');
      return;
    }
    
    if (password.length < 6) {
      showError(registerForm, 'Password must be at least 6 characters');
      return;
    }
    
    // Show loading state
    registerBtn.disabled = true;
    registerBtn.innerHTML = '<span class="auth-loading"></span> Creating account...';
    
    // Create user with Firebase
    firebase.auth().createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Update profile with name
        return userCredential.user.updateProfile({
          displayName: name
        }).then(() => {
          // Store user info in localStorage
          const user = userCredential.user;
          localStorage.setItem('user', JSON.stringify({
            uid: user.uid,
            email: user.email,
            displayName: name
          }));
          
          // Show success message
          showSuccessModal('Registration Successful', 'Your account has been created successfully. Redirecting to home page...');
          
          // Redirect to home page after 2 seconds
          setTimeout(() => {
            window.location.href = 'index.html';
          }, 2000);
        });
      })
      .catch((error) => {
        console.error('Registration error:', error);
        let errorMessage = 'Failed to create account. Please try again.';
        
        if (error.code === 'auth/email-already-in-use') {
          errorMessage = 'Email is already in use';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address';
        } else if (error.code === 'auth/weak-password') {
          errorMessage = 'Password is too weak';
        }
        
        showError(registerForm, errorMessage);
        
        // Reset button
        registerBtn.disabled = false;
        registerBtn.textContent = 'Register';
      });
  });
  
  // Password reset functionality
  resetBtn.addEventListener('click', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('reset-email').value;
    
    if (!email) {
      showError(forgotPasswordForm, 'Please enter your email address');
      return;
    }
    
    // Show loading state
    resetBtn.disabled = true;
    resetBtn.innerHTML = '<span class="auth-loading"></span> Sending...';
    
    // Send password reset email
    firebase.auth().sendPasswordResetEmail(email)
      .then(() => {
        // Show success message
        showSuccessModal('Reset Email Sent', 'A password reset link has been sent to your email address.');
        
        // Reset form and go back to login
        document.getElementById('reset-email').value = '';
        forgotPasswordForm.classList.remove('active');
        loginForm.classList.add('active');
        
        // Reset button
        resetBtn.disabled = false;
        resetBtn.textContent = 'Send Reset Link';
      })
      .catch((error) => {
        console.error('Password reset error:', error);
        let errorMessage = 'Failed to send reset email. Please try again.';
        
        if (error.code === 'auth/user-not-found') {
          errorMessage = 'No account found with this email address';
        } else if (error.code === 'auth/invalid-email') {
          errorMessage = 'Invalid email address';
        }
        
        showError(forgotPasswordForm, errorMessage);
        
        // Reset button
        resetBtn.disabled = false;
        resetBtn.textContent = 'Send Reset Link';
      });
  });
  
  // Helper function to show error message
  function showError(form, message) {
    // Check if error element already exists
    let errorElement = form.querySelector('.auth-error');
    
    if (!errorElement) {
      // Create error element if it doesn't exist
      errorElement = document.createElement('div');
      errorElement.className = 'auth-error';
      form.insertBefore(errorElement, form.firstChild);
    }
    
    // Set error message and show
    errorElement.textContent = message;
    errorElement.style.display = 'block';
    
    // Hide after 5 seconds
    setTimeout(() => {
      errorElement.style.display = 'none';
    }, 5000);
  }
  
  // Helper function to show success modal
  function showSuccessModal(title, message) {
    authSuccessTitle.textContent = title;
    authSuccessMessage.textContent = message;
    authSuccessModal.style.display = 'flex';
  }
  
  // Check if user is already logged in
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    // User is logged in, redirect to home page
    window.location.href = 'index.html';
  }
});
