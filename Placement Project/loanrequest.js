document.getElementById('loanForm').addEventListener('submit', function(event) {
     event.preventDefault();
     
     // Get form values
     var employeeName = document.getElementById('employeeName').value;
     var loanAmount = document.getElementById('loanAmount').value;
     var reason = document.getElementById('reason').value;
     
     // Example of sending request to server (not implemented in this example)
     // Replace this with your actual server endpoint
     // For demo purposes, just displaying the form values
     
     var responseDiv = document.getElementById('response');
     responseDiv.innerHTML = 'Loan request submitted successfully:<br>' +
                              'Employee Name: ' + employeeName + '<br>' +
                              'Loan Amount: ' + loanAmount + '<br>' +
                              'Reason: ' + reason;
   });
   