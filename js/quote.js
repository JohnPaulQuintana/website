$(document).ready(function () {
  const $steps = $(".steps");
  const $stepCount = $("#stepCount");
  const $prevBtn = $("#prevBtn");
  const $nextBtn = $(".nextBtn");
  const $modal = $("#stepModal");



  let currentStep = 0;

  $('.design-a-quote').click(function(){
    $('#stepModal').removeClass('hidden')

    $('.modal-close').click(function(){
        $('#stepModal').addClass('hidden')
    })
  })
  function updateSteps() {
    
    // console.log(currentStep, $steps.length - 1)
    $steps.each(function (index) {
      $(this).toggleClass("hidden", index !== currentStep);
    });
    $stepCount.text(currentStep + 1);
    if ([1, 2].includes(currentStep)) {
      $("#nextBtn").addClass("hidden");
    } else if ([0,3].includes(currentStep)) {
      $("#nextBtn").removeClass("hidden");
    }
    //   $prevBtn.prop("disabled", currentStep === 0);
    if (currentStep > 0) {
      $prevBtn.removeClass("hidden");
    } else {
      $prevBtn.addClass("hidden");
    }
    //   $nextBtn.text(currentStep === $steps.length - 1 ? "Finish" : "Continue ->");
    if (currentStep === 3) {
        
      $('#nextBtn').text("Finish").addClass('hidden');
      $('.submitBtn').removeClass('hidden')
    }else{
        $('#nextBtn').text("Continue ->").removeClass('hidden');
        $('.submitBtn').addClass('hidden')
    }
  }

  $prevBtn.on("click", function () {
    if (currentStep > 0) {
      currentStep--;
      $('.service-error').addClass('hidden')
      $('.contact-error').addClass('hidden')
      updateSteps();
    }
  });

  $nextBtn.on("click", function () {
    // Example to validate that at least one checkbox is checked
    const isValid = $("input[name='services[]']:checked").length > 0;
    console.log("is valid: "+isValid)
    if(isValid){
        $('.service-error').addClass('hidden');
        if (currentStep < $steps.length - 1) {
            currentStep++;
      
            console.log(currentStep);
            updateSteps();
          } else {
            // alert("All steps completed!");
            // Check if all the contact detail fields are filled
            $(".contact-details").each(function() {
                if ($(this).val().trim() === "") {
                    $('.contact-error').removeClass('hidden')
                }else{
                    $('.contact-error').addClass('hidden')

                   
                    // $modal.addClass("hidden");
                }
            })
           
          }
    }else{
        $('.service-error').removeClass('hidden');
        
    }
    
  });

  updateSteps();

  $(".toggle-btn").on("click", function () {
    const $input = $(this).prev(".toggle-input");
    const isChecked = !$input.prop("checked");

    // Toggle the checkbox state
    $input.prop("checked", isChecked);

    // Update the button appearance
    if (isChecked) {
      $(this)
        .addClass("border-blue-500 text-blue-500")
        .removeClass("text-gray-700");
    } else {
      $(this)
        .removeClass("border-blue-500 text-blue-500")
        .addClass("text-gray-700");
    }
  });

  $('#submitBtn').click(function(event) {
    // alert('yes')
    event.preventDefault();  // Prevent default form submission

    // Collect form data
    const formData = new FormData($('#multiStepForm')[0]);

    const services = formData.getAll('services[]');
    const interested = formData.getAll('interested[]');
    const prices = formData.getAll('prices[]');

    const name = formData.get('name');
    const email = formData.get('email');
    const country = formData.get('country');
    const mobile_number = formData.get('mobile_number');
    
    // Prepare the email data for EmailJS
    var data = {
      service_id: 'service_bgys0a8',  // Replace with your EmailJS service ID
      template_id: 'template_21fyy28',  // Replace with your EmailJS template ID
      user_id: '2NyHEnshLP21eIwYA',  // Replace with your EmailJS public key
      template_params: {
        'from_name': name,
        'email_id': email,
        'message': formData.get('message') || "No message provided.",
        'country': country,
        'mobile_number': mobile_number,
        'services': services,
        'interested': interested,
        'prices': prices
      }
    };
    // console.log(data)
    // Send email using EmailJS API
    $.ajax('https://api.emailjs.com/api/v1.0/email/send', {
      type: 'POST',
      data: JSON.stringify(data),
      contentType: 'application/json'
    }).done(function() {
      console.log('Email sent successfully!');
      // alert('Quote submitted successfully!');
      $('#multiStepForm')[0].reset();  // Optionally reset form after submission
    }).fail(function(error) {
      console.log('Error sending email:', error);
      // alert('Error submitting quote. Please try again.');
    });
  });
});
