document.addEventListener('DOMContentLoaded', function() {
  // Reference to the player registration form
  const playerForm = document.getElementById('player-registration-form');
  const playersContainer = document.getElementById('players-container');
  const filterDivision = document.getElementById('filter-division');
  const filterGender = document.getElementById('filter-gender');
  
  // Set default date to today
  const today = new Date().toISOString().split('T')[0];
  document.getElementById('player-availability-date').value = today;
  
  // Handle player registration form submission
  playerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('player-name').value;
    const gender = document.getElementById('player-gender').value;
    const division = document.getElementById('player-division').value;
    const email = document.getElementById('player-email').value;
    const phone = document.getElementById('player-phone').value;
    const sport = document.getElementById('player-sport').value;
    const availabilityDate = document.getElementById('player-availability-date').value;
    const availabilityTime = document.getElementById('player-availability-time').value;
    const notes = document.getElementById('player-notes').value;
    
    // Create player object
    const player = {
      name,
      gender,
      division,
      email,
      phone,
      sport,
      availabilityDate,
      availabilityTime,
      notes,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    // Add player to Firebase
    firebase.firestore().collection('players').add(player)
      .then(function() {
        console.log('Player added successfully');
        
        // Reset form
        playerForm.reset();
        
        // Reset date to today
        document.getElementById('player-availability-date').value = today;
        
        // Show success modal
        document.getElementById('registrationSuccessModal').style.display = 'flex';
        
        // Refresh player list
        loadPlayers();
      })
      .catch(function(error) {
        console.error('Error adding player: ', error);
        alert('Error registering player. Please try again.');
      });
  });
  
  // Load players from Firebase
  function loadPlayers() {
    playersContainer.innerHTML = '<div class="loading-message">Loading players...</div>';
    
    // Get filter values
    const divisionFilter = filterDivision.value;
    const genderFilter = filterGender.value;
    
    // Create query
    let query = firebase.firestore().collection('players').orderBy('createdAt', 'desc');
    
    // Apply filters if not "All"
    if (divisionFilter !== 'All') {
      query = query.where('division', '==', divisionFilter);
    }
    
    if (genderFilter !== 'All') {
      query = query.where('gender', '==', genderFilter);
    }
    
    // Execute query
    query.get()
      .then(function(querySnapshot) {
        if (querySnapshot.empty) {
          playersContainer.innerHTML = '<p>No players found matching your criteria.</p>';
          return;
        }
        
        playersContainer.innerHTML = '';
        
        // Loop through players and create cards
        querySnapshot.forEach(function(doc) {
          const playerData = doc.data();
          const playerCard = createPlayerCard(playerData);
          playersContainer.appendChild(playerCard);
        });
      })
      .catch(function(error) {
        console.error('Error loading players: ', error);
        playersContainer.innerHTML = '<p>Error loading players. Please try again later.</p>';
      });
  }
  
  // Create a player card element
  function createPlayerCard(player) {
    const card = document.createElement('div');
    card.className = 'player-card';
    
    // Get division description
    let divisionDesc = '';
    switch(player.division) {
      case 'Premier': divisionDesc = '(2+ yrs, top level)'; break;
      case 'Division 1': divisionDesc = '(1.5–2 yrs, club elite)'; break;
      case 'Division 2': divisionDesc = '(1–1.5 yrs, advanced)'; break;
      case 'Division 3': divisionDesc = '(6mo–1 yr, intermediate)'; break;
      case 'Division 4': divisionDesc = '(3–6 mo, building basics)'; break;
      case 'Division 5': divisionDesc = '(1–3 mo, beginner)'; break;
      case 'Division 6': divisionDesc = '(<1 mo, just starting)'; break;
      default: divisionDesc = '';
    }
    
    // Create card content
    let cardContent = `
      <div class="player-name">${player.name}</div>
      <div class="player-division">${player.division} ${divisionDesc}</div>
      <div class="player-gender">Gender: ${player.gender}</div>
      <div class="player-sport">Sport: ${player.sport || 'Not specified'}</div>
    `;
    
    // Add availability if provided
    if (player.availabilityDate && player.availabilityTime) {
      const formattedDate = new Date(player.availabilityDate).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      cardContent += `<div class="player-availability">Available: ${formattedDate} at ${player.availabilityTime}</div>`;
    }
    
    // Add contact info
    cardContent += '<div class="player-contact">';
    if (player.email) {
      cardContent += `Email: ${player.email}<br>`;
    }
    if (player.phone) {
      cardContent += `Mobile/WhatsApp: ${player.phone}`;
    }
    cardContent += '</div>';
    
    // Add notes if provided
    if (player.notes) {
      cardContent += `<div class="player-notes">Notes: ${player.notes}</div>`;
    }
    
    card.innerHTML = cardContent;
    return card;
  }
  
  // Add event listeners for filters
  filterDivision.addEventListener('change', loadPlayers);
  filterGender.addEventListener('change', loadPlayers);
  
  // Initial load of players
  loadPlayers();
});
