from flask import Flask, request, session, g, redirect, url_for, abort, \
     render_template, flash
import sqlite3
import os



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

@app.route('/add')
def add_entry():
    db = get_db()
    db.execute("insert into user_info values ('1','L','D','Man','H','S','Mhotmail','oo');")
    db.commit()
    return('New entry was successfully posted')

@app.route('/gt')
def gt():
    for user in query_db('select * from user_info'):
        return user['firstname']    


@app.route('/getpersonbyid', methods=['GET'])
def getPersonById():
    return request.args.get('personId')


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
    return "works"
   
@app.route('/signin') 
def sign_in():

#@app.route('/signout')
#def sign_out():
#
#@app.route('/changepassword')
#def change_password():
#
#@app.route('/getuserdatabytoken')
#def get_user_data_by_token():
#
#@app.route('/getuserdatabyemail')
#def get_user_data_by_email():
#
#@app.route('/getusermessagesbytoken')
#def get_user_messages_by_token():
#
#@app.route('/getusermessagesbyemail')
#def get_user_messages_by_email():      
#      
#@app.route('/postmessage')
#def post_message():  


if __name__ == '__main__':
    app.run()
    
    
    