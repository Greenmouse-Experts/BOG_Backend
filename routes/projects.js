const express = require("express");

const router = express.Router();
const Auth = require("../middleware/auth");
const upload = require("../helpers/upload");

const {
  validate,
  landSurveyRequestValidation
  //   contractorRequestValidation
} = require("../helpers/validators");
const ProjectController = require("../controllers/ProjectController");

// Projects
router
  .route("/projects/my-request")
  .get(Auth, ProjectController.getProjectRequest);

router.route("/projects/all").get(Auth, ProjectController.getAllProjectRequest);

router
  .route("/projects/view-project/:projectId")
  .get(Auth, ProjectController.viewProjectRequest);

router
  .route("/projects/delete/:requestId")
  .delete(Auth, ProjectController.deleteProjectRequest);

// Land Survey
router
  .route("/projects/land-survey/request")
  .post(
    landSurveyRequestValidation(),
    validate,
    Auth,
    ProjectController.requestForLandSurvey
  );

router
  .route("/projects/land-survey/update-request")
  .patch(Auth, ProjectController.updateLandSurveyRequest);

// Contractor Project
router
  .route("/projects/contractor/request")
  .post(Auth, upload.any(), ProjectController.requestForContractor);

router
  .route("/projects/contractor/update-request")
  .patch(Auth, upload.any(), ProjectController.updateContractorRequest);

// Drawing Project
router
  .route("/projects/drawing/request")
  .post(Auth, upload.any(), ProjectController.drawingProjectsRequest);

router
  .route("/projects/drawing/update-request")
  .patch(Auth, upload.any(), ProjectController.updateDrawingRequest);

// Building Approval Project
router
  .route("/projects/building-approval/request")
  .post(Auth, upload.any(), ProjectController.buildingApprovalProjectsRequest);

router
  .route("/projects/building-approval/update-request")
  .patch(Auth, upload.any(), ProjectController.updateBuildingApprovalRequest);

// Geotechnical Project
router
  .route("/projects/geotechnical/request")
  .post(
    Auth,
    upload.any(),
    ProjectController.requestForGeoTechnicalInvestigation
  );

router
  .route("/projects/geotechnical/update-request")
  .patch(
    Auth,
    upload.any(),
    ProjectController.updateGeoTechnicalInvestigationRequest
  );

module.exports = router;
