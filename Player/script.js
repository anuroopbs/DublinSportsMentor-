const players = [];
function renderPlayers(name = '', division = '') {
  const container = document.getElementById('playerList');
  container.innerHTML = '';
  const filtered = players.filter(p => 
    p.name.toLowerCase().includes(name.toLowerCase()) &&
    (division === '' || p.division === division)
  );
  filtered.forEach((p, i) => {
    const card = document.createElement('div');
    card.className = 'player-card';
    card.innerHTML = `<div class="player-info">
      <p class="player-name">${p.name}</p>
      <p class="player-details">Gender: ${p.gender} | Division: ${p.division}</p>
    </div>
    <button class="action-button" onclick="alert('Messaging ${p.name}...')">Message</button>`;
    container.appendChild(card);
  });
}
document.getElementById('registerForm').addEventListener('submit', e => {
  e.preventDefault();
  players.push({
    name: regName.value,
    gender: regGender.value,
    division: regDivision.value,
    email: regEmail.value,
    mobile: regMobile.value,
  });
  renderPlayers(searchInput.value, divisionFilter.value);
  e.target.reset();
  registerModal.style.display = 'none';
});
openRegister.onclick = () => registerModal.style.display = 'block';
closeModal.onclick = () => registerModal.style.display = 'none';
window.onclick = e => { if (e.target === registerModal) registerModal.style.display = 'none'; };
searchInput.oninput = () => renderPlayers(searchInput.value, divisionFilter.value);
divisionFilter.onchange = () => renderPlayers(searchInput.value, divisionFilter.value);