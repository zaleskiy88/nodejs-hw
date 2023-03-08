const mongooseErrorCreator = (err, data, next) => {
  const status =
    err.name === "MongoServerError" && err.code === 11000 ? 409 : 400;

  err.status = status;
  next();
};

module.exports = mongooseErrorCreator;
