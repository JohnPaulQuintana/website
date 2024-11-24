$(document).ready(function () {
  // alert('its ready....')
  // Function to show the modal
  function showSuccessModal() {
    $("#success-modal").removeClass("hidden"); // Show modal
    $("#success-modal .bg-white")
      .removeClass("scale-95 opacity-0")
      .addClass("scale-100 opacity-100"); // Animate modal
  }

  // Function to hide the modal
  function hideSuccessModal() {
    $("#success-modal .bg-white")
      .removeClass("scale-100 opacity-100")
      .addClass("scale-95 opacity-0"); // Reverse animation
    setTimeout(() => {
      $("#success-modal").addClass("hidden"); // Hide modal after animation
    }, 300); // Match Tailwind's transition duration
  }

  // Close modal on button click
  $("#close-modal").on("click", function () {
    hideSuccessModal();

    window.location.reload()
  });
  // the form id is myForm
  // Bind form submission handler
  $(".contact-form").on("submit", function (event) {
    event.preventDefault(); // Prevent form reload

    // Gather form data
    var formData = new FormData(this);
    formData.append("service_id", "service_bgys0a8");
    formData.append("template_id", "template_u8q6qcg");
    formData.append("user_id", "LfuKsl040TAm5S1OE");

    // Make AJAX request to EmailJS
    $.ajax("https://api.emailjs.com/api/v1.0/email/send-form", {
      type: "POST",
      data: formData,
      contentType: false, // Allow auto-detection of content type
      processData: false, // Prevent jQuery from processing data
    })
      .done(function () {
        // alert("Your mail is sent!");
        // Trigger show modal (replace this with your success condition)
        setTimeout(() => {
          showSuccessModal();
        }, 1000); // Simulate email success (1 second delay)
      })
      .fail(function (error) {
        alert("Oops... " + JSON.stringify(error));
      });
  });

  // Trigger form submission on button click
  $("#rform-button-submit").on("click", function () {
    $(".contact-form").submit(); // Trigger the form submit event
  });
});
