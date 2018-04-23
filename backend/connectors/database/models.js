module.exports = {
  User: {
    methods: {},
    schema: {
      username: {
        type: String,
        unique: true,
        index: true,
        minLength: 4,
        maxLength: 20
      },
      email: {
        type: String,
        unique: true,
        index: true
      },
      passwordHash: String,
      salt: String
    }
  },
  Ad: {
    methods: {},
    schema: {
      title: {
        type: String,
        index: true,
        unique: true,
        trim: true,
        minlength: 10,
        maxlength: 99
      },
      address: {
        country: {
          type: String,
        },
        city: {
          type: String
        },
        details: {
          type: String
        }
      },
      description: {
        type: String,
        trim: true,
        minLength: 25,
        maxLength: 1500,
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      creator: {
        type: String,
        index: true
      },
      date: {
        type: Date,
        default: Date.now
      },
      contacts: [
        {
          type: String,
          value: String
        }
      ]
    }
  }
}