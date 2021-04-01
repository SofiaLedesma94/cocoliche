const mercadopago = require('mercadopago')

 mercadopago.configure({
        access_token: 'TEST-8493595104915790-031017-da525266b0ed7f326875a069b612077b-726652925'
        });

const mercadoPagoController = {
    mercadopago: async (req, res) => {               
        const preference = {
            items : [
                {
                    title: req.body.description,
                    unit_price: req.body.price,
                    quantity: req.body.quantity
                }
            ]
        }
        mercadopago.preferences.create(preference)
		.then(function (response) {
			res.json({id :response.body.id})
		}).catch(function (error) {
			console.log(error);
		});
    },
    payment: (req, res) => {
        res.json({
            Payment: req.query.payment_id,
            Status: req.query.status,
            MerchantOrder: req.query.merchant_order_id
        })
    }
}


module.exports = mercadoPagoController