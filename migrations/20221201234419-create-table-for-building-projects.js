/* eslint-disable no-unused-vars */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const table = await queryInterface.createTable("building_projects", {
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
      propertyName: {
        type: Sequelize.STRING,
        allowNull: true
      },
      propertyLocation: {
        type: Sequelize.STRING,
        allowNull: true
      },
      propertyLga: {
        type: Sequelize.STRING,
        allowNull: true
      },
      purpose: {
        type: Sequelize.STRING,
        allowNull: true
      },
      propertyType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      projectType: {
        type: Sequelize.STRING,
        allowNull: true
      },
      status: {
        allowNull: true,
        type: Sequelize.ENUM,
        values: ["pending", "approved", "ongoing", "cancelled", "completed"],
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
      },
      electricalPlan: {
        type: Sequelize.STRING,
        allowNull: true
      },
      soilTestReport: {
        type: Sequelize.STRING,
        allowNull: true
      },
      sitePlan: {
        type: Sequelize.STRING,
        allowNull: true
      },
      siteAnalysisReport: {
        type: Sequelize.STRING,
        allowNull: true
      },
      environmentImpactReport: {
        type: Sequelize.STRING,
        allowNull: true
      },
      clearanceCertificate: {
        type: Sequelize.STRING,
        allowNull: true
      },
      supervisorLetter: {
        type: Sequelize.STRING,
        allowNull: true
      },
      structuralCalculationSheet: {
        type: Sequelize.STRING,
        allowNull: true
      },
      deedOfAgreement: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: { allowNull: false, type: Sequelize.DATE },
      updatedAt: { allowNull: false, type: Sequelize.DATE },
      deletedAt: { allowNull: true, type: Sequelize.DATE }
    });
    return Promise.all(table);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable("building_projects");
  }
};
