import mongoose from 'mongoose'

const Schema = mongoose.Schema({
	title    : String,
	content  : String,
	create_at: {
		type   : Date,
		default: Date.now(),
	},
	update_at: Date,
})

export default mongoose.model('help', Schema)