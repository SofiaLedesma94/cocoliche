const User = require('../models/User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userController = {

    signUp: async (req, res) => {
        const errores = []
        const { username, password, firstname, lastname } = req.body

        const existingUser = await User.findOne({ username: username })
        if (existingUser) {
            errores.push('Usuario existente')
        }
        if (errores.length === 0) {
            const passHasheado = bcrypt.hashSync(password, 10)
            const validatedUser = new User({
                username, password: passHasheado, firstname, lastname
            })
            var userValidation = await validatedUser.save()
            var token = jwt.sign({ ...userValidation }, process.env.SECRET_KEY, {})
        }
        return res.json({
            success: errores.length === 0 ? true : false,
            respuesta: errores,
            //validamos que no tenga errores para mandarle los datos 
            response: errores.length === 0 && {
                token,
                urlPic: userValidation.urlPic,
                username: userValidation.username,
                firstname: userValidation.firstname,
                role: userValidation.role,
                _id: userValidation._id,
                purchases: userValidation.purchases
            }
        })
    },
    signGoogle: async (req, res) => {
        const { displayName, email, refreshToken, photoURL } = req.body
        const userExists = await User.findOne({ username: email })
        const nombre = displayName.split(" ")

        if (userExists) {
            var token = jwt.sign({ ...userExists }, process.env.SECRET_KEY, {})
            return res.json({
                success: true, response: {
                    success: true,
                    token,
                    firstname: userExists.firstname,
                    urlPic: userExists.urlPic,
                    role: userExists.role,
                    _id: userExists._id,
                    purchases: userExists.purchases,
                }
            })
        } else {
            var newUser = new User({
                firstname: nombre[0], lastname: nombre[nombre.length - 1], username: email, urlPic: photoURL, logginGoogle: refreshToken
            })
            var newUserSaved = await newUser.save()
            var token = jwt.sign({ ...newUserSaved }, process.env.SECRET_KEY, {})
            return res.json({
                success: true, response: {
                    success: true,
                    token,
                    firstname: newUserSaved.firsname,
                    urlPic: newUserSaved.urlPic,
                    role: newUserSaved.role,
                    _id: newUserSaved._id,
                    purchases: newUserSaved.purchases,
                }
            })
        }
    },
    signin: async (req, res) => {
        const { username, password } = req.body
        const usuarioExistente = await User.findOne({ username: username })
        if (!usuarioExistente) {
            return res.json({ success: false, respuesta: 'wrong username or password' })
        }

        const passExistente = bcrypt.compareSync(password, usuarioExistente.password)
        if (!passExistente) {
            return res.json({ success: false, respuesta: 'wrong username or password' })
        }
        var token = jwt.sign({ ...usuarioExistente }, process.env.SECRET_KEY, {})
        return res.json({
            success: true, response: {
                token,
                urlPic: usuarioExistente.urlPic,
                firstname: usuarioExistente.firstname,
                role: usuarioExistente.role,
                _id: usuarioExistente._id,
                purchases: usuarioExistente.purchases,
            }
        })

    },
    logFromLS: (req, res) => {
        try {
            res.json({
                response: {
                    firstname: req.user.firstname,
                    urlPic: req.user.urlPic,
                    role: req.user.role,
                    token: req.body.token,
                    _id: req.user._id,
                    purchases: req.user.purchases
                }
            })
        } catch (error) {
            console.log(error)
            res.json({
                success: false,
                error
            })
        }

    }
}

module.exports = userController



