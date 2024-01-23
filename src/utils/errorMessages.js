const errorMessages = {
  internalServerError: { statusCode: 500, message: "Internal Server Error" },
  notFound: (id) => ({
    statusCode: 404,
    message: `Not found ability with id: ${id}`,
  }),
  nameRequired: { statusCode: 400, message: "Name is required" },
  invalidProperties: {
    statusCode: 400,
    message: "Invalid properties in req.body",
  },
  invalidCredentials: {
    statusCode: 400,
    message: "invalid user credentials",
  },
  emailAlreadyExists: {
    statusCode: 400,
    message: "This email is already in use",
  },
  userNameRequired: {
    statusCode: 400,
    name: "Name is required",
  },
  userInfoRequired: {
    statusCode: 400,
    message: "Email and password are required",
  },
  allUserInfoRequired: {
    statusCode: 400,
    message: "Email, name and password are required",
  },
};

module.exports = errorMessages;
