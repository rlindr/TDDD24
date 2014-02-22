from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash
import sqlite3
import os
import random
import string


# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)

DATABASE = 'database.db'

# Load default config and override config from an environment variable
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'database.db'),
    DEBUG=True,
    SECRET_KEY='development key',
    USERNAME='admin',
    PASSWORD='default'
))
app.config.from_envvar('FLASKR_SETTINGS', silent=True)


def connect_db():
    """Connects to the specific database."""
    rv = sqlite3.connect(app.config['DATABASE'])
    rv.row_factory = sqlite3.Row
    return rv

def init_db():
    with app.app_context():
        db = get_db()
        with app.open_resource('database.schema', mode='r') as f:
            db.cursor().executescript(f.read())
        db.commit()

def get_db():
    """Opens a new database connection if there is none yet for the
    current application context.
    """
    if not hasattr(g, 'sqlite_db'):
        g.sqlite_db = connect_db()
    return g.sqlite_db


@app.teardown_appcontext
def close_db(error):
    """Closes the database again at the end of the request."""
    if hasattr(g, 'sqlite_db'):
        g.sqlite_db.close()

def query_db(query, args=(), one=False):
    cur = get_db().execute(query, args)
    rv = cur.fetchall()
    cur.close()
    return (rv[0] if rv else None) if one else rv

@app.route('/signin', methods=['POST', 'GET']) 
def sign_in():
    email1 = request.args.get('email')
    password1 = request.args.get('password')
    length = 20
    generated_token = string.ascii_uppercase + string.digits +string.ascii_lowercase 
    token1 = ''.join(random.choice(generated_token) for i in range(length))
    user = query_db('SELECT email,password FROM user_info WHERE email=? AND password=?',[email1,password1], one=True)
    if user is None:
        return 'No such user'
    else:
        db = get_db()
        db.execute('UPDATE user_info SET token=? WHERE email=? AND password=? ' , [token1, email1, password1])
        db.commit()
        return token1


@app.route('/signup', methods=['POST'])
def sign_up():
    firstname = request.args.get('firstname')
    familyname = request.args.get('familyname')
    gender = request.args.get('gender')
    city = request.args.get('city')
    country = request.args.get('country')
    email = request.args.get('email')
    password = request.args.get('password')
    db = get_db()
    db.execute('insert into user_info (firstname, familyname, gender, city, country, email, password) values (?,?,?,?,?,?,?)', [firstname, familyname, gender, city, country, email, password])
    db.commit()
    return "You are now signed-up"
   
@app.route('/changepassword', methods=['POST'])
def change_password():
    token1 = request.args.get('token')
    oldPassword = request.args.get('oldPassword')
    newPassword = request.args.get('newPassword')
    db = get_db()
    db.execute('UPDATE user_info SET password=? WHERE token=?', [newPassword, token1])
    db.commit()
    return "You have now changed your password"
   
@app.route('/signout', methods=['POST'])
def sign_out():
    token1 = request.args.get('token')
    tokreset = 'null'
    db = get_db()
    db.execute('UPDATE user_info SET token=? WHERE token1=?' , [tokreset, token1])
    db.commit()
    return "You have now signed-out"

@app.route('/getuserdatabytoken', methods=['POST', 'GET'])
def get_user_data_by_token():
    token1 = request.args.get('token')
    user = query_db('SELECT email,firstname, familyname, gender, city, country FROM user_info WHERE token=?',[token1], one=True)
    if user is None:
        return 'No such user'
    else:
        return ",".join(user)

@app.route('/getuserdatabyemail', methods=['POST', 'GET'])
def get_user_data_by_email():
    email = request.args.get('email') 
    user = query_db('SELECT email,firstname, familyname, gender, city, country FROM user_info WHERE email=?',[email], one=True)
    if user is None:
        return 'No such user'
    else:
        return ",".join(user)

@app.route('/postmessage', methods=['POST'])
def post_message():
    token = request.args.get('token')
    email = request.args.get('email')
    message = request.args.get('message')
    au = query_db('SELECT email FROM user_info WHERE token=?',[token], one=True)
    au = ",".join(au) 
    db = get_db()
    db.execute('insert into messanges(author, receiver, message) values (?,?,?)', [au, email, message])
    db.commit()
    return "You have posted a message"
    
@app.route('/getusermessagesbytoken', methods=['POST', 'GET'])
def get_user_messages_by_token():
    token = request.args.get('token')
    re = query_db('SELECT email FROM user_info WHERE token=?',[token], one=True)
    re = ",".join(re) 
    mes = query_db('SELECT message FROM messanges WHERE receiver=?',[re], one=True)
    if mes is None:
        return 'No messages'
    else:
        return ",".join(mes)

@app.route('/getusermessagesbyemail', methods=['POST', 'GET'])
def get_user_messages_by_email():
    token = request.args.get('token')
    email = request.args.get('email')
    mes = query_db('SELECT message FROM messanges WHERE receiver=?',[email], one=True)
    if mes is None:
        return 'No messages'
    else:
        return ",".join(mes)
    

if __name__ == '__main__':
    app.run()
    
    
    