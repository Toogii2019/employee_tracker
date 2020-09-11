const inquirer = require("inquirer");
const mysql = require("mysql");
const cTable = require('console.table');


const getAllQuery = "SELECT A.first_name," + 
                    "A.last_name, role.title as Role," +
                    "role.salary as Salary," + 
                    "department.name as Department," + 
                    "B.first_name as Manager FROM employee as A INNER JOIN (employee as B, role, department)" + 
                    "ON (A.manager_id = B.id AND A.role_id = role.id AND role.department_id = department.id)"
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

// ========================Prepare Variables======================================


let roles = [];
let managers = []
let manager_id = 0;
let role_id = 0;
let employees = []
let departments = []

// ========================Get Action======================================

const questions = [
    {message: 'What would you like to do ?',name: 'action', type: 'list', choices: ['View All Employees', 'View All Employees By Department', 'View All Employees By Manager', 'Add Employee', 'Remove Employee', 'Update Employee Manager', 'Update Employee Role']},
];


connection.connect(function (err) {
    if (err) throw err;
    console.log(`connected as id: ${connection.threadId}`);
});

function init() {
    roles = [];
    managers = []
    manager_id = 0;
    role_id = 0;
    employees = [];
    departments = [];
    
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
}                      


function viewAllEmployee() {

    // connection.connect(function (err) {
    //     if (err) throw err;
    //     console.log(`connected as id: ${connection.threadId}`);
    // });

    connection.query(
        getAllQuery,
        function (err, result) {
          if (err) throw err;
          // re-prompt the user for if they want to bid or post
          displayResult(result);
        }
      );
    }

function addEmployee() {
    connection.query(
        "SELECT * from role",
        function (err, result) {
          if (err) throw err;
        //   console.log(result);

          for (i=0;i<result.length;i++) {
              roles.push(result[i].title)
          }
        }
    );
    connection.query(
        "select first_name," + 
        "last_name from employee " + 
        "INNER JOIN (role) " + 
        "ON employee.role_id = role.id " + 
        "where role.title = 'manager' OR role.title = 'Sr Manager'",
        function (err, result) {
          if (err) throw err;
        //   console.log(result);

          for (i=0;i<result.length;i++) {
              managers.push(`${result[i].first_name} ${result[i].last_name}`)
          }
        //   console.log(managers);
        }
    );
          
    inquirer
    .prompt(
    [
        {message: 'First Name ?',name: 'firstname', type: 'input'},
        {message: 'Last Name',name: 'lastname', type: 'input'},
        {message: 'Role ?',name: 'role', type: 'list', choices: roles},
        {message: 'Manager ?',name: 'manager', type: 'list', choices: managers}
    ]
    )
    .then(function(response) {
        // console.log(response);
        connection.query(
            "select id from employee where ? AND ?", 
            [
                {
                  first_name: response.manager.split(" ")[0]
                },
                {
                  last_name: response.manager.split(" ")[1]
                }
              ],
            function (err, result) {
              if (err) throw err;
              manager_id = result[0].id;
            }
        );

            
        connection.query(
            `select role.id from role where role.title = '${response.role}'`, 
            function (err, result) {
              if (err) throw err;
              role_id = result[0].id;
              addNewEmployeeToDB(response.firstname, response.lastname, role_id, manager_id);
            }
        );
    });       
};


function addNewEmployeeToDB(firstname, lastname, role_id, manager_id) {
    console.log(firstname, lastname, role_id, manager_id);
    connection.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${firstname}", "${lastname}", ${role_id}, ${manager_id});`, 
        function (err, result) {
          if (err) throw err;
          viewAllEmployee();
        }
    );
}

function RemoveEmployeeToDB(firstname, lastname) {
    connection.query(
        `DELETE FROM employee WHERE first_name = "${firstname}" AND last_name = "${lastname}";`, 
        function (err, result) {
          if (err) throw err;
          viewAllEmployee();
        }
    );
}

function displayResult(obj) {
    console.table(obj)
    init();
}

function removeEmployee() {

    connection.query(
        "SELECT * from employee",
        function (err, result) {
          if (err) throw err;
        //   console.log(result);

          for (i=0;i<result.length;i++) {
            employees.push(`${result[i].first_name} ${result[i].last_name}`)
          }
          console.log(employees);

          inquirer
          .prompt(
          [
              {message: 'Choose the employee to remove',name: 'employee', type: 'list', choices: employees}
          ]
          )
          .then(function(response) {
              console.log(response.employee);
              RemoveEmployeeToDB(response.employee.split(" ")[0], response.employee.split(" ")[1]);

        })
    });
}


function viewAllEmployeeByDep() {

    connection.query(
        "SELECT * from department;",
        function (err, result) {
          if (err) throw err;
        //   console.log(result);

          for (i=0;i<result.length;i++) {
            departments.push(`${result[i].name}`)
          }

          inquirer
          .prompt(
          [
              {message: 'Choose the department',name: 'department', type: 'list', choices: departments}
          ]
          )
          .then(function(response) {
              console.log(response.department);
              connection.query(
                `select department.id from department where department.name = '${response.department}'`,
                function (err, result) {
                  if (err) throw err;
                  console.log(result[0].id);
                  
                  connection.query(
                    `SELECT A.first_name, A.last_name, role.title as Role, role.salary as Salary,` + 
                    `department.name as Department,` + 
                    `B.first_name as Manager FROM employee as A INNER JOIN (employee as B, role, department)` + 
                    `ON (A.manager_id = B.id AND A.role_id = role.id AND role.department_id = department.id) where department.id = '${result[0].id}'`,
                    function (err, result) {
                      if (err) throw err;
                      displayResult(result);
                })
            })
        })
    });
}


function viewAllEmployeeByManager() {

    connection.query(
        "select first_name, last_name from employee INNER JOIN (role)" + 
        "ON employee.role_id = role.id where role.title = 'manager'" + 
        "OR role.title = 'Sr Manager'",
        function (err, result) {
          if (err) throw err;
        //   console.log(result);

          for (i=0;i<result.length;i++) {
              managers.push(`${result[i].first_name} ${result[i].last_name}`)
          }
          console.log(managers);

          inquirer
          .prompt(
          [
              {message: 'Choose the manager',name: 'manager', type: 'list', choices: managers}
          ]
          )
          .then(function(response) {
              console.log(response.manager);
              connection.query(
                `SELECT A.first_name,` + 
                `A.last_name, role.title as Role,` + 
                `role.salary as Salary, department.name as Department,` + 
                `B.first_name as Manager_Firstname,` + 
                `B.last_name as Manager_Lastname FROM employee as A INNER JOIN (employee as B, role, department)` + 
                `ON (A.manager_id = B.id AND A.role_id = role.id AND role.department_id = department.id)` + 
                `where B.first_name = "${response.manager.split(" ")[0]}" and B.last_name="${response.manager.split(" ")[1]}";`,
                function (err, result) {
                  if (err) throw err;
                  displayResult(result);
                  
            })
        })

        }
    )


}

init();
  