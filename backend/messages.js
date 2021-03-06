const models = require("./connectors/database/models")

module.exports = {
  friendlyError: {
    code: "friendlyError",
    message: "Something went wrong while executing your request. Please contact support."
  },
  badRequest: {
    code: "badRequest",
    message: "The server could not respond to this request."
  },
  invalidServiceRequest: {
    code: "invalidServiceRequest",
    message: "Invalid or missing service requested."
  },
  invalidServiceRequestParams: {
    code: "invalidServiceRequestParams",
    message: "Invalid or missing service request parameters."
  },
  invalidFile: {
    code: "invalidFile",
    message: "Invalid or missing file requested."
  },
  databaseException: {
    code: "databaseException",
    message: "There was a problem with the database."
  },
  cacheException: {
    code: "cacheException",
    message: "There was a problem with the cache."
  },
  duplicateUserUsername: {
    code: "duplicateUserUsername",
    message: "There is already a user with that username."
  },
  duplicateUserEmail: {
    code: "duplicateUserEmail",
    message: "There is already a user with that email."
  },
  invalidCredentials: {
    code: "invalidCredentials",
    message: "The credentials you've entered are invalid."
  },
  invalidUsername: {
    code: "invalidUsername",
    message: "The username you've entered is invalid."
  },
  usernameTooShort: {
    code: "usernameTooShort",
    message: `The username should not be shorter than ${models.User.schema.username.minlength[0]} characters.`
  },
  usernameTooLong: {
    code: "usernameTooLong",
    message: `The username should not be longer than ${models.User.schema.username.maxlength[0]} characters.`
  },
  invalidPassword: {
    code: "invalidPassword",
    message: "The password you've entered is invalid."
  },
  invalidConfirmPassword: {
    code: "invalidConfirmPassword",
    message: "The password and confirm password fields are not the same."
  },
  registrationSuccessful: {
    code: "registrationSuccessful",
    message: "You have registered successfully."
  },
  adTitleIsRequired: {
    code: "adTitleIsRequired",
    message: "Ad title is required."
  },
  adDescriptionIsRequired: {
    code: "adDescriptionIsRequired",
    message: "Ad description is required."
  },
  adPriceIsRequired: {
    code: "adPriceIsRequired",
    message: "Ad price is required."
  },
  adCreationSuccessful: {
    code: "adCreationSuccessful",
    message: "The ad was created successfully."
  },
  adPriceMustBePositive: {
    code: "adPriceMustBePositive",
    message: "The ad price must be positive."
  },
  adDoesNotExist: {
    code: "adDoesNotExist",
    message: "The ad you are looking for does not exist."
  },
  validationError: {
    code: "validationError",
    message: "",
    details: []
  },
  adTitleTooShort: {
    code: "adTitleTooShort",
    message: `The ad title should not be shorter than ${models.Ad.schema.title.minlength[0]} characters`,
  },
  adTitleTooLong: {
    code: "adTitleTooLong",
    message: `The ad title should not be shorter than ${models.Ad.schema.title.minlength[0]} characters`,
  },
  adDescriptionTooShort: {
    code: "adDescriptionTooShort",
    message: `The ad description should not be shorter than ${models.Ad.schema.description.minlength[0]} characters.`
  },
  adDescriptionTooLong: {
    code: "adDescriptionTooLong",
    message: `The ad description should not be longer than ${models.Ad.schema.description.maxlength[0]} characters.`
  },
  serviceAccessDenied: {
    code: "serviceAccessDenied",
    message: "You do not have the required access right to execute this service."
  },
}