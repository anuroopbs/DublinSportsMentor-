
document.addEventListener('DOMContentLoaded', function () {
  const btn = document.querySelector("#submit-btn");

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
      name,
      email,
      phone,
      experience,
      date,
      time,
      notes
    };

    emailjs.send("service_j4beam4", "template_rp83yqo", templateParams)
      .then(() => {
        alert("Your message has been sent successfully!");
      })
      .catch((err) => {
        alert("Failed to send message.");
        console.error(err);
      });
  });
});
