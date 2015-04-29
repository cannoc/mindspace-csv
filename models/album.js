var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var AlbumSchema = new Schema({
  artist: String,
  albumName: String,
  releaseYear: String,
  rating: String  
});

var Album = mongoose.model('albums', AlbumSchema);

module.exports = Album;