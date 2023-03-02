const Sequelize = require("sequelize");
const sequelise = require("../config/database/connection");
const BuildingProject = require("./BuildingProject");
const ContractorProject = require("./ContractorProject");
const DrawingProject = require("./DrawingProject");
const LandSurveyProject = require("./LandSurveyProject");
const ServicePartner = require("./ServicePartner");
// const User = require("./User");

const Project = sequelise.define(
  "projects",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      primaryKey: true
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: true
    },
    title: {
      type: Sequelize.STRING,
      allowNull: true
    },
    projectSlug: {
      type: Sequelize.STRING,
      allowNull: true
    },
    description: {
      type: Sequelize.STRING,
      allowNull: true
    },
    projectTypes: {
      allowNull: false,
      type: Sequelize.ENUM,
      values: [
        "land_survey",
        "construction_drawing",
        "building_approval",
        "geotechnical_investigation",
        "contractor"
      ]
    },
    status: {
      allowNull: true,
      type: Sequelize.STRING,
      defaultValue: "pending"
    },
    approvalStatus: {
      allowNull: true,
      type: Sequelize.ENUM,
      values: ["pending", "approved", "disapproved", "in_review"],
      defaultValue: "pending"
    },
    serviceProviderId: {
      type: Sequelize.UUID,
      allowNull: true
    },
    totalCost: {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: 0.0
    },
    estimatedCost: {
      type: Sequelize.FLOAT,
      allowNull: true,
      defaultValue: 0.0
    },
    duration: {
      allowNull: true,
      type: Sequelize.INTEGER
    },
    endDate: {
      allowNull: true,
      type: Sequelize.DATE
    }
  },
  { paranoid: true }
);

Project.belongsTo(ServicePartner, {
  foreignKey: "serviceProviderId",
  as: "serviceProvider",
});

// ServicePartner.hasMany(Project, {
//   foreignKey: "serviceProviderId",
//   as: "serviceProvider",
// })

// User.hasOne(Project, {
//   foreignKey: "userId",
//   as: "projects",
//   onDelete: "cascade",
//   hooks: true
// });

Project.hasMany(LandSurveyProject, {
  foreignKey: "projectId",
  as: "survey_project",
  onDelete: "cascade",
  hooks: true
});

Project.hasMany(ContractorProject, {
  foreignKey: "projectId",
  as: "contractor_project",
  onDelete: "cascade",
  hooks: true
});

Project.hasMany(DrawingProject, {
  foreignKey: "projectId",
  as: "drawing_project",
  onDelete: "cascade",
  hooks: true
});

Project.hasMany(BuildingProject, {
  foreignKey: "projectId",
  as: "building_project",
  onDelete: "cascade",
  hooks: true
});

module.exports = Project;
