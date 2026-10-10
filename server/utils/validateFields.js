const validateFields = (receivedFields, allowedFields) => {
  return receivedFields.some((field) => {
    return !allowedFields.includes(field);
  });
};

module.exports = {
  validateFields,
};
