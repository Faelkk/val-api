const sendJsonResponse = (res, statusCode, body) => {
  res.writeHead(statusCode, { "Content-type": "application/json" });
  res.end(JSON.stringify(body));
};

module.exports = sendJsonResponse;
