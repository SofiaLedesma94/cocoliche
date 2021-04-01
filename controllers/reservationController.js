const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport')
const Reservation = require('../models/Revervation')

const reservationController = {
    addReservation : async (req, res) => {
        try{
            const {username, firstname, _id} = req.user
            const {dia, cantidad} = req.body
            const transporter = nodemailer.createTransport(smtpTransport({
               service: "gmail",
                auth: {
                  user: "cocolichemh@gmail.com", // generated ethereal user
                  pass: "cocoliche2021", // generated ethereal password
                },
                }))
            const revervationSave = new Reservation({
                day: dia,
                customer: _id,
                quantity: cantidad,
            })
            const newReservation = await revervationSave.save()
            const populateResponse = await newReservation.populate('customer').execPopulate()

            const data = transporter.sendMail({
                    from: username, // sender address
                    to: "cocolichemh@gmail.com", // list of receivers
                    subject: "RESERVAS", // Subject line
                    text: `Reserva recibida para el día: ${dia}. La cantidad de personas que asistirán es ${cantidad}. El correo electrónico es ${username} y quien hizo el pedido se llama ${firstname} `, // plain text body
                  })
            res.json({
                     success: true,
                     data,
                     response: populateResponse
                 })
           
        }catch(error){
            res.json({success: false, error})
        }
    },
    getReservations: async (req, res) => {
        try {
            const response = await Reservation.find().populate('customer')
            res.json({success: true, response})
        }catch(error){
            res.json({success: false, error})
        }
    },
    editReservations: async (req, res) => {
        const {id} = req.body
        const {day, quantity} = req.body.newDates   
        try{
            if(!day){
            var respuesta = await Reservation.findOneAndUpdate({_id: id},
                {$set: {
                    quantity
                }},
                {new: true}
                )
            }else if(!quantity){
                var respuesta = await Reservation.findOneAndUpdate({_id: id},
                    {$set: {
                        day
                    }},
                    {new: true})
            }else{
                var respuesta = await Reservation.findOneAndUpdate({_id: id},
                    {$set: {
                        day,
                        quantity
                    }},
                    {new: true})
            }  
            const responsePopulate = await respuesta.populate('customer').execPopulate()

            res.json({success: true, response: responsePopulate})
        }catch(error){
            res.json({success: false, error})
        }
    },
    deleteReservations: async (req, res) => {
        const {id} = req.params
        try{
            await Reservation.findOneAndRemove({_id: id})
            const response = await Reservation.find()

            res.json({success: true, response})
        }catch(error){
            res.json({success: false, error})
        }
    }
}

module.exports = reservationController