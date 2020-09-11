DROP DATABASE IF EXISTS employeeTracker;
CREATE DATABASE employeeTracker;

USE employeeTracker;



CREATE TABLE department(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE role(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  title VARCHAR(30),
  salary decimal,
  department_id int,
  PRIMARY KEY (id),
  FOREIGN KEY (department_id)
    REFERENCES department(id)
);

CREATE TABLE employee(
  id INTEGER(11) AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id int, 
  manager_id int null,
  PRIMARY KEY (id),
  FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE CASCADE,
  FOREIGN KEY (manager_id)
    REFERENCES role(id)
    ON DELETE CASCADE
);

