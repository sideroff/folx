module.exports = {
  User: {
    methods: {},
    schema: {
      username: {
        type: String,
        unique: true,
        index: true
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
        minlength: 69,
        maxlength: 1500
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