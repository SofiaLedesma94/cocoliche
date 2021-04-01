const Product = require('../models/Product.js')
const path = require('path')
const { response } = require('express')

const productController = {
  getProducts: async (req, res) => {
    try {
      const data = await Product.find()
      res.json({
        success: true,
        response: data
      })
    } catch (error) {
      res.json({
        success: false,
        response: error
      })
    }
  },
  addProduct: async (req, res) => {

    // const parsedSubcategories = JSON.parse(req.body.subcategories)

    const { name, description, delay, category } = req.body
    const file = req.files.file

    await file.mv(path.join(__dirname, '../frontend/public/assets/productPictures/' + file.md5 + ".jpeg"), error => {
      if (error) {
        return res.json({ response: error })
      }
    })

    const productPicturesLocation = `/assets/productPictures/${file.md5}.jpeg`

    const newProduct = new Product({
      name, description, picture: productPicturesLocation, delay, category
    })
    newProduct.save()
      .then(newProduct => { return res.json({ success: true, response: newProduct }) })
      .catch(error => { return res.json({ success: false, response: error }) })

  },
  editProduct: async (req, res) => {
    // productId tendría que llegar de la barra de navegacion
    try {
      const { name, price, description, category, delay, id } = req.body

      if (req.files) {
        var file = req.files.file
        await file.mv(path.join(__dirname, '../frontend/public/assets/productPictures/' + file.md5 + ".jpeg"), error => {
          if (error) {
            return res.json({ response: error })
          }
        })
        var productPicturesLocation = `/assets/productPictures/${file.md5}.jpeg`
      }


      if (!req.files) {
        var modifiedProduct = await Product.findOneAndUpdate(
          { "_id": id },
          {
            "$set": {
              name,
              price,
              description,
              stock,
              category,
              delay
            }
          },
          { new: true }
        )
      } else {
        var modifiedProduct = await Product.findOneAndUpdate(
          { "_id": id },
          {
            "$set": {
              name: name,
              price: price,
              description: description,
              stock: stock,
              category: category,
              delay: delay,
              picture: productPicturesLocation
            }
          },
          { new: true }
        )
      }
      res.json({
        success: true,
        response: modifiedProduct
      })
    }
    catch (error) {
      return res.json({ success: false, response: error })
    }



  },
  deleteProduct: async (req, res) => {
    const { productId } = req.params
    try {
      await Product.findOneAndRemove({ "_id": productId })
      const response = await Product.find()
      return res.json({ success: true, response: response })
    } catch (error) {
      return res.json({
        success: false, response: error
      })
    }

  },
  addSubProducts: async (req, res) => {
    const { subcategories, productId } = req.body
    try {
      var addSubProd = await Product.findOneAndUpdate(
        { _id: productId },
        {
          "$push": { subcategories: subcategories }
        },
        { new: true }
      )
      res.json({ success: true, response: addSubProd })
    } catch (error) {
      res.json({ success: false, response: error })
    }
  },
  deleteSubcategory: async (req, res) => {
    try {
      const { productId, subcategoryId } = req.params

      const response = await Product.findOneAndUpdate(
        { _id: productId },
        {
          $pull: {
            subcategories: {
              _id: subcategoryId
            }
          }
        },
        { new: true })
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
  editSubcategory: async (req, res) => {
    try {
      const { subcategoryId, productId, subcategory, subcategoryPrice, subcategoryStock } = req.body
      const response = await Product.findOneAndUpdate(
        { _id: productId, "subcategories._id": subcategoryId },
        {
          $set: {
            "subcategories.$.subcategory": subcategory,
            "subcategories.$.subcategoryPrice": subcategoryPrice,
            "subcategories.$.subcategoryStock": subcategoryStock,
          }
        },
        { new: true }
      )
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
  modifySubCategory: async (req, res) => {

    const { newSubcategory } = req.body

    try {
      const modifySubcategory = await Product.findOneAndUpdate(
        { "_id": newSubcategory.idProduct, "subcategories._id": newSubcategory.idSubcategory },
        {
          "$set": {
            "subcategories.$.subcategory": newSubcategory.subcategory,
            "subcategories.$.subcategoryPrice": newSubcategory.subcategoryPrice,
            "subcategories.$.subcategoryStock": newSubcategory.subcategoryStock
          }
        },
        { new: true }
      )
      return res.json({ success: true, response: modifySubcategory })
    } catch (error) {
      return res.json({ success: false, response: error })
    }
  },
  delSubcategory: async (req, res) => {
    const { idProduct, idSubcategory } = req.body
    try {
      const deleteSubcategory = await Product.findOneAndUpdate(
        { "_id": idProduct },
        { "$pull": { subcategories: { "_id": idSubcategory } } },
        { new: true }
      )
      return res.json({ success: true, response: deleteSubcategory })
    } catch (error) {
      return res.json({ success: false, response: error })
    }
  },
  rateProduct: async (req, res) => {
    try {
      const { rating } = req.body
      const { productId } = req.params
      const { _id } = req.user
      const rateObj = {
        userId: _id,
        value: rating
      }
      const response = await Product.findOneAndUpdate(
        { _id: productId },
        {
          $push: {
            rating: rateObj
          }
        }
      )
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
  }
}

module.exports = productController