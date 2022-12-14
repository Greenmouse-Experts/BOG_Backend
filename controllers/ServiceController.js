/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
require("dotenv").config();
const { Op } = require("sequelize");
const sequelize = require("../config/database/connection");
const ServiceType = require("../models/ServiceType");

exports.CreateServiceType = async (req, res, next) => {
  sequelize.transaction(async t => {
    try {
      const type = await ServiceType.create(req.body, {
        transaction: t
      });
      return res.status(200).send({
        success: true,
        data: type
      });
    } catch (error) {
      t.rollback();
      return next(error);
    }
  });
};

exports.getServiceTypes = async (req, res, next) => {
  try {
    const types = await ServiceType.findAll();
    return res.status(200).send({
      success: true,
      data: types
    });
  } catch (error) {
    return next(error);
  }
};

exports.findServiceType = async (req, res, next) => {
  try {
    const types = await ServiceType.findOne({
      where: { id: req.params.typeId }
    });
    return res.status(200).send({
      success: true,
      data: types
    });
  } catch (error) {
    return next(error);
  }
};

exports.updateServiceType = async (req, res, next) => {
  sequelize.transaction(async t => {
    try {
      const { typeId, ...update } = req.body;
      const getTheType = await ServiceType.findOne({
        where: { id: typeId }
      });
      if (!getTheType) {
        return res.status(404).send({
          success: false,
          message: "Invalid category"
        });
      }
      await ServiceType.update(update, {
        where: { id: typeId },
        transaction: t
      });
      return res.status(200).send({
        success: true,
        data: getTheType
      });
    } catch (error) {
      t.rollback();
      return next(error);
    }
  });
};

exports.deleteCategory = async (req, res, next) => {
  sequelize.transaction(async t => {
    try {
      const { typeId } = req.params;
      const getTheType = await ServiceType.findOne({
        where: { id: typeId }
      });
      if (!getTheType) {
        return res.status(404).send({
          success: false,
          message: "Invalid category"
        });
      }
      await ServiceType.destroy({ where: { id: typeId }, transaction: t });
      return res.status(200).send({
        success: true,
        message: "Service type deleted successfully"
      });
    } catch (error) {
      t.rollback();
      return next(error);
    }
  });
};
