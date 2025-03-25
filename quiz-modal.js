// Quiz Data
const quizQuestions = [
    {
        text: "How do you feel about trying new activities?",
        answers: [
            { text: "I love jumping in and experimenting", scores: { flexibility: 2 } },
            { text: "I prefer something structured and easy to learn", scores: { ease: 2 } },
            { text: "I'm cautious but curious", scores: { focus: 1 } },
            { text: "I'd rather watch first, then try", scores: { social: -1 } }
        ]
    },
    {
        text: "What's your ideal game setting?",
        answers: [
            { text: "Competitive court with spectators", scores: { social: 2 } },
            { text: "Casual game with friends", scores: { social: 1, fun: 1 } },
            { text: "Quiet, focused indoor space", scores: { focus: 2 } },
            { text: "Anywhere, I'm open to variety", scores: { flexibility: 2 } }
        ]
    },
    {
        text: "How much physical effort do you enjoy?",
        answers: [
            { text: "High intensity, lots of sweat", scores: { intensity: 2 } },
            { text: "Moderate effort with bursts", scores: { intensity: 1 } },
            { text: "More skill than sweat", scores: { skill: 1 } },
            { text: "Depends on the day", scores: { flexibility: 1 } }
        ]
    },
    {
        text: "How do you feel about quick movements and reactions?",
        answers: [
            { text: "Sounds exciting, I'd love it", scores: { intensity: 2 } },
            { text: "I'd prefer something slower and steady", scores: { ease: 2 } },
            { text: "I'm okay with some speed if it's manageable", scores: { flexibility: 1 } },
            { text: "I'd rather focus on precision than speed", scores: { skill: 2 } }
        ]
    },
    {
        text: "How social do you like your games?",
        answers: [
            { text: "Love doubles or team play", scores: { social: 2 } },
            { text: "Prefer one-on-one", scores: { social: 1 } },
            { text: "Rather play solo or low interaction", scores: { focus: 2 } },
            { text: "Fine with any setup", scores: { flexibility: 1 } }
        ]
    },
    {
        text: "What kind of space do you feel most comfortable in?",
        answers: [
            { text: "Open outdoor spaces", scores: { social: 1, accessibility: 1 } },
            { text: "Smaller, enclosed spaces", scores: { focus: 2 } },
            { text: "Doesn't matter as long as it's not too crowded", scores: { ease: 1 } },
            { text: "Somewhere with lots of people around", scores: { social: 2 } }
        ]
    },
    {
        text: "What's your preferred pace of play?",
        answers: [
            { text: "Fast and aggressive", scores: { intensity: 2 } },
            { text: "Slow and deliberate", scores: { ease: 2 } },
            { text: "Precise and technical", scores: { skill: 2 } },
            { text: "Varies based on the game", scores: { flexibility: 2 } }
        ]
    }
];

// Sport profiles with their characteristics
const quizSportProfiles = {
    "Tennis": {
        ease: 3,
        social: 4,
        fun: 3,
        intensity: 3,
        skill: 4,
        focus: 3,
        flexibility: 2,
        accessibility: 2,
        target: 2.6,
        description: "A dynamic court sport that combines power, strategy, and endurance. Perfect for those who enjoy a mix of social interaction and competitive play."
    },
    "Badminton": {
        ease: 4,
        social: 3,
        fun: 4,
        intensity: 2,
        skill: 3,
        focus: 3,
        flexibility: 3,
        accessibility: 4,
        target: 2.8,
        description: "A fast-paced yet accessible racket sport with a lightweight shuttlecock. Great for players who value quick reflexes and technical finesse."
    },
    "Squash": {
        ease: 2,
        social: 2,
        fun: 3,
        intensity: 4,
        skill: 3,
        focus: 4,
        flexibility: 2,
        accessibility: 2,
        target: 1.9,
        description: "An intense indoor court sport played in an enclosed space. Ideal for those seeking a high-intensity workout with strategic gameplay."
    },
    "Table Tennis": {
        ease: 4,
        social: 3,
        fun: 3,
        intensity: 1,
        skill: 4,
        focus: 4,
        flexibility: 3,
        accessibility: 5,
        target: 2.5,
        description: "A precise, fast-reflex indoor sport that's easy to learn but challenging to master. Perfect for those who enjoy technical skill over physical exertion."
    },
    "Pickleball": {
        ease: 4,
        social: 4,
        fun: 4,
        intensity: 1,
        skill: 2,
        focus: 2,
        flexibility: 3,
        accessibility: 4,
        target: 3.1,
        description: "A fun, social paddle sport that combines elements of tennis, badminton, and table tennis. Excellent for players of all ages seeking an accessible, enjoyable game."
    },
    "Padel": {
        ease: 3,
        social: 5,
        fun: 4,
        intensity: 1,
        skill: 2,
        focus: 2,
        flexibility: 3,
        accessibility: 3,
        target: 2.95,
        description: "A social racket sport played in an enclosed court with walls. Great for those who enjoy team dynamics and a mix of tennis and squash elements."
    }
};

// Personality types based on score dimensions
const quizPersonalityTypes = {
    "The Social Butterfly": { primary: "social", secondary: "fun" },
    "The Skillful Technician": { primary: "skill", secondary: "focus" },
    "The Energetic Powerhouse": { primary: "intensity", secondary: "flexibility" },
    "The Casual Enthusiast": { primary: "ease", secondary: "fun" },
    "The Strategic Thinker": { primary: "focus", secondary: "skill" },
    "The Adaptable Player": { primary: "flexibility", secondary: "ease" }
};

// Initialize the quiz modal functionality
function initQuizModal() {
    // Create and append the quiz modal HTML
    createQuizModalHTML();
    
    // DOM Elements
    const quizModal = document.getElementById('quiz-modal');
    const quizCloseBtn = document.getElementById('quiz-close');
    const quizNavLink = document.getElementById('quiz-nav-link');
    const quizMobileNavLink = document.getElementById('quiz-mobile-nav-link');
    const quizStartBtn = document.getElementById('quiz-start-btn');
    const quizWelcomeScreen = document.getElementById('quiz-welcome-screen');
    const quizQuestionScreen = document.getElementById('quiz-question-screen');
    const quizResultScreen = document.getElementById('quiz-result-screen');
    const quizQuestionText = document.getElementById('quiz-question-text');
    const quizAnswersContainer = document.getElementById('quiz-answers-container');
    const quizNextBtn = document.getElementById('quiz-next-btn');
    const quizProgressBar = document.getElementById('quiz-progress');
    const quizProgressText = document.getElementById('quiz-progress-text');
    const quizShareBtn = document.getElementById('quiz-share-btn');
    const quizRestartBtn = document.getElementById('quiz-restart-btn');
    
    // Quiz state
    let currentQuestionIndex = 0;
    let selectedAnswerIndex = null;
    let userScores = {
        intensity: 0,
        ease: 0,
        flexibility: 0,
        social: 0,
        focus: 0,
        skill: 0,
        accessibility: 0,
        fun: 0
    };
    
    // Event listeners
    quizNavLink.addEventListener('click', openQuizModal);
    quizMobileNavLink.addEventListener('click', openQuizModal);
    quizCloseBtn.addEventListener('click', closeQuizModal);
    quizStartBtn.addEventListener('click', startQuiz);
    quizNextBtn.addEventListener('click', goToNextQuestion);
    quizShareBtn.addEventListener('click', shareResult);
    quizRestartBtn.addEventListener('click', restartQuiz);
    
    // Close modal when clicking outside the modal content
    window.addEventListener('click', function(event) {
        if (event.target === quizModal) {
            closeQuizModal();
        }
    });
    
    // Open quiz modal
    function openQuizModal(e) {
        e.preventDefault();
        quizModal.style.display = 'block';
        document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    }
    
    // Close quiz modal
    function closeQuizModal() {
        quizModal.style.display = 'none';
        document.body.style.overflow = ''; // Restore scrolling
    }
    
    // Start the quiz
    function startQuiz() {
        quizWelcomeScreen.classList.remove('active');
        quizQuestionScreen.classList.add('active');
        loadQuestion(currentQuestionIndex);
    }
    
    // Load a question
    function loadQuestion(index) {
        selectedAnswerIndex = null;
        quizNextBtn.classList.add('hidden');
        
        const question = quizQuestions[index];
        quizQuestionText.textContent = question.text;
        
        // Clear previous answers
        quizAnswersContainer.innerHTML = '';
        
        // Create answer buttons
        question.answers.forEach((answer, i) => {
            const button = document.createElement('button');
            button.classList.add('quiz-answer-btn');
            button.textContent = answer.text;
            button.addEventListener('click', () => selectAnswer(i));
            quizAnswersContainer.appendChild(button);
        });
        
        // Update progress
        updateProgress();
    }
    
    // Select an answer
    function selectAnswer(index) {
        selectedAnswerIndex = index;
        
        // Remove selected class from all buttons
        const answerButtons = quizAnswersContainer.querySelectorAll('.quiz-answer-btn');
        answerButtons.forEach(button => button.classList.remove('selected'));
        
        // Add selected class to clicked button
        answerButtons[index].classList.add('selected');
        
        // Show next button
        quizNextBtn.classList.remove('hidden');
    }
    
    // Go to next question or show result
    function goToNextQuestion() {
        if (selectedAnswerIndex === null) return;
        
        // Update scores based on selected answer
        const selectedAnswer = quizQuestions[currentQuestionIndex].answers[selectedAnswerIndex];
        for (const [dimension, score] of Object.entries(selectedAnswer.scores)) {
            userScores[dimension] += score;
        }
        
        currentQuestionIndex++;
        
        if (currentQuestionIndex < quizQuestions.length) {
            loadQuestion(currentQuestionIndex);
        } else {
            showResult();
        }
    }
    
    // Update progress bar and text
    function updateProgress() {
        const progress = ((currentQuestionIndex) / quizQuestions.length) * 100;
        quizProgressBar.style.width = `${progress}%`;
        quizProgressText.textContent = `Question ${currentQuestionIndex + 1} of ${quizQuestions.length}`;
    }
    
    // Calculate weighted score
    function calculateWeightedScore() {
        return (userScores.ease * 0.3) + 
               (userScores.social * 0.2) + 
               (userScores.fun * 0.2) + 
               (userScores.intensity * 0.1) + 
               (userScores.skill * 0.1) + 
               (userScores.focus * 0.05) + 
               (userScores.flexibility * 0.05);
    }
    
    // Find recommended sport
    function findRecommendedSport() {
        const weightedScore = calculateWeightedScore();
        let closestSport = null;
        let smallestDifference = Infinity;
        
        for (const [sport, profile] of Object.entries(quizSportProfiles)) {
            const difference = Math.abs(profile.target - weightedScore);
            if (difference < smallestDifference) {
                smallestDifference = difference;
                closestSport = sport;
            }
        }
        
        return closestSport;
    }
    
    // Determine personality type
    function determinePersonalityType() {
        // Find the two highest scoring dimensions
        const sortedDimensions = Object.entries(userScores)
            .sort((a, b) => b[1] - a[1]);
        
        const primaryDimension = sortedDimensions[0][0];
        const secondaryDimension = sortedDimensions[1][0];
        
        // Find matching personality type
        for (const [type, dimensions] of Object.entries(quizPersonalityTypes)) {
            if (dimensions.primary === primaryDimension || dimensions.secondary === primaryDimension) {
                if (dimensions.primary === secondaryDimension || dimensions.secondary === secondaryDimension) {
                    return type;
                }
            }
        }
        
        // Default fallback
        return "The Balanced Player";
    }
    
    // Show result screen
    function showResult() {
        quizQuestionScreen.classList.remove('active');
        quizResultScreen.classList.add('active');
        
        const recommendedSportName = findRecommendedSport();
        const sportProfile = quizSportProfiles[recommendedSportName];
        const personalityType = determinePersonalityType();
        
        // Update result screen
        document.getElementById('quiz-recommended-sport').textContent = recommendedSportName;
        document.getElementById('quiz-sport-description').textContent = sportProfile.description;
        document.getElementById('quiz-personality-title').textContent = personalityType;
        
        // Update sport icon
        const sportIcon = document.getElementById('quiz-sport-icon');
        switch(recommendedSportName) {
            case 'Tennis':
                sportIcon.textContent = '🎾';
                break;
            case 'Badminton':
                sportIcon.textContent = '🏸';
                break;
            case 'Squash':
                sportIcon.textContent = '🥎';
                break;
            case 'Table Tennis':
                sportIcon.textContent = '🏓';
                break;
            case 'Pickleball':
                sportIcon.textContent = '🏓';
                break;
            case 'Padel':
                sportIcon.textContent = '🎾';
                break;
            default:
                sportIcon.textContent = '🎯';
        }
        
        // Update stat bars and values with animation
        setTimeout(() => {
            document.getElementById('quiz-ease-stat').style.width = `${(sportProfile.ease / 5) * 100}%`;
            document.getElementById('quiz-social-stat').style.width = `${(sportProfile.social / 5) * 100}%`;
            document.getElementById('quiz-fun-stat').style.width = `${(sportProfile.fun / 5) * 100}%`;
            document.getElementById('quiz-intensity-stat').style.width = `${(sportProfile.intensity / 5) * 100}%`;
            
            // Update stat values
            document.getElementById('quiz-ease-value').textContent = `${sportProfile.ease}/5`;
            document.getElementById('quiz-social-value').textContent = `${sportProfile.social}/5`;
            document.getElementById('quiz-fun-value').textContent = `${sportProfile.fun}/5`;
            document.getElementById('quiz-intensity-value').textContent = `${sportProfile.intensity}/5`;
        }, 100);
        
        // Update badge
        document.getElementById('quiz-badge-sport').textContent = recommendedSportName;
        document.getElementById('quiz-badge-personality').textContent = personalityType;
        document.getElementById('quiz-badge-personality-back').textContent = personalityType;
        
        // Create confetti effect
        createConfetti();
    }
    
    // Create confetti effect
    function createConfetti() {
        const container = document.querySelector('.quiz-modal-content');
        const colors = ['#1e90ff', '#87cefa', '#ff9800', '#f44336', '#4CAF50'];
        
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('quiz-confetti');
            confetti.style.left = `${Math.random() * 100}%`;
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.width = `${Math.random() * 10 + 5}px`;
            confetti.style.height = `${Math.random() * 10 + 5}px`;
            confetti.style.opacity = Math.random();
            confetti.style.animation = `quiz-confetti-fall ${Math.random() * 3 + 2}s linear forwards`;
            confetti.style.animationDelay = `${Math.random() * 2}s`;
            
            container.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => {
                confetti.remove();
            }, 5000);
        }
    }
    
    // Share result
    function shareResult() {
        const recommendedSportName = document.getElementById('quiz-recommended-sport').textContent;
        const personalityType = document.getElementById('quiz-personality-title').textContent;
        
        const shareText = `I'm a "${personalityType}" and my perfect racket sport is ${recommendedSportName}! Take the quiz at Dublin Sports Hub to find yours!`;
        
        // Check if Web Share API is available
        if (navigator.share) {
            navigator.share({
                title: 'My Perfect Racket Sport',
                text: shareText,
                url: window.location.href
            })
            .catch(error => console.log('Error sharing:', error));
        } else {
            // Fallback - copy to clipboard
            navigator.clipboard.writeText(shareText)
                .then(() => {
                    alert('Result copied to clipboard! Share it with your friends.');
                })
                .catch(err => {
                    console.log('Error copying to clipboard:', err);
                });
        }
    }
    
    // Restart quiz
    function restartQuiz() {
        currentQuestionIndex = 0;
        selectedAnswerIndex = null;
        userScores = {
            intensity: 0,
            ease: 0,
            flexibility: 0,
            social: 0,
            focus: 0,
            skill: 0,
            accessibility: 0,
            fun: 0
        };
        
        quizResultScreen.classList.remove('active');
        quizWelcomeScreen.classList.add('active');
    }
}

// Create and append the quiz modal HTML
function createQuizModalHTML() {
    const quizModalHTML = `
    <div id="quiz-modal" class="quiz-modal">
        <div class="quiz-modal-content">
            <span id="quiz-close" class="quiz-close">&times;</span>
            
            <div class="quiz-container">
                <!-- Welcome Screen -->
                <div id="quiz-welcome-screen" class="quiz-screen active">
                    <div class="quiz-content">
                        <h1>Find Your Perfect Racket Sport!</h1>
                        <p>Answer 7 quick questions to discover which racket sport matches your personality and preferences.</p>
                        <button id="quiz-start-btn" class="btn-primary">Start Quiz</button>
                    </div>
                </div>

                <!-- Question Screen -->
                <div id="quiz-question-screen" class="quiz-screen">
                    <div class="quiz-progress-container">
                        <div class="quiz-progress-bar">
                            <div id="quiz-progress" class="quiz-progress"></div>
                        </div>
                        <div id="quiz-progress-text">Question 1 of 7</div>
                    </div>
                    <div class="quiz-content">
                        <h2 id="quiz-question-text">Question goes here</h2>
                        <div id="quiz-answers-container" class="quiz-answers-container">
                            <!-- Answer buttons will be generated here -->
                        </div>
                        <button id="quiz-next-btn" class="btn-primary hidden">Next</button>
                    </div>
                </div>

                <!-- Result Screen -->
                <div id="quiz-result-screen" class="quiz-screen">
                    <div class="quiz-content">
                        <div class="quiz-result-card">
                            <div id="quiz-personality-badge" class="quiz-personality-badge">
                                <h3 id="quiz-personality-title">Your Racket Personality</h3>
                            </div>
                            <div class="quiz-sport-icon" id="quiz-sport-icon">🎾</div>
                            <h2 id="quiz-recommended-sport">Recommended Sport</h2>
                            <p id="quiz-sport-description">Sport description goes here</p>
                            <div class="quiz-sport-details">
                                <div class="quiz-sport-stats">
                                    <div class="quiz-stat">
                                        <div class="quiz-stat-label">
                                            <span>Ease</span>
                                            <span class="quiz-stat-value" id="quiz-ease-value">0/5</span>
                                        </div>
                                        <div class="quiz-stat-bar"><div id="quiz-ease-stat" class="quiz-stat-fill quiz-ease-fill"></div></div>
                                    </div>
                                    <div class="quiz-stat">
                                        <div class="quiz-stat-label">
                                            <span>Social</span>
                                            <span class="quiz-stat-value" id="quiz-social-value">0/5</span>
                                        </div>
                                        <div class="quiz-stat-bar"><div id="quiz-social-stat" class="quiz-stat-fill quiz-social-fill"></div></div>
                                    </div>
                                    <div class="quiz-stat">
                                        <div class="quiz-stat-label">
                                            <span>Fun</span>
                                            <span class="quiz-stat-value" id="quiz-fun-value">0/5</span>
                                        </div>
                                        <div class="quiz-stat-bar"><div id="quiz-fun-stat" class="quiz-stat-fill quiz-fun-fill"></div></div>
                                    </div>
                                    <div class="quiz-stat">
                                        <div class="quiz-stat-label">
                                            <span>Intensity</span>
                                            <span class="quiz-stat-value" id="quiz-intensity-value">0/5</span>
                                        </div>
                                        <div class="quiz-stat-bar"><div id="quiz-intensity-stat" class="quiz-stat-fill quiz-intensity-fill"></div></div>
                                    </div>
                                </div>
                            </div>
                            <div class="quiz-badge-container">
                                <div class="quiz-badge">
                                    <div class="quiz-badge-front">
                                        <div class="quiz-badge-title">My Perfect Racket Sport</div>
                                        <div class="quiz-badge-sport" id="quiz-badge-sport">Tennis</div>
                                        <div class="quiz-badge-personality" id="quiz-badge-personality">The Social Butterfly</div>
                                    </div>
                                    <div class="quiz-badge-back">
                                        <div class="quiz-badge-title">Racket Personality</div>
                                        <div class="quiz-badge-personality" id="quiz-badge-personality-back">The Social Butterfly</div>
                                        <div class="quiz-badge-title">Dublin Sports Hub</div>
                                    </div>
                                </div>
                            </div>
                            <button id="quiz-share-btn" class="btn-primary">Share Your Result</button>
                            <button id="quiz-restart-btn" class="btn-primary" style="margin-top: 10px; background-color: #f0f8ff; color: #1e90ff;">Take Quiz Again</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `;
    
    // Create a temporary div to hold our HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = quizModalHTML;
    
    // Append the quiz modal to the body
    document.body.appendChild(tempDiv.firstElementChild);
}

// Initialize the quiz when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Check if the navigation elements exist before initializing
    if (document.querySelector('nav ul') && document.querySelector('.mobile-nav')) {
        // Add the quiz link to the navigation
        const navList = document.querySelector('nav ul');
        const quizNavItem = document.createElement('li');
        quizNavItem.innerHTML = '<a href="#" id="quiz-nav-link">Find Your Dream Sport</a>';
        navList.appendChild(quizNavItem);
        
        // Add the quiz link to the mobile navigation
        const mobileNav = document.querySelector('.mobile-nav');
        const quizMobileNavLink = document.createElement('a');
        quizMobileNavLink.id = 'quiz-mobile-nav-link';
        quizMobileNavLink.href = '#';
        quizMobileNavLink.textContent = 'Dream Sport';
        mobileNav.appendChild(quizMobileNavLink);
        
        // Initialize the quiz modal
        initQuizModal();
    }
});
