import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	name     : String,
	gender   : String,
	tel      : String,
	address  : String,
	is_def	 : {
		type   : Boolean,
		default: false,
	},
	user     : {
		type: ObjectId, 
		ref : 'user',
	},
	create_at: {
		type   : Date,
		default: Date.now(),
	},
	update_at: Date,
})

export default mongoose.model('address', Schema)