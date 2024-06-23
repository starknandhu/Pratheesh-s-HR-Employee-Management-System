document.addEventListener('DOMContentLoaded', function() {
     const leaveForm = document.getElementById('leave-form');
   
     leaveForm.addEventListener('submit', function(event) {
       event.preventDefault();
       
       const name = leaveForm['name'].value;
       const registerNumber = leaveForm['register-number'].value;
       const startDate = leaveForm['start-date'].value;
       const endDate = leaveForm['end-date'].value;
       const reason = leaveForm['reason'].value;
   
       // Save the leave request to local storage
       const leaveRequest = {
         name: name,
         registerNumber: registerNumber,
         startDate: startDate,
         endDate: endDate,
         reason: reason
       };
       
       // Retrieve existing leave requests or initialize an empty array
       let leaveRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];
       
       // Add new leave request to the array
       leaveRequests.push(leaveRequest);
       
       // Save updated leave requests back to local storage
       localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));
   
       // Show success message
       alert("Your Message has been successfully sent!");
       
       // Optional: Clear form after submission
       leaveForm.reset();
     });
   });
   