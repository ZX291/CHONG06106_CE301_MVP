show DATABASES;
USE EMPLOYEELIST;

CREATE TABLE Employee (
    Employee_ID INT AUTO_INCREMENT PRIMARY KEY,
    Employee_Name VARCHAR(255),
    NRIC_No VARCHAR(9),
    DateOfBirth DATE,
    ResidentialAddress VARCHAR(255),
    PassStatus VARCHAR(255),
    DATEJOINED DATE,
    DATELEAVE DATE,
    ORDINARYWAGES DECIMAL(15, 2)
    );

CREATE TABLE Vehicle (
    Vehicle_ID INT AUTO_INCREMENT PRIMARY KEY,
    Vehicle_CarPlate_No VARCHAR(8),
    Vehicle_Make VARCHAR(255),
    Vehicle_Model VARCHAR(255),
    Vehicle_Amount DECIMAL(20, 2),
    Vehicle_Status VARCHAR(50)
);

CREATE TABLE Commission (
    Commission_ID INT AUTO_INCREMENT PRIMARY KEY,
    Employee_ID INT,
    Vehicle_ID INT,
    Commission DECIMAL(10, 2),
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID),
    FOREIGN KEY (Vehicle_ID) REFERENCES Vehicle(Vehicle_ID)
);

CREATE TABLE Leave (
    Leave_ID INT AUTO_INCREMENT PRIMARY KEY,
    Leave_Type VARCHAR(255),
    Leave_No_of_Days DECIMAL(10, 2),
    Leave_Reason VARCHAR(255),    
    Employee_ID INT,
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
);

CREATE TABLE Agency (
    Agency_ID INT AUTO_INCREMENT PRIMARY KEY,
    Agency_Name VARCHAR(255),
    Agency_Fund DECIMAL(20, 2),
    Employee_ID INT,
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID)
);

CREATE TABLE Salary (
    Employee_ID INT,
    Leave_ID INT,
    Total_CPF DECIMAL(20, 2),
    SDL DECIMAL(20, 2),
    Employer_CPF DECIMAL(20, 2),
    Employee_CPF DECIMAL(20, 2),
    Ordinary_Wages DECIMAL(20, 2),
    Additional_Wages DECIMAL(20, 2),
    Total_Wages DECIMAL(20, 2),
    Agency_ID INT,
    FOREIGN KEY (Employee_ID) REFERENCES Employee(Employee_ID),
    FOREIGN KEY (Leave_ID) REFERENCES Leave(Leave_ID),
    FOREIGN KEY (Agency_ID) REFERENCES Agency(Agency_ID)
);
