const Order = require('../models/Order')
const User = require('../models/User')
const { ObjectId } = require('mongodb'); // or ObjectID 

const orderController = {
  newOrder: (req, res) => {
    const { _id } = req.user
    const newOrder = new Order({ customer: _id, cart: req.body })

    newOrder.save()
      .then(async (newOrder) => {
        const populateOrder = await newOrder.populate('customer').execPopulate()
        const response = await User.findOneAndUpdate(
          { "_id": _id },
          {
            $push: {
              purchases: { cart: req.body.cart, total: req.body.data.total, id: newOrder._id, confirmed: req.body.confirmed }
            }
          },
          { new: true }
        )

        res.json({ success: true, response: populateOrder })
      })
      .catch(error => { return res.json({ success: false, response: error }) })
  },
  getOrders: async (req, res) => {
    try {
      const response = await Order.find()
      res.json({
        success: true,
        response
      })
    } catch (error) {
      res.json({
        success: false,
        error
      })
    }
  },
  confirmOrder: async (req, res) => {
    try {
      const { orderId, customerId } = req.params;
      const respuesta = await User.findOneAndUpdate(
        { "_id": customerId, "purchases.id": ObjectId(orderId) },
        {
          $set:
            { "purchases.$.confirmed": true }
        },
        { new: true }
      )

      const response = await Order.findOneAndUpdate(
        { _id: orderId },
        {
          $set: {
            state: "En curso"
          }
        }
      )
      const updated = await Order.find()
      res.json({
        success: true,
        updated
      })
    } catch (error) {
      res.json({
        success: false,
        error
      })
    }
  },
  cancelOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const response = await Order.findOneAndUpdate(
        { _id: orderId },
        {
          $set: {
            state: "Cancelada"
          }
        }
      )
      const updated = await Order.find()
      res.json({
        success: true,
        updated
      })
    } catch (error) {
      res.json({
        success: false,
        error
      })
    }
  },
  completeOrder: async (req, res) => {
    try {
      const { orderId } = req.params;
      const response = await Order.findOneAndUpdate(
        { _id: orderId },
        {
          $set: {
            state: "Completada"
          }
        }
      )
      const updated = await Order.find()
      res.json({
        success: true,
        updated
      })
    } catch (error) {
      res.json({
        success: false,
        error
      })
    }
  },
  getCustomer: async (req, res) => {
    try {
      const { customerId } = req.params
      const response = await User.findById(customerId)
      res.json({
        success: true,
        response
      })
    } catch (error) {
      res.json({
        success: false,
        response
      })
    }
  }
}

module.exports = orderController