const Sequelize = require("sequelize");
const sequelise = require("../config/database/connection");
const User = require("./User");

const ContractorProject = sequelise.define(
  "contractor_projects",
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
    projectId: {
      type: Sequelize.UUID,
      allowNull: true
    },
    clientName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    propertyName: {
      type: Sequelize.STRING,
      allowNull: true
    },
    projectLocation: {
      type: Sequelize.STRING,
      allowNull: true
    },
    propertyLga: {
      type: Sequelize.STRING,
      allowNull: true
    },
    projectType: {
      type: Sequelize.ENUM,
      allowNull: true,
      values: [
        "residential",
        "commercial",
        "religious",
        "industrial",
        "educational"
      ]
    },
    buildingType: {
      type: Sequelize.STRING,
      allowNull: true
    },
    status: {
      allowNull: true,
      type: Sequelize.ENUM,
      values: [
        "pending",
        "assigned",
        "approved",
        "ongoing",
        "cancelled",
        "completed"
      ],
      defaultValue: "pending"
    },
    surveyPlan: {
      type: Sequelize.STRING,
      allowNull: true
    },
    structuralPlan: {
      type: Sequelize.STRING,
      allowNull: true
    },
    architecturalPlan: {
      type: Sequelize.STRING,
      allowNull: true
    },
    mechanicalPlan: {
      type: Sequelize.STRING,
      allowNull: true
    }
  },
  { paranoid: true }
);

User.hasMany(ContractorProject, {
  foreignKey: "userId",
  as: "contractor"
});

module.exports = ContractorProject;
