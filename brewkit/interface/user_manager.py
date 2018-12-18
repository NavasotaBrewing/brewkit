import json

from werkzeug.security import check_password_hash, generate_password_hash

class UserManager(object):
    def __init__(self):
        self.store = "brewkit/interface/data/users.json"
        with open(self.store, 'r') as fi:
            self.users = json.load(fi)

    def add_user(self, new_user):
        new_user['password'] = generate_password_hash(new_user['password'])
        del new_user['passwordConfirm']
        if new_user['username'] in [u['username'] for u in self.users]:
            return 'exists'

        self.users.append(new_user)
        self.write_users()
        return 'success'

    def write_users(self):
        with open(self.store, 'w') as fi:
            json.dump(self.users, fi, indent=2)

    def login(self, attempt_user):
        try:
            user = [u for u in self.users if u['username'] == attempt_user['username']][0]
        except IndexError:
            return 'not_found'
        stored_hash = user['password']
        if check_password_hash(stored_hash, attempt_user['password']):
            return 'success'
        return 'error'
