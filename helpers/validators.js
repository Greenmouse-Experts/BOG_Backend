const { check, validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  const extractedErrors = [];
  errors.array().map(err => extractedErrors.push({ message: err.msg }));

  return res.status(422).json({
    errors: extractedErrors
  });
};

const registerValidation = () => {
  return [
    check("name", "Name is required").notEmpty(),
    check("email", "Please use a valid Email").isEmail(),
    check("userType", "Enter The user type").notEmpty(),
    check(
      "password",
      "Please enter a password with 5 or more characters"
    ).isLength({ min: 5 })
  ];
};

const adminValidation = () => {
  return [
    check("name", "Name is required").notEmpty(),
    check("email", "Please use a valid Email").isEmail(),
    check("userType", "Enter The user type").notEmpty(),
    check("level", "Enter The user type").isInt(),
    check(
      "password",
      "Please enter a password with 5 or more characters"
    ).isLength({ min: 5 })
  ];
};

const loginValidation = () => {
  return [
    check("email", "Please use a valid Email").isEmail(),
    check(
      "password",
      "Please enter a password with 5 or more characters"
    ).isLength({ min: 5 })
  ];
};

const resetAdminPasswordValidation = () => {
  return [
    check(
      "password",
      "Please enter a password with 5 or more characters"
    ).isLength({ min: 5 })
  ]
}

const resetPasswordValidation = () => {
  return [
    check("email", "Please use a valid Email").isEmail(),
    check("token", "Reset tooken is required").notEmpty(),
    check(
      "password",
      "Please enter a password with 5 or more characters"
    ).isLength({ min: 5 })
  ];
};

const changePasswordValidation = () => {
  return [
    check("oldPassword", "Please enter the Old Password").notEmpty(),
    check("newPassword", "Please enter new Password").notEmpty(),
    check("confirmPassword", "Confirm new Password").notEmpty()
  ];
};

const bankValidation = () => {
  return [
    check("bank_code", "Please Select a bank").notEmpty(),
    check("bank_name", "Please Select a bank").notEmpty(),
    check("account_number", "Please enter Account number").notEmpty(),
    check("account_name", "Please enter Account name").notEmpty()
  ];
};

const meetingValidation = () => {
  return [
    check("description", "Account not found").notEmpty(),
    check("projectSlug", "Please Select a Project").notEmpty(),
    check("date", "Please enter meeting date").notEmpty(),
    check("time", "Please enter meeting time").notEmpty(),
    check("description", "Please describe the meeting").notEmpty(),
    check("requestEmail", "Unexpected error, try to login again").notEmpty()
  ];
};

const addressValidation = () => {
  return [
    check("title", "Title is required").notEmpty(),
    check("address", "Address is required").notEmpty(),
    check("state", "State is required").notEmpty(),
    check("country", "Country is required").notEmpty(),
    check("charge", "Charge is required").notEmpty(),
  ];
};

const meetingStatusValidation = () => {
  return [
    check("meetingId", "Account not found").notEmpty(),
    check("status", "No action").notEmpty()
  ];
};

const categoryValidation = () => {
  return [check("name", "Please Enter category name").notEmpty()];
};

const productValidation = () => {
  return [
    check("categoryId", "Please Select the category of product").isUUID(),
    check("name", "Please Enter a name").notEmpty(),
    check("description", "Please Enter a description").notEmpty(),
    check("price", "Please enter the product price").isNumeric(),
    check("quantity", "Please enter the quanity available").isNumeric(),
    check(
      "unit",
      "Please enter the unit measurement for this product"
    ).notEmpty()
  ];
};

const productApprovalValidation = () => {
  return [
    check("productId", "Product id is required").isUUID(),
    check("status", "Please approval status").notEmpty()
  ];
};

const orderValidation = () => {
  return [
    check("products", "Product is required").isArray(),
    check("shippingAddress", "Shipping address is required").notEmpty()
  ];
};

const updateOrderValidation = () => {
  return [
    check("orderId", "Order Id is required").isUUID(),
    check("status", "Order status is required").notEmpty()
  ];
};

const updateOrderRequestValidation = () => {
  return [
    check("requestId", "Request Id is required").isUUID(),
    check("status", "Order status is required").notEmpty()
  ];
};

const TestimonyValidation = () => {
  return [
    check("message", "Message is required").notEmpty(),
    check("star", "Rating is required").isInt({ min: 0, max: 5 })
  ];
};

const BlogCategoryValidation = () => {
  return [check("name", "name of category is required").notEmpty()];
};
const BlogValidation = () => {
  return [
    check("title", "Title is required").notEmpty(),
    check("categoryId", "No category selected").notEmpty(),
    check("status", "Status is required").notEmpty(),
    check("body", "body is required").notEmpty()
  ];
};

const ServiceTypeValidation = () => {
  return [
    check("title", "Title is required").notEmpty(),
    check("description", "No category selected").notEmpty(),
    check("serviceId", "Service Type is required").isUUID()
  ];
};

const ServiceFormBuilderValidation = () => {
  return [
    check("serviceName", "Service Name is required").notEmpty(),
    check("label", "Label is required").notEmpty(),
    check("inputType", "Input Type is required").notEmpty(),
    check("name", "Name is required").notEmpty()
  ];
};

const landSurveyRequestValidation = () => {
  return [
    check("title", "Project title is required").notEmpty(),
    check("propertyName", "Property Name is required").notEmpty(),
    check("propertyLocation", "property Location is required").notEmpty(),
    check("propertyLga", "property Lga is required").notEmpty(),
    check("landSize", "land Size is required").notEmpty(),
    check("propertyType", "property Type is required").notEmpty(),
    check("surveyType", "survey Type is required").notEmpty()
  ];
};

const contractorRequestValidation = () => {
  return [
    check("title", "Project title is required").notEmpty(),
    check("clientName", "Client Name is required").notEmpty(),
    check("projectLocation", "project Location is required").notEmpty(),
    check("projectType", "project Type is required").notEmpty(),
    check("buildingType", "Building Type is required").notEmpty()
  ];
};

const BasicKYCRequirements = () => {
  return [check("userType", "Couldn't get profile type").notEmpty()];
};
const CalculatorCalculator = () => {
  return [
    check("name", "Please provide the rate name").notEmpty(),
    check("rate", "Please provide the rate value").notEmpty()
  ];
};

const KYCApprovalValidation = () => {
  return [
    check("userType", "userType is required").notEmpty(),
    check("userId", "userId is required").isUUID(),
    check("kycPoint", "Kycpoint is required").isInt(),
    check(
      "verificationStatus",
      "verificationStatus is required and it's boolean"
    ).isBoolean()
  ];
};

const projectAssignmentRequestValidation = () => {
  return [
    check("userId", "userId is required").isUUID(),
    check("projectId", "projectId is required").isUUID(),
    check("duration", "duration is required").isNumeric(),
    check("totalCost", "totalCost is required").isNumeric(),
    check("estimatedCost", "estimatedCost is required").isNumeric()
  ];
};

const projectBidRequestValidation = () => {
  return [
    check("userId", "userId is required").isUUID(),
    check("projectId", "projectId is required").isUUID(),
    check("deliveryTimeLine", "deliveryTimeLine is required").isNumeric(),
    check("areYouInterested", "areYouInterested is required").isBoolean(),
    check("projectCost", "projectCost is required").isNumeric(),
    check("reasonOfInterest", "reasonOfInterest is required").notEmpty()
  ];
};

const subscriptionRequestValidation = () => {
  return [
    check("duration", "duration is required").isNumeric(),
    check("amount", "amount is required").isFloat(),
    check("name", "name is required").notEmpty()
  ];
};

const subscribeRequestValidation = () => {
  return [
    check("userId", "userId is required").isUUID(),
    check("planId", "planId is required").isUUID(),
    check("reference", "reference is required").notEmpty(),
    check("userType", "userType is required").notEmpty()
  ];
};

module.exports = {
  validate,
  registerValidation,
  loginValidation,
  resetPasswordValidation,
  resetAdminPasswordValidation,
  changePasswordValidation,
  bankValidation,
  categoryValidation,
  productValidation,
  productApprovalValidation,
  orderValidation,
  updateOrderValidation,
  updateOrderRequestValidation,
  BlogCategoryValidation,
  CalculatorCalculator,
  BlogValidation,
  TestimonyValidation,
  ServiceTypeValidation,
  landSurveyRequestValidation,
  contractorRequestValidation,
  adminValidation,
  meetingValidation,
  addressValidation,
  meetingStatusValidation,
  BasicKYCRequirements,
  KYCApprovalValidation,
  projectAssignmentRequestValidation,
  projectBidRequestValidation,
  subscriptionRequestValidation,
  subscribeRequestValidation,
  ServiceFormBuilderValidation
};
