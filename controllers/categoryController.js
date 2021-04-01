const Category = require('../models/Category.js')

const categoryController = {
  addCategory: (req, res) => {
    const { category } = req.body
    const newCategory = new Category({ category })
    newCategory.save()
      .then(newCategory => { return res.json({ success: true, response: newCategory }) })
      .catch(error => { return res.json({ success: false, response: error }) })

  },
  getCategories: (req, res) => {
    Category.find()
      .then(allCategories => { return res.json({ success: true, response: allCategories }) })
      .catch(error => { return res.json({ success: false, response: error }) })
  }
}

module.exports = categoryController