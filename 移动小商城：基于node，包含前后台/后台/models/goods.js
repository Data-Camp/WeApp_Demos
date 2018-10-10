import mongoose from 'mongoose'

const ObjectId = mongoose.Schema.Types.ObjectId

const Schema = mongoose.Schema({
	types   : [{
		type: ObjectId, 
		ref : 'classify',
	}],
	name     : String,
	price    : Number,
	remark   : String,
	images   : Array,
	create_at: {
		type   : Date,
		default: Date.now(),
	},
	update_at: Date,
})

export default mongoose.model('goods', Schema)