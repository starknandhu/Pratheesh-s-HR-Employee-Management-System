document.addEventListener('DOMContentLoaded', function() {
     const feedbackForm = document.getElementById('feedback-form');
   
     feedbackForm.addEventListener('submit', function(event) {
       event.preventDefault();
       
       const employeeName = feedbackForm['employee-name'].value;
       const feedbackType = feedbackForm['feedback-type'].value;
       const feedbackMessage = feedbackForm['feedback-message'].value;
   
       // Here you can send the feedback data to the server, or process it as needed
       
       // For demonstration purposes, we'll just log the feedback data to the console
       console.log('Employee Name:', employeeName);
       console.log('Feedback Type:', feedbackType);
       console.log('Feedback Message:', feedbackMessage);
   
       // Reset the form after submission
       feedbackForm.reset();
     });
   });
   