
document.addEventListener('DOMContentLoaded', function () {
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('date');
  if (dateInput) dateInput.value = today;

  const counterIntroduced = document.getElementById('counter-introduced');
  const counterRemaining = document.getElementById('counter-remaining');
  if (counterIntroduced) counterIntroduced.textContent = '833';
  if (counterRemaining) counterRemaining.textContent = '14167';
  
  // Close modals when clicking outside of them
  window.addEventListener('click', function(event) {
    const socialModal = document.getElementById('socialModal');
    const projectDetailsModal = document.getElementById('projectDetailsModal');
    
    if (event.target === socialModal) {
      socialModal.style.display = 'none';
    }
    
    if (event.target === projectDetailsModal) {
      projectDetailsModal.style.display = 'none';
    }
  });
});
