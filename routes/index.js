var express = require('express');
var router = express.Router();
var Album = require('../models/album.js');
var csv = require('fast-csv');
var multer = require('multer');
var fs = require('fs');

/* Albums Index */
router.get('/', function(req, res, next) {
  // Return list of all albums
  Album.find({}, function(err, docs) {
      res.render('index', { title: 'My Albums', albumList: docs, albumCount: docs.length, errors: req.flash('error'), messages: req.flash('messages') });
   }).sort({releaseYear: 'desc'});
});

/* JSON Result of all Albums for future AJAX */
router.get('/albums', function(req, res, next) {
   Album.find({}, function(err, docs) {
      res.json(docs);
   }).sort({releaseYear: 'desc'});
});

/* CSV Upload Route */
router.post('/albums/upload', [ multer({ dest: './uploads/'}), function(req, res, next) {
   // Simple check to make sure it's a reasonable file
   if(req.files.csvFile && req.files.csvFile.extension === "csv") {
     var stream = fs.createReadStream(req.files.csvFile.path);
        
     var albums = [];
     
     // Map column names to numbers for parsing
     // This could be expanded to read the first row of the csv and try to match
     var colNo = { artist: 0, albumName: 1, releaseYear: 2, rating: 3};
     
     // Start parsing the csv file
     var csvStream = csv
        .fromStream(stream, {ignoreEmpty: true})
        .on("data", function (data) {
          if(data.length) {
            albums.push({artist: data[colNo.artist], albumName: data[colNo.albumName], releaseYear: data[colNo.releaseYear], rating: data[colNo.rating]});
          }
        })
        .on("end", function () {
          // Remove the first row (headers)
          albums.shift();
          // Send them to MongoDB
          Album.collection.insert(albums, function (err) {
            if(err) throw err;
            req.flash('messages', "Successfully added " + albums.length + " albums to the database.");
            res.redirect("/csv");
          });
        });
      
   } else {
    req.flash("error", "Invalid File Type");
    res.redirect("/csv");
   }
   
}]);

/* Remove Album */
router.post('/albums/remove/:albumId', function(req,res,next) {
  Album.remove({_id: req.params.albumId}, function(err, docs) {
     if(err) throw err;
     req.flash("messages", "Successfully removed the album from the database.");
     res.redirect("/csv");
  });
});

/* Destroy All */
router.get('/albums/clear', function(req, res, next) {
  Album.remove({}, function(err) {
    if(err) throw err;
    req.flash("messages", "Successfully removed all albums from the database.");
    res.redirect('/csv');
  });
});

module.exports = router;
