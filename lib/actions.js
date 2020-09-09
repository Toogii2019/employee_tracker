const questions = [
    {message: 'What would you like to do ?',name: 'action', type: 'list', choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Manager', 'Update Employee Role']},
];

inquirer
.prompt(questions)
.then(function(response) {
    switch (response.action) {
        case "View All Employees":
            viewAllEmployee();
            break;
        case "View All Employees By Department":
            viewAllEmployeeByDepartment();
            break;
        case "View All Employees By Manager":
            viewAllEmployeeByManager();
            break;
        case "Add Employee":
            addEmployee();
            break;
        case "Remove Employee":
            removeEmployee();
            break;
        case "Update Employee Manager":
            updateEmployeeManager();
            break;
        case "Update Employee Role":
            updateEmployeeRole();
            break;
    }

});

function viewAllEmployee() {
    console.log("viewAllEmployee");
}

function viewAllEmployeeByDepartment() {
    console.log("viewAllEmployeeByDepartment");
}

function viewAllEmployeeByManager() {
    console.log("viewAllEmployeeByManager");
}

function addEmployee() {
    console.log("addEmployee");
}

function removeEmployee() {
    console.log("removeEmployee");
}

function updateEmployeeManager() {
    console.log("updateEmployeeManager");
}

function updateEmployeeRole() {
    console.log("updateEmployeeRole");
}