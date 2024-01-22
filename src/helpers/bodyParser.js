function bodyParser(req, callback) {
  let body = "";

  req.on("data", (chunk) => {
    body += chunk;
  });

  req.on("end", () => {
    try {
      if (body) {
        body = JSON.parse(body);
      }
      req.body = body;
      callback();
    } catch (error) {
      callback(error);
    }
  });
}

module.exports = bodyParser;
