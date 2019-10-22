const mongoose = require('mongoose')
const Book = require('./book')
const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

authorSchema.pre('remove', function(next) {
    Book.find({ author: this.id }, (err, books) => {
      if (err) {
        next(err)
      } else if (books.length > 0) {
        next(new Error('This author has books still'))
      } else {
        next()
      }
    })
  })

// authorSchema.pre('remove', function(next){
//     Book.find({ author: this.id }, ( err, books) => {
//         if (err) {
//             next(err) 
//         } else if (books.length > 0 ) {
//             next(new Error('This author has books, u cannot delete this author'))
//         } else {
//             next()
//         }
//     })
// })

module.exports = mongoose.model('Author', authorSchema)