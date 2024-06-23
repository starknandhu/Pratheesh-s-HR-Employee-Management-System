let employees = [];

// Helper function to capitalize the first letter of each word
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Function to save employees data to localStorage
function saveToLocalStorage() {
  localStorage.setItem('employees', JSON.stringify(employees));
}

// Function to load employees data from localStorage
function loadFromLocalStorage() {
  const storedEmployees = localStorage.getItem('employees');
  if (storedEmployees) {
    employees = JSON.parse(storedEmployees);
    renderEmployees();
  }
}

// Call loadFromLocalStorage when the page loads to load any previously saved data
window.addEventListener('load', loadFromLocalStorage);

function renderEmployees() {
  const employeeBody = document.getElementById('employeeBody');
  employeeBody.innerHTML = '';
  employees.forEach((employee) => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${employee.id}</td>
      <td>${capitalizeFirstLetter(employee.firstName)}</td>
      <td>${capitalizeFirstLetter(employee.lastName)}</td>
      <td>${capitalizeFirstLetter(employee.dob)}</td>
      <td>${capitalizeFirstLetter(employee.gender)}</td>
      <td>${capitalizeFirstLetter(employee.contactNumber)}</td>
      <td>${employee.email}</td>
      <td>${capitalizeFirstLetter(employee.hireDate)}</td>
      <td>${capitalizeFirstLetter(employee.designation)}</td>
      <td>${capitalizeFirstLetter(employee.status)}</td>
      <td>${capitalizeFirstLetter(employee.salary)}</td>
      <td class="actions">
        <button class="edit-button" onclick="editEmployee(${employee.id})">Edit</button>
        <button class="delete-button" onclick="deleteEmployee(${employee.id})">Delete</button>
      </td>
    `;
    employeeBody.appendChild(row);
  });
}

function clearInputFields() {
  document.getElementById('firstName').value = '';
  document.getElementById('lastName').value = '';
  document.getElementById('dob').value = '';
  document.getElementById('gender').value = '';
  document.getElementById('contactNumber').value = '';
  document.getElementById('email').value = '';
  document.getElementById('hireDate').value = '';
  document.getElementById('designation').value = '';
  document.getElementById('status').value = '';
  document.getElementById('salary').value = '';
}

function displayModal() {
  clearInputFields(); // Clear input fields when displaying the modal
  const modal = document.getElementById('employeeModal');
  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('employeeModal');
  modal.style.display = 'none';
}

function saveEmployee() {
  const mode = document.getElementById('saveEmployee').getAttribute('data-mode');
  let newEmployee;

  if (mode === 'edit') {
    const employeeId = parseInt(document.getElementById('saveEmployee').getAttribute('data-id'));
    const index = employees.findIndex(emp => emp.id === employeeId);
    if (index === -1) return;

    employees[index] = {
      id: employeeId,
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      dob: document.getElementById('dob').value,
      gender: document.getElementById('gender').value,
      contactNumber: document.getElementById('contactNumber').value,
      email: document.getElementById('email').value,
      hireDate: document.getElementById('hireDate').value,
      designation: document.getElementById('designation').value,
      status: document.getElementById('status').value,
      salary: document.getElementById('salary').value
    };

    document.getElementById('saveEmployee').removeAttribute('data-mode');
    document.getElementById('saveEmployee').removeAttribute('data-id');
  } else {
    newEmployee = {
      id: employees.length + 1,
      firstName: document.getElementById('firstName').value,
      lastName: document.getElementById('lastName').value,
      dob: document.getElementById('dob').value,
      gender: document.getElementById('gender').value,
      contactNumber: document.getElementById('contactNumber').value,
      email: document.getElementById('email').value,
      hireDate: document.getElementById('hireDate').value,
      designation: document.getElementById('designation').value,
      status: document.getElementById('status').value,
      salary: document.getElementById('salary').value
    };
    employees.push(newEmployee);
  }

  // Save the updated employees data to localStorage
  saveToLocalStorage();

  closeModal();
  renderEmployees();
}

function deleteEmployee(employeeId) {
  employees = employees.filter(emp => emp.id !== employeeId);
  // Save the updated employees data to localStorage
  saveToLocalStorage();
  renderEmployees();
}

document.getElementById('addEmployee').addEventListener('click', displayModal);
document.getElementById('saveEmployee').addEventListener('click', saveEmployee);
document.querySelector('.close').addEventListener('click', closeModal);

function editEmployee(employeeId) {
  const employee = employees.find(emp => emp.id === employeeId);
  if (!employee) return;

  document.getElementById('saveEmployee').setAttribute('data-mode', 'edit');
  document.getElementById('saveEmployee').setAttribute('data-id', employee.id);

  document.getElementById('firstName').value = employee.firstName;
  document.getElementById('lastName').value = employee.lastName;
  document.getElementById('dob').value = employee.dob;
  document.getElementById('gender').value = employee.gender;
  document.getElementById('contactNumber').value = employee.contactNumber;
  document.getElementById('email').value = employee.email;
  document.getElementById('hireDate').value = employee.hireDate;
  document.getElementById('designation').value = employee.designation;
  document.getElementById('status').value = employee.status;
  document.getElementById('salary').value = employee.salary;

  displayModal();
}

// Sorting function
function sortEmployeesBy(column) {
  employees.sort((a, b) => {
    if (a[column] < b[column]) {
      return -1;
    }
    if (a[column] > b[column]) {
      return 1;
    }
    return 0;
  });
  renderEmployees();
}

// Event listeners for sorting
document.getElementById('firstNameHeader').addEventListener('click', () => sortEmployeesBy('firstName'));
document.getElementById('lastNameHeader').addEventListener('click', () => sortEmployeesBy('lastName'));

// Load employees data from localStorage when the page loads
loadFromLocalStorage();

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('searchInput');
  const searchBox = document.querySelector('.box-outside');
  const employeeBody = document.getElementById('employeeBody');

  // Expand the search bar when it's focused
  searchInput.addEventListener('focus', function () {
    searchBox.style.width = '300px';
  });

  // Collapse the search bar when it loses focus
  searchInput.addEventListener('blur', function () {
    searchBox.style.width = '';
  });

  searchInput.addEventListener('input', function () {
    const filter = searchInput.value.toLowerCase();
    const rows = employeeBody.getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
      let employeeID = rows[i].getElementsByTagName('td')[0].textContent.toLowerCase();
      let firstName = rows[i].getElementsByTagName('td')[1].textContent.toLowerCase();

      if (employeeID.indexOf(filter) > -1 || firstName.indexOf(filter) > -1) {
        rows[i].style.display = '';
      } else {
        rows[i].style.display = 'none';
      }
    }
  });
});
