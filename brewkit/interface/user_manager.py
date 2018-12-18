import json
import uuid

from werkzeug.security import check_password_hash, generate_password_hash

class UserManager(object):
    def __init__(self):
        self.store = "brewkit/interface/data/users.json"
        with open(self.store, 'r') as fi:
            self.users = json.load(fi)
        self.tokens = []

    def add_user(self, new_user):
        new_user['password'] = generate_password_hash(new_user['password'])
        del new_user['passwordConfirm']
        new_user['role'] = 'viewer'
        if new_user['username'] in [u['username'] for u in self.users]:
            return 'exists'

        self.users.append(new_user)
        self.write_users()
        return 'success'

    def write_users(self):
        with open(self.store, 'w') as fi:
            json.dump(self.users, fi, indent=2)

    def new_token(self):
        return uuid.uuid4().hex

    def login(self, attempt_user):
        if attempt_user == {}:
            return 'error'
        try:
            user = [u for u in self.users if u['username'] == attempt_user['username']][0]
        except IndexError:
            return 'error'
        stored_hash = user['password']
        if check_password_hash(stored_hash, attempt_user['password']):
            token = self.new_token()
            user['token'] = token
            self.tokens.append(token)
            return user
        # This is going to Vue and you can't return bools, needs to be a string
        return 'error'
