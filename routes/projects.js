const express = require("express");

const router = express.Router();
const Auth = require("../middleware/auth");
const Access = require("../middleware/access");

const upload = require("../helpers/upload");

const {
  validate,
  landSurveyRequestValidation,
  projectAssignmentRequestValidation,
  projectBidRequestValidation,
  projectProgressValidation
  //   contractorRequestValidation
} = require("../helpers/validators");
const ProjectController = require("../controllers/ProjectController");

// Projects
router
  .route("/projects/my-request")
  .get(Auth, ProjectController.getProjectRequest);

router
  .route("/projects/service-request")
  .get(Auth, ProjectController.getServicePartnerProjectRequest);

router
  .route("/projects/dispatched-projects/:userId")
  .get(Auth, ProjectController.getDispatchedProject);

// Get dispatched projects v2
// router.route('/projects/v2/dispatched-projects/:userId')
//   .get(Auth, ProjectController.getV2DispatchedProject)

router
  .route("/projects/assigned-projects/:userId")
  .get(Auth, ProjectController.getAssignedProjects);

// Update project's progress
router
  .route("/projects/progress/:providerId/:projectId")
  .put(
    projectProgressValidation(),
    validate,
    Auth,
    ProjectController.updateProjectProgress
  );

// Get assigned projects v2
// router
//   .route("/projects/v2/assigned-projects/:userId")
//   .get(Auth, ProjectController.getV2AssignedProjects);

router.route("/projects/all").get(Auth, ProjectController.getAllProjectRequest);

// View all project v2
router
  .route("/projects/v2/all")
  .get(Auth, ProjectController.getAllProjectRequestV2);

router
  .route("/projects/view-project/:projectId")
  .get(Auth, ProjectController.viewProjectRequest);

// Project request view v2
router
  .route("/projects/v2/view-project/:projectId")
  .get(Auth, ProjectController.viewProjectRequestV2);

router
  .route("/projects/delete/:requestId")
  .delete(Auth, ProjectController.deleteProjectRequest);

// Request service type
router
  .route("/projects/request")
  .post(
    [Auth, Access.verifyAccess, Access.verifyUser],
    ProjectController.requestForService
  );

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

router
  .route("/projects/request-for-approval/:projectId")
  .patch(Auth, ProjectController.requestProjectApproval);

router
  .route("/projects/approve-project/:projectId")
  .patch(Auth, ProjectController.approveProjectRequest);

router
  .route("/projects/dispatch-project/:projectId")
  .patch(Auth, ProjectController.dispatchProject);

router
  .route("/projects/assign-project")
  .post(
    projectAssignmentRequestValidation(),
    validate,
    Auth,
    ProjectController.assignProject
  );

router
  .route("/projects/bid-project")
  .post(
    projectBidRequestValidation(),
    validate,
    Auth,
    ProjectController.bidForProject
  );

router.route("/projects/bids/:projectId").get(ProjectController.getProjectBids);

router
  .route("/projects/individual-bid/:projectId/:userId")
  .get(ProjectController.getIndividualProjectBid);

module.exports = router;
