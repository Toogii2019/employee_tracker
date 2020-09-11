-- Adding Departments

INSERT INTO department (name)
VALUES ("Engineering"); 

INSERT INTO department (name)
VALUES ("HR");

INSERT INTO department (name)
VALUES ("Finance");

INSERT INTO department (name)
VALUES ("Legal");

-- Adding Roles

INSERT INTO role (title, salary, department_id)
VALUES ("Sr Manager", 300000, 2);

INSERT INTO role (title, salary, department_id)
VALUES ("manager", 200000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("software engineer", 300000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Intern", 50000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 150000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("SalesPerson", 100000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Accound Manager", 100000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Technical Program Manager", 300000, 1);

INSERT INTO role (title, salary, department_id)
VALUES ("Accountant", 100000, 3);

INSERT INTO role (title, salary, department_id)
VALUES ("Legal Team Lead", 300000, 4);

-- Adding employees

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("James", "Bond", 1, NULL);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Bobby", "Blake", 2, 1);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Toogii", "Dashdavaa", 3, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Jim", "Carrey", 3, 2);

