const sendErrorResponse = (res, { statusCode, message }) => {
  res.send(statusCode, { error: message });
};

module.exports = sendErrorResponse;
