const Sequelize = require('sequelize');
const sequelise = require('../config/database/connection');

const AdminMessage = sequelise.define(
  'admin_messages',
  {
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
    content: {
      allowNull: true,
      type: Sequelize.TEXT,
    },
    user: {
      type: Sequelize.ENUM(
        'all',
        'private_client',
        'corporate_client',
        'service_partner',
        'product_partner',
        'other'
      ),
      defaultValue: 'all',
      allowNull: true,
    },
    expiredAt: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    supportingDocument: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    unread: {
      type: Sequelize.TEXT,
      allowNull: true,
    },
    drafted: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    emailSent: {
      type: Sequelize.BOOLEAN,
      allowNull: true,
      defaultValue: true,
    },
  },
  { paranoid: true }
);

module.exports = AdminMessage;
