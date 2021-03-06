var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// Notice the `mongodb` protocol; Mongo is basically a kind of server,
// which handles database requests and sends responses. It's async!
mongoose.connect('mongodb://localhost/wikistack'); // <= db name will be 'wikistack'
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'mongodb connection error:'));

var pageSchema = new Schema({
	title: {type: String, required: true},
	urlTitle: {type: String, required: true},
	content: {type: String, required: true},
	date: {type: Date, default: Date.now},
	status: {type: String, enum: ['closed', 'open']},
	author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'}
});

var userSchema = new Schema({
	name: {type: String, required: true},
	email: {type: String, required: true, unique: true}
});

pageSchema.virtual('route').get(function() {
	return "/wiki/"+this.urlTitle;
})

var Page = mongoose.model('Page', pageSchema);
var User = mongoose.model('User', userSchema);

module.exports = {
  Page: Page,
  User: User
};