from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash
import sqlite3
import os
import random
import string
import sys

# create our little application :)
app = Flask(__name__)
app.config.from_object(__name__)

# Load default config and override config from an environment variable
app.config.update(dict(
    DATABASE=os.path.join(app.root_path, 'database.db'),
    DEBUG=True,
    SECRET_KEY='development key',
    USERNAME='admin',
    PASSWORD='default'
))
app.config.from_envvar('FLASKR_SETTINGS', silent=True)

def check_password(hashed_password, user_password):
    password, salt = hashed_password.split(':')
    return password == ps.sha256(salt.encode() + user_password.encode()).hexdigest()


def query_db(query, args=()):
    cur = get_db().execute(query, args)
    row = cur.fetchall()
    cur.close()
    return (row[0] if row else None)


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


def sign_in(email1,password1,token1):
    user = query_db('SELECT email,password FROM user_info WHERE email=? AND password=?',[email1,password1])
    if user is None:
        return 'No such user registered in the database'
    else:
        db = get_db()
        db.execute('UPDATE user_info SET token=? WHERE email=? AND password=? ' , [token1, email1, password1])
        db.commit()
        return token1


def sign_up(firstname,familyname,gender,city,country,email,password):
    user = query_db('SELECT email FROM user_info WHERE email=?',[email])
    if user is None:
        return 'There is already an user registered with that username'
    else:
        db = get_db()
        db.execute('insert into user_info (firstname, familyname, gender, city, country, email, password) values (?,?,?,?,?,?,?)', [firstname, familyname, gender, city, country, email, password])
        db.commit()

def change_password(token1, oldPassword, newPassword):
    
    pc = query_db('SELECT password FROM user_info WHERE token=?',[token1])
    if "".join(pc) ==  "".join(oldPassword):
        db = get_db()
        db.execute('UPDATE user_info SET password=? WHERE token=?', [newPassword, token1])
        db.commit()
    else:    
        return "error"
   

def sign_out(tokreset,token1):
    re = query_db('SELECT token FROM user_info WHERE token=?',[token1])
    re = ",".join(re) 
    if re == token1:
        db = get_db()
        db.execute('UPDATE user_info SET token=? WHERE token=?' , [tokreset, token1])
        db.commit()
    else:
        return "You tried to log-out from wrong user"


def get_user_data_by_token(token1):
    user = query_db('SELECT email,firstname, familyname, gender, city, country FROM user_info WHERE token=?',[token1])
    if user is None:
        return 'None'
    else:
        return user

def get_user_data_by_email(email):
    user = query_db('SELECT email,firstname, familyname, gender, city, country FROM user_info WHERE email=?',[email])
    if user is None:
        return 'None'
    else:
        return user

def post_message(token, email, message):
    user = query_db('SELECT email FROM user_info WHERE email=?',[email])
    if user is None:
        return 'The reciever of this message is not registered'
    else:    
        au = query_db('SELECT email FROM user_info WHERE token=?',[token])
        au = ",".join(au) 
        db = get_db()
        db.execute('insert into messanges(author, receiver, message) values (?,?,?)', [au, email, message])
        db.commit()
    
def get_user_messages_by_token(token):
    re = query_db('SELECT email FROM user_info WHERE token=?',[token])
    re = ",".join(re) 
    mes = query_db('SELECT message FROM messanges WHERE receiver=?',[re])
    if mes is None:
        return 'None'
    else:
        return mes
        
    
def get_user_messages_by_email(token, email):
    mes = query_db('SELECT message FROM messanges WHERE receiver=?',[email])
    if mes is None:
        return 'None'
    else:
        return mes
 
