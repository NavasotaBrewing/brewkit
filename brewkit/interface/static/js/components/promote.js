var PromoteComponent = Vue.component('promote', {
  data: function() {
    return {
      users: [],
    }
  },
  mounted() {
    this.users = Middleware.users;
  },
  methods: {
    changeRole(user, role) {
      console.log("changing " + user.username + "'s role to " + role)
      user.role = role;
    },
    writeUsers() {
      $.ajax('/update_users', {
        data: JSON.stringify(this.users),
        contentType: 'application/json',
        type: 'POST'
      })
    }
  },
  template: `
    <div uk-grid id="promoteModal">
      <div>
        <div class="uk-container">
          <!-- This is the modal -->
          <div id="promote-modal" uk-modal>
            <div class="uk-modal-dialog uk-modal-body">
              <h2 class="uk-modal-title">Promote a User</h2>

              <table class="uk-table">
                <caption>Users</caption>
                <thead>
                  <tr>
                    <th>Username</th>
                    <th>Role</th>
                    <th>Promote</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users">
                    <td>{{ user.username }}</td>
                    <td>{{ user.role }}</td>
                    <td>
                      <button v-if="user.role == 'viewer'" @click="changeRole(user, 'brewer')" class="uk-button uk-button-primary uk-button-small">Promote</button>
                      <button v-if="user.role == 'brewer'" @click="changeRole(user, 'viewer')" class="uk-button uk-button-danger uk-button-small">Demote</button>
                    </td>
                  </tr>
                </tbody>
              </table>
              <p class="uk-text-right">
                <button @click="writeUsers()" class="uk-button uk-button-primary uk-modal-close" type="button">Done</button>
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  `
})
