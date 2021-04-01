const express = require('express')
const router = express.Router()
require('../config/passport')
const passport = require('passport')

//CONTROLADORES
const eventController = require('../controllers/eventController')
const productController = require('../controllers/productController')
const categoryController = require('../controllers/categoryController')
const mercadoPagoController = require('../controllers/mercadoPagoController')

// EL METODO PUT LO TENEMOS QUE MOVER A LA RUTA QUE TIENE EL PRODUCT ID
router.route('/products').post(productController.addProduct).get(productController.getProducts).put(productController.editProduct)

router.route('/category').post(categoryController.addCategory).get(categoryController.getCategories)

router.route('/product/:productId').delete(productController.deleteProduct)

router.route('/product/subcategory').post(productController.addSubProducts).put(productController.editSubcategory)
router.route('/product/subcategory/delete/:productId/:subcategoryId').delete(productController.deleteSubcategory)


const validator = require('../controllers/validator')
const userController = require('../controllers/userController')
const reservationController = require('../controllers/reservationController')
const orderController = require('../controllers/orderController')
const { mercadopago } = require('../controllers/mercadoPagoController')




//RUTAS DE EVENTOS
router.route('/events')
  .get(eventController.getEvents)
  .post(eventController.addEvent)
  .put(eventController.modifyEvent)
router.route('/events/delete/:id')
  .delete(eventController.deleteEvent)


//RUTAS RESERVAS
router.route('/reservation')
  .post(passport.authenticate('jwt', { session: false }), reservationController.addReservation)
  .get(reservationController.getReservations)
  .put(passport.authenticate('jwt', { session: false }), reservationController.editReservations)

router.route('/reservation/:id')
  .delete(passport.authenticate('jwt', { session: false }), reservationController.deleteReservations)


//rutas de signIn y signUp
router.route('/user/signup')
  .post(validator.accountToValidate, userController.signUp)
router.route('/user/signin')
  .post(userController.signin)
router.route('/user/ls')
  .post(passport.authenticate('jwt', { session: false }), userController.logFromLS)


router.route('/user/sign_google')
  .post(userController.signGoogle)
//Rutas de pedidos
router.route('/purchases')
  .post(passport.authenticate('jwt', { session: false }), orderController.newOrder)
  .get(orderController.getOrders)

router.route('/purchases/confirm/:orderId/:customerId')
  .put(orderController.confirmOrder)

router.route('/purchases/cancel/:orderId')
  .put(orderController.cancelOrder)

router.route('/purchases/complete/:orderId')
  .put(orderController.completeOrder)

router.route('/purchases/user/:customerId')
  .get(orderController.getCustomer)

router.route('/create_preference')
.post(mercadoPagoController.mercadopago)

router.route('feedback')
.get(mercadoPagoController.payment)


//RATING
router.route('/rate/:productId')
  .post(passport.authenticate('jwt', { session: false }), productController.rateProduct)

module.exports = router