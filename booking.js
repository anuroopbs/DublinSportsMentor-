
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector("#submit-btn");
  if (!btn) return;

  btn.addEventListener("click", function (e) {
    e.preventDefault();

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const experience = document.getElementById("experience").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time-slot").value;
    const coachingType = document.getElementById("coaching-type").value;
    const notes = document.getElementById("notes").value;

    // Validate form
    if (!name || !email || !phone || !date || !time) {
      alert("Please fill in all required fields.");
      return;
    }

    // Prepare email parameters
    const templateParams = {
      name: name,
      email: email,
      phone: phone,
      experience: experience,
      date: date,
      time: time,
      coaching_type: coachingType,
      notes: notes
    };

    // Send email using EmailJS
    emailjs.send('service_j4beam4', 'template_rp83yqo', templateParams)
      .then(function(response) {
        console.log('Email sent successfully:', response);
        
        // Show confirmation modal
        document.getElementById('confirmationModal').style.display = 'flex';
        
        // Reset form
        document.getElementById("name").value = '';
        document.getElementById("email").value = '';
        document.getElementById("phone").value = '';
        document.getElementById("notes").value = '';
        document.getElementById("date").value = new Date().toISOString().split('T')[0];
      }, function(error) {
        console.error('Email failed to send:', error);
        alert("Failed to send booking request. Please try again or contact us directly.");
      });
  });
});
