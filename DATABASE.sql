show DATABASES;
USE EMPLOYEELIST;


CREATE TABLE Department (
    Department_ID VARCHAR(255) PRIMARY KEY,
    Department_Name VARCHAR(255)
);

CREATE TABLE Designation (
    Designation_ID VARCHAR(255) PRIMARY KEY,
    Designation_Name VARCHAR(255),
    Department_ID VARCHAR(255),
    FOREIGN KEY (Department_ID) REFERENCES Department(Department_ID)
);


CREATE TABLE Employee (
    Employee_ID VARCHAR(255) PRIMARY KEY,
    First_Name VARCHAR(255),
    Last_Name VARCHAR(255),
    Emp_Password VARCHAR(255) NOT NULL,
    NRIC_No VARCHAR(9),
    DOB DATE,
    Residential_Address VARCHAR(255),
    Designation_ID VARCHAR(255),
    Pass_Status VARCHAR(255),
    Date_Joined DATE,
    Date_Ended DATE,
    Ordinary_Wages DECIMAL(15, 2),
    FOREIGN KEY (Designation_ID) REFERENCES Designation(Designation_ID)
);

CREATE TABLE Vehicle (
    Vehicle_ID VARCHAR(255) PRIMARY KEY,
    Vehicle_Car_Plate VARCHAR(8),
    Vehicle_Make VARCHAR(255),
    Vehicle_Model VARCHAR(255),
    Selling_Price DECIMAL(20, 2),
    Finance_Amount DECIMAL(20, 2),
    Deposit DECIMAL(20, 2),
    Commission DECIMAL(20, 2),
    Status VARCHAR(50)
);


CREATE TABLE Commission (
    Commission_ID INT AUTO_INCREMENT PRIMARY KEY,
    Employee_ID VARCHAR(255),
    Vehicle_ID VARCHAR(255),
    Commission DECIMAL(10, 2),
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID),
    FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID)
);

CREATE TABLE LeaveCount (
    Leave_ID VARCHAR(255) PRIMARY KEY,
    Leave_Type VARCHAR(255),
    Leave_No_of_Days DECIMAL(10, 2),
    Leave_Reason VARCHAR(255),    
    Employee_ID VARCHAR(255),
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
);

CREATE TABLE Agency (
    Agency_ID VARCHAR(255) PRIMARY KEY,
    Agency_Name VARCHAR(255),
    Agency_Fund DECIMAL(20, 2)
);

CREATE TABLE Salary (
    Employee_ID VARCHAR(255),
    Leave_ID VARCHAR(255),
    Total_CPF DECIMAL(20, 2),
    SDL DECIMAL(20, 2),
    Employer_CPF DECIMAL(20, 2),
    Employee_CPF DECIMAL(20, 2),
    Ordinary_Wages DECIMAL(20, 2),
    Additional_Wages DECIMAL(20, 2),
    Total_Wages DECIMAL(20, 2),
    Agency_ID VARCHAR(255),
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID),
    FOREIGN KEY (Leave_ID) REFERENCES LeaveCount(Leave_ID),
    FOREIGN KEY (Agency_ID) REFERENCES Agency(Agency_ID)
);

SHOW TABLES;
SHOW COLUMNS FROM Employee;
SHOW COLUMNS FROM Vehicle;
SHOW COLUMNS FROM Commission;
SHOW COLUMNS FROM LeaveCount;
SHOW COLUMNS FROM Agency;
SHOW COLUMNS FROM Salary;

DROP TABLE IF EXISTS Salary;
DROP TABLE IF EXISTS Agency;
DROP TABLE IF EXISTS LeaveCount;
DROP TABLE IF EXISTS Commission;
DROP TABLE IF EXISTS Vehicle;
DROP TABLE IF EXISTS Employee;