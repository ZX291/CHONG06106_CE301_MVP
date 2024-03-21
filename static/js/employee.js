function addData(){
    var firstName=document.employeeform.firstname.value;
    var lastName=document.employeeform.lastname.value;
    var date=document.employeeform.date.value;
    var FINorNRIC=document.employeeform.FINorNRIC.value;
    var address=document.employeeform.address.value;
    var zipcode=document.employeeform.zipcode.value;
    var nationality=document.employeeform.nationality.value;
    var gender=document.employeeform.gender.value;
    var job_Role=document.employeeform.job_Role.value;
    var basicSalary=document.employeeform.basicSalary.value;

    var tr=document.createElement('tr');

    var td1 = tr.appendChild(document.createElement('td'));
    var td2 = tr.appendChild(document.createElement('td'));
    var td3 = tr.appendChild(document.createElement('td'));
    var td4 = tr.appendChild(document.createElement('td'));
    var td5 = tr.appendChild(document.createElement('td'));
    var td6 = tr.appendChild(document.createElement('td'));
    var td7 = tr.appendChild(document.createElement('td'));
    var td8 = tr.appendChild(document.createElement('td'));
    var td9 = tr.appendChild(document.createElement('td'));
    var td10 = tr.appendChild(document.createElement('td'));
    var td11 = tr.appendChild(document.createElement('td'));
    var td12 = tr.appendChild(document.createElement('td'));
    var td13 = tr.appendChild(document.createElement('td'));

    td1.innerHTML = firstName;
    td2.innerHTML = lastName;
    td3.innerHTML = date;
    td4.innerHTML = FINorNRIC;
    td5.innerHTML = address;
    td6.innerHTML = zipcode;
    td7.innerHTML = nationality;
    td8.innerHTML = gender;
    td9.innerHTML = job_Role;
    td10.innerHTML = basicSalary;

    // Check if the job role is administrative, accountant, or director
    var excludeCommissionRoles = ['administrative', 'accountant', 'director'];
    var excludeCommission = excludeCommissionRoles.includes(job_Role.toLowerCase());

    // Calculate commission, gross salary, and nett salary
    var commission = excludeCommission ? 0 : parseFloat(basicSalary) * 0.1;
    var grossSalary = parseFloat(basicSalary) + commission;

    // Get the selected nationality option
    var nationalityOption = document.querySelector('input[name="nationality"]:checked');

    if (nationalityOption) {
        var nationalityValue = nationalityOption.value;

        // Check the nationality and adjust nett salary accordingly
        var nettSalary;
        if (nationalityValue === 'Singaporean' || nationalityValue === 'SPR') {
            nettSalary = grossSalary * 0.8;
        } else {
            nettSalary = grossSalary;
        }
    }

    // Add the calculated values to the table cells
    td11.innerHTML = excludeCommission ? 'N/A' : commission.toFixed(2);
    td12.innerHTML = grossSalary.toFixed(2);
    td13.innerHTML = nettSalary.toFixed(2);


    // Add "Edit" button
    var editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.onclick = function () {
        editRow(tr);
    };
    tr.appendChild(editButton);

    // Add "Delete" button
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = function () {
        tr.remove(); // Remove the entire row
    };
    tr.appendChild(deleteButton);

    document.getElementById("tbl").appendChild(tr);
    document.getElementById("form1").reset();
}

function editRow(row) {
    // Set the form values based on the row details
    document.employeeform.firstname.value = row.cells[0].innerHTML;
    document.employeeform.lastname.value = row.cells[1].innerHTML;
    document.employeeform.date.value = row.cells[2].innerHTML;
    document.employeeform.FINorNRIC.value = row.cells[3].innerHTML;
    document.employeeform.address.value = row.cells[4].innerHTML;
    document.employeeform.zipcode.value = row.cells[5].innerHTML;
    document.employeeform.nationality.value = row.cells[6].innerHTML;
    document.employeeform.gender.value = row.cells[7].innerHTML;
    document.employeeform.job_Role.value = row.cells[8].innerHTML;
    document.employeeform.basicSalary.value = row.cells[9].innerHTML;

    // Modify the "Submit" button to act as an "Update" button during editing
    var submitButton = document.getElementById('add');
    submitButton.value = 'Update';

    // Remove existing click event listeners to avoid conflicts
    submitButton.removeEventListener('click', addData);
    submitButton.onclick = function () {
        updateRow(row);
    };
}

function updateRow(row) {
    // Update the row details with the form values
    row.cells[0].innerHTML = document.employeeform.firstname.value;
    row.cells[1].innerHTML = document.employeeform.lastname.value;
    row.cells[2].innerHTML = document.employeeform.date.value;
    row.cells[3].innerHTML = document.employeeform.FINorNRIC.value;
    row.cells[4].innerHTML = document.employeeform.address.value;
    row.cells[5].innerHTML = document.employeeform.zipcode.value;
    row.cells[6].innerHTML = document.employeeform.nationality.value;
    row.cells[7].innerHTML = document.employeeform.gender.value;
    row.cells[8].innerHTML = document.employeeform.job_Role.value;
    row.cells[9].innerHTML = document.employeeform.basicSalary.value;

    // Reset the "Submit" button behavior for adding new data
    var submitButton = document.getElementById('add');
    submitButton.value = 'Submit';

    // Remove existing click event listeners to avoid conflicts
    submitButton.removeEventListener('click', updateRow);
    submitButton.onclick = function () {
        addData();
    };

    // Reset the form
    document.getElementById("tbl").appendChild(tr);
    document.getElementById("form1").reset();
}
