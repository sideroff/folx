module.exports = {
  User: {
    methods: {},
    schema: {
      username: {
        type: String,
        unique: true,
        index: true,
        minlength: [4, "usernameTooShort"],
        maxlength: [20, "usernameTooLong"]
      },
      email: {
        type: String,
        unique: true,
        index: true
      },
      createdOn: {
        type: Date,
        default: Date.now
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
        minlength: [10, "adDescriptionTooShort"],
        maxlength: [1500, "adDescriptionTooLong"],
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
      createdOn: {
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