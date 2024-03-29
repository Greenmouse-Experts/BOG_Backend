const Sequelize = require("sequelize");
const sequelise = require("../config/database/connection");
const ContactDetails = require("./ContactDetails");
const OrderItem = require("./OrderItem");
const User = require("./User");
const OrderReviews = require("./order_reviews")

const Order = sequelise.define(
  "orders",
  {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    orderSlug: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    userId: {
      type: Sequelize.UUID,
      allowNull: true,
    },
    userType: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    discount: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    insuranceFee: {
      type: Sequelize.BOOLEAN,
      default: false
    },
    deliveryFee: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    totalAmount: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    status: {
      allowNull: true,
      type: Sequelize.ENUM,
      values: ["pending", "approved", "cancelled", "shipped", "completed"],
      defaultValue: "pending",
    },
    refundStatus: {
      allowNull: true,
      type: Sequelize.ENUM,
      values: ["request refund", "refunded", "not refunded"],
      defaultValue: "not refunded",
    },
  },
  { paranoid: true }
);

Order.hasMany(OrderItem, {
  foreignKey: "orderId",
  as: "order_items"
});

OrderItem.belongsTo(Order, {
  foreignKey: "orderId",
  as: "order"
});

User.hasMany(Order, {
  foreignKey: "userId",
  as: "user_orders"
});
Order.belongsTo(User, {
  foreignKey: "userId",
  as: "client"
});

Order.hasOne(ContactDetails, {
  foreignKey: "orderId",
  as: "contact"
});

Order.hasMany(OrderReviews, {
  foreignKey: "orderId",
  as: "orderReview"
})


module.exports = Order;
