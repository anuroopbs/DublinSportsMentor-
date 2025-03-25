
document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('#booking-form') || document;

  const btn = document.querySelector("#submit-btn");
  if (!btn || !form) return;

  btn.addEventListener("click", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const experience = document.getElementById("experience").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time-slot").value;
    const notes = document.getElementById("notes").value;

    const templateParams = {
      name: name,
      email: email,
      phone: phone,
      experience: experience,
      date: date,
      time: time,
      notes: notes
    };

    emailjs.send('service_j4beam4', 'template_rp83yqo', templateParams)
      .then(function(response) {
        alert("Your message has been sent successfully!");
      }, function(error) {
        alert("Failed to send message. Please try again.");
        console.error(error);
      });
  });
});
