document.addEventListener('DOMContentLoaded', function() {
  const leaveList = document.getElementById('leave-list');
  const approvedMessages = document.getElementById('approved-messages');

  // Retrieve leave requests from local storage
  let leaveRequests = JSON.parse(localStorage.getItem('leaveRequests')) || [];

  // Retrieve approved leave messages from local storage
  let approvedLeaves = JSON.parse(localStorage.getItem('approvedLeaves')) || [];

  // Display leave requests
  leaveRequests.forEach(function(leave, index) {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <span><strong>Name:</strong> ${leave.name}</span><br>
      <span><strong>Register Number:</strong> ${leave.registerNumber}</span><br>
      <span><strong>Start Date:</strong> ${leave.startDate}</span><br>
      <span><strong>End Date:</strong> ${leave.endDate}</span><br>
      <span><strong>Reason:</strong> ${leave.reason}</span><br>
      <button onclick="deleteLeave(${index})">Delete</button>
      <button onclick="approveLeave(${index})">Approve</button>
    `;
    leaveList.appendChild(listItem);
  });

  // Display approved messages
  approvedLeaves.forEach(function(approvedLeave) {
    const approvedMessage = document.createElement('li');
    approvedMessage.innerHTML = `
      <span><strong>Name:</strong> ${approvedLeave.name}</span><br>
      <span><strong>Register Number:</strong> ${approvedLeave.registerNumber}</span><br>
      <span><strong>Approval Date:</strong> ${approvedLeave.approvalDate}</span><br>
      <span>Leave approved on ${approvedLeave.approvalDate}</span>
    `;
    approvedMessages.appendChild(approvedMessage);
  });

  // Function to delete leave request
  window.deleteLeave = function(index) {
    leaveRequests.splice(index, 1);
    localStorage.setItem('leaveRequests', JSON.stringify(leaveRequests));
    location.reload(); // Refresh the page to reflect changes
  }

  // Function to approve leave request
  window.approveLeave = function(index) {
    const approvedLeave = leaveRequests[index];
    approvedLeave.approvalDate = new Date().toLocaleDateString(); // Add approval date
    approvedLeaves.push(approvedLeave);
    localStorage.setItem('approvedLeaves', JSON.stringify(approvedLeaves));
    deleteLeave(index); // Remove from pending leave requests
    
    // Display approved message
    const approvedMessage = document.createElement('li');
    approvedMessage.innerHTML = `
      <span><strong>Name:</strong> ${approvedLeave.name}</span><br>
      <span><strong>Register Number:</strong> ${approvedLeave.registerNumber}</span><br>
      <span><strong>Approval Date:</strong> ${approvedLeave.approvalDate}</span><br>
      <span>Leave approved on ${approvedLeave.approvalDate}</span>
    `;
    approvedMessages.appendChild(approvedMessage);
  }

  // Function to reset approved messages
  window.resetApprovedMessages = function() {
    approvedMessages.innerHTML = ''; // Clear all approved messages
    localStorage.removeItem('approvedLeaves'); // Remove approved messages from local storage
  }
});
