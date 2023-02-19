const errorCreator = (err, message) => {
  const error = new Error(message);
  error.status = err;
  throw error;
};

module.exports = errorCreator;
