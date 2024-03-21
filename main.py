from flask import Flask, render_template, request, redirect, url_for
import mysql.connector

app = Flask(__name__)

# Function to connect to MySQL database
def mysqldatabase():
    try:
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="5667Tysm!!@@",
            database="EMPLOYEELIST"
        )
        return conn
    except mysql.connector.Error as err:
        print("Error connecting to database:", err)
        return None

# Function to validate username and password
def validate_user(conn, username, password):
    cursor = conn.cursor()
    query = "SELECT * FROM Employee WHERE Employee_ID = %s AND Emp_Password = %s"
    cursor.execute(query, (username, password))
    user = cursor.fetchone()
    cursor.close()
    if user:
        return True
    else:
        return False

# Login route
@app.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        username = request.form['username']
        password = request.form['password']
        conn = mysqldatabase()
        if conn:
            if validate_user(conn, username, password):
                # Redirect to employee dashboard or any other page after successful login
                return redirect(url_for('dashboard'))
            else:
                error = "Invalid username or password."
                return render_template('login.html', error=error)
        else:
            error = "Failed to connect to the database."
            return render_template('login.html', error=error)
    return render_template('login.html')

# Route for employee dashboard
@app.route('/dashboard')
def dashboard():
    conn = mysqldatabase()
    if conn:
        cursor = conn.cursor()
        query = "SELECT * FROM Employee WHERE Employee_ID = %s"
        cursor.execute(query, ('123',))  # Assuming '123' is a sample employee ID, replace with actual logged in user's ID
        employee = cursor.fetchone()
        cursor.close()
        conn.close()
        if employee:
            # Render dashboard with employee details
            return render_template('dashboard.html', employee=employee)
        else:
            return "Employee not found."
    else:
        return "Failed to connect to the database."

if __name__ == "__main__":
    app.run(debug=True)