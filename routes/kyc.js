/* eslint-disable camelcase */
const express = require("express");

const router = express.Router();
const Auth = require("../middleware/auth");
const KYC_Controller = require("../controllers/KYC_Controller");

const { validate } = require("../helpers/validators");

router
  .route("/kyc-supply-category/create")
  .post(validate, Auth, KYC_Controller.createSupplyCategories);

router
  .route("/kyc-supply-category/update")
  .post(validate, Auth, KYC_Controller.updateSupplyCategories);

//
// kyc-financial-data
router
  .route("/kyc-financial-data/create")
  .post(validate, Auth, KYC_Controller.createSupplyCategories);

router
  .route("/kyc-financial-data/update")
  .post(validate, Auth, KYC_Controller.updateKycFinancialData);

//
// kyc_general_info
router
  .route("/kyc-general-info/create")
  .post(validate, Auth, KYC_Controller.createKycGeneralInfo);

router
  .route("/kyc-general-info/update")
  .post(validate, Auth, KYC_Controller.updateKycGeneralInfo);

//
// kyc_organisation_info
router
  .route("/kyc-organisation-info/create")
  .post(validate, Auth, KYC_Controller.createKycOrganisationInfo);

router
  .route("/kyc-organisation-info/update")
  .post(validate, Auth, KYC_Controller.updateKycOrganisationInfo);

// kyc_tax_permits
router
  .route("/kyc-tax-permits/create")
  .post(validate, Auth, KYC_Controller.createKycTaxPermits);

router
  .route("/kyc-tax-permits/update")
  .post(validate, Auth, KYC_Controller.updateKycTaxPermits);

// kyc_work_experience
router
  .route("/kyc-work-experience/create")
  .post(validate, Auth, KYC_Controller.createKycWorkExperience);

router
  .route("/kyc-work-experience/update")
  .post(validate, Auth, KYC_Controller.updateKycWorkExperience);

// kyc_documents
router
  .route("/kyc-documents/create")
  .post(validate, Auth, KYC_Controller.createKycDocuments);

router
  .route("/kyc-documents/update")
  .post(validate, Auth, KYC_Controller.updateKycWorkExperience);
