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
  },
  searchAds: {
    name: 'searchAds',
    submitButtonLabel: 'Search',
    fields: [
      {
        name: 'name',
        type: 'text',
        placeholder: 'Name'
      },
      {
        name: 'category',
        type: 'select',
        placeholder: 'Password',
        options: [
          { value: 1, label: 'one' },
          { value: 2, label: 'two' },
          { value: 3, label: 'three' },
          { value: 4, label: 'four' },
          { value: 5, label: 'five' },
          { value: 6, label: 'six' },
        ]
      }
    ]
  },
  adCreate: {
    name: 'adCreate',
    submitButtonLabel: 'Create',
    useFormDataObject: true,
    fields: [
      {
        name: 'title',
        type: 'text',
        placeholder: 'Title'
      }, {
        name: 'description',
        type: 'textarea',
        placeholder: 'Description'
      }, {
        name: 'price',
        type: 'number',
        placeholder: 'Price'
      },
      {
        name: 'picture',
        type: 'file',
        placeholder: 'Picture'
      }
    ]
  }
}