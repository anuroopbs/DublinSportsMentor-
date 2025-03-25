
document.addEventListener('DOMContentLoaded', function () {
  const today = new Date().toISOString().split('T')[0];
  const dateInput = document.getElementById('date');
  if (dateInput) dateInput.value = today;

  const counterIntroduced = document.getElementById('counter-introduced');
  const counterRemaining = document.getElementById('counter-remaining');
  if (counterIntroduced) counterIntroduced.textContent = '833';
  if (counterRemaining) counterRemaining.textContent = '14167';
});
