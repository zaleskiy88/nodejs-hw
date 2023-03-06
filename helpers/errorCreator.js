const errorCreator = (errorCode, message) => {
  const error = new Error(message);
  error.status = errorCode;
  return error;
};

module.exports = errorCreator;
