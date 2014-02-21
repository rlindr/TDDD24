import sqlite3
from flask import g


def get_db(): 
    if not hasattr(g, 'database'):
        g.sqlite_db = connect_db()
    return g.sqlite_db

def close_db(error):
    if hasattr(g, 'database'):
        g.sqlite_db.close()

def initiate_db():
    with app.app_context():
        db = get_db()
    with app.open_resource('database.schema', mode='r') as f:
        db.cursor().executescript(f.read())
    db.commit()
    
#def sign_in(email, password):
#    #code 
#      
#def sign_up(email, password, firstname, familyname, gender, city, country):
#    #code 
#      
#def sign_out(token)
#    #code   
#      
#def change_password(token, old_password, new_password)
#    #code   
#      
#def get_user_data_by_token(token)
#    #code   
#      
#def get_user_data_by_email(token, email)
#    #code   
#      
#def get_user_messages_by_token(token)
#    #code   
#      
#def get_user_messages_by_email(token, email)
#    #code   
#      
#def post_message(token, message, email)
#    #code 
