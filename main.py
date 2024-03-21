from flask import Flask, render_template, request, redirect, url_for
import mysql.connector

# Function to connect to MySQL database
mydb = mysql.connector.connect(
    host="localhost",
    user="root",
    password="5667Tysm!!@@",
    database="employeelist")

conn = mydb.cursor()

app = Flask(__name__)

@app.route("/")
def login():
    try:
        return render_template("login.html")
    except Exception as e:
        return f"Error rendering login template: {e}"

# Route for adding department
@app.route('/Department/', methods=['GET', 'POST'])
def add_department():
    success_message = None
    if request.method == 'POST':
        department_id = request.form['department_id']
        department_name = request.form['department_name']
        
        query = "INSERT INTO Department (Department_ID, Department_Name) VALUES (%s, %s)"
        val = [(department_id, department_name)]
        conn.executemany(query, val)
        mydb.commit()  # Commit changes to the database
        success_message = "Department added successfully."
        print(conn.rowcount, "was inserted.")
    return render_template("Department.html", success_message=success_message)


if __name__ == "__main__":
    app.run(debug=True)
