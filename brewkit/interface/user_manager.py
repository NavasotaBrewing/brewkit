import json

class UserManager(object):
    def __init__(self):
        self.store = "brewkit/interface/data/user.json"
        with open(self.store, 'r') as fi:
            self.users = json.load(fi)

    def add_user(self, user):
        self.users.append(user)
        self.write_users()

    def write_users(self):
        with open(self.store, 'w') as fi:
            json.dump(self.users, fi, indent=2)
