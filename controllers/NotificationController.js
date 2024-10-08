/* eslint-disable no-underscore-dangle */
/* eslint-disable no-unused-vars */
const { Op } = require('sequelize');
const Notification = require('../models/Notification');
const NotificationService = require('../helpers/notification');
const sequelize = require('../config/database/connection');

// Service methods
const UserService = require('../service/UserService');
const User = require('../models/User');

exports.getAllAdminNotifications = async (req, res, next) => {
  try {
    const { level, role } = req._credentials;

    let notifications = await Notification.findAll({
      where: {
        type: 'admin',
      },
      order: [['createdAt', 'DESC']],
    });

    if (level !== 1) {
      // Get privileged Notifications
      notifications = notifications.filter((_notification) => {
        // Check if the sub admin is permitted to view this message
        const _privilegedMsg = role.privileges.filter((_priv) =>
          _notification.message.toLowerCase().includes(_priv.toLowerCase())
        );

        if (_privilegedMsg.length > 0) {
          return _notification;
        }
      });
    }

    return res.status(200).send({
      success: true,
      data: notifications,
    });
  } catch (error) {
    return next(error);
  }
};

exports.getAllAUserNotifications = async (req, res, next) => {
  try {
    const { id, userType: exactUserType } = req._credentials;
    const { userType } = req.query;

    // Retrieve profile details
    const profile = await UserService.getUserTypeProfile(userType, id);
    if (!profile) {
      return res.status(400).json({
        success: false,
        message: 'Profile does not exist!',
        data: [],
      });
    }

    // if (profile.id !== req.params.userId) {
    //   return res.status(403).json({
    //     success: false,
    //     message: "Unauthorized access"
    //   });
    // }

    let _userType = null;
    if (userType === 'vendor') {
      _userType = 'product_partner';
    } else if (userType === 'service_partner') {
      _userType = 'professional';
    } else {
      _userType = userType;
    }

    const notifications = await Notification.findAll({
      where: {
        type: 'user',
        [Op.and]: {
          [Op.or]: [
            { userId: null, userType: _userType },
            { userType: null, userId: req.params.userId },
          ],
        },
        // [Op.and]: {
        //   [Op.or]: [{ userId: req.params.userId }, { userId: null }],
        // },
      },
      order: [['createdAt', 'DESC']],
    });

    return res.status(200).send({
      success: true,
      data: notifications,
    });
  } catch (error) {
    return next(error);
  }
};

exports.markNotificationAsRead = async (req, res, next) => {
  try {
    const data = {
      status: 'read',
      isRead: true,
    };
    const notification = await Notification.findByPk(req.params.notificationId);
    if (!notification) {
      return res.status(200).send({
        success: true,
        message: 'Notification mark as read',
      });
    }
    await Notification.update(data, {
      where: { id: req.params.notificationId },
    });
    const { io } = req.app;
    if (notification.type === 'admin') {
      io.emit(
        'getNotifications',
        await NotificationService.fetchAdminNotification()
      );
    } else if (notification.type === 'user') {
      io.emit(
        'getNotifications',
        await NotificationService.fetchUserNotificationApi({
          userId: notification.userId,
        })
      );
    }

    return res.status(200).send({
      success: true,
      message: 'Notification mark as read',
    });
  } catch (error) {
    return next(error);
  }
};

exports.deleteNotification = async (req, res, next) => {
  sequelize.transaction(async (t) => {
    try {
      const { notificationId } = req.params;
      await NotificationService.deleteNotifications(notificationId);
      return res.status(200).send({
        success: true,
        message: 'Notification deleted',
      });
    } catch (error) {
      return next(error);
    }
  });
};
