const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');


const getAllQuery = "SELECT A.first_name, role.title as Role, role.salary as Salary, department.name as Department, B.first_name as Manager FROM employee as A INNER JOIN (employee as B, role, department) ON (A.manager_id = B.id AND A.role_id = role.id AND role.department_id = department.id)"

// ========================Connection To Database========================

const connection = mysql.createConnection({
  host: 'localhost',

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: 'root',

  // Your password
  password: 'rootadmin',
  database: 'employeeTracker'
});

// ========================================================================

// ========================Get Action======================================

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
            viewAllEmployeeByDep();
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
        case "Update Employee Role":
            updateEmployeeRole();
            break;
        case "Update Employee Manager":
            updateEmployeeManager();
            break;
        default:
            break;
    }
}
);                            








function viewAllEmployee() {
    console.log("viewAllEmployee");

    connection.connect(function (err) {
        if (err) throw err;
        console.log(`connected as id: ${connection.threadId}`);
    });

    connection.query(
        getAllQuery,
        function (err, result) {
          if (err) throw err;
          console.log('Successfully got information from Database!');
          // re-prompt the user for if they want to bid or post
          displayResult(result);
        }
      );
}

function displayResult(obj) {
    console.table(obj)
}

function viewAllEmployeeByDep() {
    console.log("viewAllEmployeeByDep");
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

function updateEmployeeRole() {
    console.log("updateEmployeeRole");
}


function updateEmployeeManager() {
    console.log("updateEmployeeManager");
}




  