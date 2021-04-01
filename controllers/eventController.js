const Event = require('../models/Event')
const path = require('path')

const eventController = {
  addEvent: async (req, res) => {
    const { title, description, category, dateEvent } = req.body
    const file = req.files.file
    const articlePictureUbicacion = `/assets/eventsPics/${file.md5}.jpg`
    const eventSave = new Event({
      title,
      description,
      picture: articlePictureUbicacion,
      category,
      dateEvent,
    })

    file.mv(path.join(__dirname, `../frontend/public/assets/eventsPics/${file.md5}.jpg`), error => {
      if (error) {
        return res.json({ response: error })
      }
    })

    eventSave.save()
      .then(eventSaved => {
        return res.json({ success: true, response: eventSaved })
      })
      .catch(error => {
        return res.json({ success: false, error })
      })

  },
  getEvents: (req, res) => {
    Event.find()
    .then(event => {
      return res.json({ success: true, response: event })
    })
    .catch(error => {
      return res.json({ success: false, error })
    })
  },
  editEvent: async (req, res) => {
    const { _id, date, artist, picture, description, categoty } = req.body.article
    try {
      await Event.findOneAndUpdate(
        { _id: _id },
        {
          $set: {
            'date': date,
            'artist': artist,
            'picture': picture,
            'description': description,
            'categoty': categoty,
          }
        },
        { new: true }
      )
    }

    catch (error) { res.json({ success: false, error }) }
  },
  deleteEvent: async (req, res) => {
    //BORRA EL POSTEO QUE COINCIDA CON EL ID QUE LE LLEGA POR PARAMS
    try {
      const { id } = req.params
      await Event.findOneAndDelete({ _id: id })
      const response = await Event.find()
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
  commentEvent: async (req, res) => {
    try {
      const { comment, artId } = req.body
      const { profilePicture, name } = req.user
      const userId = req.user._id

      const response = await Event.findOneAndUpdate(
        { _id: artId },
        {
          $push: {
            comments: { profilePicture, comment, name, userId }
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
  modifyEvent: async (req, res) => 
    {
      try {
      if(req.files && req.files.file){
        var { file } = req.files
        var articlePictureUbicacion = `/assets/eventsPics/${file.md5}.jpg`

        file.mv(path.join(__dirname, `../frontend/public/assets/eventsPics/${file.md5}.jpg`), error => {
        if (error) {
          return res.json({ response: error })
        }
      })
      }
  
      const { title, description, date, id } = req.body
      const response = await Event.findOneAndUpdate(
        { _id: id },
        {$set: 
          {
            title, description, date, picture: articlePictureUbicacion
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
  editCommentEvent: async (req, res) => {
    try {
      const { commentId, artId, editComment } = req.body
      const response = await Event.findOneAndUpdate(
        { _id: artId, 'comments._id': commentId },
        {
          $set: {
            'comments.$.comment': editComment
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
//   addVisit: async (req, res) => {
//     try {
//       const response = await Article.findOneAndUpdate(
//         { _id: req.body.artId },
//         {
//           $inc: {
//             visits: 1
//           },
//         },
//         { new: true }
//       )
//       res.json({
//         success: true,
//         response,
//       })
//     } catch (error) {
//       res.json({
//         success: false,
//         error
//       })
//     }
//   }

}



module.exports = eventController




