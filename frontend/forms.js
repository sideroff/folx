module.exports = {
  login: {
    name: 'login',
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