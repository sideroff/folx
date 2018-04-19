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
    methods: {
      createPost: function () {
        return this.save();
      }
    },
    schema: {
      title: {
        type: String,
        index: true,
        trim: true,
        minlength: 10,
        maxlength: 99
      },
      description: {
        type: String,
        trim: true,
        minLength: 69,
        maxLength: 1500
      },
      price: {
        type: Number,
        default: 0
      },
      user: {
        type: String,
        index: true
      },
      date: {
        type: Date,
        default: Date.now
      }
    }
  }
}