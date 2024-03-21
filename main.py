from flask import Flask
import mysql.connector
import string
import random
import smtplib
import ssl
import datetime

mydb = mysql.connector.connect( 
    host="localhost",
    user="root",
    password="5667Tysm!!@@",
    database="employeelist"
)

mycursor = mydb.cursor()

app = Flask(__name__)

records=[]
def get_data():
    print('Loading data...')
    mydb = mysql.connector.connect( 
    host="localhost",
    user="root",
    password="5667Tysm!!@@",
    database="employeelist"
    )
    mycursor = mydb.cursor()
    mycursor.execute('SELECT * FROM employeelist')
    attendance_data = mycursor.fetchall() 
    print(attendance_data)
    records.clear()
    for row in attendance_data:
        mycursor.execute('SELECT * FROM lessons WHERE Lesson_ID=%s', (row[2],))
        lesson = mycursor.fetchone()
        mycursor.execute('SELECT * FROM module WHERE Module_ID=%s', (lesson[2],))
        module = mycursor.fetchone()
        mycursor.execute('SELECT * FROM lesson_time WHERE Time_ID=%s', (lesson[1],))
        time = mycursor.fetchone()
        date = lesson[4].strftime("%a %d-%b-%Y")
        record = {
            'id' : row[0],
            'user_id' : row[1],
            'lesson_id' : row[2],
            'module' : module[1],
            'time' : time[1],
            'status' : row[3],
            'date' : date
        }
        records.append(record)
    mydb.close()
    print(records)
    return

@app.route("/", methods=["GET", "POST"])
def login():
    msg = ''

    if (session['loggedin'] == True):
        return redirect(url_for('home'))
    else:
        # Check if "username" and "password" POST requests exist (user submitted form)
        if request.method == "POST" and 'email' in request.form and 'password' in request.form:
            # Create variables for easy access
            email = request.form["email"]
            password = request.form["password"]
            print(email, password)

            mycursor.execute(
                "SELECT * FROM user WHERE User_Email = %s AND User_Password = %s", (email, password))
            account = mycursor.fetchone()

            print(account)

            # If account exists in user table
            if account:
                # Create session data, we can access this data in other routes
                session['loggedin'] = True
                session['User_ID'] = account[0]
                session['User_Name'] = account[1]
                session['User_Email'] = account[2]
                session['Role_ID'] = account[5]
                session['Course_ID'] = account[6]

                # Redirect to home page
                return redirect(url_for('home'))
                # return "Logged in!!!"
            else:
                # Account doesnt exist or username/password incorrect
                msg = 'Incorrect Email/Password!'

        return render_template("login.html", msg=msg)

# http://localhost:5000/logout - this will be the logout page


@app.route('/logout/')
def logout():
    # Remove session data, this will log the user out
    session['loggedin'] = None
    session['User_ID'] = None
    session['User_Name'] = None
    session['User_Email'] = None
    session['Role_ID'] = None
    session['Course_ID'] = None
   # Redirect to login page
    return redirect(url_for('login'))

@app.route('/')
def index():
    return 'Hello, World!'

if __name__ == '__main__':
    app.run(debug=True)