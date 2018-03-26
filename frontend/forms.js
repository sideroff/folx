module.exports = {
  login: {
    name: 'login',
    submitButtonLabel: 'Login',
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
    submitButtonLabel: 'Register',
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
      },
      {
        name: 'email',
        type: 'email',
        placeholder: 'Email'
      },
    ]
  }
}