// var selectedRow = null

// function onFormSubmit() {
//     if (validate()) {
//         var formData = readFormData();
//         if (selectedRow == null)
//             insertNewRecord(formData);
//         else
//             updateRecord(formData);
//         resetForm();
//     }
// }

// function readFormData() {
//     var formData = {};
//     formData["vehicleNo"] = document.getElementById("vehicleNo").value;
//     formData["make"] = document.getElementById("make").value;
//     formData["model"] = document.getElementById("model").value;
//     formData["yom"] = document.getElementById("yom").value;
//     formData["ord"] = document.getElementById("ord").date;
//     formData["chassisNo"] = document.getElementById("chassisNo").value;
//     formData["price"] = document.getElementById("price").value;
//     formData["status"] = document.getElementById("status").value;
//     formData["sales_Incharge"] = document.getElementById("sales_Incharge").value;
//     return formData;
// }

// function insertNewRecord(data) {
//     var table = document.getElementById("tbl").getElementsByTagName('tbody')[0];
//     var newRow = table.insertRow(table.length);
//     cell1 = newRow.insertCell(0);
//     cell1.innerHTML = data.vehicleNo;
//     cell2 = newRow.insertCell(1);
//     cell2.innerHTML = data.make;
//     cell3 = newRow.insertCell(2);
//     cell3.innerHTML = data.model;
//     cell3 = newRow.insertCell(3);
//     cell3.innerHTML = data.yom;
//     cell3 = newRow.insertCell(4);
//     cell3.innerHTML = data.ord;
//     cell3 = newRow.insertCell(5);
//     cell3.innerHTML = data.chassisNo;
//     cell3 = newRow.insertCell(6);
//     cell3.innerHTML = data.price;
//     cell3 = newRow.insertCell(7);
//     cell3.innerHTML = data.status;
//     cell3 = newRow.insertCell(8);
//     cell3.innerHTML = data.sales_Incharge;
//     cell4 = newRow.insertCell(9);
//     cell4.innerHTML = `<a onClick="onEdit(this)">Edit</a>
//                        <a onClick="onDelete(this)">Delete</a>`;
// }

// function resetForm() {
//     document.getElementById("vehicleNo").value = "";
//     document.getElementById("make").value = "";
//     document.getElementById("model").value = "";
//     document.getElementById("yom").value = "";
//     document.getElementById("ord").value = "";
//     document.getElementById("chassisNo").value = "";
//     document.getElementById("price").value = "";
//     document.getElementById("status").value = "";
//     document.getElementById("sales_Incharge").value = "";
//     selectedRow = null;
// }


function addData(){
    var vehicleNo=document.inventoryform.vehicleNo.value;
    var make=document.inventoryform.make.value;
    var model=document.inventoryform.model.value;
    var yom=document.inventoryform.yom.value;
    var ord=document.inventoryform.ord.value;
    var chassisNo=document.inventoryform.chassisNo.value;
    var price=document.inventoryform.price.value;
    var status=document.inventoryform.status.value;
    var sales_Incharge=document.inventoryform.sales_Incharge.value;

    var tr=document.createElement('tr');


    var td1=tr.appendChild(document.createElement('td'));
    var td2=tr.appendChild(document.createElement('td'));
    var td3=tr.appendChild(document.createElement('td'));
    var td4=tr.appendChild(document.createElement('td'));
    var td5=tr.appendChild(document.createElement('td'));
    var td6=tr.appendChild(document.createElement('td'));
    var td7=tr.appendChild(document.createElement('td'));
    var td8=tr.appendChild(document.createElement('td'));
    var td9=tr.appendChild(document.createElement('td'));
    var td10=tr.appendChild(document.createElement('td'));

    td1.innerHTML=vehicleNo;
    td2.innerHTML=make;
    td3.innerHTML=model;
    td4.innerHTML=yom;
    td5.innerHTML=ord ;
    td6.innerHTML=chassisNo;
    td7.innerHTML=price;
    td8.innerHTML=status;
    td9.innerHTML=sales_Incharge;

    // Add "Edit" button
    var editButton = document.createElement('button');
    editButton.innerHTML = 'Edit';
    editButton.onclick = function() {
        editRow(vehicleNo); // Pass the unique identifier to the editing function
    };
    td10.appendChild(editButton);

    // Add "Delete" button
    var deleteButton = document.createElement('button');
    deleteButton.innerHTML = 'Delete';
    deleteButton.onclick = function() {
        // Implement your delete logic here
        tr.remove(); // Remove the entire row
    };
    td10.appendChild(deleteButton);
    
    document.getElementById("tbl").appendChild(tr);
    document.getElementById("form1").reset();
}

function editRow(vehicleNo) {
    // Retrieve the row based on the unique identifier
    var row = document.getElementById('row_' + vehicleNo);

    // Set the form values based on the row details
    document.inventoryform.vehicleNo.value = row.cells[0].innerHTML;
    document.inventoryform.make.value = row.cells[1].innerHTML;
    document.inventoryform.model.value = row.cells[2].innerHTML;
    document.inventoryform.yom.value = row.cells[3].innerHTML;
    document.inventoryform.ord.value = row.cells[4].innerHTML;
    document.inventoryform.chassisNo.value = row.cells[5].innerHTML;
    document.inventoryform.price.value = row.cells[6].innerHTML;
    document.inventoryform.status.value = row.cells[7].innerHTML;
    document.inventoryform.sales_Incharge.value = row.cells[8].innerHTML;

    // Modify the "Submit" button to act as an "Update" button during editing
    var submitButton = document.getElementById('add');
    submitButton.value = 'Update';
    submitButton.onclick = function() {
        updateRow(vehicleNo); // Call the update function on button click
    };
}

function updateRow(vehicleNo) {
    // Retrieve the row based on the unique identifier
    var row = document.getElementById('row_' + vehicleNo);

    // Update the row details with the form values
    row.cells[0].innerHTML = document.inventoryform.vehicleNo.value;
    row.cells[1].innerHTML = document.inventoryform.make.value;
    row.cells[2].innerHTML = document.inventoryform.model.value;
    row.cells[3].innerHTML = document.inventoryform.yom.value;
    row.cells[4].innerHTML = document.inventoryform.ord.value;
    row.cells[5].innerHTML = document.inventoryform.chassisNo.value;
    row.cells[6].innerHTML = document.inventoryform.price.value;
    row.cells[7].innerHTML = document.inventoryform.status.value;
    row.cells[8].innerHTML = document.inventoryform.sales_Incharge.value;

    // Restore the "Submit" button behavior for adding new data
    var submitButton = document.getElementById('add');
    submitButton.value = 'Submit';
    submitButton.onclick = function() {
        addData(); // Revert to the addData function on button click
    };

    // Reset the form
    document.getElementById("form1").reset();
}

// function onEdit(td) {
//     selectedRow = td.parentElement.parentElement;
//     document.getElementById("vehicleNo").value = selectedRow.cells[0].innerHTML;
//     document.getElementById("make").value = selectedRow.cells[1].innerHTML;
//     document.getElementById("model").value = selectedRow.cells[2].innerHTML;
//     document.getElementById("yom").value = selectedRow.cells[3].innerHTML;
//     document.getElementById("ord").value = selectedRow.cells[4].innerHTML;
//     document.getElementById("chassisNo").value = selectedRow.cells[5].innerHTML;
//     document.getElementById("price").value = selectedRow.cells[6].innerHTML;
//     document.getElementById("status").value = selectedRow.cells[7].innerHTML;
//     document.getElementById("sales_Incharge").value = selectedRow.cells[8].innerHTML;
// }
// function updateRecord(formData) {
//     selectedRow.cells[0].innerHTML = formData.vehicleNo;
//     selectedRow.cells[1].innerHTML = formData.make;
//     selectedRow.cells[2].innerHTML = formData.model;
//     selectedRow.cells[3].innerHTML = formData.yom;
//     selectedRow.cells[4].innerHTML = formData.ord;
//     selectedRow.cells[5].innerHTML = formData.chassisNo;
//     selectedRow.cells[6].innerHTML = formData.price;
//     selectedRow.cells[7].innerHTML = formData.status;
//     selectedRow.cells[8].innerHTML = formData.sales_Incharge;
// }