/* ------------------------------------------ Control Inputs and Buttons ------------------------------------------ */
let employeeName = document.getElementById("employeeName");
let employeePhone = document.getElementById("employeePhone");
let employeeSalary = document.getElementById("employeeSalary");
let employeeAge = document.getElementById("employeeAge");
let employeeSearch = document.getElementById("employeeSearch");
let allInputs = document.getElementsByClassName("clr");
let employeeNameAlert = document.getElementById("employeeNameAlert");
let employeePhoneAlert = document.getElementById("employeePhoneAlert");
let employeeSalaryAlert = document.getElementById("employeeSalaryAlert");
let employeeAgeAlert = document.getElementById("employeeAgeAlert");
let btnAlert = document.getElementById("btnAlert");
let addBtn = document.getElementById("addEmployeeDetails");
let saveUpdateBtn = document.getElementById("updateEmployeeDetails");
let deleteCheckBoxSelectedBtn = document.getElementById("deleteSelectedBtn");
let GlobalIndex;
let deleteBtn;
let checkboxs;
let selectedNumberOfCheckBox = [];
let unSelectedNumberOfCheckBox = [];
let employeesList = [];
/* ------------------------------------------ Display LocalStorage ------------------------------------------ */

if (localStorage.getItem("Employees") != null) {
    employeesList = JSON.parse(localStorage.getItem("Employees"));
    displayEmployeeDetails(employeesList);
};

/* ------------------------------------------ Push employees details in array ------------------------------------------ */

function addEmployee() {
    let Employees = {
        name: employeeName.value,
        phone: employeePhone.value,
        salary: employeeSalary.value,
        age: employeeAge.value
    };
    employeesList.push(Employees);
};

/* ------------------------------------------ Create employees tabel ------------------------------------------ */

function displayEmployeeDetails(anyArray) {
    let emplyeeDetailsList = ""
    for (let i = 0; i < anyArray.length; i++) {
        emplyeeDetailsList += `
                            <tr>
                                <td> <input type="checkbox" name="checkBox" onclick="deleteSelected(${i})"></td>
                                <td>${i + 1}</td>
                                <td>${anyArray[i].name}</td>
                                <td>${anyArray[i].phone}</td>
                                <td>${anyArray[i].salary}</td>
                                <td class="pr-5">${anyArray[i].age}</td>
                                <td><button class = "btn btn-warning" onclick = "updateEmployeeDetails(${i})">Edit</button></td>
                                <td><button class = "btn btn-danger deleteBtn" onclick = "deleteEmployee(${i})">Delete</button></td>
                            </tr>
                        `
    };
    document.getElementById("displayTabelBody").innerHTML = emplyeeDetailsList;
    deleteBtn = document.querySelectorAll(".deleteBtn");
    checkboxs = document.getElementsByName("checkBox");
};

/* ------------------------------------------ Delete row from tabel ------------------------------------------ */

function deleteEmployee(index) {
    employeesList.splice(index, 1);
    displayEmployeeDetails(employeesList);
    localStorage.setItem("Employees", JSON.stringify(employeesList));
};

/* ------------------------------------------ Clear data from inputs ------------------------------------------ */

function clearData() {
    for (let i = 0; i < allInputs.length; i++) {
        allInputs[i].value = ""
    };
};

/* ------------------------------------------ Search ------------------------------------------ */

function searchEmployees() {
    let search = employeeSearch.value;
    let searchBox = [];

    for (let i = 0; i < employeesList.length; i++) {
        if (employeesList[i].name.toLowerCase().includes(search.toLowerCase())) {
            searchBox.push(employeesList[i]);
        };
    };
    displayEmployeeDetails(searchBox);
};

/*  ----------------------------------------------------- Regular Expression1 -----------------------------------------------------  */

function checkRegex1(Name) {
    let regex = /^[A-Z][a-z]{2,8}\s[A-Z][a-z]{2,8}$/;
    if (regex.test(Name) == true) {
        employeeNameAlert.classList.replace("d-block", "d-none");
        employeeName.classList.add("is-Valid");
        employeeName.classList.remove("is-inValid");
    }
    else {
        employeeNameAlert.classList.replace("d-none", "d-block");
        employeeName.classList.add("is-inValid");
        employeeName.classList.remove("is-Valid");
    };
};

/*  ----------------------------------------------------- Regular Expression2 -----------------------------------------------------  */

function checkRegex2(Phone) {
    let regex = /^(002)?01[0125]\d{8}$/;
    if (regex.test(Phone) == true) {
        employeePhoneAlert.classList.replace("d-block", "d-none");
        employeePhone.classList.add("is-Valid");
        employeePhone.classList.remove("is-inValid");
    }
    else {
        employeePhoneAlert.classList.replace("d-none", "d-block");
        employeePhone.classList.add("is-inValid");
        employeePhone.classList.remove("is-Valid");
    };
};

/*  ----------------------------------------------------- Regular Expression3 -----------------------------------------------------  */

function checkRegex3(Salary) {
    let regex = /^([2-9]\d{3}|[1][0-5]\d{3}|16000)$/;
    if (regex.test(Salary) == true) {
        employeeSalaryAlert.classList.replace("d-block", "d-none");
        employeeSalary.classList.add("is-Valid");
        employeeSalary.classList.remove("is-inValid");
    }
    else {
        employeeSalaryAlert.classList.replace("d-none", "d-block");
        employeeSalary.classList.add("is-inValid");
        employeeSalary.classList.remove("is-Valid");
    };
};

/*  ----------------------------------------------------- Regular Expression4 -----------------------------------------------------  */

function checkRegex4(Age) {
    let regex = /^([1][8-9]|[2-5][0-9]|[6][0-5])$/;
    if (regex.test(Age) == true) {
        employeeAgeAlert.classList.replace("d-block", "d-none");
        employeeAge.classList.add("is-Valid");
        employeeAge.classList.remove("is-inValid");
    }
    else {
        employeeAgeAlert.classList.replace("d-none", "d-block");
        employeeAge.classList.add("is-inValid");
        employeeAge.classList.remove("is-Valid");
    };
};

/* ----------------------------------------------------- Update Employee Details ----------------------------------------------------- */

function updateEmployeeDetails(index) {
    GlobalIndex = index;

    employeeName.value = employeesList[index].name;
    employeePhone.value = employeesList[index].phone;
    employeeSalary.value = employeesList[index].salary;
    employeeAge.value = employeesList[index].age;

    addBtn.style.display = "none";
    saveUpdateBtn.classList.replace("d-none", "d-block");

    removeValidClass();
    removeInValidClass();
    removeAlerts();
    disabledDeleteButton();
};

function changeInfo() {
    employeesList[GlobalIndex].name = employeeName.value;
    employeesList[GlobalIndex].phone = employeePhone.value;
    employeesList[GlobalIndex].salary = employeeSalary.value;
    employeesList[GlobalIndex].age = employeeAge.value;
};

function saveUpdate() {

    if (
        employeeNameAlert.classList.contains("d-none") &&
        employeePhoneAlert.classList.contains("d-none") &&
        employeeSalaryAlert.classList.contains("d-none") &&
        employeeAgeAlert.classList.contains("d-none")
    ) {

        changeInfo();
        clearData();
        addBtn.style.display = "block";
        saveUpdateBtn.classList.replace("d-block", "d-none");
        localStorage.setItem("Employees", JSON.stringify(employeesList));
        displayEmployeeDetails(employeesList);

        removeValidClass();
        removeInValidClass();
        removeAlerts();
        enabledDeleteButton();
    }

    else {
        btnAlert.classList.replace("d-none", "d-block");
    };

};

/* ----------------------------------------------------- CheckBox ----------------------------------------------------- */
function deleteSelected(index) {
    if (checkboxs[index].checked == true) {
        selectedNumberOfCheckBox.push(employeesList[index]);
    }
    else{
        unSelectedNumberOfCheckBox.push(employeesList[index]);
        selectedNumberOfCheckBox = selectedNumberOfCheckBox.filter( elements => !(unSelectedNumberOfCheckBox.includes(elements)));
    }
};

function deleteSelectedBtn() {
    employeesList = employeesList.filter( elements => !(selectedNumberOfCheckBox.includes(elements)));
    displayEmployeeDetails(employeesList);
    localStorage.setItem("Employees", JSON.stringify(employeesList));
};

/* ----------------------------------------- Remove Alerts && Valid And In-Valid Functions ----------------------------------------- */

function removeInValidClass() {
    employeeName.classList.remove("is-inValid");
    employeePhone.classList.remove("is-inValid");
    employeeSalary.classList.remove("is-inValid");
    employeeAge.classList.remove("is-inValid");
};

function removeValidClass() {
    employeeName.classList.remove("is-Valid");
    employeePhone.classList.remove("is-Valid");
    employeeSalary.classList.remove("is-Valid");
    employeeAge.classList.remove("is-Valid");
};

function removeAlerts() {
    employeeNameAlert.classList.replace("d-block", "d-none");
    employeePhoneAlert.classList.replace("d-block", "d-none");
    employeeSalaryAlert.classList.replace("d-block", "d-none");
    employeeAgeAlert.classList.replace("d-block", "d-none");
    btnAlert.classList.replace("d-block", "d-none");
};

// Hide alert under the button

function hideBtnAlert() {
    if (employeeName.value != "" ||
        employeePhone.value != "" ||
        employeeSalary.value != "" ||
        employeeAge.value != ""
    ) {
        btnAlert.classList.replace("d-block", "d-none");
    };
};

/* -------------------------------------------------- Disabled and Enable Delete Button -------------------------------------------------- */

function disabledDeleteButton() {
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].setAttribute("disabled", "disabled");
        deleteBtn[i].style.cursor = "not-allowed";
    };
};

function enabledDeleteButton() {
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].removeAttribute("disabled", "disabled");
        deleteBtn[i].style.cursor = "pointer";
    };
};

/* --------------------------------------------------------- Invoke Functions --------------------------------------------------------- */

// Invoke Add Button
addBtn.addEventListener(`click`, function () {
    if (employeeName.value != "" &&
        employeePhone.value != "" &&
        employeeSalary.value != "" &&
        employeeAge.value != "" &&
        employeeNameAlert.classList.contains("d-none") &&
        employeePhoneAlert.classList.contains("d-none") &&
        employeeSalaryAlert.classList.contains("d-none") &&
        employeeAgeAlert.classList.contains("d-none")
    ) {
        addEmployee();
        clearData();
        displayEmployeeDetails(employeesList);
        localStorage.setItem("Employees", JSON.stringify(employeesList));
        removeValidClass();
    }

    else {
        btnAlert.classList.replace("d-none", "d-block");
    };

});

// Invoke Hide Alert Under Add Button 
for (let i = 0; i < allInputs.length; i++) {
    allInputs[i].addEventListener("keyup", hideBtnAlert)
};

// Invoke Search Input
employeeSearch.addEventListener(`keyup`, searchEmployees);

// Invoke Save Update Button
saveUpdateBtn.addEventListener("click", saveUpdate);

/* Invoke Regular Expression1  */
employeeName.addEventListener("keyup", function () {
    checkRegex1(employeeName.value);
});
employeeName.addEventListener("blur", function () {
    checkRegex1(employeeName.value);
});

/* Invoke Regular Expression2  */
employeePhone.addEventListener("keyup", function () {
    checkRegex2(employeePhone.value);
});
employeePhone.addEventListener("blur", function () {
    checkRegex2(employeePhone.value);
});

/* Invoke Regular Expression3  */
employeeSalary.addEventListener("keyup", function () {
    checkRegex3(employeeSalary.value);
});
employeeSalary.addEventListener("blur", function () {
    checkRegex3(employeeSalary.value);
});

/* Invoke Regular Expression4  */
employeeAge.addEventListener("keyup", function () {
    checkRegex4(employeeAge.value);
});
employeeAge.addEventListener("blur", function () {
    checkRegex4(employeeAge.value);
});

/*  Invoke Delete Selected Button  */
deleteCheckBoxSelectedBtn.addEventListener("click", deleteSelectedBtn);

















