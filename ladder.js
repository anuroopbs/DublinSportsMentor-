document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    const mensLadder = document.getElementById('mens-ladder');
    const womensLadder = document.getElementById('womens-ladder');
    const addPlayerMensBtn = document.getElementById('add-player-mens');
    const addPlayerWomensBtn = document.getElementById('add-player-womens');
    const recordChallengeMensBtn = document.getElementById('record-challenge-mens');
    const recordChallengeWomensBtn = document.getElementById('record-challenge-womens');
    const addPlayerModal = document.getElementById('add-player-modal');
    const challengeModal = document.getElementById('challenge-modal');
    const addPlayerForm = document.getElementById('add-player-form');
    const challengeForm = document.getElementById('challenge-form');
    const closeButtons = document.querySelectorAll('.close');
    
    // Initialize ladder data from localStorage or use default data
    let mensLadderData = JSON.parse(localStorage.getItem('mensLadderData')) || [
        { name: 'John Smith', won: 12, lost: 3 },
        { name: 'Michael Johnson', won: 10, lost: 4 },
        { name: 'David Williams', won: 8, lost: 5 },
        { name: 'Robert Brown', won: 7, lost: 6 },
        { name: 'James Davis', won: 5, lost: 4 }
    ];
    
    let womensLadderData = JSON.parse(localStorage.getItem('womensLadderData')) || [
        { name: 'Sarah Johnson', won: 11, lost: 2 },
        { name: 'Emily Davis', won: 9, lost: 3 },
        { name: 'Jessica Wilson', won: 8, lost: 4 },
        { name: 'Amanda Taylor', won: 6, lost: 5 },
        { name: 'Olivia Martin', won: 4, lost: 3 }
    ];
    
    // Tab switching functionality
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons and contents
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const tabId = `${this.dataset.tab}-tab`;
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Render ladder tables
    function renderLadder(ladderElement, ladderData) {
        const tbody = ladderElement.querySelector('tbody');
        tbody.innerHTML = '';
        
        ladderData.forEach((player, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${player.name}</td>
                <td>${player.won}</td>
                <td>${player.lost}</td>
            `;
            tbody.appendChild(row);
        });
    }
    
    // Save ladder data to localStorage
    function saveLadderData() {
        localStorage.setItem('mensLadderData', JSON.stringify(mensLadderData));
        localStorage.setItem('womensLadderData', JSON.stringify(womensLadderData));
    }
    
    // Add player button click handlers
    addPlayerMensBtn.addEventListener('click', function() {
        document.getElementById('player-gender').value = 'male';
        addPlayerModal.style.display = 'block';
    });
    
    addPlayerWomensBtn.addEventListener('click', function() {
        document.getElementById('player-gender').value = 'female';
        addPlayerModal.style.display = 'block';
    });
    
    // Record challenge button click handlers
    recordChallengeMensBtn.addEventListener('click', function() {
        populateChallengeForm('male');
        document.getElementById('challenge-gender').value = 'male';
        challengeModal.style.display = 'block';
    });
    
    recordChallengeWomensBtn.addEventListener('click', function() {
        populateChallengeForm('female');
        document.getElementById('challenge-gender').value = 'female';
        challengeModal.style.display = 'block';
    });
    
    // Populate challenge form with players
    function populateChallengeForm(gender) {
        const challengerSelect = document.getElementById('challenger');
        const opponentSelect = document.getElementById('opponent');
        const winnerSelect = document.getElementById('winner');
        
        // Clear previous options
        challengerSelect.innerHTML = '<option value="">Select player</option>';
        opponentSelect.innerHTML = '<option value="">Select player</option>';
        winnerSelect.innerHTML = '<option value="">Select winner</option>';
        
        // Get the appropriate ladder data
        const ladderData = gender === 'male' ? mensLadderData : womensLadderData;
        
        // Add players to selects
        ladderData.forEach((player, index) => {
            const challengerOption = document.createElement('option');
            challengerOption.value = index;
            challengerOption.textContent = `${index + 1}. ${player.name}`;
            challengerSelect.appendChild(challengerOption);
            
            const opponentOption = document.createElement('option');
            opponentOption.value = index;
            opponentOption.textContent = `${index + 1}. ${player.name}`;
            opponentSelect.appendChild(opponentOption);
        });
        
        // Update winner options when challenger and opponent are selected
        function updateWinnerOptions() {
            winnerSelect.innerHTML = '<option value="">Select winner</option>';
            
            const challengerIndex = challengerSelect.value;
            const opponentIndex = opponentSelect.value;
            
            if (challengerIndex !== '' && opponentIndex !== '') {
                const challengerOption = document.createElement('option');
                challengerOption.value = challengerIndex;
                challengerOption.textContent = ladderData[challengerIndex].name;
                winnerSelect.appendChild(challengerOption);
                
                const opponentOption = document.createElement('option');
                opponentOption.value = opponentIndex;
                opponentOption.textContent = ladderData[opponentIndex].name;
                winnerSelect.appendChild(opponentOption);
            }
        }
        
        challengerSelect.addEventListener('change', updateWinnerOptions);
        opponentSelect.addEventListener('change', updateWinnerOptions);
    }
    
    // Add player form submission
    addPlayerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const playerName = document.getElementById('player-name').value;
        const playerGender = document.getElementById('player-gender').value;
        
        const newPlayer = {
            name: playerName,
            won: 0,
            lost: 0
        };
        
        if (playerGender === 'male') {
            mensLadderData.push(newPlayer);
            renderLadder(mensLadder, mensLadderData);
        } else {
            womensLadderData.push(newPlayer);
            renderLadder(womensLadder, womensLadderData);
        }
        
        saveLadderData();
        addPlayerModal.style.display = 'none';
        addPlayerForm.reset();
    });
    
    // Challenge form submission
    challengeForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const gender = document.getElementById('challenge-gender').value;
        const challengerIndex = parseInt(document.getElementById('challenger').value);
        const opponentIndex = parseInt(document.getElementById('opponent').value);
        const winnerIndex = parseInt(document.getElementById('winner').value);
        
        // Get the appropriate ladder data
        const ladderData = gender === 'male' ? mensLadderData : womensLadderData;
        
        // Update match statistics
        if (winnerIndex === challengerIndex) {
            ladderData[challengerIndex].won++;
            ladderData[opponentIndex].lost++;
            
            // Swap positions if challenger won and opponent is ranked higher
            if (challengerIndex > opponentIndex && challengerIndex - opponentIndex <= 2) {
                const temp = ladderData[opponentIndex];
                ladderData[opponentIndex] = ladderData[challengerIndex];
                ladderData[challengerIndex] = temp;
            }
        } else {
            ladderData[opponentIndex].won++;
            ladderData[challengerIndex].lost++;
        }
        
        // Update the appropriate ladder
        if (gender === 'male') {
            renderLadder(mensLadder, mensLadderData);
        } else {
            renderLadder(womensLadder, womensLadderData);
        }
        
        saveLadderData();
        challengeModal.style.display = 'none';
        challengeForm.reset();
    });
    
    // Close modal when clicking the close button
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            addPlayerModal.style.display = 'none';
            challengeModal.style.display = 'none';
        });
    });
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === addPlayerModal) {
            addPlayerModal.style.display = 'none';
        }
        if (event.target === challengeModal) {
            challengeModal.style.display = 'none';
        }
    });
    
    // Initial render of ladder tables
    renderLadder(mensLadder, mensLadderData);
    renderLadder(womensLadder, womensLadderData);
});
