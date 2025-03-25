document.addEventListener('DOMContentLoaded', function()  {
    console.log('DOM loaded, looking for booking form');
    
    const bookingForm = document.getElementById('booking-form');
    console.log('Form found:', bookingForm);
    
    if (bookingForm) {
        // Handle time button selection
        const timeButtons = document.querySelectorAll('.time-slot');
        console.log('Time buttons found:', timeButtons.length);
        
        timeButtons.forEach(button => {
            button.addEventListener('click', function() {
                console.log('Time button clicked:', this.textContent);
                timeButtons.forEach(btn => btn.classList.remove('active', 'selected-time'));
                this.classList.add('active', 'selected-time');
                
                // Update booking status
                const dateInput = document.getElementById('date');
                const bookingStatus = document.getElementById('booking-status');
                if (dateInput.value) {
                    bookingStatus.textContent = `Your Booking: ${dateInput.value} at ${this.textContent}`;
                }
            });
        });
        
        // Handle date selection
        const dateInput = document.getElementById('date');
        dateInput.addEventListener('change', function() {
            const selectedTimeBtn = document.querySelector('.time-slot.selected-time');
            const bookingStatus = document.getElementById('booking-status');
            if (selectedTimeBtn) {
                bookingStatus.textContent = `Your Booking: ${this.value} at ${selectedTimeBtn.textContent}`;
            }
        });
        
        // Handle form submission
        bookingForm.addEventListener('submit', function(event) {
            console.log('Form submitted');
            event.preventDefault();
            
            try {
                // Get selected date
                const dateInput = document.getElementById('date');
                console.log('Date input found:', dateInput);
                const date = dateInput ? dateInput.value : 'Not specified';
                console.log('Date value:', date);
                
                // Get selected time
                const selectedTimeBtn = document.querySelector('.time-slot.selected-time');
                console.log('Selected time button found:', selectedTimeBtn);
                const time = selectedTimeBtn ? selectedTimeBtn.textContent : 'Not specified';
                console.log('Time value:', time);
                
                if (!date || !selectedTimeBtn) {
                    alert('Please select both a date and time for your booking.');
                    return;
                }
                
                // Get other form fields
                const nameInput = document.getElementById('name');
                const emailInput = document.getElementById('email');
                const phoneInput = document.getElementById('phone');
                const experienceSelect = document.getElementById('experience');
                const notesTextarea = document.getElementById('notes');
                
                // Prepare template parameters
                const templateParams = {
                    name: nameInput.value,
                    email: emailInput.value,
                    phone: phoneInput.value,
                    date: date,
                    time: time,
                    experience: experienceSelect.value,
                    notes: notesTextarea.value || 'None'
                };
                
                console.log('Email parameters prepared:', templateParams);
                
                // Disable submit button
                const submitBtn = document.getElementById('submit-btn');
                if (submitBtn) {
                    submitBtn.disabled = true;
                    submitBtn.textContent = 'Sending...';
                }
                
                // Check if EmailJS is loaded
                console.log('EmailJS available:', typeof emailjs !== 'undefined');
                
                // Send email
                console.log('Attempting to send email with EmailJS');
                emailjs.send('service_j4beam4', 'template_rp83yqo', templateParams)
                    .then(function(response) {
                        console.log('SUCCESS!', response.status, response.text);
                        
                        // Show confirmation modal
                        const modal = document.getElementById('confirmation-modal');
                        const bookingDetails = document.getElementById('booking-details');
                        bookingDetails.innerHTML = `
                            <p><strong>Date:</strong> ${date}</p>
                            <p><strong>Time:</strong> ${time}</p>
                            <p><strong>Name:</strong> ${nameInput.value}</p>
                            <p><strong>Email:</strong> ${emailInput.value}</p>
                        `;
                        modal.style.display = 'block';
                        
                        // Reset form
                        bookingForm.reset();
                        document.getElementById('booking-status').textContent = 'Your Booking: Please select a date and time';
                        timeButtons.forEach(btn => btn.classList.remove('active', 'selected-time'));
                        
                        // Reset submit button
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Request Booking';
                        }
                    })
                    .catch(function(error) {
                        console.log('FAILED...', error);
                        alert('Failed to send booking request. Please try again or contact us directly.');
                        
                        // Reset submit button
                        if (submitBtn) {
                            submitBtn.disabled = false;
                            submitBtn.textContent = 'Request Booking';
                        }
                    });
            } catch (error) {
                console.error('Error in form submission handler:', error);
                alert('An error occurred while processing your booking. Please try again.');
                
                // Reset submit button
                const submitBtn = document.getElementById('submit-btn');
                if (submitBtn) {
                    submitBtn.disabled = false;
                    submitBtn.textContent = 'Request Booking';
                }
            }
        });
        
        // Handle modal close button
        const closeModal = document.querySelector('.close');
        const closeModalBtn = document.getElementById('close-modal');
        const modal = document.getElementById('confirmation-modal');
        
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        
        if (closeModalBtn) {
            closeModalBtn.addEventListener('click', function() {
                modal.style.display = 'none';
            });
        }
        
        // Close modal when clicking outside
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    } else {
        console.error('Booking form not found. EmailJS integration not initialized.');
    }
});
