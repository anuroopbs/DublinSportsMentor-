// Initialize Firebase from the firebase-config.js file
// The db variable should be available from firebase-config.js

document.addEventListener('DOMContentLoaded', function() {
  // Reference to the player registration form
  const playerForm = document.getElementById('player-registration-form');
  const playersContainer = document.getElementById('players-container');
  const filterDivision = document.getElementById('filter-division');
  const filterGender = document.getElementById('filter-gender');
  
  // Handle player registration form submission
  playerForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('player-name').value;
    const gender = document.getElementById('player-gender').value;
    const division = document.getElementById('player-division').value;
    const email = document.getElementById('player-email').value;
    const phone = document.getElementById('player-phone').value;
    const availability = document.getElementById('player-availability').value;
    const notes = document.getElementById('player-notes').value;
    
    // Create player object
    const player = {
      name,
      gender,
      division,
      email,
      phone,
      availability,
      notes,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    
    // Add player to Firebase
    firebase.firestore().collection('players').add(player)
      .then(function() {
        console.log('Player added successfully');
        
        // Reset form
        playerForm.reset();
        
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
    
    // Create card content
    let cardContent = `
      <div class="player-name">${player.name}</div>
      <div class="player-division">${player.division}</div>
      <div class="player-gender">Gender: ${player.gender}</div>
    `;
    
    // Add availability if provided
    if (player.availability) {
      cardContent += `<div class="player-availability">Availability: ${player.availability}</div>`;
    }
    
    // Add contact info if provided
    if (player.email || player.phone) {
      cardContent += '<div class="player-contact">';
      if (player.email) {
        cardContent += `Email: ${player.email}<br>`;
      }
      if (player.phone) {
        cardContent += `Phone: ${player.phone}`;
      }
      cardContent += '</div>';
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
