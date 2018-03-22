module.exports = {
  login: {
    name: 'login',
    customClasses: ' authentication',
    fields: [
      {
        name: 'username',
        type: 'text',
        placeholder: 'Username'
      },
      {
        name: 'password',
        type: 'password',
        placeholder: 'Password'
      }
    ]
  },
  register: {
    name: 'register',
    customClasses: ' authentication',
    fields: [
      {
        name: 'username',
        type: 'text',
        placeholder: 'Username'
      },
      {
        name: 'password',
        type: 'password',
        placeholder: 'Password'
      },
      {
        name: 'confirmPassword',
        type: 'password',
        placeholder: 'Confirm Password'
      }

    ]
  }
}