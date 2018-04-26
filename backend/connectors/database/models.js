module.exports = {
  User: {
    methods: {},
    schema: {
      username: {
        type: String,
        unique: true,
        index: true,
        minLength: [4, "usernameTooShort"],
        maxLength: [20, "usernameTooLong"]
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
        required: [true, "adTitleIsRequired"],
        minlength: [10, "adTitleTooShort"],
        maxlength: [99, "adTitleTooLong"]
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
        minLength: [25, "adDescriptionTooShort"],
        maxLength: [1500, "adDescriptionTooLong"],
        required: [true, "adDescriptionIsRequired"],
      },
      price: {
        type: Number,
        min: [0, "adPriceMustBePositive"],
        required: [true, "adPriceIsRequired"],
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