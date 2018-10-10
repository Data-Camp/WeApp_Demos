import mongoose from 'mongoose'

const Schema = mongoose.Schema({
	title    : String,
	remark   : String,
	sort     : Number,
	is_show  : Boolean,
	images   : Array,
	create_at: {
		type   : Date,
		default: Date.now(),
	},
	update_at: Date,
})

export default mongoose.model('banner', Schema)