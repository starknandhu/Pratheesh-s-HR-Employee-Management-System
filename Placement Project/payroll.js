document.addEventListener("DOMContentLoaded", function() {
    function calculatePayrollForRow(row) {
        var variablePay = parseFloat(document.getElementById("variablePay").value);
        var pfPercentage = parseFloat(document.getElementById("pfPercentage").value);
        var BasicPercentage = parseFloat(document.getElementById("BasicPercentage").value);
        var hraPercentage = parseFloat(document.getElementById("hraPercentage").value);
        
        var givenCTC = parseFloat(row.querySelector(".givenctc").value) || 0;
        var ta = parseFloat(row.querySelector(".ta").value) || 0;
        var da = parseFloat(row.querySelector(".da").value) || 0;
        
        var remaining = givenCTC - variablePay;
        var monthlyCTC = remaining / 12;
        var basicSalary = monthlyCTC * (BasicPercentage / 100);
        var pfAmount = (pfPercentage / 100) * basicSalary;
        var hra = (hraPercentage / 100) * basicSalary;
        var netSalary = basicSalary + hra + ta + da;
        
        row.querySelector(".vp").innerText = variablePay.toFixed(2);
        row.querySelector(".hra").innerText = hra.toFixed(2);
        row.querySelector(".mctc").innerText = monthlyCTC.toFixed(2);
        row.querySelector(".bs").innerText = basicSalary.toFixed(2);
        row.querySelector(".pfam").innerText = pfAmount.toFixed(2);
        row.querySelector(".nets").innerText = netSalary.toFixed(2);
    }
    
    function calculatePayroll() {
        var rows = document.querySelectorAll(".payroll-inside table tbody tr");
        rows.forEach(function(row) {
            calculatePayrollForRow(row);
        });
    }

    function addInputListeners() {
        document.querySelectorAll(".givenctc, .ta, .da").forEach(function(element) {
            element.addEventListener("input", function() {
                calculatePayroll();
            });
        });

        document.querySelectorAll("#variablePay, #pfPercentage, #BasicPercentage, #hraPercentage").forEach(function(element) {
            element.addEventListener("input", function() {
                calculatePayroll();
            });
        });
    }

    function saveToCache() {
        var employeeData = [];
        var rows = document.querySelectorAll(".payroll-inside table tbody tr");
        rows.forEach(function(row) {
            var employee = {
                employeeId: row.children[0].innerText,
                employeeName: row.children[1].innerText,
                givenCTC: row.querySelector(".givenctc").value || '',
                ta: row.querySelector(".ta").value || '',
                da: row.querySelector(".da").value || ''
            };
            employeeData.push(employee);
        });
        localStorage.setItem('employeeData', JSON.stringify(employeeData));
    }

    function loadFromCache() {
        var employeeData = JSON.parse(localStorage.getItem('employeeData'));
        if (employeeData) {
            employeeData.forEach(function(employee) {
                var newRow = document.createElement("tr");
                newRow.innerHTML = '<td>' + employee.employeeId + '</td>' +
                                   '<td>' + employee.employeeName + '</td>' +
                                   '<td><input type="text" class="givenctc" value="' + employee.givenCTC + '"></td>' +
                                   '<td class="vp"></td>' +
                                   '<td class="hra"></td>' +
                                   '<td><input type="text" class="ta" value="' + employee.ta + '"></td>' +
                                   '<td><input type="text" class="da" value="' + employee.da + '"></td>' +
                                   '<td class="mctc"></td>' +
                                   '<td class="bs"></td>' +
                                   '<td class="pfam"></td>' +
                                   '<td class="nets"></td>';
                document.querySelector('.payroll-inside table tbody').appendChild(newRow);
            });
        }
        addInputListeners();  // Add event listeners to the new input elements
        calculatePayroll();
    }

    document.getElementById("addEmployeeBtn").addEventListener("click", function() {
        var employeeId = document.getElementById("regnum").value.trim();
        var employeeName = document.getElementById("empname").value.trim();
        
        if(employeeId === "" || employeeName === "") {
            alert("Please provide both ID and Name.");
            return;
        }
        
        var newRow = document.createElement("tr");

        newRow.innerHTML = '<td>' + employeeId + '</td>' +
                           '<td>' + employeeName + '</td>' +
                           '<td><input type="text" class="givenctc"></td>' +
                           '<td class="vp"></td>' +
                           '<td class="hra"></td>' +
                           '<td><input type="text" class="ta"></td>' +
                           '<td><input type="text" class="da"></td>' +
                           '<td class="mctc"></td>' +
                           '<td class="bs"></td>' +
                           '<td class="pfam"></td>' +
                           '<td class="nets"></td>';

        document.querySelector('.payroll-inside table tbody').appendChild(newRow);
        
        addInputListeners();  // Add event listeners to the new input elements

        calculatePayroll();
        saveToCache();
    });

    document.getElementById("clearBtn").addEventListener("click", function() {
        localStorage.removeItem('employeeData');
        document.querySelector('.payroll-inside table tbody').innerHTML = '';
    });

    addInputListeners();  // Initial binding of event listeners to existing elements
    loadFromCache();      // Load data from cache if available
    calculatePayroll();
});
w