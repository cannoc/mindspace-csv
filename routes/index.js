var express = require('express');
var router = express.Router();
var Album = require('../models/album.js');
var csv = require('fast-csv');
var multer = require('multer');
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  Album.find({}, function(err, docs) {
      res.render('index', { title: 'My Albums', albumList: docs, albumCount: docs.length, errors: req.flash('error'), messages: req.flash('messages') });
   }).sort({releaseYear: 'desc'});
});

router.get('/albums', function(req, res, next) {
   Album.find({}, function(err, docs) {
      res.json(docs);
   }).sort({releaseYear: 'desc'});
});

router.post('/albums/upload', [ multer({ dest: './uploads/'}), function(req, res, next) {
   if(req.files.csvFile.extension === "csv") {
     var stream = fs.createReadStream(req.files.csvFile.path);
   
     console.log(req.files.csvFile);
     
     var albums = [];
     
     var colNo = { artist: 0, album: 1, release: 2, rating: 3};
     
     var csvStream = csv
        .parse()
        .on("data", function (data) {
          albums.push({artist: data[colNo.artist], albumName: data[colNo.album], releaseYear: data[colNo.release], rating: data[colNo.rating]});
        })
        .on("end", function () {
          albums.shift();
          Album.collection.insert(albums, function (err) {
            if(err) throw err;
          });
          req.flash('messages', "Successfully added " + albums.length + " albums to the database.");
          res.redirect("/csv");
        });
      
     stream.pipe(csvStream);
   } else {
    req.flash("error", "Invalid File Type");
    res.redirect("/csv");
   }
   
   
   
}]);

router.get('/albums/clear', function(req, res, next) {
  Album.remove({}, function(err) {
    if(err) throw err;
    res.redirect('/csv');
  });
});

module.exports = router;
