
const Sequelize = require("sequelize");
const sequelise = require("../config/database/connection");

const ProjectInstallments = sequelise.define("project_installments", {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    unique: true,
    primaryKey: true,
  },
  title: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  type: {
    allowNull: true,
    type: Sequelize.ENUM(
      "professional",
      "vendor",
      "private_client",
      "corporate_client",
      "admin"
    ),
  },
  amount: {
    allowNull: true,
    type: Sequelize.DOUBLE,
  },
  project_id: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  dueDate: {
    allowNull: true,
    type: Sequelize.STRING,
  },
  paid: {
    allowNull: true,
    type: Sequelize.BOOLEAN,
  },
});

module.exports = ProjectInstallments;
