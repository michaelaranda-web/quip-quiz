var mongoose = require('mongoose');

module.exports = {
  databaseSetup: function() {
    //https://devcenter.heroku.com/articles/mean-apps-restful-api
    mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/quiz_app');
    
    //https://developer.mozilla.org/en-US/docs/Learn/Server-side/Express_Nodejs/mongoose
    
    // Get Mongoose to use the global promise library
    mongoose.Promise = global.Promise;
    //Get the default connection
    var db = mongoose.connection;
    
    //Bind connection to error event (to get notification of connection errors)
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
    
    //http://mongoosejs.com/docs/
    db.once('open', function() {
      //good to go!
    });
  }
}